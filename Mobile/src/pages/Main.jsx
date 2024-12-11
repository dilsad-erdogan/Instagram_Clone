import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { fetchPosts } from '../firebase/post';
import Sidebar from '../components/Sidebar';

const Main = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPostsThunk();
  }, []);

  const fetchPostsThunk = async () => {
    try {
      const response = await fetchPosts();
      console.log("Fetched posts:", response);
      setPosts(response || []);
    } catch (error) {
      console.error("Error fetching posts:", error.message);
    }
  };

  return (
    <View className="bg-black flex flex-row w-full h-full overflow-hidden">
      {/* Sidebar */}
      <View className="w-1/6 p-5 overflow-y-auto border-r border-white">
        <Sidebar />
      </View>

      {/* Content */}
      <View className="w-5/6 p-5 flex justify-center overflow-y-auto">
        <View>
          {posts.map((post) => (
            <View key={post.id} className='p-2'>
              <Text className='text-white'>{post.id}</Text>              
            </View>
          ))}
        </View>
      </View>
    </View>
  )
}

export default Main