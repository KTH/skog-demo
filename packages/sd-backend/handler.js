const { setTimeout } = require("timers/promises");
const { default: log } = require("skog");

module.exports = async function handler(req, res) {
  const delay = parseInt(req.query.delay, 10);

  log.info("= word");

  for (const letter of req.query.word) {
    log.info(letter);
    await setTimeout(isNaN(delay) ? 100 : delay);
  }

  res.send("");
};
