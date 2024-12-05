import { useDispatch, useSelector } from "react-redux";
import MainSidebar from "../components/sidebar/MainSidebar";
import SmallSidebar from "../components/sidebar/SmallSidebar";
import PostCard from "../components/postCard/PostCard";
import { useEffect } from "react";
import { fetchPosts } from "../firebase/post/post";
import { fetchPosts as handleFetchPosts } from "../redux/posts";
import { fetchAllUsers } from "../firebase/auth/user";
import { setUsers } from "../redux/user";
import { Toaster } from "react-hot-toast";

const MainPage = () => {
  const { posts } = useSelector(state => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchPostsThunk();
  }, []);

  useEffect(() => {
    const loadUsers = async () => {
      const users = await fetchAllUsers();
      dispatch(setUsers(users));
    };

    loadUsers();
  }, [dispatch]);

  const fetchPostsThunk = async () => {
    try {
      const posts = await fetchPosts();
      dispatch(handleFetchPosts(posts));
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <div className="flex w-full h-screen overflow-hidden">
      <Toaster position="top-right" />
      
      {/* Sidebar */}
      <div className="hidden lg:block w-1/6 p-5 overflow-y-auto border-r border-white">
        <MainSidebar />
      </div>
      <div className="block lg:hidden w-1/6 p-5 overflow-y-auto border-r border-white">
        <SmallSidebar />
      </div>

      {/* Content */}
      <div className="w-5/6 p-5 flex justify-center overflow-y-auto">
        <div className="lg:w-1/2">
          {posts.map((post) => (
            <div key={post.id} className="p-2">
              <PostCard post={post} onCommentAdded={fetchPostsThunk} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainPage;