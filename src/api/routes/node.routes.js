const nodeController = require("../controllers/node.controllers");

const router = require("express").Router();

router.post("/", nodeController.insertNode);
router.get("/", nodeController.getAllNode);
router.delete("/:id", nodeController.deleteNodeById);

module.exports = router;