import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import dotenv from "dotenv";

import { USERS_COLLECTION } from "../config/collections.js";
import { get } from "../config/db.js";

dotenv.config();

export function userSignup(userData) {
  const { firstName, lastName, email, password } = userData;

  return new Promise(async (resolve, reject) => {
    const user = await get().collection(USERS_COLLECTION).findOne({ email });

    if (user) {
      reject({ message: "User already exists" });
    } else {
      const cryptPassword = await bcrypt.hash(password, 12);
      get()
        .collection(USERS_COLLECTION)
        .insertOne({
          name: `${firstName} ${lastName}`,
          email,
          password: cryptPassword,
        })
        .then(async (response) => {
          const info = await get()
            .collection(USERS_COLLECTION)
            .findOne({ _id: response.insertedId });
          const token = await jwt.sign(
            { email: info.email, userId: info._id },
            process.env.TOKEN_CODE,
            { expiresIn: "1h" }
          );
          console.log(token);
          resolve({ data: info, token });
        });
    }
  });
}

export function userSignin(userData) {
  return new Promise(async (resolve, reject) => {
    const { email, password } = userData;
    const user = await get().collection(USERS_COLLECTION).findOne({ email });
    if (!user) {
      reject({ message: "Invalid email or User doesn't exist." });
    } else {
      bcrypt.compare(password, user.password).then(async (status) => {
        if (status) {
          const token = await jwt.sign(
            { email: user.email, userId: user._id },
            process.env.TOKEN_CODE,
            { expiresIn: "1h" }
          );
          resolve({ data: user, token });
        } else {
          reject({ message: "Invalid Password." });
        }
      });
    }
  });
}

export function updateUser(userInfo, token) {
  return new Promise(async (resolve, reject) => {
    const { id, name, email, picture } = userInfo;
    try {
      const info = await get()
        .collection(USERS_COLLECTION)
        .updateOne(
          { _id: new ObjectId(id) },
          { $set: { name, email, picture } }
        );
      const user = await get().collection(USERS_COLLECTION).findOne({ email });
      resolve({ data: user, token });
    } catch (error) {
      reject({ message: "Failed to update user information." });
    }
  });
}

export function removeProfile(userInfo, token) {
  return new Promise(async (resolve, reject) => {
    const {_id} = userInfo;
    try {
      const info = await get()
        .collection(USERS_COLLECTION)
        .updateOne({ _id: new ObjectId(_id) }, { $unset: { picture: "" } });
        const user = await get().collection(USERS_COLLECTION).findOne({_id: new ObjectId(_id) });
        resolve({ data: user, token });
    } catch (error) {
      reject({ message: "Failed to remove current profile image." });
    }
  });
}
