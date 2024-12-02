import { RiHomeHeartFill, RiHomeHeartLine } from "react-icons/ri";
import { BsSearch, BsFillSearchHeartFill } from "react-icons/bs";
import { IoIosNotificationsOutline, IoMdNotifications } from "react-icons/io";
import { FaPlus, FaPlusCircle, FaUserAlt, FaUserCircle } from "react-icons/fa";

export const {
    VITE_API_KEY,
    VITE_AUTH_DOMAIN,
    VITE_PROJECT_ID,
    VITE_STORAGE_BUCKET,
    VITE_MESSAGING_SENDER_ID,
    VITE_APP_ID,
    VITE_MEASUREMENT_ID
} = import.meta.env;

const sidebarData = [
    {
        id: 1,
        path: 'main',
        icon1: <RiHomeHeartFill />,
        icon2: <RiHomeHeartLine />
    },
    {
        id: 2,
        path: 'search',
        icon1: <BsFillSearchHeartFill />,
        icon2: <BsSearch />
    },
    {
        id: 3,
        path: 'notification',
        icon1: <IoMdNotifications />,
        icon2: <IoIosNotificationsOutline />
    },
    {
        id: 4,
        path: 'create',
        icon1: <FaPlusCircle />,
        icon2: <FaPlus />
    },
    {
        id: 5,
        path: 'profile',
        icon1: <FaUserCircle />,
        icon2: <FaUserAlt />
    },
];

export default sidebarData;