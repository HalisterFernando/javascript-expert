import { expect, describe, test, jest, beforeEach } from '@jest/globals';
import { InjectHttpMiddleware } from './agent.js';
import { Server } from 'http';

const originalHttp = jest.createMockFromModule('http');

describe('HTTP Middleware agent', () => {
    const eventName = 'request';
    const req = null;
    beforeEach(() => jest.clearAllMocks())

    test('should not change header', () => {
        const res = {
            setHeader: jest.fn().mockReturnThis()
        }
        const serverInstance = new originalHttp.Server();
        serverInstance.emit(eventName, req, res);
        
        expect(res.setHeader).not.toHaveBeenCalled()
    });
    test('should activate header interceptor', () => {
        InjectHttpMiddleware();

        const res = {
            setHeader: jest.fn().mockReturnThis()
        }

        const serverInstance = new Server();
        serverInstance.emit(eventName, req, res);
        expect(res.setHeader).toHaveBeenCalledWith('X-Instrumented-By', 'Halister')
    });
})