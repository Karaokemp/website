"use strict";
exports.__esModule = true;
var app_1 = require("./app");
var supertest_1 = require("supertest");
describe("The root path", function () {
    test("should response the GET method", function () {
        return supertest_1["default"](app_1["default"])
            .get("/")
            .then(function (response) {
            expect(response.status).toBe(200);
        });
    });
});
describe("The link path", function () {
    test("should response the PUT method with list that contains the link sended", function () {
        return supertest_1["default"](app_1["default"])
            .put('/link').send({ videoId: new URL('https://www.youtube.com/watch?v=OU3699R53rs').searchParams.get('v') })
            .then(function (response) {
            expect(response.status).toBe(200);
            var link = response.body.requests.pop();
            expect(link).toBe('https://www.youtube.com/watch?v=OU3699R53rs');
        });
    });
});
describe("The state path", function () {
    test("should response the GET method with the state", function () {
        return supertest_1["default"](app_1["default"])
            .get('/state')
            .then(function (response) {
            expect(response.status).toBe(200);
            var state = response.body;
            expect(state).toHaveProperty('requests');
            expect(state).toHaveProperty('readySongs');
        });
    });
});
