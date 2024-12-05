import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { addCommentToPost } from '../../firebase/post/post';
import { fetchUserById } from '../../firebase/auth/user';

const Comments = ({ isOpen, onClose, post, onCommentAdded }) => {
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState(post.comments || []);
    const [usernames, setUsernames] = useState({});
    const uid = JSON.parse(localStorage.getItem('user')).uid;

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
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-black rounded-lg shadow-lg p-6 w-full max-w-md">
                {/* Modal Close */}
                <button className="absolute top-10 right-20 text-white text-3xl" onClick={handleClose}>&times;</button>

                {/* Modal Title */}
                <h2 className="text-white text-xl font-bold mb-4">Comments</h2>

                {/* Comments */}
                <div className="max-h-64 overflow-y-auto">
                    {comments.length > 0 ? (
                        comments.map((c, index) => (
                            <div key={index} className="flex justify-between text-white mb-2">
                                <p>
                                    <strong className="font-bold">{usernames[c.createdBy] || 'Loading...'}</strong>: {c.comment}
                                </p>
                                <p className="text-sm text-gray-700">{new Date(c.createdAt).toLocaleString()}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-400">No comments yet.</p>
                    )}
                </div>

                {/* Comment Text */}
                <input type="text" className="w-full mt-5 p-2 rounded-md bg-black text-white outline-none mb-4 resize-none border shadow-lg" placeholder="Comment" value={comment} onChange={(e) => setComment(e.target.value)} />

                {/* Send Comment */}
                <button className="bg-gray-600 text-white px-4 py-2 rounded-md w-full" onClick={handleSend}>Send</button>
            </div>
        </div>
    );
};

Comments.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    onCommentAdded: PropTypes.func.isRequired,
};

export default Comments;