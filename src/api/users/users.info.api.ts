import express from 'express';
import { _200, _400, _401 } from "../_status.ts";
import { validateSessionByToken } from "../sessions/sessions.logic.ts";
import { addUserBankAccount, getUserById, removeUserBankAccount, updateUser } from "./users.logic.ts";


export function addUsersInfoApi(app: express.Express) {

  app.post("/api/user/info/name", async (req, res) => {
    const session = await validateSessionByToken(req.headers.authorization);
    if (!session) {
      return _401(res);
    }

    const { firstName, lastName, gender } = req.body;

    const user = await updateUser(session.userId, { firstName, lastName, gender });

    return _200(res, Boolean(user));
  });

  app.post("/api/user/info/mobile", async (req, res) => {
    const session = await validateSessionByToken(req.headers.authorization);
    if (!session) {
      return _401(res);
    }

    const { mobile } = req.body;

    const user = await updateUser(session.userId, { phoneNumber: mobile });

    return _200(res, Boolean(user));
  });

  app.post("/api/user/info/mobile/confirm", async (req, res) => {
    const session = await validateSessionByToken(req.headers.authorization);
    if (!session) {
      return _401(res);
    }

    const { mobile, code } = req.body;

    if (code != "123456") {
      return _400(res);
    }

    const user = await updateUser(session.userId, { phoneNumber: mobile, phoneNumberConfirmed: true });

    return _200(res, Boolean(user));
  });

  app.post("/api/user/info/address", async (req, res) => {
    const session = await validateSessionByToken(req.headers.authorization);
    if (!session) {
      return _401(res);
    }

    const { provinceOfResidenceId, cityOfResidenceId, addressOfResidence, postalCodeOfResidence } = req.body;

    const user = await updateUser(session.userId, {
      addressOfResidence,
      cityOfResidenceId,
      provinceOfResidenceId,
      postalCodeOfResidence
    });

    return _200(res, Boolean(user));
  });

  app.post("/api/user/info/bank-account", async (req, res) => {
    const session = await validateSessionByToken(req.headers.authorization);
    if (!session) {
      return _401(res);
    }

    const { cardNumber, shabaNumber } = req.body;

    const user = await addUserBankAccount(session.userId, { cardNumber, shabaNumber });

    return _200(res, Boolean(user));
  });

  app.delete("/api/user/info/bank-account/:id", async (req, res) => {
    const session = await validateSessionByToken(req.headers.authorization);
    if (!session) {
      return _401(res);
    }

    if (!req.params.id) {
      return _400(res, "Bank account ID is required");
    }

    const user = await removeUserBankAccount(session.userId, req.params.id);

    return _200(res, Boolean(user));
  });

  app.post("/api/user/info/password", async (req, res) => {
    const session = await validateSessionByToken(req.headers.authorization);
    if (!session) {
      return _401(res);
    }

    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (newPassword !== confirmPassword) {
      return _400(res, "New password and confirm password do not match");
    }

    const user = await getUserById(session.userId);
    if (!user) {
      return _401(res);
    }

    const isPasswordValid = currentPassword === user.password;
    if (!isPasswordValid) {
      return _400(res, "Current password is incorrect");
    }

    const upUser = await updateUser(session.userId, { password: newPassword });

    return _200(res, Boolean(upUser));
  });
}