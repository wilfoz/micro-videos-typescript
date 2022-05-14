"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidUuidError = void 0;
class InvalidUuidError extends Error {
    constructor(message) {
        super(`Invalid UUID: ${message || 'Invalid UUID'}`);
        this.name = "InvalidUuidError";
    }
}
exports.InvalidUuidError = InvalidUuidError;
exports.default = InvalidUuidError;
