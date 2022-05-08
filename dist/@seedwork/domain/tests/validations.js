"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expect_1 = require("expect");
expect.extend({
    containsErrorMessages(expected, received) {
        if (typeof expected === 'function') {
            try {
                expected();
                return isValid();
            }
            catch (e) {
                const error = e;
                return assertContainsErrorsMessages(error.error, received);
            }
        }
        else {
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
}
;
function assertContainsErrorsMessages(expected, received) {
    const isMatch = (0, expect_1.objectContaining)(received).asymmetricMatch(expected);
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
