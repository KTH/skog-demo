import express from "express";
import log, { initializeLogger, skogMiddleware } from "skog";
import { setTimeout } from "timers/promises";

const app = express();
// app.use(skogMiddleware);

app.get("/", async (req, res) => {
  log.info("Hello world!");
  await something();
  res.send("Hello world!");
});

async function something() {
  await setTimeout(1000);
  log.info("Something");
}

initializeLogger();
app.listen(3000);
