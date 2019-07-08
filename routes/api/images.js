const router = require("express").Router();

//@rout GET api/images/public
//@desc test route
//@access public
router.get("/test", (req, res) => res.json({ msg: "images works" }));

module.exports = router;
