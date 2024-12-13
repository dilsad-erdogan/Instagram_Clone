import React, { useEffect, useState } from 'react'
import { addCommentToPost } from '../firebase/post';
import { fetchUserById } from '../firebase/auth';
import { Text, TextInput, View } from 'react-native';

const Comments = async ({ isOpen, onClose, post, onCommentAdded }) => {
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState(post.comments || []);
    const [usernames, setUsernames] = useState({});

    const storedUser = await AsyncStorage.getItem('user');
    const uid = JSON.parse(storedUser).uid;

    const handleSend = async () => {
        if (comment.trim() === '') return;

        try {
            await addCommentToPost(post.id, uid, comment);

            const newComment = {
                createdBy: uid,
                comment,
                createdAt: Date.now(),
            };
            setComments((prevComments) => [...prevComments, newComment]);

            setComment('');
            onCommentAdded();
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    useEffect(() => {
        const loadUsernames = async () => {
            const users = {};
            for (const c of comments) {
                if (!usernames[c.createdBy]) {
                    const user = await fetchUserById(c.createdBy);
                    users[c.createdBy] = user.name;
                }
            }
            setUsernames((prev) => ({ ...prev, ...users }));
        };

        loadUsernames();
    }, [comments]);

    const handleClose = () => {
        onClose();
    };

    if (!isOpen) return null;

    return (
        <View className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <View className="bg-black rounded-lg shadow-lg p-6 w-full max-w-md">
                {/* Modal Close */}
                <TouchableOpacity onPress={handleClose} className="absolute top-10 right-20 text-white text-3xl">
                    &times;
                </TouchableOpacity>

                {/* Modal Title */}
                <Text className="text-white text-xl font-bold mb-4">Comments</Text>

                {/* Comments */}
                <View className="max-h-64 overflow-y-auto">
                    {comments.length > 0 ? (
                        comments.map((c, index) => (
                            <View key={index} className="flex justify-between text-white mb-2">
                                <Text className="font-bold">{usernames[c.createdBy] || 'Loading...'}</Text>: {c.comment}
                                <Text className="text-sm text-gray-700">{new Date(c.createdAt).toLocaleString()}</Text>
                            </View>
                        ))
                    ) : (
                        <Text className="text-gray-400">No comments yet.</Text>
                    )}
                </View>

                {/* Comment Text */}
                <TextInput className="w-full mt-5 p-2 rounded-md bg-black text-white outline-none mb-4 resize-none border shadow-lg" placeholder="Comment" value={comment} onChange={(e) => setComment(e.target.value)} />

                {/* Send Comment */}
                <TouchableOpacity className="bg-gray-600 text-white px-4 py-2 rounded-md w-full" onPress={handleSend}>Send</TouchableOpacity>
            </View>
        </View>
    )
}

export default Comments