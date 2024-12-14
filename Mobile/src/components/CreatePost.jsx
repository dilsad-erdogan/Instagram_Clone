import React, { useEffect, useState } from 'react'
import { setPost } from '../firebase/post';
import { Image, Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const CreatePost = ({ isOpen, onClose }) => {
    const [caption, setCaption] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [uid, setUid] = useState(null);

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

    const handleImageChange = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.8,
        });
    
        if (!result.canceled && result.assets && result.assets.length > 0) {
            setSelectedImage(result.assets[0].uri);
        } else {
            console.log("No image selected or operation canceled");
        }
    };    

    const handlePost = async () => {
        if (!selectedImage) {
            console.error("Please select an image");
            return;
        }

        await setPost(uid, caption, selectedImage);
        setCaption('');
        setSelectedImage(null);
        onClose();
    };

    const handleClose = () => {
        setSelectedImage(null);
        onClose();
    };

    if(!isOpen) return null;

    return (
        <Modal visible={isOpen} animationType="slide" transparent={true} onRequestClose={onClose}>
            <View className="fixed inset-0 bg-black flex items-center justify-center">
                <View className="bg-black rounded-lg shadow-lg p-6 w-full max-w-md">
                    {/* Modal Close */}
                    <TouchableOpacity onPress={handleClose} className="absolute top-10 right-20">
                        <Text className="text-white text-2xl">X</Text>
                    </TouchableOpacity>

                    {/* Modal Title */}
                    <Text className="text-white text-xl font-bold mb-4">Create Post</Text>

                    {/* Caption Textarea */}
                    <TextInput className="w-full p-2 rounded-md bg-black text-white outline-none mb-4 resize-none border shadow-lg" multiline={true} numberOfLines={3} placeholder="Post caption..." placeholderTextColor="#888" value={caption} onChangeText={(text) => setCaption(text)} />

                    {/* File Upload */}
                    <TouchableOpacity className="bg-gray-600 px-4 py-2 rounded-md w-full" onPress={handleImageChange}>
                        <Text className='text-white'>Select Image</Text>
                    </TouchableOpacity>

                    {/* Display Selected Image */}
                    {selectedImage && (
                        <Image source={{ uri: selectedImage }} className="max-w-full max-h-48 rounded-md" />
                    )}

                    {/* Post Button */}
                    <TouchableOpacity className="mt-5 bg-gray-600 px-4 py-2 rounded-md w-full" onPress={handlePost}>
                        <Text className='text-white'>Post</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default CreatePost