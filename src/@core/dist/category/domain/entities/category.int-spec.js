"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const category_1 = require("./category");
describe("Category Integration Tests", () => {
    describe("create method", () => {
        it("should a invalid category using name field", () => {
            expect(() => new category_1.Category({ name: null })).containsErrorMessages({
                name: [
                    'name should not be empty',
                    'name must be a string',
                    'name must be shorter than or equal to 255 characters'
                ]
            });
            expect(() => new category_1.Category({ name: "" })).containsErrorMessages({
                name: [
                    'name should not be empty',
                ]
            });
            expect(() => new category_1.Category({ name: 5 })).containsErrorMessages({
                name: [
                    'name must be a string',
                    'name must be shorter than or equal to 255 characters'
                ]
            });
            expect(() => new category_1.Category({ name: "t".repeat(256) })).containsErrorMessages({
                name: [
                    'name must be shorter than or equal to 255 characters'
                ]
            });
        });
        it("should a invalid category using description property", () => {
            expect(() => new category_1.Category({ name: "name", description: 5 })).containsErrorMessages({
                description: ['description must be a string']
            });
        });
        it("should a invalid category using is_active property", () => {
            expect(() => new category_1.Category({ name: "name", is_active: 5 })).containsErrorMessages({
                is_active: ['is_active must be a boolean value']
            });
        });
        it("should a valid category", () => {
            expect.assertions(0);
            new category_1.Category({ name: "Movie" });
            new category_1.Category({ name: "Movie", description: "some description" });
            new category_1.Category({ name: "Movie", description: null });
            new category_1.Category({
                name: "Movie",
                description: "Movie description",
                is_active: false,
            });
            new category_1.Category({
                name: "Movie",
                description: "Movie description",
                is_active: true,
            });
        });
    });
    describe("update method", () => {
        it("should a invalid category using name field", () => {
            const category = new category_1.Category({ name: "Movie" });
            expect(() => category.update(null, null)).containsErrorMessages({
                name: [
                    'name should not be empty',
                    'name must be a string',
                    'name must be shorter than or equal to 255 characters'
                ]
            });
            expect(() => category.update("", null)).containsErrorMessages({
                name: [
                    'name should not be empty',
                ]
            });
            expect(() => category.update(5, null)).containsErrorMessages({
                name: [
                    'name must be a string',
                    'name must be shorter than or equal to 255 characters'
                ]
            });
            expect(() => category.update("t".repeat(256), null)).containsErrorMessages({
                name: [
                    'name must be shorter than or equal to 255 characters'
                ]
            });
        });
        it("should a invalid category using description property", () => {
            const category = new category_1.Category({ name: "Movie" });
            expect(() => category.update("Movie", 5)).containsErrorMessages({
                description: ['description must be a string']
            });
        });
        it("should a valid category", () => {
            expect.assertions(0);
            const category = new category_1.Category({ name: "Movie" });
            category.update("name changed", null);
            category.update("name changed", "some description");
        });
    });
});
