import toast from "react-hot-toast";

export const handleShare = async (postId) => {
    if (navigator.share) {
        try {
            await navigator.share({
                title: post.title,
                text: post.content,
                url: window.location.origin + '/post/' + postId
            });
            toast.success("Successfully shared")
        } catch (error) {
            console.error("Error sharing:", error);
            toast.error("Error sharing:", error)
        }
    } else {
        console.log("Web Share API not supported");
    }
};