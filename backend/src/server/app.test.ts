import express, { Request, Response } from "express";
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
        .put('/link').send({url:'https://www.youtube.com/watch?v=OU3699R53rs'})
        .then(response => {
            let received = <Array<any>> response.body
          expect(received.pop().url).toBe('https://www.youtube.com/watch?v=OU3699R53rs')
        });
    });
  });