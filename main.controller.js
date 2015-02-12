(function() {
    angular.module('d')
        .controller('MainController', mainController);

    mainController.$inject = [];

    function mainController() {
        var vm = this;
        vm.url = 'http://api.icndb.com/jokes/random/38';
        vm.els = [];
        vm.setup = {
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
                    pageSize: 2,
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
            templates: {
                name: '<div>This is a custom template for <b>{{$item.name}}</b></div>'
            },
            edit: {
                name: {
                    type: 'select',
                    data: ['Olivia', 'Alex', 'Susanne', 'Winston']
                },
                surname: {
                    type: 'select',
                    dataUrl: 'http://api.icndb.com/jokes/random/1'
                }
            },
            columns: {
                include: ['name', 'surname'],
                order: [],
                sortables: ['surname']
            }
        };

        vm.elements = [{
            id: 1,
            name: 'Olivia',
            surname: 'Newton',
            age: 32
        }, {
            id: 2,
            name: 'Oliver',
            surname: 'Night',
            age: 12
        }, {
            id: 3,
            name: 'Felicia',
            surname: 'Low',
            age: 43
        }, {
            id: 4,
            name: 'Alex',
            surname: 'Night'
        }, {
            id: 5,
            name: 'Martin',
            surname: 'Fair',
            age: 54
        }];

        vm.fields = [{
            type: 'text',
            label: 'Name',
            ngModel: 'name'
        }, {
            type: 'select',
            label: 'Sex',
            ngModel: 'sex',
            ngOptions: [{
                key: 'male',
                value: 'Male'
            }, {
                key: 'female',
                value: 'Female'
            }]
        }, {
            type: 'checkbox',
            label: 'Single?',
            ngModel: 'single'
        }];
    }
})();
