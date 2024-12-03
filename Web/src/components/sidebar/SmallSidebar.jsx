import { useLocation, useNavigate } from "react-router-dom"
import Logo from "/insta_logo.png";
import { FiLogOut } from "react-icons/fi";
import { logout } from "../../firebase/auth/login.js"
import { RiHomeHeartFill, RiHomeHeartLine } from "react-icons/ri";
import { BsFillSearchHeartFill } from "react-icons/bs";
import { IoMdNotifications } from "react-icons/io";
import { FaPlusCircle, FaUserAlt, FaUserCircle } from "react-icons/fa";
import SearchUser from "../modals/SearchUser.jsx";
import CreatePost from "../modals/CreatePost.jsx";
import { useState } from "react";

const SmallSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname.split("/").filter(Boolean).pop();

  const [openSearchModal, setOpenSearchModal] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleSearch = () => {
    setOpenSearchModal(true);
  };

  const handleCreate = () => {
    setOpenCreateModal(true);
  };

  return (
    <div className="flex flex-col justify-between h-5/6">
      {/* Top */}
      <div>
        {/* Logo pic */}
        <img src={Logo} alt="Logo" className="object-cover w-full" />

        {/* Menu items */}
        <div className="flex flex-col gap-10 justify-center items-center mt-10">
          <div className="flex items-center" onClick={() => navigate(`/main`)}>
            <div className="text-2xl">
              {path==='main' ? <RiHomeHeartFill /> : <RiHomeHeartLine />}
            </div>
          </div>

          <div className="flex items-center" onClick={handleSearch}>
            <div className="text-2xl">
              <BsFillSearchHeartFill />
            </div>
          </div>

          <div className="flex items-center" onClick={() => console.log('notification')}>
            <div className="text-2xl">
              <IoMdNotifications />
            </div>
          </div>

          <div className="flex items-center" onClick={handleCreate}>
            <div className="text-2xl">
              <FaPlusCircle />
            </div>
          </div>

          <div className="flex items-center" onClick={() => navigate(`/profile`)}>
            <div className="text-2xl">
              {path==='profile' ? <FaUserCircle /> : <FaUserAlt />}
            </div>
          </div>
        </div>
      </div>

      {/* Low */}
      <div className="flex justify-center items-center p-5" onClick={handleLogout}>
        <div className="text-2xl"><FiLogOut /></div>
      </div>

      <SearchUser isOpen={openSearchModal} onClose={() => setOpenSearchModal(false)} />
      <CreatePost isOpen={openCreateModal} onClose={() => setOpenCreateModal(false)} />
    </div>
  )
}

export default SmallSidebar