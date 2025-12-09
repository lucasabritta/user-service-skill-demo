import path from 'path';

export enum LogLevel {
    INFO = 'info',
    WARN = 'warn',
    ERROR = 'error',
    DEBUG = 'debug',
}

function getCallerFile(): string {
    const orig = Error.prepareStackTrace;
    Error.prepareStackTrace = (_, stack) => stack;
    const err = new Error();
    const stack = err.stack as unknown as NodeJS.CallSite[];
    Error.prepareStackTrace = orig;

    const caller = stack[2];
    const fullPath = caller.getFileName() || 'unknown';
    return path.relative(process.cwd(), fullPath);
}

function log(level: LogLevel, message: string, ...meta: any[]) {
    const timestamp = new Date().toISOString();
    const fileLabel = `[${getCallerFile()}]`;
    const formatterMessage = `[${level.toUpperCase()}] ${fileLabel} [${timestamp}] ${message}`;

    switch (level) {
        case LogLevel.INFO:
            console.log(formatterMessage, ...meta);
            break;
        case LogLevel.WARN:
            console.warn(formatterMessage, ...meta);
            break;
        case LogLevel.ERROR:
            console.error(formatterMessage, ...meta);
            break;
        case LogLevel.DEBUG:
            console.debug(formatterMessage, ...meta);
            break;
    }
}

export const logger = {
    info: (msg: string, ...meta: any[]) => log(LogLevel.INFO, msg, ...meta),
    warn: (msg: string, ...meta: any[]) => log(LogLevel.WARN, msg, ...meta),
    error: (msg: string, ...meta: any[]) => log(LogLevel.ERROR, msg, ...meta),
    debug: (msg: string, ...meta: any[]) => log(LogLevel.DEBUG, msg, ...meta),
};
