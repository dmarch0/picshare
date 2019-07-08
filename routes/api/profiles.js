const router = require("express").Router();

//@rout GET api/profiles/public
//@desc test route
//@access public
router.get("/test", (req, res) => res.json({ msg: "profiles works" }));

module.exports = router;
