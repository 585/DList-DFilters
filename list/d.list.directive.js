(function() {
    angular.module('d.List')
    .directive('dList', listDirective);

    listDirective.$inject = ['$http', '$filter', '$compile', 'dListService', 'dCheckboxesService'];

    function listDirective($http, $filter, $compile, dListService, dCheckboxesService) {
        return {
            templateUrl: 'list.tpl.html',
            replace: true,
            transclude: true,
            scope: {
                elements: '&',
                setup: '&',
                url: '&',
                name: '@',
                responsiveMode: '=responsive'
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

            $list.$setup = $scope.setup() || {
                enable: {
                    header: true,
                    footer: true,
                    sorting: true,
                    pagination: true,
                    filters: true,
                    checkboxes: true
                },
                defaults: {
                    sort: {
                        order: 'asc',
                        by: 'name'
                    },
                    pagination: {
                        pageSize: 10,
                        page: 1
                    }
                },
                i18n: {
                    locale: 'en_US',
                    pagination: {
                        next: 'Next',
                        prev: 'Previous',
                        start: 'Start',
                        end: 'End'
                    }
                },
                data: {
                    onSuccess: function(response) {
                        return response.value;
                    },
                    onError: function(response) {
                        return response;
                    }
                }
            };

            $list.$headerLabels = $list.$setup.columns && $list.$setup.columns.labels ? $list.$setup.columns.labels : {};
            $list.$sort = $list.$setup && $list.$setup.defaults ? $list.$setup.defaults.sort : {};

            $list.$pagination = {
                data: {
                    pageSize: $list.$setup.defaults.pagination.pageSize,
                    page: $list.$setup.defaults.pagination.page,
                    total: null

                },
                pageUp: function pageUp() {
                    if (this.data.page === this.totalPages()) {
                        return;
                    }
                    this.data.page++;
                    _loadModel();
                },
                pageDown: function pageDown() {
                    if (this.data.page === 1) {
                        return;
                    }
                    this.data.page--;
                    _loadModel();
                },
                ensureValidPage: function ensureValidPage() {
                    if (this.data.page < 1) {
                        this.data.page = 1;
                    } else if (this.data.page > this.totalPages()) {
                        this.data.page = this.totalPages();
                    }
                    _loadModel();
                },
                totalPages: function totalPages() {
                    return Math.round(this.data.total / this.data.pageSize);
                },
                fromItem: function fromItem() {
                    if ((this.data.page - 1) * this.data.pageSize === 0) {
                        return 1;
                    } else {
                        return (this.data.page - 1) * this.data.pageSize;
                    }
                },
                toItem: function toItem() {
                    if (this.data.page * this.data.pageSize > this.data.total) {
                        return this.data.total;
                    } else {
                        return this.data.page * this.data.pageSize;
                    }
                }
            };

            $list.headerIsSortable = headerIsSortable;
            $list.getHeaderLabel = getHeaderLabel;

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

            function _loadModel(data) {
                if ($scope.url()) {
                    var postData = angular.extend({}, data, $list.$sort, $list.$pagination.data);
                    dListService.getData($list.$setup.data.onSuccess, $list.$setup.data.onError, postData).then(function(response) {
                        _elements = $filter('orderBy')(response, $list.$sort.by, $list.$sort.order === 'desc');
                        _addElementsCheckboxes();
                        $list.$pagination.data.total = _elements.length;
                        _fillModel();
                    });
                } else {
                    _elements = $filter('orderBy')($scope.elements(), $list.$sort.by, $list.$sort.order === 'desc');
                    _addElementsCheckboxes();
                    $list.$pagination.data.total = _elements.length;
                    _fillModel();
                }
            }

            function _addElementsCheckboxes() {
                angular.forEach(_elements, function(e) {
                    angular.extend(e, {$checked: false});
                });
            }

            function _fillModel() {
                $list.$elements = _elements.slice(
                    (($list.$pagination.data.page - 1) * $list.$pagination.data.pageSize),
                    $list.$pagination.data.pageSize * $list.$pagination.data.page);
                }

                function sortBy(key) {
                    $list.$sort.by = key;
                    if ($list.$sort.order) {
                        $list.$sort.order = $list.$sort.order === 'asc' ? 'desc' : 'asc';
                    } else {
                        $list.$sort.order = 'asc';
                    }
                    $list.$sort.order = $list.$sort.order;
                    _loadModel();
                }

                $scope.$watch(angular.bind($list, function() {
                    return $list.$elements;
                }), function(n, o) {
                    if (n && n[0]) {
                        $list.$headers = _getHeaders(n[0]);
                    }
                });

                $scope.$on($list.$name + 'Reload', function(event, data) {
                    _loadModel(data);
                });

                _loadModel();

            }
        }
    })();
