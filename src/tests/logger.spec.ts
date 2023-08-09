import { Request, Response, NextFunction } from 'express';
import LoggerMiddleware from '../utilities/logger';

describe('LoggerMiddleware', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      method: 'GET',
      originalUrl: '/test',
      ip: '127.0.0.1'
    };
    res = {};
    next = (error?: Error | string) => {
      if (error) {
        console.error('Error:', error);
      }
    };
  });

  afterEach(() => {
    (console.log as jasmine.Spy).calls.reset(); // Reset console.log spy
  });

  it('should log request', () => {
    spyOn(console, 'log');
    LoggerMiddleware.logRequest(req as Request, res as Response, next);

    const expectedLogMessage = new RegExp(
      '\\[\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z\\] GET \\/test from 127\\.0\\.0\\.1'
    );
    expect(console.log).toHaveBeenCalledWith(
      jasmine.stringMatching(expectedLogMessage)
    );
  });

  it('should log response', () => {
    spyOn(console, 'log');
    LoggerMiddleware.logResponse(req as Request, res as Response, next);

    const expectedLogMessage = new RegExp(
      '\\[\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z\\] GET \\/test from 127\\.0\\.0\\.1'
    );
    expect(console.log).toHaveBeenCalledWith(
      jasmine.stringMatching(expectedLogMessage)
    );
  });
});
