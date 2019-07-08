const router = require("express").Router();
const Profile = require("../../models/Profile");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Validation functions
const isEmpty = require("../../validation/isEmpty");
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

//Keys
const keys = require("../../config/keys");

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

      //Encrypt password
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

//@route POST api/profiles/login
//@desct login user
//@access public
router.post("/login", (req, res) => {
  //validation
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Profile.findOne({ email: req.body.email }).then(user => {
    bcrypt.compare(req.body.password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = {
          id: user.id,
          name: user.name,
          avatar: user.avatar,
          desc: user.desc
        };

        //Sign token
        jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) =>
          res.json({
            success: true,
            token: "Bearer " + token
          })
        );
      } else {
        errors.password = "Incorrect password";
        return res.status(400).json(errors);
      }
    });
  });
});

module.exports = router;
