import { CategoryInMemoryRepository } from '#category/infra/repository/category-in-memory.repository';
import { Category } from '#category/domain/entities/category';
import { DeleteCategoryUseCase } from '../delete-category.use-case';
import NotFoundError from '#shared/domain/errors/not-found.error';

describe("DeleteCategoryUseCase Tests Unit", () => {
    let useCase: DeleteCategoryUseCase.UseCase;
    let repository: CategoryInMemoryRepository;

    beforeEach(() => {
        repository = new CategoryInMemoryRepository();
        useCase = new DeleteCategoryUseCase.UseCase(repository);
    });

    it("should throws error when entity not found", async () => {
        expect(() => useCase.execute({ id: "fake id" })).rejects.toThrow(
            new NotFoundError(`Entity with id fake id not found`)
        )
    });

    it("should delete a category", async () => {
        const entity = new Category({ name: 'Movie' });
        repository.items = [entity];

        await useCase.execute({ id: entity.id });
        expect(repository.items).toHaveLength(0);

    });
});