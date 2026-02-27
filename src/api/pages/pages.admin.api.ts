import express from 'express';
import { isAdmin } from "../_auth.ts";
import { _200, _401 } from "../_status.ts";
import { validateSessionByToken } from "../sessions/sessions.logic.ts";
import { getPage, updatePage } from "./pages.logic.ts";


export function addAdminHomePagesApi(app: express.Express) {

 
  app.put("/api/pages/:id", async (req, res) => {
    const session = await validateSessionByToken(req.headers.authorization);
    if (!session) {
      return _401(res);
    }

    if (!isAdmin(session)) {
      return _401(res);
    }

    // const page = await getPage("home");
    // if (!page) {
    //   return _401(res);
    // }

    // Update the home page content (example logic)
    // const updatedPage = { ...page, ...req.body };
    
    delete req.body.createdAt;
    delete req.body.modifiedAt;
    delete req.body._id;

    const updatedPage = await updatePage(req.params.id, req.body);

    _200(res, updatedPage);
  });
}
