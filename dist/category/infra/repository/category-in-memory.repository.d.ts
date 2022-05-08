import { InMemorySearchableRepository } from '#seedwork/domain/repository/in-memory-repository';
import { Category } from '#category/domain/entities/category';
import { CategoryRepository } from '#category/repository/category.repository';
import { SortDirection } from '#seedwork/domain/repository/repository-contracts';
export default class CategoryInMemoryRepository extends InMemorySearchableRepository<Category> implements CategoryRepository.Repository {
    sortableFields: string[];
    protected applyFilter(_items: Category[], _filter: CategoryRepository.Filter): Promise<Category[]>;
    protected applySort(_items: Category[], _sort: string, _sort_dir: SortDirection | null): Promise<Category[]>;
}
