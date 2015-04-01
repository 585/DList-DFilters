(function() {
    angular.module('d.List')
    .directive('dList', listDirective);

    listDirective.$inject = ['$http', '$rootScope', '$filter', '$compile', 'dListService', 'dCheckboxesService', 'dListSetup', 'Pagination'];

    function listDirective($http, $rootScope, $filter, $compile, dListService, dCheckboxesService, dListSetup, Pagination) {
        return {
            templateUrl: 'list.tpl.html',
            replace: true,
            transclude: true,
            scope: {
                elements: '&',
                setup: '&',
                url: '&',
                name: '@',
                responsiveMode: '=responsive',
                filterBound: '@'
            },
            controller: listController,
            controllerAs: '$list'
        };

        function listController($scope) {
            var $list = this,
            _elements = [];

            dListService.setUrl($scope.url());

            $list.$name = $scope.name;
            $list.selected = selected;
            $list.$edit = false;
            $list.sortBy = sortBy;
            $list.$setup = angular.extend({}, dListSetup.getSetup(), $scope.setup() ? $scope.setup() : {});

            $list.$headerLabels = $list.$setup.columns && $list.$setup.columns.labels ? $list.$setup.columns.labels : {};
            $list.$sort = $list.$setup && $list.$setup.defaults ? $list.$setup.defaults.sort : {};

            $list.$pagination = new Pagination(angular.extend({}, $list.$setup.defaults.pagination, {changeCallback: _submitOnChange}));

            $list.headerIsSortable = headerIsSortable;
            $list.getHeaderLabel = getHeaderLabel;

            // INIT
            (function() {
                if ($scope.filterBound) {
                    _submitOnChange();
                } else {
                    _loadModel();
                }
            })();

            /**
             * Checks wheter a provided header key should be sortable or not
             * @param {String} header Represents the key name of the header to be checked
             * @return {Boolean}
             */
            function headerIsSortable(headerKey) {
                return !$list.$setup.columns ||
                    !$list.$setup.columns.sortables ||
                    $list.$setup.columns.sortables.indexOf(headerKey) > -1;
            }

            /**
             * [getHeaderLabel description]
             */
            function getHeaderLabel(headerKey) {
                if (!$list.$headerLabels) {
                    return headerKey;
                } else {
                    return $list.$headerLabels[headerKey] ? $list.$headerLabels[headerKey] : headerKey;
                }
            }

            function _getHeaders(element) {
                var headers = [];
                for (var key in element) {
                    if (element.hasOwnProperty(key) && key[0] !== '$') {
                        if ($list.$setup.columns) {
                            if (!$list.$setup.columns.include) {
                                // if no setup for include columns is provided, then add all keys as headers
                                headers.push(key);
                            } else {
                                // otherwise add only include keys to headers
                                if ($list.$setup.columns.include && $list.$setup.columns.include.indexOf(key) > -1) {
                                    //if header is found in the 'include' list
                                    headers.push(key);
                                }
                            }
                            //if header is found in the 'exclude' list, remove it
                            if ($list.$setup.columns.exclude && $list.$setup.columns.exclude.indexOf(key) > -1) {
                                if (headers.indexOf(key) > -1) {
                                    headers.splice(headers.indexOf(key), 1);
                                }
                            }
                        } else {
                            headers.push(key);
                        }
                    }
                }
                return headers;
            }

            function selected() {
                var total = 0;
                angular.forEach($list.$elements, function(e) {
                    if (dCheckboxesService.isChecked(e)) {
                        total++;
                    }
                });
                return total;
            }

            function sortBy(key) {
                $list.$sort.by = key;
                if ($list.$sort.order) {
                    $list.$sort.order = $list.$sort.order === 'asc' ? 'desc' : 'asc';
                } else {
                    $list.$sort.order = 'asc';
                }
                $list.$sort.order = $list.$sort.order;
                _submitOnChange();
            }

            function _loadModel(data) {
                // If data is extracted from remote url
                if ($scope.url()) {
                    var postData = angular.extend({}, data, $list.$sort, $list.$pagination);
                    dListService.getData($list.$setup.data.onSuccess, $list.$setup.data.onError, postData)
                    .then(
                        function success(response) {
                            _elements = $filter('orderBy')(response, $list.$sort.by, $list.$sort.order === 'desc');
                            _addElementsCheckboxes();
                            $list.$pagination.total = _elements.length;
                            _fillModel();
                        },
                        function error(error) {
                            console.log('The remote data for the table couldn\'t be retrieved');
                        }
                    );
                // If the data is provided as an array variable
                } else {
                    if (data) {
                        _elements = data.rows ? data.rows : data;
                        $list.$pagination.total = data.count ? data.count : _elements.length;
                    } else {
                        _elements = $scope.elements();
                        $list.$pagination.total = _elements.length;
                    }

                    _addElementsCheckboxes();
                    _fillModel();
                }
            }

            function _addElementsCheckboxes() {
                angular.forEach(_elements, function(e) {
                    angular.extend(e, {$checked: false});
                });
            }

            function _fillModel() {
                if ($scope.url()) {
                    $list.$elements = _elements.slice(
                        (($list.$pagination.page - 1) * $list.$pagination.pageSize),
                        $list.$pagination.pageSize * $list.$pagination.page);
                } else {
                    $list.$elements = _elements;
                }
            }

            function _submitOnChange(filtersModel) {
                if ($list.$setup.filters && $list.$setup.filters.onChange) {
                    $list.$setup.filters.onChange(angular.extend(
                        {},
                        filtersModel ? filtersModel : {},
                        {
                            sort: $list.$sort,
                            pagination: $list.$pagination.getPaginationData()
                        }
                    ))
                    .then(function(response) {
                        _loadModel(response);
                    });
                }
            }

            $scope.$watch(angular.bind($list, function() {
                return $list.$elements;
            }), function(n, o) {
                if (n && n[0]) {
                    $list.$headers = _getHeaders(n[0]);
                }
            });

            $scope.$on($list.$name + 'Reload', function(event, filtersModel) {
                _submitOnChange(filtersModel);
            });
        }
    }
})();
