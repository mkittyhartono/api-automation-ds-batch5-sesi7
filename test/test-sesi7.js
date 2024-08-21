const request = require('supertest');
var chai = require('chai');
chai.use(require('chai-json-schema'));
const fs = require('fs');
const { log } = require('console');

const assert = chai.assert
const expect = chai.expect
const should = chai.should

describe('API Test for "Reqres.in"', () => {
    const BASE_URL = 'https://reqres.in/';

    it('Test - GET List Users',async () => {
        const response = await request(BASE_URL).get('api/users?page=2');

        assert.equal(response.statusCode, 200);
        assert.equal(response.body.page, 2);
        // console.log(response.body);
        
    });

    it('Test - POST List Users',async () => {
        const body = {
            "name": "morpheus",
            "job": "leader"
        }
        const response = await request(BASE_URL)
        .post('api/users')
        .send(body);

        should(response.statusCode === 200);
        const schemaPath = "resources/jsonSchema/post-objects-schema.json";
        const jsonSchema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
        assert.jsonSchema(response.body, jsonSchema);

        // console.log(response.body);
        
    });

    it('Test - Delete Users', async () => {
        const response = await request(BASE_URL).delete('api/users/2');

        should(response.statusCode === 200);
    });

    it('Test - PUT users', async () => {
        const body = {
            "name": "morpheus",
            "job": "zion resident"
        }
        const response = await request(BASE_URL)
            .put('api/users/2')
            .send(body);

            should(response.statusCode === 200);
    });
});