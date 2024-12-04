import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { searchUsers } from '../../redux/user';

const SearchUser = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();
    const searchResults = useSelector((state) => state.user.searchResults);

    const handleSearch = (e) => {
        const searchTerm = e.target.value;
        dispatch(searchUsers(searchTerm));
    };

    const handleClose = () => {
        onClose();
    };

    if(!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-black rounded-lg shadow-lg p-6 w-full max-w-md">
                {/* Modal Close */}
                <button className="absolute top-10 right-20 text-white text-3xl" onClick={handleClose}>&times;</button>
                
                {/* Modal Title */}
                <h2 className="text-white text-xl font-bold mb-4">Search User</h2>

                {/* Search User */}
                <div className='flex flex-col gap-2'>
                    <label>Username</label>
                    <input type="text" className="w-full p-2 rounded-md bg-black text-white outline-none mb-4 resize-none border shadow-lg" placeholder="Username" onChange={handleSearch} />
                </div>

                {searchResults && (
                    <ul>
                        {searchResults.map((user) => (
                            <li key={user.uid} className='flex items-center gap-6 p-3'>
                                <img src={user.profilePicUrl} alt="Profile" className="max-w-5 max-h-5 rounded-md" />
                                <div className='flex flex-col gap-2'>
                                    <p className="cursor-pointer px-4">{user.name}</p>
                                    <p className="cursor-pointer px-4 text-gray-600">{user.followers.length} followers</p>  
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}

SearchUser.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};

export default SearchUser