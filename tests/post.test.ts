import request from 'supertest'
import app from '../src/app'
import { ddbDoc } from "../db/dynamo";

// jest.mock('../db/dynamo')
const awsSdkPromiseResponse = jest.fn().mockReturnValue(Promise.resolve(true));
ddbDoc.send = jest.fn().mockImplementation(() => ({ promise: awsSdkPromiseResponse }));

describe('Post Routes', () => {

    describe('GET post by id', () => {
        it('should take in an id', async () => {
            const response = await request(app).get("/post/id/0").send()
            expect(response.status).toBe(200);
        });
        it('should be of content type json', async () => {
            const response = await request(app).get("/post/id/0").send()
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
        });
        it('should make a single database call', async () => {
            const response = await request(app).get("/post/id/0").send()
            const paramsExpected = { TableName: 'SYLPH_TABLE', Key: { kind: "user", id: 0 } }
            expect(ddbDoc.send).toHaveBeenCalledTimes(1);
        })
    })

    describe('GET post by author', () => {
        it('should take in an author', async () => {
            const response = await request(app).get("/post/author/testAuthor").send()
            expect(response.status).toBe(200);
        });
        it('should be of content type json', async () => {
            const response = await request(app).get("/post/author/testAuthor").send()
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
        });
    })

    describe('POST a post', () => {
        it('should return a 201 status', async () => {
            const response = await request(app).post("/post").send({})
            expect(response.status).toBe(201);
        });
        it('should be of content type json', async () => {
            const response = await request(app).post("/post").send({})
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
        });
    })

    describe('DELETE a post by id', () => {
        it('should return a 200 status', async () => {
            const response = await request(app).put("/post/0").send({})
            expect(response.status).toBe(202);
        });
    })

})