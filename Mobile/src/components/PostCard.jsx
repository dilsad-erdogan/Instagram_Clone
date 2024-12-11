import React, { useState } from 'react'
import { Image, Text, View } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const PostCard = ({ post, onCommentAdded }) => {
    const [likes, setLikes] = useState(post.likes || []);

    return (
        <View className="flex flex-col p-5 overflow-hidden border rounded-md shadow-lg">
            {/* Created By and Time */}
            <View className="flex justify-between text-sm text-gray-300">
                <Text className="font-bold text-lg text-white">{post.createdBy}</Text>
                <Text className="text-sm text-gray-700">{new Date(post.createdAt).toLocaleString()}</Text>
            </View>

            {/* Post Image */}
            <Image source={{ uri: post.imgUrl }} alt="Post" resizeMode="cover" style={{ width: 300, height: 300 }} />

            <View className="flex flex-row gap-2 items-center mt-3 text-xl">
                <FontAwesome name="heart-o" size={24} color="white" />
                <FontAwesome name="comment-o" size={24} color="white" />
            </View>

            {/* Post Details */}
            <View className="flex flex-col mt-2 overflow-y-auto">
                <Text className="text-sm text-gray-700">{likes.length} likes</Text>

                <View className="flex gap-2 items-center">
                    <Text className="font-bold text-white">{post.createdBy}</Text>
                    <Text className="font-semibold truncate text-white">{post.caption}</Text>
                </View>

                <Text className="text-sm text-gray-700 cursor-pointer">
                    View all {post.comments.length} comments
                </Text>
            </View>
        </View>
    )
}

export default PostCard