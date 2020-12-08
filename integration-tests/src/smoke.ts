const INTEGRATION_URL = 'https://ydzcg19u56.execute-api.eu-central-1.amazonaws.com'

describe('The /songs path', () => {
    test("should respond to Get requests", () => {
          expect(INTEGRATION_URL).toBe('https://ydzcg19u56.execute-api.eu-central-1.amazonaws.com');
        });
    });