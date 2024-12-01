import { useLocation, useNavigate } from "react-router-dom";
import Logo from "/insta_logo.png";
import { RiHomeHeartFill, RiHomeHeartLine } from "react-icons/ri";
import { BsSearch, BsFillSearchHeartFill } from "react-icons/bs";
import { IoIosNotificationsOutline, IoMdNotifications } from "react-icons/io";
import { FaPlus, FaPlusCircle, FaUserAlt, FaUserCircle } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { logout } from "../../firebase";

const MainSidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname.split("/").filter(Boolean).pop();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <div className="flex flex-col justify-between h-5/6">
            {/* Top */}
            <div>
                {/* Logo pic */}
                <img src={Logo} alt="Logo" className="object-cover w-full" />

                {/* Menu items */}
                <div className="flex flex-col gap-10 justify-center items-start mt-10">
                    <div className="flex items-center gap-5" onClick={() => navigate('/main')}>
                        <div className="text-2xl">
                            {path==="main" ? (<RiHomeHeartFill />) : (<RiHomeHeartLine />)}
                        </div>

                        <div className="text-xl">Home</div>
                    </div>

                    <div className="flex items-center gap-5" onClick={() => navigate('/search')}>
                        <div className="text-2xl">
                            {path==="search" ? (<BsFillSearchHeartFill />) : (<BsSearch />)}
                        </div>

                        <div className="text-xl">Search</div>
                    </div>

                    <div className="flex items-center gap-5" onClick={() => navigate('/notification')}>
                        <div className="text-2xl">
                            {path==="notification" ? (<IoMdNotifications />) : (<IoIosNotificationsOutline />)}
                        </div>

                        <div className="text-xl">Notifications</div>
                    </div>

                    <div className="flex items-center gap-5" onClick={() => navigate('/create')}>
                        <div className="text-2xl">
                            {path==="create" ? (<FaPlusCircle />) : (<FaPlus />)}
                        </div>

                        <div className="text-xl">Create</div>
                    </div>

                    <div className="flex items-center gap-5" onClick={() => navigate('/profile')}>
                        <div className="text-2xl">
                            {path==="profile" ? (<FaUserCircle />) : (<FaUserAlt />)}
                        </div>

                        <div className="text-xl">Profile</div>
                    </div>
                </div>
            </div>

            {/* Low */}
            <div className="flex items-center gap-5 p-5" onClick={handleLogout}>
                <div className="text-2xl"><FiLogOut /></div>
                <div className="text-xl">Logout</div>
            </div>
        </div>
    )
}

export default MainSidebar