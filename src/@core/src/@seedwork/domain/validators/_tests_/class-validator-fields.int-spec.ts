import ClassValidatorFields from '../class-validator-fields';
import { MaxLength, IsString, IsNotEmpty, IsOptional } from 'class-validator';

class StubRules {

    @MaxLength(255)
    @IsString()
    @IsNotEmpty()
    name: string;

    constructor(data: any) {
        Object.assign(this, data);
    }
}
class StubClassValidatorFields extends ClassValidatorFields<StubRules> {
    validate(data: any): boolean {
        return super.validate(new StubRules(data));
    }
}

describe("ClassValidatorFields Integration Tests", () => {
    it("should validate with errors", () => {
        const validator = new StubClassValidatorFields();
        expect(validator.validate(null)).toBeFalsy();
        expect(validator.errors).toStrictEqual(
            {
                name: [
                    'name should not be empty',
                    'name must be a string',
                    'name must be shorter than or equal to 255 characters'
                ]
            })
    });

    it("should be valid", () => {
        const validator = new StubClassValidatorFields();
        expect(validator.validate({ name: "some value" })).toBeTruthy();
        expect(validator.validatedData).toStrictEqual(new StubRules({ name: "some value" }));
    });
});