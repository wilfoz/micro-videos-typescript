import UniqueEntityId from './unique-entity-id.vo';
import InvalidUuidError from '../errors/invalid-uuid.error';
import {validate as uuidValidate} from 'uuid';

// function spyValidadeMethod() {
//     return jest.spyOn(UniqueEntityId.prototype as any, 'validate');
// }

describe("UniqueEntityId Test Unit", () => {

    // beforeAll(() => {
    //     jest.clearAllMocks();
    // })

    const validadeSpy = jest.spyOn(UniqueEntityId.prototype as any, 'validate');

    // beforeAll(() => {
    //     validadeSpy.mockClear();
    // });
    
    it("should throw error when uuid is invalid",() => {
        //const validadeSpy = spyValidadeMethod();
        expect(() => new UniqueEntityId("invalid-uuid")).toThrow(new InvalidUuidError());
        expect(validadeSpy).toHaveBeenCalled();
    });

    it("should accept a uuid passed in constructor",() => {
        //const validadeSpy = spyValidadeMethod();
        const uuid = "2e569136-03f3-47d0-acb8-65fc30d5c1ac"
        const vo = new UniqueEntityId(uuid);
        expect(vo.id).toBe(uuid);
        expect(validadeSpy).toHaveBeenCalled();
    });

    it("should accept a uuid passed in constructor",() => {
        //const validadeSpy = spyValidadeMethod();
        const vo = new UniqueEntityId();
        expect(uuidValidate(vo.id)).toBeTruthy();
        expect(validadeSpy).toHaveBeenCalled();
    })
})