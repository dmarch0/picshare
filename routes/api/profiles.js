const router = require("express").Router();
const Profile = require("../../models/Profile");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

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
router.post("/register", async (req, res) => {
  //validation
  const { errors, isValid } = await validateRegisterInput(req.body);
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

  Profile.findOne({ email: req.body.email })
    .then(user => {
      bcrypt.compare(req.body.password, user.password).then(isMatch => {
        if (isMatch) {
          const payload = {
            id: user.id,
            name: user.name,
            avatar: user.avatar,
            desc: user.desc
          };

          //Sign token
          jwt.sign(
            payload,
            keys.secretOrKey,
            { expiresIn: 3600 },
            (err, token) =>
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
    })
    .catch(err => res.json({ emailnotfound: "Email not found" }));
});

//@route POST api/profiles/description
//@desc edit profile description or avatar
//@access private
router.post(
  "/description",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findById(req.user.id)
      .then(user => {
        if (req.user.id !== user._id) {
          return res.status(401).json({ notauthorized: "User not authorized" });
        } else {
          user.desc = req.body.desc;

          // if (validateAvatarURL(req.body.avatar)) {
          //   return res
          //     .status(400)
          //     .json({ avatar: validateAvatarURL(req.body.avatar) });
          // } else {
          //   user.avatar = req.body.avatar;
          //   user
          //     .save()
          //     .then(() => res.status(200).json(user))
          //     .catch(err => console.log(err));
          // }
        }
      })
      .catch(err => console.log(err));
  }
);

//@route GET api/profiles/current
//@desct get current profile
//@access private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findById(req.user.id)
      .then(profile => res.json(profile))
      .catch(err => res.status(404).json({ notfound: "Profile not found" }));
  }
);

//@route POST api/profiles/follow/:id
//@desc follow profile
//@access private
router.post(
  "/follow/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findById(req.user.id)
      .then(profile => {
        //Check if trying to follow self
        if (profile._id.toString() === req.params.id) {
          errors.cannotfollowyourself = "Cannot follow yourself";
          return res.status(400).json(errors);
        }

        //Check if already following
        if (
          profile.follows.filter(
            follows => follows._id.toString() === req.params.id
          ).length > 0
        ) {
          errors.alreadyfollowing = "Already following";
          return res.status(400).json(errors);
        } else {
          profile.follows.push(req.params.id);
          profile
            .save()
            .then(() => res.json(profile))
            .catch(err => console.log(err));
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
);

module.exports = router;
