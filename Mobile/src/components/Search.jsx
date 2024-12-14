import React, { useEffect, useState } from 'react';
import { fetchUserById, followingUser, fetchAllUsers } from '../firebase/auth';
import { FlatList, Modal, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';

const Search = ({ isOpen, onClose }) => {
    const [following, setFollowing] = useState([]);
    const [uid, setUid] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);

    useEffect(() => {
        const fetchUid = async () => {
            try {
                const storedUser = await AsyncStorage.getItem('user');
                if (storedUser) {
                    const parsedUser = JSON.parse(storedUser);
                    setUid(parsedUser.uid);
                }
            } catch (error) {
                console.error('Error fetching user ID:', error);
            }
        };
        fetchUid();
    }, []);

    useEffect(() => {
        const loadUserFollowing = async () => {
            const user = await fetchUserById(uid);
            setFollowing(user.following || []);
        };

        if (uid) loadUserFollowing();
    }, [uid]);

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const allUsers = await fetchAllUsers();
                setUsers(allUsers);
                setFilteredUsers(allUsers);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        loadUsers();
    }, []);

    const handleFollowToggle = async (userId) => {
        const isCurrentlyFollowing = following.some((user) => user.uid === userId);

        if (isCurrentlyFollowing) {
            setFollowing((prev) => prev.filter((user) => user.uid !== userId));
            await followingUser(uid, userId, true);
            console.log(`Unfollowed user with id: ${userId}`);
        } else {
            setFollowing((prev) => [...prev, { uid: userId }]);
            await followingUser(uid, userId, false);
            console.log(`Followed user with id: ${userId}`);
        }
    };

    const isFollowing = (userId) => following.some((user) => user.uid === userId);

    const handleSearch = (text) => {
        setSearchTerm(text);
        const filtered = users.filter((user) =>
            user.name.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredUsers(filtered);
    };

    const handleClose = () => {
        onClose();
    };

    if (!isOpen) return null;

    return (
        <Modal visible={isOpen} animationType="slide" transparent={true} onRequestClose={onClose}>
            <View className="fixed inset-0 bg-black flex items-center justify-center">
                <View className="bg-black rounded-lg shadow-lg p-6 w-full max-w-md">
                    {/* Modal Close */}
                    <TouchableOpacity onPress={handleClose} className="absolute top-10 right-20">
                        <Text className="text-white text-2xl">X</Text>
                    </TouchableOpacity>

                    {/* Modal Title */}
                    <Text className="text-white text-xl font-bold mb-4">Search User</Text>

                    {/* Search User */}
                    <TextInput className="w-full mt-5 p-2 rounded-md bg-gray-500 text-white outline-none mb-4 resize-none border shadow-lg" placeholder="Username" value={searchTerm} onChangeText={handleSearch} />

                    <FlatList data={filteredUsers} keyExtractor={(item) => item.uid} renderItem={({ item }) => (
                        <View className="flex flex-row items-center justify-between gap-6 p-3">
                            <View className="flex items-center">
                                <Image source={{ uri: item.profilePicUrl }} className="max-w-10 max-h-10 rounded-md" />

                                <View className="flex flex-col gap-2">
                                    <Text className="cursor-pointer px-4 text-white">{item.name}</Text>
                                    <Text className="cursor-pointer px-4 text-gray-600">
                                        {item.followers.length} followers
                                    </Text>
                                </View>
                            </View>

                            <TouchableOpacity onPress={() => handleFollowToggle(item.uid)}>
                                <Text className="font-bold text-xl text-blue-600 cursor-pointer">
                                    {isFollowing(item.uid) ? 'Unfollow' : 'Follow'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}/>
                </View>
            </View>
        </Modal>
    );
};

export default Search;