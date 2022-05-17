import { Entity, InMemorySearchableRepository, SearchParams, SearchResult } from "#shared/domain"

type StubEntityProps = {
    name: string,
    price: number,
}

class StubEntity extends Entity<StubEntityProps> { }

class StubInMemorySearchableRepository extends InMemorySearchableRepository<StubEntity> {
    sortableFields: string[] = ['name'];

    protected async applyFilter(items: StubEntity[], filter: string | null): Promise<StubEntity[]> {
        if (!filter) {
            return items;
        }
        return (
            items.filter(item => item.props.name.toLowerCase().includes(filter.toLowerCase())
                || item.props.price.toString() === filter)
        );

    }
}

describe('InMemorySearchableRepository Tests Units', () => {
    let repository: StubInMemorySearchableRepository;

    beforeEach(() => (repository = new StubInMemorySearchableRepository()));

    describe("applyFilter method", () => {
        it("should return all items when filter is null", async () => {
            const items = [
                new StubEntity({ name: 'item1', price: 1 }),
            ];
            const spyFilterMethod = jest.spyOn(items, 'filter' as any);
            const itemsFiltered = await repository['applyFilter'](items, null);
            expect(itemsFiltered).toStrictEqual(items);
            expect(spyFilterMethod).not.toHaveBeenCalled();
        });

        it("should return item filtered by name", async () => {
            const items = [
                new StubEntity({ name: 'item1', price: 1 }),
                new StubEntity({ name: 'item2', price: 2 }),
                new StubEntity({ name: 'item3', price: 3 }),
            ];
            const spyFilterMethod = jest.spyOn(items, 'filter' as any);
            let itemsFiltered = await repository['applyFilter'](items, 'item2');
            expect(itemsFiltered).toStrictEqual([items[1]]);
            expect(spyFilterMethod).toHaveBeenCalledTimes(1);

            itemsFiltered = await repository['applyFilter'](items, '2');
            expect(itemsFiltered).toStrictEqual([items[1]]);
            expect(spyFilterMethod).toHaveBeenCalledTimes(2);

            itemsFiltered = await repository['applyFilter'](items, 'no-filter');
            expect(itemsFiltered).toHaveLength(0);
            expect(spyFilterMethod).toHaveBeenCalledTimes(3);
        });
    });

    describe("applySort method", () => {
        it("should no sort items", async () => {
            const items = [
                new StubEntity({ name: 'a', price: 1 }),
                new StubEntity({ name: 'b', price: 2 }),
            ];

            let itemsSorted = await repository['applySort'](items, null, null);
            expect(itemsSorted).toStrictEqual(items);

            itemsSorted = await repository['applySort'](items, 'price', 'asc');
            expect(itemsSorted).toStrictEqual(items);
        });

        it("should sort items", async () => {
            const items = [
                new StubEntity({ name: 'c', price: 2 }),
                new StubEntity({ name: 'a', price: 1 }),
                new StubEntity({ name: 'b', price: 2 }),
            ];

            let itemsSorted = await repository['applySort'](items, 'name', 'asc');
            expect(itemsSorted).toStrictEqual([items[1], items[2], items[0]]);

            itemsSorted = await repository['applySort'](items, 'name', 'desc');
            expect(itemsSorted).toStrictEqual([items[0], items[2], items[1]]);
        });
    });

    describe("applyPaginate method", () => {
        it("should paginate items", async () => {
            const items = [
                new StubEntity({ name: 'a', price: 2 }),
                new StubEntity({ name: 'b', price: 1 }),
                new StubEntity({ name: 'c', price: 2 }),
                new StubEntity({ name: 'd', price: 2 }),
            ];

            let itemsPaginate = await repository['applyPaginate'](items, 1, 2);
            expect(itemsPaginate).toStrictEqual([items[0], items[1]]);

            itemsPaginate = await repository['applyPaginate'](items, 2, 2);
            expect(itemsPaginate).toStrictEqual([items[2], items[3]]);

            itemsPaginate = await repository['applyPaginate'](items, 3, 2);
            expect(itemsPaginate).toStrictEqual([]);
        });
    });

    describe("search method", () => {
        it("should apply only paginate when other params are null", async () => {
            const entity = new StubEntity({ name: 'a', price: 2 });
            const items = Array(16).fill(entity);
            repository.items = items;
            const result = await repository.search(new SearchParams());
            expect(result).toStrictEqual(new SearchResult({
                items: Array(15).fill(entity),
                total: 16,
                current_page: 1,
                per_page: 15,
                sort: null,
                sort_dir: null,
                filter: null,
            }));
        });

        it("should apply paginate and filter", async () => {
            const items = [
                new StubEntity({ name: 'test', price: 5 }),
                new StubEntity({ name: 'a', price: 5 }),
                new StubEntity({ name: 'TEST', price: 5 }),
                new StubEntity({ name: 'TesT', price: 5 }),
            ];
            repository.items = items;
            let result = await repository.search(new SearchParams({
                page: 1,
                per_page: 2,
                filter: 'TEST',
            }));
            expect(result).toStrictEqual(new SearchResult({
                items: [items[0], items[2]],
                total: 3,
                current_page: 1,
                per_page: 2,
                sort: null,
                sort_dir: null,
                filter: "TEST",
            }));

            result = await repository.search(new SearchParams({
                page: 2,
                per_page: 2,
                filter: 'TEST',
            }));
            expect(result).toStrictEqual(new SearchResult({
                items: [items[3]],
                total: 3,
                current_page: 2,
                per_page: 2,
                sort: null,
                sort_dir: null,
                filter: "TEST",
            }));
        });
    });

    it("should apply paginate and sort", async () => {
        const items = [
            new StubEntity({ name: 'b', price: 5 }),
            new StubEntity({ name: 'a', price: 5 }),
            new StubEntity({ name: 'd', price: 5 }),
            new StubEntity({ name: 'e', price: 5 }),
            new StubEntity({ name: 'c', price: 5 }),
        ];
        repository.items = items;

        const arrange = [
            {
                params: new SearchParams({ page: 1, per_page: 2, sort: 'name', sort_dir: 'asc' }),
                result: new SearchResult({
                    items: [items[1], items[0]],
                    total: 5,
                    current_page: 1,
                    per_page: 2,
                    sort: "name",
                    sort_dir: "asc",
                    filter: null,
                }),
            },
            {
                params: new SearchParams({ page: 2, per_page: 2, sort: 'name', sort_dir: 'asc' }),
                result: new SearchResult({
                    items: [items[4], items[2]],
                    total: 5,
                    current_page: 2,
                    per_page: 2,
                    sort: "name",
                    sort_dir: "asc",
                    filter: null,
                }),
            },
            {
                params: new SearchParams({ page: 1, per_page: 2, sort: 'name', sort_dir: 'desc' }),
                result: new SearchResult({
                    items: [items[3], items[2]],
                    total: 5,
                    current_page: 1,
                    per_page: 2,
                    sort: "name",
                    sort_dir: "desc",
                    filter: null,
                }),
            },
            {
                params: new SearchParams({ page: 2, per_page: 2, sort: 'name', sort_dir: 'desc' }),
                result: new SearchResult({
                    items: [items[4], items[0]],
                    total: 5,
                    current_page: 2,
                    per_page: 2,
                    sort: "name",
                    sort_dir: "desc",
                    filter: null,
                }),
            },
        ];

        for (const i of arrange) {
            const result = await repository.search(i.params);
            expect(result).toStrictEqual(i.result);
        }

    });

    it("should search using filter, sort and paginate", async () => {
        const items = [
            new StubEntity({ name: 'test', price: 5 }),
            new StubEntity({ name: 'TEST', price: 5 }),
            new StubEntity({ name: 'd', price: 5 }),
            new StubEntity({ name: 'e', price: 5 }),
            new StubEntity({ name: 'TEst', price: 5 }),
        ];
        repository.items = items;

        const arrange = [
            {
                params: new SearchParams({ page: 1, per_page: 2, sort: 'name', filter: "TEST" }),
                result: new SearchResult({
                    items: [items[1], items[4]],
                    total: 3,
                    current_page: 1,
                    per_page: 2,
                    sort: "name",
                    sort_dir: "asc",
                    filter: "TEST",
                }),
            },
            {
                params: new SearchParams({ page: 2, per_page: 2, sort: 'name', filter: "TEST" }),
                result: new SearchResult({
                    items: [items[0]],
                    total: 3,
                    current_page: 2,
                    per_page: 2,
                    sort: "name",
                    sort_dir: "asc",
                    filter: "TEST",
                }),
            },
        ];

        for (const i of arrange) {
            const result = await repository.search(i.params);
            expect(result).toStrictEqual(i.result);
        }
    });
});