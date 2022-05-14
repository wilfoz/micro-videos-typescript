"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const object_1 = require("./object");
describe("object Unit Tests", () => {
    it("should not freeze a scalar value", () => {
        const boolean = (0, object_1.deepFreeze)(true);
        expect(typeof boolean).toBe("boolean");
        const num = (0, object_1.deepFreeze)(5);
        expect(typeof num).toBe("number");
    });
    it("should be a immutable obj", () => {
        const obj = (0, object_1.deepFreeze)({
            prop1: "value1",
            deep: { prop2: "value2", prop3: new Date() }
        });
        expect(() => {
            obj.prop1 = "aaaa";
        }).toThrow("Cannot assign to read only property 'prop1' of object '#<Object>'");
        expect(() => {
            obj.deep.prop2 = "aaaa";
        }).toThrow("Cannot assign to read only property 'prop2' of object '#<Object>'");
        expect(obj.deep.prop3).toBeInstanceOf(Date);
    });
});
