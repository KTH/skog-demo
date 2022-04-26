const { runWithSkog } = require("skog");
const { nanoid } = require("nanoid");

module.exports = function customMiddleware(req, res, next) {
  runWithSkog(
    {
      req_id: nanoid(),
      session_id: req.sessionID.slice(-3),
    },
    next
  );
};
