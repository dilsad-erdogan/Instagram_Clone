import PropTypes from 'prop-types';

const SearchUser = ({ isOpen, onClose }) => {
    const handleClose = () => {
        onClose();
    };

    if(!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-black rounded-lg shadow-lg p-6 w-full max-w-md">
                <button className="absolute top-10 right-20 text-white text-3xl" onClick={handleClose}>&times;</button>
                
                <p>Search User</p>
            </div>
        </div>
    )
}

SearchUser.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};

export default SearchUser