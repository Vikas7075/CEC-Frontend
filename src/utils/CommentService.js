import axios from 'axios';

export const addComment = async (postId, content) => {
    try {
        await axios.post(`${server}/api/post/comment/${postId}`, { content }, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        });

    } catch (error) {
        throw new Error(error.response.data.message || "Failed to add comment");
    }
}

export const fetchComments = async (postId) => {
    try {
        const { data } = await axios.get(`${server}/api/post/comment/${postId}`, {
            headers: {
                "Content-Type": "application/json"
            },
        });
        return data.comments;
    } catch (error) {
        throw new Error(error.response.data.message || "Failed to fetch comments");
    }
}
