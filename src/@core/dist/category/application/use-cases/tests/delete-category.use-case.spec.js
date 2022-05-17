"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const category_in_memory_repository_1 = require("#category/infra/repository/category-in-memory.repository");
const category_1 = require("#category/domain/entities/category");
const delete_category_use_case_1 = require("../delete-category.use-case");
const not_found_error_1 = require("#shared/domain/errors/not-found.error");
describe("DeleteCategoryUseCase Tests Unit", () => {
    let useCase;
    let repository;
    beforeEach(() => {
        repository = new category_in_memory_repository_1.CategoryInMemoryRepository();
        useCase = new delete_category_use_case_1.DeleteCategoryUseCase.UseCase(repository);
    });
    it("should throws error when entity not found", async () => {
        expect(() => useCase.execute({ id: "fake id" })).rejects.toThrow(new not_found_error_1.default(`Entity with id fake id not found`));
    });
    it("should delete a category", async () => {
        const entity = new category_1.Category({ name: 'Movie' });
        repository.items = [entity];
        await useCase.execute({ id: entity.id });
        expect(repository.items).toHaveLength(0);
    });
});
