import { useSelector } from "react-redux"
import MainSidebar from "../components/sidebar/MainSidebar";
import SmallSidebar from "../components/sidebar/SmallSidebar";

const CreatePage = () => {
  const { user } = useSelector(state => state.auth);

  return (
    <div className="flex w-full h-full fixed overflow-hidden">
      {/* Sidebar */}
      <div className="hidden lg:block w-1/6 p-5 overflow-y-auto border-r border-white">
        <MainSidebar />
      </div>
      <div className="block lg:hidden w-1/6 p-5 overflow-y-auto border-r border-white">
        <SmallSidebar />
      </div>

      {/* Content */}
      <div className="w-5/6 p-5 overflow-y-auto">
        <h1>Oturum açık: {user.email}</h1>
        
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          tristique placerat nibh, id ultrices lectus ultrices ac. Donec non
          odio et arcu cursus pretium.
        </p>
      </div>
    </div>
  );
}

export default CreatePage