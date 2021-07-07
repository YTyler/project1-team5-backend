import request from 'supertest'
import app from '../src/app'



describe('User Routes', () => {

  describe('POST /user', () => {
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