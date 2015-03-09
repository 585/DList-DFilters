(function() {
    angular.module('d.Helpers')
    .service('dCheckboxesService', checkboxesService);

    function checkboxesService() {
        return {
            select: select,
            unselect: unselect,
            invert: invert,
            isChecked: isChecked
        };

        function select(element) {
            element.$checked = true;
        }

        function unselect(element) {
            element.$checked = false;
        }

        function invert(element) {
            element.$checked = !element.$checked;
        }

        function isChecked(element) {
            return element.$checked;
        }
    }
})();
