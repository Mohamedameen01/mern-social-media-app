import express from "express";

import {
  createPosts,
  deletePost,
  getUserPosts,
  toggleLike,
  updatePost,
} from "../controllers/posts.js";
import verifyLogin from "../middleware/auth.js";

const router = express.Router();

router.get("/", verifyLogin ,(req, res) => { 
  getUserPosts(req.userId)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(404).json(error);
    });
});

router.post("/", verifyLogin, (req, res) => {
  createPosts(req.body, req.userId)
    .then((response) => {
      res.status(201).json(response);
    })
    .catch((error) => {
      res.status(409).json(error);
    });
});

router.delete("//", verifyLogin, (req, res) => {
  deletePost(req.query.id)
    .then((response) => {
      res.status(202).json(response);
    })
    .catch((error) => {
      res.status(409).json(error);
    });
});

router.patch("/:id", verifyLogin, (req, res) => {
  updatePost(req.params.id, req.body)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(404).json(error);
    });
});

router.patch("/toggle-like/:id", verifyLogin, (req, res) => {
  toggleLike(req.params.id)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(404).json(error);
    });
});

export default router;
