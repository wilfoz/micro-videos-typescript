
import { objectContaining } from 'expect';
import ClassValidatorFields from '../validators/class-validator-fields';
import { FieldsErrors } from '../validators/validator-fields-interface';
import { EntityValidationError } from '../errors/validation-error';

type Expected = {
    validator: ClassValidatorFields<any>
    data: any
} | (() => any);

expect.extend({
    containsErrorMessages(expected: Expected, received: FieldsErrors) {

        if (typeof expected === 'function') {
            try {
                expected();
                return isValid();
            } catch (e) {
                const error = e as EntityValidationError;
                return assertContainsErrorsMessages(error.error, received);
            }
        } else {
            const { validator, data } = expected;
            const validate = validator.validate(data);
            if (validate) {
                return isValid();
            }

            return assertContainsErrorsMessages(validator.errors, received);
        }
    }

});

function isValid() {
    return {
        message: () => "The data is valid!",
        pass: true
    };
};

function assertContainsErrorsMessages(expected: FieldsErrors, received: FieldsErrors) {
    const isMatch = objectContaining(received).asymmetricMatch(expected);
    return isMatch ? {
        pass: true,
        message: () => ""
    } : {
        pass: false,
        message: () => `
                The validation errors not contains ${JSON.stringify(received)}
                Current: ${JSON.stringify(expected)}`
    };
}