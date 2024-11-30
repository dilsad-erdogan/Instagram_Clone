import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { logout } from "../firebase";
import { logout as logoutHandle } from "../redux/auth";

const MainPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  const handleLogout = async () => {
    await logout();
    dispatch(logoutHandle());
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