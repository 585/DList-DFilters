(function() {
    angular.module('d.List')
    .provider('dListSetup', dListSetupProvider);

    function dListSetupProvider() {
        this.setup = {
            enable: {
                header: true,
                footer: false,
                sorting: true,
                pagination: true,
                filters: true,
                checkboxes: true
            },
            defaults: {
                sort: {
                    order: 'asc',
                    by: 'surname'
                },
                pagination: {
                    pageSize: 10,
                    page: 1,
                    pageSizeOptions: [10, 15, 20, 50]
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
        }

        this.$get = $get;

        function $get() {
            var self = this;
            return {
                getSetup: function getSetup() {
                    return self.setup;
                }
            }
        }
    }
})();
