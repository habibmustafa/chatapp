const { getMsg, setMsg } = require("../controllers/msgController");
const router = require("express").Router();

router.post("/getmsg", getMsg);
router.post("/setmsg", setMsg);

module.exports = router;
