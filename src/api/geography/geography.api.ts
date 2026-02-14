import express from 'express';
import { _401 } from "../_status.ts";
import { validateSessionByToken } from "../sessions/sessions.logic.ts";
import { getCities, getCitiesOfProvince, getProviences } from "./geography.logic.ts";


export function addGeographyApi(app: express.Express) {

  app.get("/api/geography/provinces", async (req, res) => {
    const session = await validateSessionByToken(req.headers.authorization);
    if (!session) {
      return _401(res);
    }

    return res.json({
      result: getProviences(),
      isError: false,
      message: "Provinces retrieved successfully"
    });
  });

  app.get("/api/geography/cities", async (req, res) => {
    const session = await validateSessionByToken(req.headers.authorization);
    if (!session) {
      return _401(res);
    }

    return res.json({
      result: getCities(),
      isError: false,
      message: "Cities retrieved successfully"
    });
  });
  app.get("/api/geography/provinces/:id/cities", async (req, res) => {
    const session = await validateSessionByToken(req.headers.authorization);
    if (!session) {
      return _401(res);
    }

    return res.json({
      result: getCitiesOfProvince(+req.params.id),
      isError: false,
      message: "Cities retrieved successfully"
    });
  });
}