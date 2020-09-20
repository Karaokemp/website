import express, { Request, Response } from "express";
import {State} from '../types'
import app from "./app";
import request from "supertest"

describe("The root path", () => {
  test("should response the GET method", () => {
    return request(app)
      .get("/")
      .then(response => {
        expect(response.status).toBe(200);
      });
  });
});

describe("The link path", () => {
    test("should response the PUT method with list that contains the link sended", () => {
      return request(app)
        .put('/link').send({path:new URL('https://www.youtube.com/watch?v=OU3699R53rs').href})
        .then(response => {
          expect(response.status).toBe(200)
          let link = <URL> response.body.requests.pop()
            expect(link).toBe('https://www.youtube.com/watch?v=OU3699R53rs')
        });
    });
  });

  describe("The state path", () => {
    test("should response the GET method with the state", () => {
      return request(app)
        .get('/state')
        .then(response => {
          expect(response.status).toBe(200)
          let state = <State> response.body
            expect(state).toHaveProperty('requests')
            expect(state).toHaveProperty('readySongs')
        });
    });
  });