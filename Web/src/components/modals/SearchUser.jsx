import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { searchUsers } from '../../redux/user';
import { useEffect, useState } from 'react';
import { fetchUserById, followingUser } from '../../firebase/auth/user';

const SearchUser = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();
    const searchResults = useSelector((state) => state.user.searchResults);
    const [following, setFollowing] = useState([]);
    const uid = JSON.parse(localStorage.getItem('user')).uid;

    useEffect(() => {
        const loadUserFollowing = async () => {
            const user = await fetchUserById(uid);
            setFollowing(user.following || []);
        };

        loadUserFollowing();
    }, [uid]);

    const handleFollowToggle = async (userId) => {
        const isCurrentlyFollowing = following.some((user) => user.uid === userId);
    
        // Unfollow işlemi
        if (isCurrentlyFollowing) {
            setFollowing((prev) => prev.filter((user) => user.uid !== userId));
            await followingUser(uid, userId, true);
            console.log(`Unfollowed user with id: ${userId}`);
        } 
        // Follow işlemi
        else {
            setFollowing((prev) => [...prev, { uid: userId }]);
            await followingUser(uid, userId, false);
            console.log(`Followed user with id: ${userId}`);
        }
    };  
    
    const isFollowing = (userId) => following.some((user) => user.uid === userId);
      
    const handleSearch = (e) => {
        const searchTerm = e.target.value;
        dispatch(searchUsers(searchTerm));
    };

    const handleClose = () => {
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-black rounded-lg shadow-lg p-6 w-full max-w-md">
                {/* Modal Close */}
                <button className="absolute top-10 right-20 text-white text-3xl" onClick={handleClose}>&times;</button>

                {/* Modal Title */}
                <h2 className="text-white text-xl font-bold mb-4">Search User</h2>

                {/* Search User */}
                <div className="flex flex-col gap-2">
                    <label>Username</label>
                    <input type="text" className="w-full p-2 rounded-md bg-black text-white outline-none mb resize-none border shadow-lg" placeholder="Username" onChange={handleSearch} />
                </div>

                {searchResults && (
                    <ul>
                        {searchResults.map((user) => (
                            <li key={user.uid} className="flex items-center justify-between gap-6 p-3">
                                <div className="flex items-center">
                                    <img src={user.profilePicUrl} alt="Profile" className="max-w-10 max-h-10 rounded-md" />
                                    <div className="flex flex-col gap-2">
                                        <p className="cursor-pointer px-4">{user.name}</p>
                                        <p className="cursor-pointer px-4 text-gray-600">{user.followers.length} followers</p>
                                    </div>
                                </div>
                                <div className="font-bold text-xl text-blue-600 cursor-pointer" onClick={() => handleFollowToggle(user.uid)}>
                                    {isFollowing(user.uid) ? 'Unfollow' : 'Follow'}
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

SearchUser.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default SearchUser;