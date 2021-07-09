import request from 'supertest'
import app from '../src/app'

jest.mock('../db/dynamo')

describe('User Routes', () => {
  
  describe('GET a user by id', () => {
    it('should take in an id', async () => {
      const response = await request(app).get("/user/id/0").send()
      expect(response.status).toBe(200);
    });
    it('should be of content type json', async () => {
      const response = await request(app).get("/user/id/0").send()
      expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
    });
  })

  describe('GET all users', () => {
    it('should take in an id', async () => {
      const response = await request(app).get("/user/all").send()
      expect(response.status).toBe(200);
    });
    it('should be of content type json', async () => {
      const response = await request(app).get("/user/all").send()
      expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
    });
  })

  describe('Post a user', () => {
    it('should return a 201 status', async () => {
        const response = await request(app).post("/user").send({})
        expect(response.status).toBe(201);
    });
      it('should be of content type json', async () => {
          const response = await request(app).post("/user").send({})
          expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
      });
  })
  

})