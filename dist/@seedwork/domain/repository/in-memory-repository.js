"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemorySearchableRepository = exports.InMemoryRepository = void 0;
const repository_contracts_1 = require("./repository-contracts");
const not_found_error_1 = __importDefault(require("#seedwork/domain/errors/not-found.error"));
class InMemoryRepository {
    constructor() {
        this.items = [];
    }
    async insert(entity) {
        this.items.push(entity);
    }
    async findAll() {
        return this.items;
    }
    async findById(id) {
        const _id = `${id}`;
        return this._get(_id);
    }
    async update(entity) {
        await this._get(entity.id);
        const index = this.items.findIndex(i => i.id === entity.id);
        this.items[index] = entity;
    }
    async delete(id) {
        const _id = `${id}`;
        await this._get(_id);
        const index = this.items.findIndex(i => i.id === _id);
        this.items.splice(index, 1);
    }
    async _get(id) {
        const item = this.items.find(i => i.id === id);
        if (!item) {
            throw new not_found_error_1.default(`Entity with id ${id} not found`);
        }
        return item;
    }
}
exports.InMemoryRepository = InMemoryRepository;
class InMemorySearchableRepository extends InMemoryRepository {
    constructor() {
        super(...arguments);
        this.sortableFields = [];
    }
    async search(props) {
        const itemsFiltered = await this.applyFilter(this.items, props.filter);
        const itemsSorted = await this.applySort(itemsFiltered, props.sort, props.sort_dir);
        const itemsPaged = await this.applyPaginate(itemsSorted, props.page, props.per_page);
        return new repository_contracts_1.SearchResult({
            items: itemsPaged,
            total: itemsFiltered.length,
            current_page: props.page,
            per_page: props.per_page,
            sort: props.sort,
            sort_dir: props.sort_dir,
            filter: props.filter
        });
    }
    async applySort(items, sort, sort_dir) {
        if (!sort || !this.sortableFields.includes(sort)) {
            return items;
        }
        return [...items].sort((a, b) => {
            if (a.props[sort] < b.props[sort]) {
                return sort_dir === 'asc' ? -1 : 1;
            }
            if (a.props[sort] > b.props[sort]) {
                return sort_dir === 'asc' ? 1 : -1;
            }
            return 0;
        });
    }
    ;
    async applyPaginate(items, page, per_page) {
        const start = (page - 1) * per_page;
        const limit = start + per_page;
        return items.slice(start, limit);
    }
    ;
}
exports.InMemorySearchableRepository = InMemorySearchableRepository;
