import { useState } from "react";
import { FaRegHeart, FaHeart, FaRegComment } from "react-icons/fa";

const PostCard = ({ post }) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLiked = () => {setIsLiked(!isLiked)};

  return (
    <div className="flex flex-col p-5 overflow-hidden border rounded-md shadow-lg">
      {/* Created By and Time */}
      <div className="flex justify-between text-sm text-gray-300">
        <p className="font-bold text-lg">{post.createdBy}</p>
        <p className="text-sm text-gray-700">{post.createdAt}</p>
      </div>
      
      {/* Post Image */}
      <img src={post.imgUrl} alt="" className="w-full max-h-[500px] object-cover rounded-md mt-2" />

      <div className="flex gap-2 items-center mt-3 text-xl">
        <div onClick={handleLiked}>
          {isLiked ? <FaHeart className="text-red-700" /> : <FaRegHeart />}
        </div>
        
        <FaRegComment />
      </div>
      
      {/* Post Details */}
      <div className="flex flex-col mt-2 overflow-y-auto">
        <p className="text-sm text-gray-700">{post.likes} likes</p>

        <div className="flex gap-2 items-center">
          <p className="font-bold">{post.createdBy}</p>
          <h2 className="font-semibold truncate">{post.caption}</h2>
        </div>

        <p className="text-sm text-gray-700">View all {post.comments.length} comments</p>
      </div>
    </div>
  );
}

export default PostCard;