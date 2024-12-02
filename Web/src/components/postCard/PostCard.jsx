
const PostCard = ({ post }) => {
  return (
    <div>
        <h2>{post.caption}</h2>
        <img src={post.imgUrl} alt="" />
        <p>{post.likes}</p>
        <p>{post.comments.length}</p>
        <p>{post.createdAt}</p>
        <p>{post.createdBy}</p>
    </div>
  )
}

export default PostCard