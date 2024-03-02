import express, { response } from "express";

import { removeProfile, updateUser, userSignin, userSignup } from "../controllers/users.js";
import verifyLogin from '../middleware/auth.js';

const router = express.Router();

router.post("/signup", (req, res) => {
  userSignup(req.body)
    .then((response) => {
      res.status(201).json(response);
    })
    .catch((error) => {
      res.status(400).json(error.message);
    });
});

router.post("/signin", (req, res) => {
  userSignin(req.body)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(500).json(error.message);
    });
});

router.patch("/update-profile",verifyLogin, async(req, res) => {
  const token = await req.headers.authorization?.split(" ")[1];
  updateUser(req.body,token)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(404).json(error);
    });
});

router.patch('/remove-profile',verifyLogin, async(req, res) => {
  const token = await req.headers.authorization?.split(" ")[1];
  removeProfile(req.body,token).then((response) => {
    res.status(200).json(response);
  }).catch((error) => {
    res.status(404).json(error);
  })
})

export default router;
