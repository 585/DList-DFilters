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
            },
            // templates: {
            //     name: '<div>This is a custom template for <b>{{$item.value}}</b></div>'
            // },
            // edit: {
            //     name: {
            //         type: 'select',
            //         data: ['Olivia', 'Alex', 'Susanne', 'Winston']
            //     },
            //     surname: {
            //         type: 'select',
            //         dataUrl: 'http://api.icndb.com/jokes/random/1'
            //     }
            // },
            // columns: {
            //     include: ['name', 'surname', 'age'],
            //     exclude: ['age'],
            //     order: [],
            //     sortables: ['surname'],
            //     labels: {
            //         name: 'Name own label'
            //     }
            // }
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
