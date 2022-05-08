"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const category_in_memory_repository_1 = __importDefault(require("#category/infra/repository/category-in-memory.repository"));
const list_categories_use_case_1 = __importDefault(require("../list-categories.use-case"));
const category_repository_1 = require("#category/repository/category.repository");
const category_1 = require("#category/domain/entities/category");
describe("ListCategoryUseCase", () => {
    let useCase;
    let repository;
    beforeEach(() => {
        repository = new category_in_memory_repository_1.default();
        useCase = new list_categories_use_case_1.default(repository);
    });
    test("toOutput method", () => {
        let result = new category_repository_1.CategoryRepository.SearchResult({
            items: [],
            total: 1,
            current_page: 1,
            per_page: 2,
            sort: null,
            sort_dir: null,
            filter: null,
        });
        let output = useCase['toOutput'](result);
        expect(output).toStrictEqual({
            items: [],
            total: 1,
            current_page: 1,
            per_page: 2,
            last_page: 1
        });
        const entity = new category_1.Category({ name: 'Movie' });
        result = new category_repository_1.CategoryRepository.SearchResult({
            items: [entity],
            total: 1,
            current_page: 1,
            per_page: 2,
            sort: null,
            sort_dir: null,
            filter: null,
        });
        output = useCase['toOutput'](result);
        expect(output).toStrictEqual({
            items: [entity.toJSON()],
            total: 1,
            current_page: 1,
            per_page: 2,
            last_page: 1
        });
    });
    it("should returns output using empty input with categories ordered by created_at", async () => {
        const items = [
            new category_1.Category({ name: 'Movie' }),
            new category_1.Category({ name: 'Music', created_at: new Date(new Date().getTime() + 100) }),
        ];
        repository.items = items;
        const output = await useCase.execute({});
        expect(output).toStrictEqual({
            items: [...items].reverse().map(item => item.toJSON()),
            total: 2,
            current_page: 1,
            per_page: 15,
            last_page: 1
        });
    });
    it("should returns output using pagination, sort and filter", async () => {
        const items = [
            new category_1.Category({ name: 'a' }),
            new category_1.Category({ name: 'f' }),
            new category_1.Category({ name: 'AaA' }),
            new category_1.Category({ name: 'c' }),
            new category_1.Category({ name: 'AAA' }),
        ];
        repository.items = items;
        let output = await useCase.execute({
            page: 1,
            per_page: 3,
            sort: 'name',
            filter: 'a',
        });
        expect(output).toStrictEqual({
            items: [items[4].toJSON(), items[2].toJSON(), items[0].toJSON()],
            total: 3,
            current_page: 1,
            per_page: 3,
            last_page: 1
        });
        output = await useCase.execute({
            page: 1,
            per_page: 3,
            sort: 'name',
            sort_dir: 'desc',
            filter: 'a',
        });
        expect(output).toStrictEqual({
            items: [items[0].toJSON(), items[2].toJSON(), items[4].toJSON()],
            total: 3,
            current_page: 1,
            per_page: 3,
            last_page: 1
        });
    });
});
