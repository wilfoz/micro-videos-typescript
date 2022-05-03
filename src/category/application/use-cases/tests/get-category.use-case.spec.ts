import CategoryInMemoryRepository from '../../../infra/repository/category-in-memory.repository';
import GetCategoryUseCase from '../get-category.use-case';
import NotFoundError from '../../../../@seedwork/domain/errors/not-found.error';
import { Category } from '../../../domain/entities/category';
describe("GetCategoryUseCase", () => {
    let useCase: GetCategoryUseCase;
    let repository: CategoryInMemoryRepository;

    beforeEach(() => {
        repository = new CategoryInMemoryRepository();
        useCase = new GetCategoryUseCase(repository);
    });

    it("should throws error when entity no found", async () => {
        expect(() => useCase.execute({id: 'fake_id'}))
            .rejects.toThrowError(new NotFoundError(`Entity with id fake_id not found`)); 
    });

    it("should returns a category", async () => {
        const items = [
            new Category({name: 'Movie'})
        ];
        repository.items = items;
        const spyFindById = jest.spyOn(repository, 'findById');
        const output = await useCase.execute({id: items[0].id});

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