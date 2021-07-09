import request from 'supertest'
import app from '../src/app'
import { ddbDoc } from "../db/dynamo";

// jest.mock('../db/dynamo')
const awsSdkPromiseResponse = jest.fn().mockReturnValue(Promise.resolve(true));
ddbDoc.send = jest.fn().mockImplementation(() => ({ promise: awsSdkPromiseResponse }));

describe('User Routes', () => {
  
  describe('GET user by id', () => {
    it('should take in an id', async () => {
      const response = await request(app).get("/user/id/0").send()
      expect(response.status).toBe(200);
    });
    it('should be of content type json', async () => {
      const response = await request(app).get("/user/id/0").send()
      expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
    });
    it('should make a single database call', async () => {
      const response = await request(app).get("/user/id/0").send()
      const paramsExpected = {TableName: 'SYLPH_TABLE', Key: {kind: "user", id: 0}}
      expect(ddbDoc.send).toHaveBeenCalledTimes(1);
    })
  })

  describe('GET user by username', () => {
    it('should take in an username', async () => {
      const response = await request(app).get("/user/name/testName").send()
      expect(response.status).toBe(200);
    });
    it('should be of content type json', async () => {
      const response = await request(app).get("/user/name/testName").send()
      expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
    });
  })
  

  describe('GET all users', () => {
    it('should respond with 200 status', async () => {
      const response = await request(app).get("/user/all").send()
      expect(response.status).toBe(200);
    });
    it('should be of content type json', async () => {
      const response = await request(app).get("/user/all").send()
      expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
    });
  })

  describe('POST a user', () => {
    it('should respond with a 201 status', async () => {
        const response = await request(app).post("/user").send({})
        expect(response.status).toBe(201);
    });
      it('should be of content type json', async () => {
          const response = await request(app).post("/user").send({})
          expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
      });
  })

  describe('PUT a User', () => {
    it('should return a 200 status', async () => {
      const response = await request(app).put("/user/0").send({})
      expect(response.status).toBe(200);
    });
    it('should be of content type json', async () => {
      const response = await request(app).post("/user/0").send({})
      expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
    });
  })

  describe('DELETE a user by id', () => {
    it('should return a 200 status', async () => {
      const response = await request(app).put("/user/0").send({})
      expect(response.status).toBe(202);
    });
  })

})