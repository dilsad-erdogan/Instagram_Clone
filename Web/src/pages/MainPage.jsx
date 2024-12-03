//import { useSelector } from "react-redux";
import MainSidebar from "../components/sidebar/MainSidebar";
import SmallSidebar from "../components/sidebar/SmallSidebar";
import Img1 from "/img1.png";
import Img2 from "/img2.png";
import Img3 from "/img3.png";
import Img4 from "/img4.png";
import PostCard from "../components/postCard/PostCard";

const posts = [
  {
    id: 1,
    caption: 'captioncaptioncaptioncaptioncaption',
    imgUrl: Img1,
    likes: 3,
    comments: [
      {
        id: 1,
        comment: 'selaammm!!',
        createdBy: 'dlsd',
        createdAt: '10h ago'
      },
      {
        id: 2,
        comment: 'selaammm!!',
        createdBy: 'dlsd',
        createdAt: '6h ago'
      },
    ],
    createdAt: '20h ago',
    createdBy: 'dlsd'
  },
  {
    id: 2,
    caption: 'captioncaptioncaptioncaptioncaption',
    imgUrl: Img2,
    likes: 5,
    comments: [],
    createdAt: '20h ago',
    createdBy: 'dlsd'
  },
  {
    id: 3,
    caption: 'captioncaptioncaptioncaptioncaption',
    imgUrl: Img3,
    likes: 6,
    comments: [
      {
        id: 1,
        comment: 'selaammm!!',
        createdBy: 'dlsd',
        createdAt: '10h ago'
      }
    ],
    createdAt: '20h ago',
    createdBy: 'dlsd'
  },
  {
    id: 4,
    caption: 'captioncaptioncaptioncaptioncaption',
    imgUrl: Img4,
    likes: 0,
    comments: [
      {
        id: 1,
        comment: 'selaammm!!',
        createdBy: 'dlsd',
        createdAt: '10h ago'
      },
      {
        id: 2,
        comment: 'selaammm!!',
        createdBy: 'dlsd',
        createdAt: '6h ago'
      },
    ],
    createdAt: '20h ago',
    createdBy: 'dlsd'
  },
];

const MainPage = () => {
  //const { user } = useSelector(state => state.auth);

  return (
    <div className="flex w-full h-screen overflow-hidden">
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
              <PostCard post={post} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainPage;