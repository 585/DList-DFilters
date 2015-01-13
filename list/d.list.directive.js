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
                name: '@'
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

            function _getHeaders(element) {
                var headers = [];
                for (var key in element) {
                    if (element.hasOwnProperty(key) && key[0] !== '$') {
                        headers.push(key);
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

            function _loadModel() {
                if ($scope.url()) {
                    var data = {
                        page: $list.$pagination.data.page,
                        pageSize: $list.$pagination.data.pageSize

                    };
                    dListService.getData($list.$setup.data.onSuccess, $list.$setup.data.onError).then(function(response) {
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
                    var params = angular.extend({}, data, $list.$sort, $list.$pagination.data);
                });

                _loadModel();

            }
        }
    })();
