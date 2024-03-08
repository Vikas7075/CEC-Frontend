export const handleShare = async () => {
    if (navigator.share) {
        try {
            await navigator.share({
                title: post.title,
                text: post.content,
                url: window.location.origin + '/post/' + post._id
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