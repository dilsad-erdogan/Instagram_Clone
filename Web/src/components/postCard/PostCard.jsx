import { useEffect, useState } from "react";
import { FaRegHeart, FaHeart, FaRegComment } from "react-icons/fa";
import PropTypes from 'prop-types';
import { fetchUserById } from "../../firebase/auth/user";
import Comments from "../modals/Comments";

const PostCard = ({ post, onCommentAdded }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const handleLiked = () => {setIsLiked(!isLiked)};

  const handleComment = () => {
    setOpenModal(true);
  };

  useEffect(() => {
    const getUser = async () => {
      const fetchedUser = await fetchUserById(post.createdBy);
      setUser(fetchedUser);
    };
    getUser();
  }, [post.createdBy]);  

  return (
    <div className="flex flex-col p-5 overflow-hidden border rounded-md shadow-lg">
      {/* Created By and Time */}
      <div className="flex justify-between text-sm text-gray-300">
        <p className="font-bold text-lg">{user ? user.name : "Loading..."}</p>
        <p className="text-sm text-gray-700">{new Date(post.createdAt).toLocaleString()}</p>
      </div>
      
      {/* Post Image */}
      <img src={post.imgUrl} alt="Post" className="w-full max-h-[500px] object-cover rounded-md mt-2" />

      <div className="flex gap-2 items-center mt-3 text-xl">
        <div onClick={handleLiked}>
          {isLiked ? <FaHeart className="text-red-700" /> : <FaRegHeart />}
        </div>
        
        <FaRegComment onClick={handleComment} />
      </div>
      
      {/* Post Details */}
      <div className="flex flex-col mt-2 overflow-y-auto">
        <p className="text-sm text-gray-700">{post.likes} likes</p>

        <div className="flex gap-2 items-center">
          <p className="font-bold">{user ? user.name : "Loading..."}</p>
          <h2 className="font-semibold truncate">{post.caption}</h2>
        </div>

        <p className="text-sm text-gray-700" onClick={handleComment}>View all {post.comments.length} comments</p>
      </div>

      <Comments isOpen={openModal} onClose={setOpenModal} post={post} onCommentAdded={onCommentAdded} />
    </div>
  );
}

PostCard.propTypes = {
  post: PropTypes.object.isRequired,
  onCommentAdded: PropTypes.func.isRequired
};

export default PostCard;