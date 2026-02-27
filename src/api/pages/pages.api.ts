import express from "express";
import { _200, _401 } from "../_status.ts";
import { getPage } from "./pages.logic.ts";

export function addHomePagesApi(app: express.Express) {

  app.get("/api/pages/home", async (req, res) => {
    const page = await getPage("home");

    _200(res, page);
  });
  
}
