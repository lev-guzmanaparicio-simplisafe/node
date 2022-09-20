const { Router } = require("express");
const { getUsuarios, putUsuarios, postUsuarios, deleteUsuarios} = require("../controllers/usuarios");

const router = Router();

router.get("/", getUsuarios);

router.put("/:id", putUsuarios );

router.post("/", postUsuarios);

router.delete("/", deleteUsuarios);

module.exports = router;
