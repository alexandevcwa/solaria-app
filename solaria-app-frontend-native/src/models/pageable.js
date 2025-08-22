export class Pageable {
    constructor(items = [], page = 1, pageSize = 10, totalItems = 0) {
        this.items = items;
        this.page = page;
        this.pageSize = pageSize;
        this.totalItems = totalItems;
    }

    get totalPages() {
        return Math.ceil(this.totalItems / this.pageSize);
    }

    setItems(items) {
        this.items = items;
    }

    setPage(page) {
        this.page = page;
    }

    setPageSize(pageSize) {
        this.pageSize = pageSize;
    }

    setTotalItems(totalItems) {
        this.totalItems = totalItems;
    }
}