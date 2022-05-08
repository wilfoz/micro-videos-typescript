"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const category_in_memory_repository_1 = __importDefault(require("#category/infra/repository/category-in-memory.repository"));
const get_category_use_case_1 = __importDefault(require("../get-category.use-case"));
const not_found_error_1 = __importDefault(require("#seedwork/domain/errors/not-found.error"));
const category_1 = require("#category/domain/entities/category");
describe("GetCategoryUseCase", () => {
    let useCase;
    let repository;
    beforeEach(() => {
        repository = new category_in_memory_repository_1.default();
        useCase = new get_category_use_case_1.default(repository);
    });
    it("should throws error when entity no found", async () => {
        expect(() => useCase.execute({ id: 'fake_id' }))
            .rejects.toThrowError(new not_found_error_1.default(`Entity with id fake_id not found`));
    });
    it("should returns a category", async () => {
        const items = [
            new category_1.Category({ name: 'Movie' })
        ];
        repository.items = items;
        const spyFindById = jest.spyOn(repository, 'findById');
        const output = await useCase.execute({ id: items[0].id });
        expect(spyFindById).toHaveBeenCalledTimes(1);
        expect(output).toStrictEqual({
            id: items[0].id,
            name: 'Movie',
            description: null,
            is_active: true,
            created_at: items[0].created_at,
        });
    });
});
