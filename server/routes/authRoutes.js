const { register, login, allUsers } = require("../controllers/userController");
const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.get("/allusers", allUsers);
// router.get("/logout/:id", logOut);

module.exports = router;
