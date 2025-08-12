const router = require("express").Router()
const tagRouter = require("./tags");

router.use("/", tagRouter);

module.exports = router;