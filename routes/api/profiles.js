const router = require("express").Router();
const Profile = require("../../models/Profile");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const axios = require("axios");

//Validation functions
const isEmpty = require("../../validation/isEmpty");
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const validator = require("validator");

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
      if (user) {
        console.log("hi");
        bcrypt.compare(req.body.password, user.password).then(isMatch => {
          if (isMatch) {
            const payload = {
              id: user.id,
              name: user.name,
              avatar: user.avatar,
              desc: user.desc,
              follows: user.follows
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
      } else {
        res.status(404).json({ usernotfound: "User not found" });
      }
    })
    .catch(err => res.json({ emailnotfound: "Email not found" }));
});

//@route POST api/profiles/edit
//@desc edit profile description or avatar
//@access private
router.post(
  "/edit",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findById(req.user.id)
      .then(async user => {
        if (req.user.id !== user.id) {
          return res.status(401).json({ notauthorized: "User not authorized" });
        } else {
          const errors = {};
          const desc = req.body.desc ? req.body.desc : "";
          if (!validator.isLength(desc, { min: 6, max: 100 })) {
            errors.desc = "Description must be between 6 and 100 characters";
          } else {
            user.desc = req.body.desc;
          }

          if (!validator.isURL(req.body.avatar)) {
            errors.avatar = "Not a valid URL";
            return res.status(400).json(errors);
          }

          try {
            //Check if image is jpeg
            const response = await axios.get(req.body.avatar);
            if (!response.headers["content-type"] === "image/jpeg") {
              errors.avatar = "Not a valid image";
              return res.status(400).json(errors);
            }
            user.avatar = req.body.avatar;
            user
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          } catch (err) {
            //If image is not available
            errors.avatar = "Image not available";
            console.log(err);
            return res.status(400).json(errors);
          }
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

//@rout GET api/profiles/:id
//@desc get profile by id
//@access private
router.get("/:id", (req, res) => {
  Profile.findById(req.params.id)
    .then(profile => res.json(profile))
    .catch(err => res.status(404).json({ notfound: "Profile not foundc" }));
});

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

//@route DELETE api/profiles/follow/:id
//@desc unfollow profile
//@access private
router.delete(
  "/follow/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findById(req.user.id)
      .then(profile => {
        //Check if trying to unfollow self
        if (profile._id.toString() === req.params.id) {
          errors.cannotfollowyourself = "Cannot unfollow yourself";
          return res.status(400).json(errors);
        }

        //Check if not yet following
        if (
          profile.follows.filter(
            follows => follows._id.toString() === req.params.id
          ).length === 0
        ) {
          errors.alreadyfollowing = "Not yet following";
          return res.status(400).json(errors);
        } else {
          const newFollows = profile.follows.filter(
            profile => profile._id.toString() !== req.params.id
          );
          profile.follows = newFollows;
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

//@route GET api/profiles/profile_images/:id
//@desc get images to display
//@access public
router.get("/profile_images/:id", (req, res) => {
  Profile.findById(req.params.id)
    .then(async profile => {
      const payload = { images: [] };
      //Find all images in profile
      for (let i = 0; i < profile.images.length; i++) {
        const image = await Image.findById(profile.images[i].image);
        payload.images.push({ url: image.imageURL, id: image.id });
      }
      res.json(payload);
    })
    .catch(err =>
      res.status(404).json({ profilenotfound: "Profile not found" })
    );
});

//@route DELETE api/profiles
//@desc detele profile
//@access private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findByIdAndDelete(req.user.id)
      .then(profile => {
        //Remove all images from images db
        for (let image of profile.images) {
          Image.findByIdAndDelete(image.image);
        }
      })
      .catch(err => console.log(err));
  }
);

module.exports = router;
