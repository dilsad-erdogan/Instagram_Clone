import React, { useEffect, useState } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { fetchUserById } from '../firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { setLiked } from '../firebase/post'
import Comments from './Comments'

const PostCard = ({ post, onCommentAdded }) => {
    const [likes, setLikes] = useState(post.likes || []);
    const [isLiked, setIsLiked] = useState(false);
    const [user, setUser] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        const getUser = async () => {
            try {
                const fetchedUser = await fetchUserById(post.createdBy);
                setUser(fetchedUser);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        getUser();
    }, [post.createdBy]);

    useEffect(() => {
        const checkUserLikeStatus = async () => {
            try {
                const storedUser = await AsyncStorage.getItem('user');
                const user = JSON.parse(storedUser).uid;

                setIsLiked(likes.some((like) => like.uid === user));
            } catch (error) {
                console.error('Error checking like status:', error);
            }
        };

        checkUserLikeStatus();
    }, [likes]);

    const handleLiked = async () => {
        try {
            const storedUser = await AsyncStorage.getItem('user');
            const user = storedUser ? JSON.parse(storedUser) : null;
    
            if (!user?.uid) throw new Error("User ID (uid) is not available");
    
            const updatedLikes = isLiked
                ? likes.filter((likeUid) => likeUid !== user.uid)
                : [...likes, user.uid];
    
            await setLiked(post.id, user.uid, isLiked);
            setLikes(updatedLikes);
            setIsLiked(!isLiked);
        } catch (error) {
            console.error("Error while liking the post:", error);
        }
    };

    const handleComment = () => {
        setOpenModal(true);
        console.log("open comment")
    };

    return (
        <View className="flex flex-col p-5 overflow-hidden border rounded-md shadow-lg">
            {/* Created By and Time */}
            <View className="flex justify-between text-sm text-gray-300">
                <Text className="font-bold text-lg text-white">{user ? user.name : "Loading..."}</Text>
                <Text className="text-sm text-gray-700">{new Date(post.createdAt).toLocaleString()}</Text>
            </View>

            {/* Post Image */}
            <Image source={{ uri: post.imgUrl }} alt="Post" resizeMode="cover" style={{ width: 300, height: 300 }} />

            <View className="flex flex-row gap-2 items-center mt-3 text-xl">
                <TouchableOpacity onPress={handleLiked} className="cursor-pointer">
                    {isLiked ? <FontAwesome name="heart" size={24} color="red" /> : <FontAwesome name="heart-o" size={24} color="white" />}
                </TouchableOpacity>

                <TouchableOpacity onPress={handleComment} className="cursor-pointer">
                    <FontAwesome name="comment-o" size={24} color="white" />
                </TouchableOpacity>
            </View>

            {/* Post Details */}
            <View className="flex flex-col mt-2 overflow-y-auto">
                <Text className="text-sm text-gray-700">{likes.length} likes</Text>

                <View className="flex flex-row gap-2 items-center">
                    <Text className="font-bold text-white">{user ? user.name : "Loading..."}</Text>
                    <Text className="font-semibold truncate text-white">{post.caption}</Text>
                </View>

                <Text onPress={handleComment} className="text-sm text-gray-700 cursor-pointer">
                    View all {post.comments.length} comments
                </Text>
            </View>

            <Comments isOpen={openModal} onClose={setOpenModal} post={post} onCommentAdded={onCommentAdded} />
        </View>
    )
}

export default PostCard