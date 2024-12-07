import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { updateUser } from '../../firebase/auth/user';
import toast from 'react-hot-toast';

const EditProfile = ({ isOpen, onClose, user }) => {
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const previewUrl = URL.createObjectURL(file);
            setSelectedImage({ previewUrl, file });
        }
    };

    const handleClose = () => {
        setSelectedImage(null);
        onClose();
    };

    const handleEdit = async () => {
        if(!selectedImage) {
            toast.error("Please select an image");
            return;
        }

        await updateUser(user.uid, name, bio, selectedImage);
        onClose();
    };

    useEffect(() => {
        if (user) {
            setName(user.name || '');
            setBio(user.bio || '');
        }
    }, [user]);

    if(!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-black rounded-lg shadow-lg p-6 w-full max-w-md">
                {/* Modal Close */}
                <button className="absolute top-10 right-20 text-white text-3xl" onClick={handleClose}>&times;</button>
                
                {/* Modal Title */}
                <h2 className="text-white text-xl font-bold mb-4">Edit Profile</h2>

                {/* Profile Image */}
                <div className="flex items-center justify-center gap-5 mt-6">
                    <img src={selectedImage?.previewUrl || user.profilePicUrl} alt="Profile pic" className="max-w-24 max-h-24 rounded-full object-cover"/>
                    <label htmlFor="fileInput" className="cursor-pointer bg-gray-600 text-white px-4 py-2 rounded-md w-full text-center">
                        Edit Profile Pic
                    </label>
                </div>

                {/* File Upload */}
                <div className="hidden">
                    <input id="fileInput" type="file" className="hidden" onChange={handleImageChange} />
                </div>

                {/* User Name */}
                <div className="flex flex-col mt-5 gap-2">
                    <label>Username</label>
                    <input type="text" className="w-full p-2 rounded-md bg-black text-white outline-none mb resize-none border shadow-lg" placeholder={user?.name} value={name} onChange={(e) => setName(e.target.value)} />
                </div>

                {/* User Bio */}
                <div className="flex flex-col mt-5 gap-2">
                    <label>Bio</label>
                    <input type="text" className="w-full p-2 rounded-md bg-black text-white outline-none mb resize-none border shadow-lg" placeholder={user?.bio} value={bio} onChange={(e) => setBio(e.target.value)} />
                </div>

                {/* Save Button */}
                <button className="bg-gray-600 text-white px-4 py-2 rounded-md w-full mt-5" onClick={handleEdit}>Save Change</button>
            </div>
        </div>
    )
}

EditProfile.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
};

export default EditProfile