import CategoryInMemoryRepository from '#category/infra/repository/category-in-memory.repository';
import { ListCategoriesUseCase } from '../list-categories.use-case';
import { CategoryRepository } from '#category/repository/category.repository';
import { Category } from '#category/domain/entities/category';
describe("ListCategoryUseCase", () => {
    let useCase: ListCategoriesUseCase.UseCase;
    let repository: CategoryInMemoryRepository;

    beforeEach(() => {
        repository = new CategoryInMemoryRepository();
        useCase = new ListCategoriesUseCase.UseCase(repository);
    });

    test("toOutput method", () => {
        let result = new CategoryRepository.SearchResult({
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

        const entity = new Category({ name: 'Movie' });
        result = new CategoryRepository.SearchResult({
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
            new Category({ name: 'Movie' }),
            new Category({ name: 'Music', created_at: new Date(new Date().getTime() + 100) }),
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
            new Category({ name: 'a' }),
            new Category({ name: 'f' }),
            new Category({ name: 'AaA' }),
            new Category({ name: 'c' }),
            new Category({ name: 'AAA' }),
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