"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const entity_1 = require("#seedwork/domain/entity/entity");
const category_validator_1 = require("#category/domain/validators/category.validator");
const validation_error_1 = require("#seedwork/domain/errors/validation-error");
class Category extends entity_1.default {
    constructor(props, id) {
        var _a, _b, _c;
        Category.validate(props);
        super(props, id);
        this.props = props;
        this.props.description = (_a = this.description) !== null && _a !== void 0 ? _a : null;
        this.props.is_active = (_b = this.is_active) !== null && _b !== void 0 ? _b : true;
        this.props.created_at = (_c = this.created_at) !== null && _c !== void 0 ? _c : new Date();
    }
    update(name, description) {
        Category.validate({ name, description });
        this.name = name;
        this.description = description;
    }
    static validate(props) {
        const validator = category_validator_1.default.create();
        const isValid = validator.validate(props);
        if (!isValid) {
            throw new validation_error_1.EntityValidationError(validator.errors);
        }
    }
    activate() {
        this.props.is_active = true;
    }
    deactivate() {
        this.props.is_active = false;
    }
    get name() {
        return this.props.name;
    }
    set name(value) {
        this.props.name = value;
    }
    get description() {
        return this.props.description;
    }
    set description(value) {
        this.props.description = value !== null && value !== void 0 ? value : null;
    }
    get is_active() {
        return this.props.is_active;
    }
    set is_active(value) {
        this.props.is_active = value;
    }
    get created_at() {
        return this.props.created_at;
    }
}
exports.Category = Category;
