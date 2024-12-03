import { useLocation, useNavigate } from "react-router-dom";
import Logo from "/insta_logo.png";
import { FiLogOut } from "react-icons/fi";
import { logout } from "../../firebase/auth/login.js";
import sidebarData from "../../configData.jsx";

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
                    {sidebarData.map((data) => (
                        <div key={data.id} className="flex items-center gap-5" onClick={() => navigate(`/${data.path}`)}>
                            <div className="text-2xl">
                                {path===data.path ? (data.icon1) : (data.icon2)}
                            </div>

                            <div className="text-xl">{data.path}</div>
                        </div>
                    ))}
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