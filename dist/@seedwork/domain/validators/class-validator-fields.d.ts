import ValidatorFieldsInterface, { FieldsErrors } from './validator-fields-interface';
export default class ClassValidatorFields<PropsValidated> implements ValidatorFieldsInterface<PropsValidated> {
    errors: FieldsErrors;
    validatedData: PropsValidated;
    validate(data: any): boolean;
}
