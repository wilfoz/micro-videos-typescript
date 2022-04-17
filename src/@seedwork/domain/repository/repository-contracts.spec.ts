import { SearchParams } from './repository-contracts';
describe("SearchParams Test Units", ()=> {
    test("page prop", () => {
        const arrange = [
            {page: null, expected: 1},
            {page: undefined, expected: 1},
            {page: "", expected: 1},
            {page: 0, expected: 1},
            {page: "fake", expected: 1},
            {page: -1, expected: 1},
            {page: true, expected: 1},
            {page: false, expected: 1},
            {page: {}, expected: 1},
            {page: 1, expected: 1},
            {page: 2, expected: 2},
        ];

        arrange.forEach(({page, expected}) => {
            expect(new SearchParams({page: page as any}).page).toBe(expected);
        });
    });

    test("per_page prop", () => {
        const arrange = [
            {per_page: null, expected: 15},
            {per_page: undefined, expected: 15},
            {per_page: "", expected: 15},
            {per_page: 0, expected: 15},
            {per_page: "fake", expected: 15},
            {per_page: -1, expected: 15},
            {per_page: true, expected: 15},
            {per_page: false, expected: 15},
            {per_page: {}, expected: 15},
            {per_page: 1, expected: 1},
            {per_page: 20, expected: 20},
        ];

        arrange.forEach(({per_page, expected}) => {
            expect(new SearchParams({per_page: per_page as any}).per_page).toBe(expected);
        });
    });

    test("sort prop", () => {
        const arrange = [
            {sort: null, expected: null},
            {sort: undefined, expected: null},
            {sort: "", expected: null},
            {sort: "fake", expected: "fake"},
            {sort: 0, expected: "0"},
            {sort: true, expected: "true"},
            {sort: false, expected: "false"},
            {sort: {}, expected: "[object Object]"},
        ];

        arrange.forEach(({sort, expected}) => {
            expect(new SearchParams({sort: sort as any}).sort).toBe(expected);
        });
    });

    test("sort_dir prop", () => {
        let params = new SearchParams({});
        expect(params.sort_dir).toBe(null);

        params = new SearchParams({sort: null});
        expect(params.sort_dir).toBe(null);

        params = new SearchParams({sort: undefined});
        expect(params.sort_dir).toBe(null);

        params = new SearchParams({sort: ""});
        expect(params.sort_dir).toBe(null);

        const arrange = [
            {sort_dir: null, expected: "asc"},
            {sort_dir: undefined, expected: "asc"},
            {sort_dir: "", expected: "asc"},
            {sort_dir: "fake", expected: "asc"},
            {sort_dir: 0, expected: "asc"},
            {sort_dir: "asc", expected: "asc"},
            {sort_dir: "ASC", expected: "asc"},
            {sort_dir: "desc", expected: "desc"},
            {sort_dir: "DESC", expected: "desc"},
        ];

        arrange.forEach(({sort_dir, expected}) => {
            expect(new SearchParams({sort: "field", sort_dir: sort_dir as any}).sort_dir).toBe(expected);
        });
    });

    test("filter prop", () => {
        const arrange = [
            {filter: null, expected: null},
            {filter: undefined, expected: null},
            {filter: "", expected: null},
            {filter: 0, expected: "0"},
            {filter: "fake", expected: "fake"},
            {filter: true, expected: "true"},
            {filter: false, expected: "false"},
            {filter: {}, expected: "[object Object]"},
        ];

        arrange.forEach(({filter, expected}) => {
            expect(new SearchParams({filter: filter as any}).filter).toBe(expected);
        });
    });
});