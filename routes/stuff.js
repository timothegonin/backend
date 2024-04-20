const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const stuffControllers = require("../controllers/stuff");

router.post("/", auth, stuffControllers.createThing);
router.get("/", auth, stuffControllers.getAllStuff);
router.get("/:id", auth, stuffControllers.getOneThing);
router.put("/:id", auth, stuffControllers.modifyThing);
router.delete("/:id", auth, stuffControllers.deleteThing);

module.exports = router;
