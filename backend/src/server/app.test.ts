import express, { Request, Response } from "express";
import {State} from './types'
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

describe.skip("The link path", () => {
    test("should response the PUT method with list that contains the link sended", () => {
      return request(app)
        .put('/link').send({url:'https://www.youtube.com/watch?v=OU3699R53rs'})
        .then(response => {
            let state = <State> response.body
          expect(state.requests.pop().url.href).toBe('https://www.youtube.com/watch?v=OU3699R53rs')
        });
    });
  });