"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const category_in_memory_repository_1 = __importDefault(require("#category/infra/repository/category-in-memory.repository"));
const category_1 = require("#category/domain/entities/category");
const delete_category_use_case_1 = __importDefault(require("../delete-category.use-case"));
const not_found_error_1 = __importDefault(require("#seedwork/domain/errors/not-found.error"));
describe("DeleteCategoryUseCase Tests Unit", () => {
    let useCase;
    let repository;
    beforeEach(() => {
        repository = new category_in_memory_repository_1.default();
        useCase = new delete_category_use_case_1.default(repository);
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
