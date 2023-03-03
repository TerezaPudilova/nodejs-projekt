class DRLogger {

    constructor() {}

    public info = console.log;
    public warn = console.warn;
    public error = console.error;
    public fatal = console.error;
}

export const logger = new DRLogger();