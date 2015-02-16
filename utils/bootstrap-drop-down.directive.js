(function() {
    angular.module('bsDropDown', [])
    .directive('bsDropDown', bsDropDown);

    function bsDropDown() {
        return {
            restrict: 'A',
            link: bsDropDownLink
        };

        function bsDropDownLink(scope, element) {
            element.on('click', function() {
                $('.dropdown-menu').not(element.next()).hide();
                $(element).next().toggle();
            })
        }
    }
})();
