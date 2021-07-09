import request from 'supertest'
import app from '../src/app'
import { ddbDoc } from "../db/dynamo";

// jest.mock('../db/dynamo')
const awsSdkPromiseResponse = jest.fn().mockReturnValue(Promise.resolve(true));
ddbDoc.send = jest.fn().mockImplementation(() => ({ promise: awsSdkPromiseResponse }));

describe('Thread Routes', () => {

    describe('GET thread by id', () => {
        it('should take in an id', async () => {
            const response = await request(app).get("/thread/id/0").send()
            expect(response.status).toBe(200);
        });
        it('should be of content type json', async () => {
            const response = await request(app).get("/thread/id/0").send()
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
        });
        it('should make a single database call', async () => {
            const response = await request(app).get("/thread/id/0").send()
            const paramsExpected = { TableName: 'SYLPH_TABLE', Key: { kind: "user", id: 0 } }
            expect(ddbDoc.send).toHaveBeenCalledTimes(1);
        })
    })

    describe('GET thread by author', () => {
        it('should take in an author', async () => {
            const response = await request(app).get("/thread/author/testAuthor").send()
            expect(response.status).toBe(200);
        });
        it('should be of content type json', async () => {
            const response = await request(app).get("/thread/author/testAuthor").send()
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
        });
    })


    describe('GET all Threads', () => {
        it('should respond with 200', async () => {
            const response = await request(app).get("/thread/all").send()
            expect(response.status).toBe(200);
        });
        it('should be of content type json', async () => {
            const response = await request(app).get("/thread/all").send()
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
        });
    })

    describe('POST a thread', () => {
        it('should return a 201 status', async () => {
            const response = await request(app).post("/thread").send({})
            expect(response.status).toBe(201);
        });
        it('should be of content type json', async () => {
            const response = await request(app).post("/thread").send({})
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
        });
    })

    describe('DELETE a thread by id', () => {
        it('should return a 200 status', async () => {
            const response = await request(app).put("/thread/0").send({})
            expect(response.status).toBe(202);
        });
    })

})