import express from 'express';

export function addConfigurationsApi(app: express.Express) {

  app.get("/api/_configuration", (req, res) => {
    res.json({
    });
  });
}