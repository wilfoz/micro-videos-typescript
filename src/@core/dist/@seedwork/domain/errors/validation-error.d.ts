import { FieldsErrors } from '#seedwork/domain/validators/validator-fields-interface';
export declare class ValidationError extends Error {
}
export declare class EntityValidationError extends Error {
    error: FieldsErrors;
    constructor(error: FieldsErrors);
}
