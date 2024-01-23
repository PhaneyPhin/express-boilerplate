export class Exception extends Error {
    public code?: number;
    public message: string;

    constructor(code: number = 0, message: string = '') {
        super(message)
        this.code = code;
    }
}