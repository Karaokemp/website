import express, { Request, Response } from "express";
import app from "./app";
import request from "supertest"

describe("Test the root path", () => {
  test("It should response the GET method", () => {
    return request(app)
      .get("/")
      .then(response => {
        expect(response.status).toBe(200);
      });
  });
});