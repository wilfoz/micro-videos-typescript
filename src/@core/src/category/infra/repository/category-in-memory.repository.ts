import { InMemorySearchableRepository } from '#shared/domain/repository/in-memory-repository';
import { Category } from '#category/domain/entities/category';
import { CategoryRepository } from '#category/repository/category.repository';
import { SortDirection } from '#shared/domain/repository/repository-contracts';

export class CategoryInMemoryRepository
    extends InMemorySearchableRepository<Category>
    implements CategoryRepository.Repository {
    sortableFields: string[] = ["name", "created_at"];

    protected async applyFilter(
        _items: Category[],
        _filter: CategoryRepository.Filter
    ): Promise<Category[]> {
        if (!_filter) {
            return _items;
        }
        return _items.filter((i) => {
            return i.props.name.toLowerCase().includes(_filter.toLowerCase());
        });
    }

    protected async applySort(
        _items: Category[],
        _sort: string,
        _sort_dir: SortDirection | null
    ): Promise<Category[]> {
        return !_sort
            ? super.applySort(_items, "created_at", "desc")
            : super.applySort(_items, _sort, _sort_dir);
    }
}

export default CategoryInMemoryRepository;