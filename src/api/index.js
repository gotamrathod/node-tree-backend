const  router = require("express").Router();

router.use('/node', require("./routes/node.routes"));

module.exports = router