import CreateCategoryUseCase from '../create-category.use-case';
import CategoryInMemoryRepository from '#category/infra/repository/category-in-memory.repository';
describe("CreateCategoryUseCase", () => {
    let useCase: CreateCategoryUseCase;
    let repository: CategoryInMemoryRepository;

    beforeEach(() => {
        repository = new CategoryInMemoryRepository();
        useCase = new CreateCategoryUseCase(repository);
    });

    it("should create a category", async () => {
        const spyInsert = jest.spyOn(repository, 'insert');
        let output = await useCase.execute({name: 'test'});
        expect(spyInsert).toHaveBeenCalledTimes(1);
        expect(output).toStrictEqual({
            id: repository.items[0].id,
            name: 'test',
            description: null,
            is_active: true,
            created_at: repository.items[0].created_at,
        });

        output = await useCase.execute({
            name: 'test',
            description: 'test', 
            is_active: false
        });
        expect(spyInsert).toHaveBeenCalledTimes(2);
        expect(output).toStrictEqual({
            id: repository.items[1].id,
            name: 'test',
            description: 'test',
            is_active: false,
            created_at: repository.items[1].created_at,
        });
    });
});