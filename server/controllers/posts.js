import { get } from "../config/db.js";
import { DETAILS_COLLECTION } from "../config/collections.js";
import { ObjectId } from "mongodb";

export function getUserPosts(id) {
  return new Promise(async (resolve, reject) => {
    const posts = await get()
      .collection(DETAILS_COLLECTION)
      .find({ userId: id })
      .toArray();
    try {
      const stackData = posts.reverse();
      resolve(stackData);
    } catch (error) {
      reject(error);
    }
  });
}

export function createPosts(details, id) {
  return new Promise((resolve, reject) => {
    get()
      .collection(DETAILS_COLLECTION)
      .insertOne({ ...details, userId: id })
      .then(async (response) => {
        const posts = await get()
          .collection(DETAILS_COLLECTION)
          .find({ userId: id })
          .toArray();
        resolve(posts.reverse());
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function deletePost(postId) {
  return new Promise((resolve, reject) => {
    get()
      .collection(DETAILS_COLLECTION)
      .deleteOne({ _id: new ObjectId(postId) })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function updatePost(id, post) {
  const { creator, title, message, tags, imgFile } = post;
  return new Promise((resolve, reject) => {
    get()
      .collection(DETAILS_COLLECTION)
      .updateOne(
        { _id: new ObjectId(id) },
        {
          $set: { creator, title, message, tags, imgFile },
        }
      )
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function toggleLike(id) {
  return new Promise(async (resolve, reject) => {
    const doc = await get()
      .collection(DETAILS_COLLECTION)
      .findOne({ _id: new ObjectId(id) });
    if (!doc) reject({ error: "Document Not Found" });

    const toggleValue = !doc.liked;

    get()
      .collection(DETAILS_COLLECTION)
      .updateOne(
        { _id: new ObjectId(id) },
        {
          $set: { liked: toggleValue },
        }
      )
      .then(() => {
        get()
          .collection(DETAILS_COLLECTION)
          .findOne({ _id: new ObjectId(id) })
          .then((response) => {
            resolve(response);
          });
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function getPostsBySearch(query) {
  return new Promise(async (resolve, reject) => {
    const { searchQuery, tags } = query;

    const title = new RegExp(searchQuery, "i");

    const posts = await get()
      .collection(DETAILS_COLLECTION)
      .find({ $or: [{ title }, { tags: { $in: tags.split(",") } }] });
    if (posts) {
      resolve({ data: posts });
      console.log(posts);
    } else {
      reject({ message: "Please try again!" });
    }
  });
}
