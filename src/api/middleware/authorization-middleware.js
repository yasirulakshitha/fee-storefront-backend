import ForbiddenError from "../../domain/errors/forbidden-error.js";

function AuthorizationMiddleware(req, res, next) {

  console.log("🟡 DEBUG auth:", req.auth);

  const role = req.auth?.sessionClaims?.metadata?.role;
  console.log("🔵 DEBUG role from sessionClaims:", role);


  if (role !== "admin") {
    throw new ForbiddenError("You are not authorized");
  }

  next();
}

export default AuthorizationMiddleware;