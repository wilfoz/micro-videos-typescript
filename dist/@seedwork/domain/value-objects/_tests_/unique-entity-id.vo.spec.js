"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const unique_entity_id_vo_1 = __importDefault(require("../unique-entity-id.vo"));
const invalid_uuid_error_1 = __importDefault(require("#seedwork/domain/errors/invalid-uuid.error"));
const uuid_1 = require("uuid");
describe("UniqueEntityId Test Unit", () => {
    const validadeSpy = jest.spyOn(unique_entity_id_vo_1.default.prototype, 'validate');
    it("should throw error when uuid is invalid", () => {
        expect(() => new unique_entity_id_vo_1.default("invalid-uuid")).toThrow(new invalid_uuid_error_1.default());
        expect(validadeSpy).toHaveBeenCalled();
    });
    it("should accept a uuid passed in constructor", () => {
        const uuid = "2e569136-03f3-47d0-acb8-65fc30d5c1ac";
        const vo = new unique_entity_id_vo_1.default(uuid);
        expect(vo.value).toBe(uuid);
        expect(validadeSpy).toHaveBeenCalled();
    });
    it("should accept a uuid passed in constructor", () => {
        const vo = new unique_entity_id_vo_1.default();
        expect((0, uuid_1.validate)(vo.value)).toBeTruthy();
        expect(validadeSpy).toHaveBeenCalled();
    });
});
