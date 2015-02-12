angular.module("d").run(["$templateCache", function($templateCache) {$templateCache.put("action.add-item.tpl.html","<li>\n    <a href=\"\" ng-click=\"savm.selectAll()\"><i class=\"glyphicon glyphicon-plus\"></i> Add item</a>\n</li>");
$templateCache.put("action.delete-items.tpl.html","<li>\n    <a href=\"\" ng-click=\"vm.deleteItems()\"><i class=\"glyphicon glyphicon-remove\"></i> Delete</a>\n</li>");
$templateCache.put("action.select-all.tpl.html","<li>\n    <a href=\"\" ng-click=\"savm.selectAll()\">Select All</a>\n</li>");
$templateCache.put("action.select-inverse.tpl.html","<li>\n    <a href=\"\" ng-click=\"sivm.selectInverse()\">Select Inverse</a>\n</li>");
$templateCache.put("action.select-none.tpl.html","<li>\n    <a href=\"\" ng-click=\"snvm.selectNone()\">Select None</a>\n</li>");
$templateCache.put("action-box.tpl.html","<div class=\"btn-group\">\n	<button class=\"btn btn-primary btn-{{size}} dropdown-toggle\" type=\"button\" data-toggle=\"dropdown\" aria-expanded=\"false\">\n		<span class=\"glyphicon glyphicon-{{icon}}\" aria-hidden=\"true\"></span> <span ng-bind=\"label\"></span> <span class=\"caret\"></span>\n	</button>\n	<ul class=\"dropdown-menu\" role=\"menu\" ng-transclude></ul>\n</div>\n");
$templateCache.put("filters.tpl.html","<form role=\"form\" class=\"row\">\n    <div ng-repeat=\"field in $filters.$fields\" ng-switch=\"field.type\">\n        <div class=\"form-group col-xs-{{field.size}}\" ng-switch-when=\"text\">\n            <label for=\"{{field.ngModel}}\">{{field.label}}</label>\n            <input type=\"text\" name=\"{{field.ngModel}}\" class=\"form-control\" ng-model=\"$filters.$model[field.ngModel]\" />\n        </div>\n        <div class=\"form-group col-xs-{{field.size}}\" ng-switch-when=\"select\">\n            <label for=\"{{field.ngModel}}\">{{field.label}}</label>\n            <select name=\"{{field.ngModel}}\" class=\"form-control\" ng-model=\"$filters.$model[field.ngModel]\" ng-options=\"option.key as option.value for option in field.ngOptions\">\n            </select>\n        </div>\n        <div class=\"checkbox col-xs-{{field.size}}\" ng-switch-when=\"checkbox\">\n            <label>\n                <input type=\"checkbox\" ng-model=\"$filters.$model[field.ngModel]\"/>{{field.label}}\n            </label>\n        </div>\n    </div>\n    <button class=\"btn btn-primary\" ng-click=\"$filters.submit()\">Submit</button>\n    {{$filters.$model}}\n</form>\n");
$templateCache.put("edit-input.tpl.html","<div class=\"form-group\">\n    <select ng-if=\"vm.setup.type === \'select\'\" ng-model=\"vm.editValue\" ng-options=\"option for option in vm.selectDataOptions\" class=\"form-control\">\n    </select>\n    <input ng-if=\"vm.setup.type !== \'select\'\" type=\"text\" class=\"form-control\" ng-model=\"vm.editValue\">\n</div>");
$templateCache.put("edit-mode-button.tpl.html","<span class=\"pull-right\">\n    <button class=\"btn btn-{{size}} btn-primary\" ng-if=\"!$parent.$list.$edit\" type=\"button\" ng-click=\"vm.changeEditMode()\">\n        <span class=\"glyphicon glyphicon-edit\" aria-hidden=\"true\"></span> \n        <span>Edit</span>\n    </button>\n    \n    <button class=\"btn btn-{{size}} btn-success\" ng-if=\"$parent.$list.$edit\" type=\"button\" ng-click=\"vm.saveEditData()\">\n        <span class=\"glyphicon glyphicon-floppy-saved\" aria-hidden=\"true\"></span> \n        <span>Save</span>\n    </button>\n    \n    <button class=\"btn btn-{{size}} btn-default\" ng-if=\"$parent.$list.$edit\" type=\"button\" ng-click=\"vm.cancelEditData()\">\n        <span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></span> \n        <span>Cancel</span>\n    </button>\n</span>");
$templateCache.put("list.tpl.html","<div>\n    <div ng-transclude></div>\n    <br/>\n\n    <table class=\"table table-hover\">\n        <thead ng-if=\"$list.$setup.enable.header\">\n            <tr>\n                <th ng-if=\"$list.$setup.enable.checkboxes\"></th>\n                <th ng-repeat=\"header in $list.$headers\">\n                    <a ng-if=\"$list.headerIsSortable(header)\" href=\"\" ng-click=\"$list.sortBy(header)\">{{header | capitalize}}\n                        <i ng-if=\"$list.$sort.by === header\" class=\"glyphicon\" ng-class=\"{\'glyphicon-chevron-down\': $list.$sort.order === \'desc\', \'glyphicon-chevron-up\': $list.$sort.order === \'asc\'}\" style=\"font-size: 10px; margin: 4px 0 0 4px\"></i>\n                    </a>\n                    <span ng-if=\"!$list.headerIsSortable(header)\">\n                        {{header | capitalize}}\n                    </span>\n                </th>\n            </tr>\n        </thead>\n        <tfoot ng-if=\"$list.$setup.enable.footer\"></tfoot>\n        <tbody>\n            <tr ng-repeat=\"element in $list.$elements\">\n                <td ng-if=\"$list.$setup.enable.checkboxes\">\n                    <input type=\"checkbox\" ng-model=\"element.$checked\" />\n                </td>\n                <td ng-hide=\"$list.$edit\" ng-repeat=\"header in $list.$headers\">\n                    <div ng-if=\"!$list.$setup.templates[header]\">{{element[header]}}</div>\n                    <div ng-if=\"$list.$setup.templates[header]\">\n                        <item data-template=\"$list.$setup.templates[header]\" data-model=\"element\"></item>\n                    </div>\n                </td>\n                <td ng-show=\"$list.$edit\" ng-repeat=\"header in $list.$headers\">\n                    <div class=\"form-group\">\n                        <edit-input data-value=\"element[header]\" data-setup=\"$list.$setup.edit[header]\"></edit-input>\n                    </div>\n                </td>\n            </tr>\n        </tbody>\n    </table>\n    <section ng-if=\"$list.$setup.enable.pagination\">\n        <div style=\"width: 200px\" class=\"input-group\">\n            <span ng-bind=\"$list.$setup.i18n.pagination.prev\" ng-click=\"$list.$pagination.pageDown()\" ng-disabled=\"$list.$pagination.data.page === 1\" class=\"input-group-addon btn\"></span>\n            <input type=\"text\" class=\"form-control\" ng-blur=\"$list.$pagination.ensureValidPage()\" ng-model=\"$list.$pagination.data.page\" />\n            <span ng-bind=\"$list.$setup.i18n.pagination.next\" ng-click=\"$list.$pagination.pageUp()\" ng-disabled=\"$list.$pagination.data.page === $list.$pagination.totalPages()\" class=\"input-group-addon btn\"></span>\n        </div>\n        <br />\n        <div>Showing items: {{$list.$pagination.fromItem()}} - {{$list.$pagination.toItem()}} of {{$list.$pagination.data.total}}</div>\n        <div>Selected: {{$list.selected()}}</div>\n        <div>Total pages: {{$list.$pagination.totalPages()}}</div>\n    </section>\n</div>\n");}]);