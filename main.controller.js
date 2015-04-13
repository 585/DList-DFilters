(function() {
    angular.module('d', ['d.Filters', 'd.Actions', 'd.List', 'd.Keyboard', 'd.Helpers', 'ngSanitize', 'bsDropDown'])
        .controller('MainController', mainController);

    mainController.$inject = [];

    function mainController() {
        var vm = this;
        vm.swpSetup = {
            enable: {
                header: true,
                footer: false,
                sorting: true,
                pagination: true,
                filters: true,
                checkboxes: true
            },
            templates: {
                homeworld: '<a href="{{$item.value}}">{{$item.value}}</a>'
            },
            columns: {
                exclude: ['films', 'species', 'vehicles', 'starships', 'created', 'edited', 'url'],
                order: [],
                sortables: ['name'],
                labels: {
                    name: 'Star Wars character name',
                    hair_color: 'Hair',
                    skin_color: 'Skin',
                    eye_color: 'Eyes',
                    birth_year: 'Born'
                }
            }
        };

        vm.starWarsPeople = [
		{
			"name": "Luke Skywalker",
			"height": "172",
			"mass": "77",
			"hair_color": "blond",
			"skin_color": "fair",
			"eye_color": "blue",
			"birth_year": "19BBY",
			"gender": "male",
			"homeworld": "http://swapi.co/api/planets/1/",
			"films": [
				"http://swapi.co/api/films/1/",
				"http://swapi.co/api/films/2/",
				"http://swapi.co/api/films/3/",
				"http://swapi.co/api/films/6/"
			],
			"species": [
				"http://swapi.co/api/species/1/"
			],
			"vehicles": [
				"http://swapi.co/api/vehicles/14/",
				"http://swapi.co/api/vehicles/30/"
			],
			"starships": [
				"http://swapi.co/api/starships/12/",
				"http://swapi.co/api/starships/22/"
			],
			"created": "2014-12-09T13:50:51.644000Z",
			"edited": "2014-12-20T21:17:56.891000Z",
			"url": "http://swapi.co/api/people/1/"
		},
		{
			"name": "C-3PO",
			"height": "167",
			"mass": "75",
			"hair_color": "n/a",
			"skin_color": "gold",
			"eye_color": "yellow",
			"birth_year": "112BBY",
			"gender": "n/a",
			"homeworld": "http://swapi.co/api/planets/1/",
			"films": [
				"http://swapi.co/api/films/1/",
				"http://swapi.co/api/films/2/",
				"http://swapi.co/api/films/3/",
				"http://swapi.co/api/films/4/",
				"http://swapi.co/api/films/5/",
				"http://swapi.co/api/films/6/"
			],
			"species": [
				"http://swapi.co/api/species/2/"
			],
			"vehicles": [],
			"starships": [],
			"created": "2014-12-10T15:10:51.357000Z",
			"edited": "2014-12-20T21:17:50.309000Z",
			"url": "http://swapi.co/api/people/2/"
		},
		{
			"name": "R2-D2",
			"height": "96",
			"mass": "32",
			"hair_color": "n/a",
			"skin_color": "white, blue",
			"eye_color": "red",
			"birth_year": "33BBY",
			"gender": "n/a",
			"homeworld": "http://swapi.co/api/planets/8/",
			"films": [
				"http://swapi.co/api/films/1/",
				"http://swapi.co/api/films/2/",
				"http://swapi.co/api/films/3/",
				"http://swapi.co/api/films/4/",
				"http://swapi.co/api/films/5/",
				"http://swapi.co/api/films/6/"
			],
			"species": [
				"http://swapi.co/api/species/2/"
			],
			"vehicles": [],
			"starships": [],
			"created": "2014-12-10T15:11:50.376000Z",
			"edited": "2014-12-20T21:17:50.311000Z",
			"url": "http://swapi.co/api/people/3/"
		},
		{
			"name": "Darth Vader",
			"height": "202",
			"mass": "136",
			"hair_color": "none",
			"skin_color": "white",
			"eye_color": "yellow",
			"birth_year": "41.9BBY",
			"gender": "male",
			"homeworld": "http://swapi.co/api/planets/1/",
			"films": [
				"http://swapi.co/api/films/1/",
				"http://swapi.co/api/films/2/",
				"http://swapi.co/api/films/3/",
				"http://swapi.co/api/films/6/"
			],
			"species": [
				"http://swapi.co/api/species/1/"
			],
			"vehicles": [],
			"starships": [
				"http://swapi.co/api/starships/13/"
			],
			"created": "2014-12-10T15:18:20.704000Z",
			"edited": "2014-12-20T21:17:50.313000Z",
			"url": "http://swapi.co/api/people/4/"
		},
		{
			"name": "Leia Organa",
			"height": "150",
			"mass": "49",
			"hair_color": "brown",
			"skin_color": "light",
			"eye_color": "brown",
			"birth_year": "19BBY",
			"gender": "female",
			"homeworld": "http://swapi.co/api/planets/2/",
			"films": [
				"http://swapi.co/api/films/1/",
				"http://swapi.co/api/films/2/",
				"http://swapi.co/api/films/3/",
				"http://swapi.co/api/films/6/"
			],
			"species": [
				"http://swapi.co/api/species/1/"
			],
			"vehicles": [
				"http://swapi.co/api/vehicles/30/"
			],
			"starships": [],
			"created": "2014-12-10T15:20:09.791000Z",
			"edited": "2014-12-20T21:17:50.315000Z",
			"url": "http://swapi.co/api/people/5/"
		},
		{
			"name": "Owen Lars",
			"height": "178",
			"mass": "120",
			"hair_color": "brown, grey",
			"skin_color": "light",
			"eye_color": "blue",
			"birth_year": "52BBY",
			"gender": "male",
			"homeworld": "http://swapi.co/api/planets/1/",
			"films": [
				"http://swapi.co/api/films/1/",
				"http://swapi.co/api/films/5/",
				"http://swapi.co/api/films/6/"
			],
			"species": [
				"http://swapi.co/api/species/1/"
			],
			"vehicles": [],
			"starships": [],
			"created": "2014-12-10T15:52:14.024000Z",
			"edited": "2014-12-20T21:17:50.317000Z",
			"url": "http://swapi.co/api/people/6/"
		},
		{
			"name": "Beru Whitesun lars",
			"height": "165",
			"mass": "75",
			"hair_color": "brown",
			"skin_color": "light",
			"eye_color": "blue",
			"birth_year": "47BBY",
			"gender": "female",
			"homeworld": "http://swapi.co/api/planets/1/",
			"films": [
				"http://swapi.co/api/films/1/",
				"http://swapi.co/api/films/5/",
				"http://swapi.co/api/films/6/"
			],
			"species": [
				"http://swapi.co/api/species/1/"
			],
			"vehicles": [],
			"starships": [],
			"created": "2014-12-10T15:53:41.121000Z",
			"edited": "2014-12-20T21:17:50.319000Z",
			"url": "http://swapi.co/api/people/7/"
		}];


        vm.swpUrl = 'http://swapi.co/api/planets';


        vm.swpSetupRemote = {
            enable: {
                header: true,
                footer: false,
                sorting: true,
                pagination: true,
                filters: true,
                checkboxes: true
            },
            templates: {
                homeworld: '<a href="{{$item.value}}">{{$item.value}}</a>'
            },
            columns: {
                exclude: ['films', 'species', 'vehicles', 'starships', 'created', 'edited', 'url'],
                order: [],
                sortables: ['name'],
                labels: {
                    name: 'Star Wars character name',
                    hair_color: 'Hair',
                    skin_color: 'Skin',
                    eye_color: 'Eyes',
                    birth_year: 'Born'
                }
            },
            data: {
                url: 'http://swapi.co/api/planets',
                dataFormat: 'POST | GET',
                prepare: function(sort, pagination) {

                },
                success: function(data) {

                },
                error: function(error) {

                }
            },

            data: {
                elements: vm.starWarsPeople
            }
        };

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
