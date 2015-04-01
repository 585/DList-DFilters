(function() {
    angular.module('d.Helpers')
    .service('Pagination', paginationService);

    function paginationService() {

        function Pagination(object) {
            this.pageSize = object.pageSize ? object.pageSize : null;
            this.page = object.page ? object.page : null;
            this.pageSizeOptions = object.pageSizeOptions ? object.pageSizeOptions : null;
            this.total = object.total ? object.total : null;
            this.changeCallback = object.changeCallback ? object.changeCallback : null;
        }

        Pagination.prototype = {
            getPaginationData: getPaginationData,
            pageUp: pageUp,
            pageDown: pageDown,
            ensureValidPage: ensureValidPage,
            totalPages: totalPages,
            fromItem: fromItem,
            toItem: toItem,
            setPageSize: setPageSize
        };

        return Pagination;

        function getPaginationData() {
            return {
                pageSize: this.pageSize,
                page: this.page,
                pageSizeOptions: this.pageSizeOptions,
                total: this.total
            }
        }

        function pageUp() {
            if (this.page === this.totalPages()) {
                return;
            }
            this.page++;
            this.changeCallback();
        }

        function pageDown() {
            if (this.page === 1) {
                return;
            }
            this.page--;
            this.changeCallback();
        }

        function ensureValidPage() {
            if (this.page < 1) {
                this.page = 1;
            } else if (this.page > this.totalPages()) {
                this.page = this.totalPages();
            }
            this.changeCallback();
        }

        function totalPages() {
            var total = Math.round(this.total / this.pageSize);
            return total === 0 ? 1 : total;
        }

        function fromItem() {
            if ((this.page - 1) * this.pageSize === 0) {
                return 1;
            } else {
                return ((this.page - 1) * this.pageSize) + 1;
            }
        }

        function toItem() {
            if (this.page * this.pageSize > this.total) {
                return this.total;
            } else {
                return this.page * this.pageSize;
            }
        }

        function setPageSize(size) {
            this.pageSize = size;
            this.page = 1;
            this.changeCallback();
        }
    }
})();
