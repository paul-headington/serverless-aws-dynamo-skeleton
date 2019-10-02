const { parseWith } = require('./request.util');

const mockJSON = {
  parse: (text) => null
};

describe('Request Utility', () => {
  beforeEach(() => jest.resetAllMocks());

  it('should parse the body', () => {
    const body = JSON.stringify({ id: '1', first_name: 'Jin', last_name: 'Erso', email: 'jin@space.com' });

    jest.spyOn(mockJSON, 'parse').mockReturnValue(JSON.parse(body));

    const parseJson = parseWith(mockJSON.parse);

    const expected = {
      id: '1',
      first_name: 'Jin',
      last_name: 'Erso',
      email: 'jin@space.com'
    };

    const parsed = parseJson(body);

    expect(parsed).toEqual(expected);
    expect(mockJSON.parse).toHaveBeenCalled();
  });

  it('should error if body cannot be parsed', () => {
    const body = `{"id": "1", "first_name": "Jin", "last_name": "Erso", "email": "jin@space.com"`; // bad json string
    const parseJson = parseWith(null);

    expect(() => parseJson(body)).toThrowError('parser');
  });

  it('should error if body is not defined', () => {
    const body = null;
    const parseJson = parseWith(mockJSON.parse);

    expect(() => parseJson(body)).toThrowError('text');
  });
});