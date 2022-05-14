"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const category_validator_1 = require("./category.validator");
describe("CategoryValidator Tests", () => {
    let validator;
    beforeEach(() => {
        validator = category_validator_1.default.create();
    });
    test("invalidation cases for name field", () => {
        expect({ validator, data: { name: null } }).containsErrorMessages({
            name: [
                'name should not be empty',
                'name must be a string',
                'name must be shorter than or equal to 255 characters'
            ]
        });
        expect({ validator, data: { name: "" } }).containsErrorMessages({
            name: [
                'name should not be empty',
            ]
        });
        expect({ validator, data: { name: 5 } }).containsErrorMessages({
            name: [
                'name must be a string',
                'name must be shorter than or equal to 255 characters'
            ]
        });
        expect({ validator, data: { name: "t".repeat(256) } }).containsErrorMessages({
            name: [
                'name must be shorter than or equal to 255 characters'
            ]
        });
    });
    test("valid cases for fields", () => {
        const arrange = [
            { name: "some value" },
            { name: "some value", description: undefined },
            { name: "some value", description: null },
            { name: "some value", is_active: true }
        ];
        arrange.forEach((item) => {
            let isValid = validator.validate(item);
            expect(isValid).toBeTruthy();
            expect(validator.validatedData).toStrictEqual(new category_validator_1.CategoryRules(item));
        });
    });
});
