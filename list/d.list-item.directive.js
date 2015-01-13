(function() {
    angular.module('d.List')
    .directive('item', itemDirective);

    itemDirective.$inject = ['$compile'];

    function itemDirective($compile) {
        return {
            link: function(scope, element, attrs) {
                element.html(scope.template());
                $compile(element.contents())(scope);
            },
            scope: {
                template: '&',
                item: '&model'
            },
            controller: function($scope) {
                var $item = this;
                angular.extend($item, $scope.item());

            },
            controllerAs: '$item'
        };
    }
})();
