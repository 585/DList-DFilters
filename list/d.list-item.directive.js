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
                value: '&model'
            },
            controller: function($scope) {
                var $item = this;
                $item.value = $scope.value();
            },
            controllerAs: '$item'
        };
    }
})();
