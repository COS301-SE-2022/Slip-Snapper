import { destroySession } from '../../../api/Session';

describe('destroySession', () => {
    it('should expose a function', () => {
        expect(destroySession).toBeDefined();
    });

    it('destroySession should return with no logout', async () => {
        var apiResponse = {
            data: {
                message: "Some message response"
            }
        }

        await destroySession(apiResponse).then(res => {
            expect(res).toBeUndefined();
        }
        )
    });

    it('destroySession should return with server down', async () => {
        var apiResponse = {
            data: ""
        }
        await destroySession(apiResponse).then(res => {
            expect(res).toBeUndefined();
        }
        )
    });

});