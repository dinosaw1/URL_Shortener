const jestConfig = require('../jest.config');
const { mockRequest, mockResponse } = require('jest-mock-req-res')
const testdb = require("./testDb");

const urlShortener = require('../app/controllers/urlShortener.controller');

describe('Test API methods', () => {
  let mockReq;
  let mockRes;

  beforeAll(async () => {
    await testdb.connect();
  });

  afterAll(async () => {
    await testdb.closeDatabase();
  });

  afterEach(async() => {
    await testdb.clearDatabase();
  });

  beforeEach(() => {
    mockReq = new mockRequest();
    mockRes = new mockResponse();
  });

  it('create - should return status 400 and empty Long URL message on empty url', async () => {
    const expectedResponse = {
      message: "Long URL is empty"
    }
    mockReq={};

    urlShortener.create(mockReq, mockRes);
    expect(mockRes.status).toBeCalledWith(400);
    expect(mockRes.send).toBeCalledWith(expectedResponse);
  });
  

  it('create - should return status 400 and invalid message on invalid url', async () => {
    const expectedResponse = {
      message: "Invalid URL"
    }
    mockReq={body:{longURL:"abc.ab"}};

    urlShortener.create(mockReq, mockRes);
    expect(mockRes.status).toBeCalledWith(400);
    expect(mockRes.send).toBeCalledWith(expectedResponse);
  });

  it('create - should return insert data to DB and return new shortURL on new longURL', async () => {
    mockReq={body:{longURL:"http://google.com"}};

    await urlShortener.create(mockReq, mockRes);
    expect(mockRes.send).toBeCalledWith(expect.objectContaining({
      shortURL: expect.any(String)}));
  });

  it('retrieveAll - should return no data found', async () => {
    const expectedResponse = {
      message: "No data found."
    }
    await urlShortener.retrieveAll(mockReq, mockRes);
    expect(mockRes.status).toBeCalledWith(404);
    expect(mockRes.send).toBeCalledWith(expectedResponse);

  });

  it('retrieveAll - should return all data in database', async () => {
    mockReq={body:{longURL:"http://google.com"}};
    await urlShortener.create(mockReq, mockRes);

    await urlShortener.retrieveAll(mockReq, mockRes);
    expect(mockRes.send).toBeCalledWith(expect.any(Array));
  });

  it('searchByShortURL - should return short URL not found', async () => {
    mockReq={query:{shortURL:"abcde"}};

    const expectedResponse = {
      message: "Short URL not found: abcde"
    }
    await urlShortener.searchByShortURL(mockReq, mockRes);
    expect(mockRes.status).toBeCalledWith(404);
    expect(mockRes.send).toBeCalledWith(expectedResponse);
  });

  it('searchByShortURL - should return long URL', async () => {
    mockReq={body:{longURL:"http://google.com"}};
    await urlShortener.create(mockReq, mockRes);
    
    mockReq={query:{shortURL:mockRes.send.mock.calls[0][0].shortURL}};
    mockRes = new mockResponse();
    
    await urlShortener.searchByShortURL(mockReq, mockRes);
    expect(mockRes.send.mock.calls[0][0]._doc.longUrl).toBe("http://google.com");

  });

});

// Test without database connection to simulate connection issue.
describe('Test API try catch error', () => {
  let mockReq;
  let mockRes;
  
  beforeEach(() => {
    mockReq = new mockRequest();
    mockRes = new mockResponse();
  });

  it('create - should return status 500 on error', async () => {
    mockReq={body:{longURL:"http://google.com"}};

    await urlShortener.create(mockReq, mockRes);
    expect(mockRes.status).toBeCalledWith(500);
  });

  it('retrieveAll - should return status 500 on error', async () => {

    await urlShortener.retrieveAll(mockReq, mockRes);
    expect(mockRes.status).toBeCalledWith(500);
  });

  it('searchByShortURL - should return status 500 on error', async () => {
    mockReq={query:{shortURL:"abcde"}};

    await urlShortener.searchByShortURL(mockReq, mockRes);
    expect(mockRes.status).toBeCalledWith(500);
  });
});
