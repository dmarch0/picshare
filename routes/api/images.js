const router = require("express").Router();
const passport = require("passport");
const Profile = require("../../models/Profile");
const Image = require("../../models/Image");
const axios = require("axios");
const validator = require("validator");
const isEmpty = require("../../validation/isEmpty");

//@rout GET api/images/test
//@desc test route
//@access public
router.get("/test", (req, res) => res.json({ msg: "images works" }));

//@rout GET api/images/:id
//@desc get image by id
//@access public
router.get("/:id", (req, res) => {
  Image.findById(req.params.id)
    .then(image => {
      res.json(image);
    })
    .catch(err => res.status(404).json({ imagenotfound: "Image not found" }));
});

//@rout POST api/images/new
//@desc add new image
//@access private
router.post(
  "/new",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    //Validate input
    const errors = {};
    if (!validator.isURL(req.body.imageURL)) {
      errors.image = "Not a valid url";
      return res.status(400).json(errors);
    }
    try {
      const response = await axios.get(req.body.imageURL);
      if (response.headers["content-type"] === "image/jpeg") {
        const newImage = new Image({
          imageURL: req.body.imageURL,
          author: req.user.id
        });
        newImage
          .save()
          .then(image => {
            Profile.findById(req.user.id).then(profile => {
              profile.images.push({ image: image._id });
              profile
                .save()
                .then(profile => {
                  res.json({ image: image, profile: profile });
                })
                .catch(err => console.log(err));
            });
          })
          .catch(err => console.log(err));
      } else {
        const errors = {};
        errors.image = "Not a valid image";
        return res.status(400).json(errors);
      }
    } catch (err) {
      errors.image = "Image not found";
      return res.status(400).json(errors);
    }
  }
);

//@rout POST api/images/delete
//@desc delete image
//@access private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Image.findById(req.params.id)
      .then(image => {
        if (image.author.toString() !== req.user.id) {
          const errors = { notauthorized: "User not authorized" };
          res.status(401).json(errors);
        } else {
          Image.findByIdAndDelete(req.params.id).then(() => {
            Profile.findById(req.user.id).then(profile => {
              const newImages = profile.images.filter(
                image => image.image.toString() !== req.params.id
              );
              profile.images = newImages;
              profile.save().then(profile => res.json(profile));
            });
          });
        }
      })
      .catch(err => {
        const errors = { imagenotfound: "Image not found" };
        res.status(404).json(errors);
      });
  }
);

//@rout POST api/images/like/:id
//@desc Like image
//@access private
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Image.findById(req.params.id)
      .then(image => {
        if (
          image.likes.filter(like => like.profile.toString() === req.user.id)
            .length > 0
        ) {
          return res
            .status(400)
            .json({ alreadyliked: "User already liked this post" });
        } else {
          image.likes.push({ profile: req.user.id });
          image
            .save()
            .then(image => res.json(image))
            .catch(err => console.log(err));
        }
      })
      .catch(err => {
        res.status(404).json({ imagenotfound: "Image not found" });
      });
  }
);

//@rout DELETE api/images/like/:id
//@desc Unlike image
//@access private
router.delete(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Image.findById(req.params.id)
      .then(image => {
        if (
          image.likes.filter(like => like.profile.toString() === req.user.id)
            .length > 0
        ) {
          const newLikes = image.likes.filter(
            like => like.profile.toString() !== req.user.id
          );
          image.likes = newLikes;
          image
            .save()
            .then(image => res.json(image))
            .catch(err => console.log(err));
        } else {
          return res.status(400).json({
            notyetlikedthisimage:
              "You have to like image first to be able to unlike it"
          });
        }
      })
      .catch(err => {
        res.status(404).json({ imagenotfound: "Image not found" });
      });
  }
);

//@rout POST api/images/comment/:id
//@desc Comment image
//@access private
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    if (isEmpty(req.body.text)) {
      errors.text = "Text required";
      return res.status(400).json(errors);
    }
    Image.findById(req.params.id)
      .then(image => {
        const newComment = {
          text: req.body.text,
          profile: req.user.id,
          avatar: req.user.avatar,
          name: req.user.name
        };
        image.comments.push(newComment);
        image
          .save()
          .then(image => res.json(image))
          .catch(err => console.log(err));
      })
      .catch(err => {
        res.status(404).json({ imagenotfound: "Image not found" });
      });
  }
);

//@rout DELETE api/images/comment/:id/:comment_id
//@desc Delete comment
//@access private
router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Image.findById(req.params.id)
      .then(image => {
        if (
          image.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res.status(404).json({ commentnotfound: "Comment not found" });
        } else if (
          image.comments.find(
            comment => comment.profile.toString() !== req.user.id
          )
        ) {
          return res
            .status(401)
            .json({ usernotauthorized: "User not authorized" });
        } else {
          newComments = image.comments.filter(
            comment => comment._id.toString() !== req.params.comment_id
          );
          image.comments = newComments;
          image
            .save()
            .then(image => res.json(image))
            .catch(err => console.log(err));
        }
      })
      .catch(err => res.status(404).json({ imagenotfound: "Image not found" }));
  }
);

//@rout GET api/images/feed/getfeed
//@desc Get feed
//@access private
router.get(
  "/feed/getfeed",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findById(req.user.id)
      .then(async profile => {
        const images = { images: [] };
        const queryImages = [];
        for (let follow of profile.follows) {
          const profile = await Profile.findById(follow._id);
          for (let image of profile.images) {
            const currentImage = await Image.findById(image.image);
            queryImages.push({
              imageURL: currentImage.imageURL,
              id: currentImage._id,
              date: currentImage.date,
              name: profile.name,
              avatar: profile.avatar,
              profile: profile._id
            });
          }
        }

        queryImages.sort((imageA, imageB) => {
          if (imageA.date < imageB.date) {
            return 1;
          }
          if (imageA.date > imageB.date) {
            return -1;
          }
          return 0;
        });

        let spliceIndexStart = Number(req.query.page) * 10;
        let spliceIndexFinish = Math.min(
          spliceIndexStart + 10,
          queryImages.length
        );
        images.images = queryImages.slice(spliceIndexStart, spliceIndexFinish);
        if (images.images.length === 0) {
          return res.status(404).json({ imagesnotfound: "Images not found" });
        }
        return res.json(images);
      })
      .catch(err => console.log(err));
  }
);

module.exports = router;
