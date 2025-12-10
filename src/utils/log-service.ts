import util from 'util';
import path from 'path';

export enum LogLevel {
    INFO = 'INFO',
    WARN = 'WARN',
    ERROR = 'ERROR',
    DEBUG = 'DEBUG',
}

function getCallerFile(): string {
    const err = new Error();
    const stack = err.stack?.split('\n') || [];
    const line = stack[3] || ''; // 0=Error,1=this fn,2=log,3=caller
    const match = line.match(/\((.*):\d+:\d+\)/) || line.match(/at (.*):\d+:\d+/);
    const file = match?.[1] ?? 'unknown';
    return path.relative(process.cwd(), file);
}

function serialize(v: unknown): string {
    if (v instanceof Error) return v.stack ?? v.message;
    if (typeof v === 'string') return v;
    return util.inspect(v, { depth: null });
}

function log(level: LogLevel, ...args: unknown[]) {
    const timestamp = new Date().toISOString();
    const fileLabel = `[${getCallerFile()}]`;

    let message = '';
    let meta: unknown[] = [];

    if (args.length === 0) {
        message = '';
    } else {
        const first = args[0];
        if (typeof first === 'string') {
            message = first;
            meta = args.slice(1);
        } else {
            message = serialize(first);
            meta = args.slice(1);
        }
    }

    const line = `[${level}] ${fileLabel} [${timestamp}] ${message}`;

    const serializedMeta = meta.length ? meta.map(serialize) : [];

    switch (level) {
        case LogLevel.INFO:
            console.info(line, ...serializedMeta);
            break;
        case LogLevel.DEBUG:
            console.debug(line, ...serializedMeta);
            break;
        case LogLevel.WARN:
            console.warn(line, ...serializedMeta);
            break;
        case LogLevel.ERROR:
            console.error(line, ...serializedMeta);
            break;
    }
}

export const logger = {
    info: (...args: unknown[]) => log(LogLevel.INFO, ...args),
    warn: (...args: unknown[]) => log(LogLevel.WARN, ...args),
    error: (...args: unknown[]) => log(LogLevel.ERROR, ...args),
    debug: (...args: unknown[]) => log(LogLevel.DEBUG, ...args),
};
