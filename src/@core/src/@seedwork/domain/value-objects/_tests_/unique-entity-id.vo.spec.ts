import UniqueEntityId from '../unique-entity-id.vo';
import InvalidUuidError from '#seedwork/domain/errors/invalid-uuid.error';
import {validate as uuidValidate} from 'uuid';

describe("UniqueEntityId Test Unit", () => {

    const validadeSpy = jest.spyOn(UniqueEntityId.prototype as any, 'validate');

    it("should throw error when uuid is invalid",() => {
        expect(() => new UniqueEntityId("invalid-uuid")).toThrow(new InvalidUuidError());
        expect(validadeSpy).toHaveBeenCalled();
    });

    it("should accept a uuid passed in constructor",() => {
        const uuid = "2e569136-03f3-47d0-acb8-65fc30d5c1ac"
        const vo = new UniqueEntityId(uuid);
        expect(vo.value).toBe(uuid);
        expect(validadeSpy).toHaveBeenCalled();
    });

    it("should accept a uuid passed in constructor",() => {
        const vo = new UniqueEntityId();
        expect(uuidValidate(vo.value)).toBeTruthy();
        expect(validadeSpy).toHaveBeenCalled();
    })
})