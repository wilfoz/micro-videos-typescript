"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const category_output_1 = require("./category.output");
const category_1 = require("#category/domain/entities/category");
describe("CategoryOutputMapper", () => {
    it("should convert a category in output", () => {
        const created_at = new Date();
        const category = new category_1.Category({
            name: 'test',
            description: 'test',
            is_active: true,
            created_at,
        });
        const spyToJson = jest.spyOn(category, 'toJSON');
        const output = category_output_1.CategoryOutputMapper.toOutput(category);
        expect(spyToJson).toHaveBeenCalledTimes(1);
        expect(output).toStrictEqual({
            id: category.id,
            name: 'test',
            description: 'test',
            is_active: true,
            created_at,
        });
    });
});
