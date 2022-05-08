"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const repository_contracts_1 = require("../repository-contracts");
describe("SearchParams Test Units", () => {
    test("page prop", () => {
        const arrange = [
            { page: null, expected: 1 },
            { page: undefined, expected: 1 },
            { page: "", expected: 1 },
            { page: 0, expected: 1 },
            { page: "fake", expected: 1 },
            { page: -1, expected: 1 },
            { page: true, expected: 1 },
            { page: false, expected: 1 },
            { page: {}, expected: 1 },
            { page: 1, expected: 1 },
            { page: 2, expected: 2 },
        ];
        arrange.forEach(({ page, expected }) => {
            expect(new repository_contracts_1.SearchParams({ page: page }).page).toBe(expected);
        });
    });
    test("per_page prop", () => {
        const arrange = [
            { per_page: null, expected: 15 },
            { per_page: undefined, expected: 15 },
            { per_page: "", expected: 15 },
            { per_page: 0, expected: 15 },
            { per_page: "fake", expected: 15 },
            { per_page: -1, expected: 15 },
            { per_page: true, expected: 15 },
            { per_page: false, expected: 15 },
            { per_page: {}, expected: 15 },
            { per_page: 1, expected: 1 },
            { per_page: 20, expected: 20 },
        ];
        arrange.forEach(({ per_page, expected }) => {
            expect(new repository_contracts_1.SearchParams({ per_page: per_page }).per_page).toBe(expected);
        });
    });
    test("sort prop", () => {
        const arrange = [
            { sort: null, expected: null },
            { sort: undefined, expected: null },
            { sort: "", expected: null },
            { sort: "fake", expected: "fake" },
            { sort: 0, expected: "0" },
            { sort: true, expected: "true" },
            { sort: false, expected: "false" },
            { sort: {}, expected: "[object Object]" },
        ];
        arrange.forEach(({ sort, expected }) => {
            expect(new repository_contracts_1.SearchParams({ sort: sort }).sort).toBe(expected);
        });
    });
    test("sort_dir prop", () => {
        let params = new repository_contracts_1.SearchParams({});
        expect(params.sort_dir).toBe(null);
        params = new repository_contracts_1.SearchParams({ sort: null });
        expect(params.sort_dir).toBe(null);
        params = new repository_contracts_1.SearchParams({ sort: undefined });
        expect(params.sort_dir).toBe(null);
        params = new repository_contracts_1.SearchParams({ sort: "" });
        expect(params.sort_dir).toBe(null);
        const arrange = [
            { sort_dir: null, expected: "asc" },
            { sort_dir: undefined, expected: "asc" },
            { sort_dir: "", expected: "asc" },
            { sort_dir: "fake", expected: "asc" },
            { sort_dir: 0, expected: "asc" },
            { sort_dir: "asc", expected: "asc" },
            { sort_dir: "ASC", expected: "asc" },
            { sort_dir: "desc", expected: "desc" },
            { sort_dir: "DESC", expected: "desc" },
        ];
        arrange.forEach(({ sort_dir, expected }) => {
            expect(new repository_contracts_1.SearchParams({ sort: "field", sort_dir: sort_dir }).sort_dir).toBe(expected);
        });
    });
    test("filter prop", () => {
        const arrange = [
            { filter: null, expected: null },
            { filter: undefined, expected: null },
            { filter: "", expected: null },
            { filter: 0, expected: "0" },
            { filter: "fake", expected: "fake" },
            { filter: true, expected: "true" },
            { filter: false, expected: "false" },
            { filter: {}, expected: "[object Object]" },
        ];
        arrange.forEach(({ filter, expected }) => {
            expect(new repository_contracts_1.SearchParams({ filter: filter }).filter).toBe(expected);
        });
    });
});
describe("SearchResult Test Units", () => {
    test("constructor props", () => {
        let result = new repository_contracts_1.SearchResult({
            items: ["entity1", "entity2"],
            total: 30,
            current_page: 1,
            per_page: 15,
            sort: null,
            sort_dir: null,
            filter: null,
        });
        expect(result.toJSON()).toStrictEqual({
            items: ["entity1", "entity2"],
            total: 30,
            current_page: 1,
            per_page: 15,
            last_page: 2,
            sort: null,
            sort_dir: null,
            filter: null,
        });
        result = new repository_contracts_1.SearchResult({
            items: ["entity1", "entity2"],
            total: 30,
            current_page: 1,
            per_page: 15,
            sort: "name",
            sort_dir: "desc",
            filter: "fake",
        });
        expect(result.toJSON()).toStrictEqual({
            items: ["entity1", "entity2"],
            total: 30,
            current_page: 1,
            per_page: 15,
            last_page: 2,
            sort: "name",
            sort_dir: "desc",
            filter: "fake",
        });
    });
    it("should set last_page = 1 when per_page field is greater than field", () => {
        const result = new repository_contracts_1.SearchResult({
            items: [],
            total: 4,
            current_page: 1,
            per_page: 15,
            sort: "name",
            sort_dir: "desc",
            filter: "fake",
        });
        expect(result.last_page).toBe(1);
    });
    test("last_page prop when total is not a multiple of per_page", () => {
        const result = new repository_contracts_1.SearchResult({
            items: [],
            total: 101,
            current_page: 1,
            per_page: 20,
            sort: "name",
            sort_dir: "desc",
            filter: "fake",
        });
        expect(result.last_page).toBe(6);
    });
});
