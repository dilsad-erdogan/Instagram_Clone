import MainSidebar from "../components/sidebar/MainSidebar";
import SmallSidebar from "../components/sidebar/SmallSidebar";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { fetchUserPosts } from "../firebase/post/post";
import { fetchUserById } from "../firebase/auth/user";
import EditProfile from "../components/modals/EditProfile";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const getUserPosts = async () => {
      const posts = await fetchUserPosts(JSON.parse(localStorage.getItem('user')).uid);
      setUserPosts(posts);
    };

    const fetchUserData = async () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser && storedUser.uid) {
        const firebaseUser = await fetchUserById(storedUser.uid);
        if (firebaseUser) {
          setUser(firebaseUser);
        }
      }
    };

    getUserPosts();
    fetchUserData();
  }, []);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  return (
    <div className="flex w-full h-full fixed overflow-hidden">
      <Toaster position="top-right" />

      {/* Sidebar */}
      <div className="hidden lg:block w-1/6 p-5 overflow-y-auto border-r border-white">
        <MainSidebar />
      </div>
      <div className="block lg:hidden w-1/6 p-5 overflow-y-auto border-r border-white">
        <SmallSidebar />
      </div>

      {/* Content */}
      <div className="w-5/6 p-5 flex flex-col items-center overflow-y-auto gap-5">
        <div className="lg:w-2/3">
          {/* User Details */}
          <div className="flex items-center gap-5 m-6">
            {/* User Pic */}
            <img src={user?.profilePicUrl} alt="Profile" className="max-w-28 max-h-28 rounded-full" />

            {/* User Detail */}
            <div className="flex flex-col gap-3">
              {/* Name and edit */}
              <div className="flex gap-6 items-center">
                <p className="text-lg">{user?.name}</p>
                <button className="text-white bg-blue-500 py-2 px-5 rounded-lg relative" onClick={handleOpenModal}>Edit</button>
              </div>

              {/* Total count */}
              <div className="flex gap-6 items-center">
                <p className="text-sm font-bold">{userPosts.length} posts</p>
                <p className="text-sm font-bold">{user?.followers?.length || 0} followers</p>
                <p className="text-sm font-bold">{user?.following?.length || 0} following</p>
              </div>

              {/* Bio Caption */}
              <div className="mt-2">
                <p className="text-sm">{user?.bio}</p>
              </div>
            </div>
          </div>

          {/* User Posts */}
          <div className="mt-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {userPosts.map((post) => (
                <div key={post.id} className="w-full hover:scale-105">
                  <img src={post.imgUrl} alt={post.id} className="w-full h-auto rounded-md object-cover"/>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <EditProfile isOpen={openModal} onClose={() => setOpenModal(false)} user={user}/>
    </div>
  );
}

export default ProfilePage