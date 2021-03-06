const {
  initializeLogger,
  skogMiddleware,
  default: log,
  setFields,
} = require("skog");
const express = require("express");
const sessionMiddleware = require("express-session");
const path = require("path");

const handler = require("./handler");
const customMiddleware = require("./custom-middleware");

const app = express();
app.use(
  sessionMiddleware({
    name: "skog-demo",
    resave: true,
    saveUninitialized: true,
    secret: "super secret",
  })
);

app.get(
  "/skog-demo/api/no-middleware",
  function logAll(req, res, next) {
    log.info(req.headers, "HEADERS");
    next();
  },
  handler
);
app.get("/skog-demo/api/skog-middleware", skogMiddleware, handler);
app.get("/skog-demo/api/special", customMiddleware, handler);
app.use(
  "/skog-demo",
  express.static(path.join(__dirname, "../sd-frontend/dist"))
);

initializeLogger();
setFields({ app: "skog-demo" });

app.listen(3000, () => {
  log.info("Starting server");
});
