import UpdateCategoryUseCase from '../update-category.use-case';
import CategoryInMemoryRepository from '../../../infra/repository/category-in-memory.repository';
import NotFoundError from '../../../../@seedwork/domain/errors/not-found.error';
import { Category } from '../../../domain/entities/category';

describe("UpdateCategoryUseCase Tests Unit", () => {
    let useCase: UpdateCategoryUseCase;
    let repository: CategoryInMemoryRepository;

    beforeEach(() => {
        repository = new CategoryInMemoryRepository();
        useCase = new UpdateCategoryUseCase(repository);
    });

    it("should throws error when entity no found", async () => {
        expect(() => useCase.execute({ id: 'fake_id', name: 'fake' }))
            .rejects.toThrowError(new NotFoundError(`Entity with id fake_id not found`));
    });

    it("should update a category", async () => {
        const spyUpdate = jest.spyOn(repository, 'update');
        const entity = new Category({ name: 'Movie' });
        repository.items = [entity];
        const arrange = [
            {
                input: {
                    id: entity.id,
                    name: entity.name
                },
                expected: {
                    id: entity.id,
                    name: entity.name,
                    description: null,
                    is_active: true,
                    created_at: entity.created_at,
                }
            },
            {
                input: {
                    id: entity.id,
                    name: entity.name,
                    description: 'some description'
                },
                expected: {
                    id: entity.id,
                    name: entity.name,
                    description: 'some description',
                    is_active: true,
                    created_at: entity.created_at,
                }
            },
            {
                input: {
                    id: entity.id,
                    name: entity.name,
                    description: 'some description'
                },
                expected: {
                    id: entity.id,
                    name: entity.name,
                    description: 'some description',
                    is_active: true,
                    created_at: entity.created_at,
                }
            },
            {
                input: {
                    id: entity.id,
                    name: entity.name,
                    is_active: false,
                },
                expected: {
                    id: entity.id,
                    name: entity.name,
                    description: null,
                    is_active: false,
                    created_at: entity.created_at,
                }
            },
            {
                input: {
                    id: entity.id,
                    name: entity.name,
                    is_active: true,
                },
                expected: {
                    id: entity.id,
                    name: entity.name,
                    description: null,
                    is_active: true,
                    created_at: entity.created_at,
                }
            },
            {
                input: {
                    id: entity.id,
                    name: entity.name,
                    description: 'some description',
                    is_active: true,
                },
                expected: {
                    id: entity.id,
                    name: entity.name,
                    description: 'some description',
                    is_active: true,
                    created_at: entity.created_at,
                }
            }
        ];

        for (const item of arrange) {
            let output = await useCase.execute(item.input);
            expect(spyUpdate).toHaveBeenCalled();
            expect(output).toStrictEqual(item.expected);
        }

    });
});