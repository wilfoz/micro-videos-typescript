"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const category_in_memory_repository_1 = require("./category-in-memory.repository");
const category_1 = require("#category/domain/entities/category");
describe("CategoryInMemoryRepository", () => {
    let repository;
    beforeEach(() => (repository = new category_in_memory_repository_1.default()));
    it("should no filter items when filter object is null", async () => {
        const items = [new category_1.Category({ name: "test" })];
        const filterSpy = jest.spyOn(items, "filter");
        let itemsFiltered = await repository["applyFilter"](items, null);
        expect(filterSpy).not.toHaveBeenCalled();
        expect(itemsFiltered).toStrictEqual(itemsFiltered);
    });
    it("should filter items using filter parameter", async () => {
        const items = [
            new category_1.Category({ name: "test" }),
            new category_1.Category({ name: "TEST" }),
            new category_1.Category({ name: "fake" }),
        ];
        const filterSpy = jest.spyOn(items, "filter");
        let itemsFiltered = await repository["applyFilter"](items, "test");
        expect(filterSpy).toHaveBeenCalledTimes(1);
        expect(itemsFiltered).toStrictEqual([items[0], items[1]]);
    });
    it("should sort by created_at when sort param is null", async () => {
        const created_at = new Date();
        const items = [
            new category_1.Category({ name: "test", created_at }),
            new category_1.Category({ name: "fake", created_at: new Date(created_at.getTime() + 200) }),
        ];
        let itemsSorted = await repository["applySort"](items, null, null);
        expect(itemsSorted).toStrictEqual([items[1], items[0]]);
    });
    it("should sort by name", async () => {
        const items = [
            new category_1.Category({ name: "c" }),
            new category_1.Category({ name: "b" }),
            new category_1.Category({ name: "a" }),
        ];
        let itemsSorted = await repository["applySort"](items, "name", "asc");
        expect(itemsSorted).toStrictEqual([items[2], items[1], items[0]]);
        itemsSorted = await repository["applySort"](items, "name", "desc");
        expect(itemsSorted).toStrictEqual([items[0], items[1], items[2]]);
    });
});
