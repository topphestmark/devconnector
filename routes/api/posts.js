const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const auth = require("../../middleware/auth")();
const validatePostInput = require("../../validation/post");

const Post = require("../../models/Post");
const Profile = require("../../models/Profile");

router.get("/test", (req, res) => res.json({ msg: "Posts api route." }));

// @ GET api/posts - Get post - Public
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then((posts) => res.json(posts))
    .catch((err) => res.status(404).json({ nopostfound: "No post foun." }));
});

// @ GET api/posts/:id - Get post by ID - Public
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then((post) => res.json(post))
    .catch((err) =>
      res
        .status(404)
        .json({ nopostfound: "No post found with the applied ID." })
    );
});

// @ POST api/posts - Create post - Private
router.post("/", auth, (req, res) => {
  const { errors, isValid } = validatePostInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const newPost = new Post({
    text: req.body.text,
    name: req.body.name,
    avatar: req.body.avatar,
    user: req.user.id,
  });

  newPost
    .save()
    .then((post) => res.json(post))
    .catch((err) => console.log(err));
});

// @ DELETE api/posts/:id - Delete post - Private
router.delete("/:id", auth, (req, res) => {
  Profile.findOne({ user: req.user.id }).then((profile) => {
    Post.findById(req.params.id)
      .then((post) => {
        if (post.user.toString() !== req.user.id) {
          return res
            .status(401)
            .json({ notauthorized: "User not authorized." });
        }

        post.remove().then(() => res.json({ success: true }));
      })
      .catch((err) => res.status(404).json({ postnotfound: "No post found." }));
  });
});

// @ POST api/posts/like/:id - Like post - Private
router.post("/like/:id", auth, (req, res) => {
  Profile.findOne({ user: req.user.id }).then((profile) => {
    Post.findById(req.params.id)
      .then((post) => {
        const isLiked = post.likes.filter(
          (like) => like.user.toString() === req.user.id
        );

        if (isLiked.length > 0) {
          return res
            .status(400)
            .json({ alreadyliked: "User already liked this post." });
        }

        post.likes.unshift({ user: req.user.id });

        post.save().then((post) => res.json(post));
      })
      .catch((err) => res.status(404).json({ postnotfound: "No post found." }));
  });
});

// @ POST api/posts/unlike/:id - Unlike post - Private
router.post("/unlike/:id", auth, (req, res) => {
  Profile.findOne({ user: req.user.id }).then((profile) => {
    Post.findById(req.params.id)
      .then((post) => {
        const isLiked = post.likes.filter(
          (like) => like.user.toString() === req.user.id
        );

        if ((isLiked.length = 0)) {
          return res
            .status(400)
            .json({ notliked: "You have not liked this post." });
        }

        const removeIndex = post.likes
          .map((item) => item.user.toString())
          .indexOf(req.user.id);

        post.likes.splice(removeIndex, 1);

        post.save().then((post) => res.json(post));
      })
      .catch((err) => res.status(404).json({ postnotfound: "No post found." }));
  });
});

// @ POST api/posts/comment/:id - Add comment to post - Private
router.post("/comment/:id", auth, (req, res) => {
  const { errors, isValid } = validatePostInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  Post.findById(req.params.id)
    .then((post) => {
      const newComment = {
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id,
      };

      post.comments.unshift(newComment);

      post.save().then((post) => res.json(post));
    })
    .catch((err) => res.status(404).json({ postnotfound: "No post found." }));
});

// @ DELETE api/posts/comment/:id/:comment_id - Private
// @desc    Remove comment from post
router.delete("/comment/:id/:comment_id", auth, (req, res) => {
  Post.findById(req.params.id)
    .then((post) => {
      const commentExist = post.comments.filter(
        (comment) => comment._id.toString() === req.params.comment_id
      );

      if (commentExist.length === 0) {
        return res
          .status(404)
          .json({ commentnotexist: "Comment does not exist." });
      }

      const removeIndex = post.comments
        .map((item) => item._id.toString())
        .indexOf(req.params.comment_id);

      post.comments.splice(removeIndex, 1);

      post.save().then((post) => res.json(post));
    })
    .catch((err) => res.status(404).json({ postnotfound: "No post found." }));
});

module.exports = router;
