import React, { useEffect, useState } from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import Sidebar from '../components/Sidebar'
import { fetchUserPosts } from '../firebase/post';
import { fetchUserById } from '../firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [uid, setUid] = useState(null);

  useEffect(() => {
    const fetchUid = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          console.log("Fetched user from storage:", parsedUser.uid);
          setUid(parsedUser.uid);
        } else {
          console.error("No user found in AsyncStorage");
        }
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };
  
    fetchUid();
  }, []);

  useEffect(() => {
    if (!uid) return;
  
    const getUserPosts = async () => {
      const posts = await fetchUserPosts(uid);
      setUserPosts(posts);
    };
  
    const fetchUserData = async () => {
      const firebaseUser = await fetchUserById(uid);
      if (firebaseUser) {
        setUser(firebaseUser);
      }
    };
  
    getUserPosts();
    fetchUserData();
  }, [uid]);  

  return (
    <View className="bg-black flex flex-row w-full h-full overflow-hidden">
      {/* Sidebar */}
      <View className="w-1/6 p-5 overflow-y-auto border-r border-white">
        <Sidebar />
      </View>

      {/* Content */}
      <View className="w-5/6 p-5 flex justify-center overflow-y-auto">
        <ScrollView>
          {/* User Details */}
          <View className="flex flex-col items-center gap-5 m-6">
            {/* User Pic */}
            <Image source={{ uri: user?.profilePicUrl }} alt="Profile" resizeMode="cover" className="max-w-28 max-h-28 rounded-full"/>

            {/* User Detail */}
            <View className="flex flex-col gap-3">
              {/* Name and edit */}
              <View className="flex gap-6 items-center">
                <Text className="text-lg">{user?.name}</Text>
                <TouchableOpacity className="bg-blue-500 px-5 py-2 rounded-lg relative">
                  <Text className='text-white'>Edit</Text>
                </TouchableOpacity>
              </View>

              {/* Total count */}
              <View className="flex gap-6 items-center">
                <Text className="text-sm font-bold">{userPosts.length} posts</Text>
                <Text className="text-sm font-bold">{user?.followers?.length || 0} followers</Text>
                <Text className="text-sm font-bold">{user?.following?.length || 0} following</Text>
              </View>

              {/* Bio Caption */}
              <View className="mt-2">
                <Text className="text-sm">{user?.bio}</Text>
              </View>
            </View>
          </View>

          {/* User Posts */}
          <View className="mt-10">
            <View className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {userPosts.map((post) => (
                <View key={post.id} className="w-full hover:scale-105">
                  <Image source={{ uri: post.imgUrl }} alt={post.id} className="w-full h-auto rounded-md object-cover" />
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  )
}

export default Profile