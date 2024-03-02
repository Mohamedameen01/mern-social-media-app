import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import TimeAgo from "react-timeago";
import englishStrings from "react-timeago/lib/language-strings/en";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";

import { deletePost, likePost } from "../../../redux/post/postAction";
import { getCurrentPost } from "../../../redux/currentPost/actions";
import { downloadFile, resizeImage } from ".";
import memory from "../../../images/memory.jpg";

function Post({ post }) {
  const englishFormatter = buildFormatter(englishStrings);
  const originalBase64 = post.imgFile;

  const [isOpen, setIsOpen] = useState(false);
  const [resizedImg, setResizedImg] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    let timeOutId;
    if (isOpen) timeOutId = setTimeout(() => setIsOpen(false), 10000);
    return () => clearTimeout(timeOutId);
  }, [isOpen]);

  const handlePostDelete = (postId) =>  dispatch(deletePost(postId));
  
  const handleMoreBtn = () => setIsOpen(!isOpen);
  const handleEdit = () => dispatch(getCurrentPost(post));
  const handleSave = () => downloadFile(post.imgFile);
  const handleLikeBtn = (postId) => dispatch(likePost(postId));

  resizeImage(originalBase64, 300, 150, 0.9, function (resizedBase64) {
    setResizedImg(resizedBase64);
  });

  const bgImage = resizedImg || memory;

  return (
    <div className=" max-w-xs mx-auto border border-blue-300 shadow-lg rounded-2xl pb-2 capitalize">
      <div
        className="bg-cover h-[150px] rounded-md m-2"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="flex justify-between px-3 pt-2 text-white">
          <div className="text-md font-semibold tracking-wider">
            {post.creator}
          </div>
          <button onClick={handleMoreBtn}>
            {isOpen ? <CloseIcon /> : <MoreVertIcon />}
          </button>
        </div>
        <div className="flex justify-between">
          <div className="px-3 text-white text-md">
            <TimeAgo date={post.createdAt} formatter={englishFormatter} />
          </div>
          {isOpen && (
            <div className="grid text-white mr-2 text-sm gap-1">
              <button
                onClick={handleEdit}
                className="flex p-1 border rounded-md"
              >
                Edit <EditIcon fontSize="small" />
              </button>
              <button
                className="flex p-1 border rounded-md"
                onClick={handleSave}
              >
                Save <SaveIcon fontSize="small" />
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="p-3 py-1">
        <div className="my-1 text-xs text-slate-600 lowercase">
          <p>{post.tags?.map((tag) => `#${tag} `)}</p>
        </div>
        <div className="my-2 text-xl font-bold">
          <h1>{post.title}</h1>
        </div>
        <div className="my-2 h-16">
          <p className="break-words text-md font-medium">{post.message}</p>
        </div>
        <div className="flex justify-between items-end mt-3">
          <button onClick={() => handleLikeBtn(post._id)}>
            {post.liked ? (
              <FavoriteIcon style={{ color: "#FF4081" }} />
            ) : (
              <FavoriteBorderIcon />
            )}
            {post.liked ? "Dislike" : "Like"}
          </button>
          <button onClick={() => handlePostDelete(post._id)}>
            <DeleteOutlineIcon /> Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default Post;
