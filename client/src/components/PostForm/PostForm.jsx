import { useEffect, useRef, useState } from "react";
import FileBase64 from "react-file-base64";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

import { createNewPost, updatePost } from "../../redux/post/postAction";

function PostForm({ id, post }) {
  const dispatch = useDispatch();

  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    imgFile: "",
    liked: false,
    createdAt: new Date().toISOString(),
  });
  const [editPost, setEditPost] = useState({});

  const {
    handleSubmit,
    register,
    formState: { errors },
    setFocus,
  } = useForm();

  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    setFocus("title");
  }, [setFocus]);

  useEffect(() => {
    if (post) {
      setPostData(post);
      setEditPost({ id, post });
    }
  }, [post]);

  const handleClear = () => {
    setEditPost({});
    setPostData({
      creator: "",
      title: "",
      message: "",
      tags: [""],
      imgFile: "",
      liked: false,
      createdAt: new Date(),
    });
  };

  const onHandleSubmit = () => {
    if (editPost.id) {
      dispatch(updatePost(id, postData));
      handleClear();
    } else {
      dispatch(createNewPost({ ...postData, creator: user?.data?.name }));
      handleClear();
    }
  };

  if (!user) {
    return (
      <div className="bg-white rounded-lg  p-2 w-fit m-2">
        <p>Sign in with us to post your memories.</p>
      </div>
    );
  }

  return (
    <div className="m-2">
      <h1 className="m-2 text-center text-xl font-semibold">
        {editPost.id ? `Recalling ${post.title} Memory` : "Creating a Memory"}
      </h1>
      <form
        onSubmit={handleSubmit(onHandleSubmit)}
        className="grid justify-center gap-4"
        autoComplete="off"
        autoCorrect="off"
        noValidate
      >
        <input
          className="p-3 rounded-md outline outline-2 outline-offset-2 outline-gray-400"
          type="text"
          name="title"
          placeholder="title"
          value={postData.title}
          {...register("title", { required: "This field is required." })}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        {errors.tags && <small>{errors.tags?.message}</small>}
        <textarea
          className="p-3 rounded-md outline outline-2 outline-offset-2 outline-gray-400"
          name="message"
          placeholder="message"
          value={postData.message}
          {...register("message", {
            required: "This field is required.",
            minLength: {
              value: 10,
              message: "Must be more than 10   characters.",
            },
            maxLength: {
              value: 100,
              message: "Must be less than 100 characters.",
            },
          })}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        {errors.message && <small>{errors.message?.message}</small>}
        <input
          className="p-3 rounded-md outline outline-2 outline-offset-2 outline-gray-400"
          type="text"
          name="tags"
          placeholder="tags"
          value={postData.tags}
          {...register("tags", { required: "This field is required." })}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(/[,\s]/) })
          }
        />
        {errors.tags && <small>{errors.tags?.message}</small>}
        <div className="grid ">
          <FileBase64
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, imgFile: base64 })
            }
          />
        </div>

        <button type="submit" className="p-2 rounded-md bg-blue-700 text-white">
          Submit
        </button>
        <button
          className="p-2 rounded-md bg-red-600 text-white"
          onClick={handleClear}
        >
          Clear
        </button>
      </form>
    </div>
  );
}

export default PostForm;
