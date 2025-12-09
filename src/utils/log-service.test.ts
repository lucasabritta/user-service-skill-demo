import { logger, LogLevel } from './log-service';

describe('logger full coverage', () => {
    let logSpy: jest.SpyInstance;
    let warnSpy: jest.SpyInstance;
    let errorSpy: jest.SpyInstance;
    let debugSpy: jest.SpyInstance;

    beforeEach(() => {
        logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
        warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
        errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        debugSpy = jest.spyOn(console, 'debug').mockImplementation(() => {});
    });

    afterEach(() => {
        logSpy.mockRestore();
        warnSpy.mockRestore();
        errorSpy.mockRestore();
        debugSpy.mockRestore();
    });

    it('logs all levels using logger functions', () => {
        logger.info('Info level');
        logger.warn('Warn level');
        logger.error('Error level');
        logger.debug('Debug level');

        expect(logSpy).toHaveBeenCalled();
        expect(warnSpy).toHaveBeenCalled();
        expect(errorSpy).toHaveBeenCalled();
        expect(debugSpy).toHaveBeenCalled();
    });

    it('logs multiple metadata arguments', () => {
        logger.info('Message', { a: 1 }, { b: 2 });
        const args = logSpy.mock.calls[0];
        expect(args[1]).toEqual({ a: 1 });
        expect(args[2]).toEqual({ b: 2 });
    });

    it('directly tests log() function for full switch coverage', () => {
        // @ts-ignore accessing private log function
        const logFn = loggerModule['log'];

        logFn(LogLevel.INFO, 'Info direct test', 'file.ts', { a: 1 });
        logFn(LogLevel.WARN, 'Warn direct test', 'file.ts', { b: 2 });
        logFn(LogLevel.ERROR, 'Error direct test', 'file.ts', { c: 3 });
        logFn(LogLevel.DEBUG, 'Debug direct test', 'file.ts', { d: 4 });

        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('INFO'), { a: 1 });
        expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('WARN'), { b: 2 });
        expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining('ERROR'), { c: 3 });
        expect(debugSpy).toHaveBeenCalledWith(expect.stringContaining('DEBUG'), { d: 4 });
    });
});
