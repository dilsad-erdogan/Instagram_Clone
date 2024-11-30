import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { logout } from "../firebase";

const MainPage = () => {
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  }

  return (
    <div>
      <h1>Oturum açık: {user.email}</h1>
      <button onClick={handleLogout}>Çıkış yap</button>
    </div>
  )
}

export default MainPage