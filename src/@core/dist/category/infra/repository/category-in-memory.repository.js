"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryInMemoryRepository = void 0;
const in_memory_repository_1 = require("#shared/domain/repository/in-memory-repository");
class CategoryInMemoryRepository extends in_memory_repository_1.InMemorySearchableRepository {
    constructor() {
        super(...arguments);
        this.sortableFields = ["name", "created_at"];
    }
    async applyFilter(_items, _filter) {
        if (!_filter) {
            return _items;
        }
        return _items.filter((i) => {
            return i.props.name.toLowerCase().includes(_filter.toLowerCase());
        });
    }
    async applySort(_items, _sort, _sort_dir) {
        return !_sort
            ? super.applySort(_items, "created_at", "desc")
            : super.applySort(_items, _sort, _sort_dir);
    }
}
exports.CategoryInMemoryRepository = CategoryInMemoryRepository;
exports.default = CategoryInMemoryRepository;
