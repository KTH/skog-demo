import express from "express";
import log, { initializeLogger, skogMiddleware, runWithSkog } from "skog";
import { setTimeout } from "timers/promises";

const app = express();
app.use(function customMiddleware(req, res, next) {
  runWithSkog(
    {
      zone_id: req.headers.nananana,
      random_number: Math.random(),
    },
    next
  );
});
app.get("/", (req, res) => {
  log.info("Request received");
  aaa();
  res.send("Hello world");
});

function aaa() {
  log.info("Hi from aaa");
}

app.listen(3000, () => {
  aaa();
  log.info("Starting server!");
});
