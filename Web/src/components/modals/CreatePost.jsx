import PropTypes from 'prop-types';
import { useState } from 'react';
import { setPost } from '../../firebase/post/post';

const CreatePost = ({ isOpen, onClose }) => {
    const [caption, setCaption] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const uid = JSON.parse(localStorage.getItem('user')).uid;

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedImage(URL.createObjectURL(file));
        }
    };

    const handlePost = async () => {
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
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-black rounded-lg shadow-lg p-6 w-full max-w-md">
                {/* Modal Close */}
                <button className="absolute top-10 right-20 text-white text-3xl" onClick={handleClose}>&times;</button>
                
                {/* Modal Title */}
                <h2 className="text-white text-xl font-bold mb-4">Create Post</h2>

                {/* Caption Textarea */}
                <textarea className="w-full p-2 rounded-md bg-black text-white outline-none mb-4 resize-none border shadow-lg" rows="3" placeholder="Post caption..." value={caption} onChange={(e) => setCaption(e.target.value)}></textarea>

                {/* File Upload */}
                <div className="flex items-center justify-center mb-4">
                    <label htmlFor="fileInput" className="cursor-pointer bg-black text-white px-4 py-2 rounded-md border shadow-lg">Select Image</label>
                    <input id="fileInput" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                </div>

                {/* Image Preview */}
                {selectedImage && (
                    <div className="flex items-center justify-center mb-4">
                        <img src={selectedImage} alt="Selected" className="max-w-full max-h-48 rounded-md" />
                    </div>
                )}

                {/* Post Button */}
                <button className="bg-gray-600 text-white px-4 py-2 rounded-md w-full" onClick={handlePost}>Post</button>
            </div>
        </div>
    )
}

CreatePost.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};

export default CreatePost