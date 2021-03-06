export class InvalidUuidError extends Error {
    constructor(message?: string) {
        super(`Invalid UUID: ${message || 'Invalid UUID'}`);
        this.name = "InvalidUuidError";
    }
}

export default InvalidUuidError;