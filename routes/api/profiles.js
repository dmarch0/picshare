const router = require("express").Router();
const Profile = require("../../models/Profile");
const isEmpty = require("../../validation/isEmpty");
const validateRegisterInput = require("../../validation/register");
const bcrypt = require("bcryptjs");

//@rout GET api/profiles/public
//@desc test route
//@access public
router.get("/test", (req, res) => res.json({ msg: "profiles works" }));

//@route POST api/profiles/register
//@desct register new user
//@access public
router.post("/register", (req, res) => {
  //validation
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  console.log("passed validation");
  //Check if email already exists
  Profile.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    } else {
      const newProfile = new Profile({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        desc: req.body.desc,
        avatar: req.body.avatar
      });
      console.log("init'd new object");
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newProfile.password, salt, (err, hash) => {
          newProfile.password = hash;
          newProfile
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

module.exports = router;
