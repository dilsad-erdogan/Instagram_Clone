import { useEffect, useState } from "react";
import { FaRegHeart, FaHeart, FaRegComment } from "react-icons/fa";
import PropTypes from "prop-types";
import { fetchUserById } from "../../firebase/auth/user";
import Comments from "../modals/Comments";
import { setLiked } from "../../firebase/post/post";

const PostCard = ({ post, onCommentAdded }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [likes, setLikes] = useState(post.likes || []);

  // Kullanıcının mevcut beğeni durumu kontrol ediliyor
  useEffect(() => {
    const uid = JSON.parse(localStorage.getItem("user"))?.uid;
    if (uid) {
      setIsLiked(likes.some((like) => like.uid === uid));
    }
  }, [likes]);

  const handleLiked = async () => {
    try {
      const uid = JSON.parse(localStorage.getItem("user"))?.uid;
      if (!uid) throw new Error("User ID (uid) is not available");

      const updatedLikes = isLiked
        ? likes.filter((likeUid) => likeUid !== uid) // Unlike
        : [...likes, uid]; // Like

      await setLiked(post.id, uid, isLiked);
      setLikes(updatedLikes); // Beğeni listesini güncelle
      setIsLiked(!isLiked); // Durumu tersine çevir
    } catch (error) {
      console.error("Error while liking the post:", error);
    }
  };

  const handleComment = () => {
    setOpenModal(true);
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const fetchedUser = await fetchUserById(post.createdBy);
        setUser(fetchedUser);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    getUser();
  }, [post.createdBy]);

  return (
    <div className="flex flex-col p-5 overflow-hidden border rounded-md shadow-lg">
      {/* Created By and Time */}
      <div className="flex justify-between text-sm text-gray-300">
        <p className="font-bold text-lg">{user ? user.name : "Loading..."}</p>
        <p className="text-sm text-gray-700">
          {new Date(post.createdAt).toLocaleString()}
        </p>
      </div>

      {/* Post Image */}
      <img src={post.imgUrl} alt="Post" className="w-full max-h-[500px] object-cover rounded-md mt-2" />

      <div className="flex gap-2 items-center mt-3 text-xl">
        <div onClick={handleLiked} className="cursor-pointer">
          {isLiked ? <FaHeart className="text-red-700" /> : <FaRegHeart />}
        </div>
        <FaRegComment className="cursor-pointer" onClick={handleComment} />
      </div>

      {/* Post Details */}
      <div className="flex flex-col mt-2 overflow-y-auto">
        <p className="text-sm text-gray-700">{likes.length} likes</p>

        <div className="flex gap-2 items-center">
          <p className="font-bold">{user ? user.name : "Loading..."}</p>
          <h2 className="font-semibold truncate">{post.caption}</h2>
        </div>

        <p className="text-sm text-gray-700 cursor-pointer" onClick={handleComment} >
          View all {post.comments.length} comments
        </p>
      </div>

      <Comments isOpen={openModal} onClose={setOpenModal} post={post} onCommentAdded={onCommentAdded} />
    </div>
  );
};

PostCard.propTypes = {
  post: PropTypes.object.isRequired,
  onCommentAdded: PropTypes.func.isRequired,
};

export default PostCard;