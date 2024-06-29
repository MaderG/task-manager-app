import jwt from "jsonwebtoken";
import AuthenticationTokenInvalid from "../errors/AuthenticationTokenInvalid.js";
import AuthenticationTokenMissing from "../errors/AuthenticationTokenMissing.js";

export default async function authMiddleware(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new AuthenticationTokenMissing("Token missing", 401);
  }


  const token = authorization.replace("Bearer ", "");

  try {
    const webtoken = jwt.verify(token, process.env.JWT_SECRET);

    req.user = webtoken.user;

    next();
  } catch (err) {
    throw new AuthenticationTokenInvalid("Invalid Token", 401);
  }
}
