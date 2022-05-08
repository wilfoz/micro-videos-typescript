"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InvalidUuidError extends Error {
    constructor(message) {
        super(`Invalid UUID: ${message || 'Invalid UUID'}`);
        this.name = "InvalidUuidError";
    }
}
exports.default = InvalidUuidError;
