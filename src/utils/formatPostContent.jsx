const formatContent = (content) => {
    const hashtagRegex = /#(\w+)/g;
    const urlRegex = /(https?:\/\/[^\s]+)/g;

    const segments = content.split(hashtagRegex);

    const formattedContent = segments.map((segment, index) => {
        if (segment.match(hashtagRegex)) {
            // Replace hashtags with clickable links
            const hashtag = segment.replace(hashtagRegex, '<a href="/hashtag/$1">#$1</a>');
            return hashtag; // Return modified hashtag segment
        } else if (segment.match(urlRegex)) {
            // Replace URLs with clickable links
            const url = segment.replace(urlRegex, '<a href="$&">$&</a>');
            return url; // Return modified URL segment
        } else {
            return segment; // Return unchanged segment
        }
    });

    // Join the segments back together
    const joinedContent = formattedContent.join('');

    return <div dangerouslySetInnerHTML={{ __html: joinedContent }} />; // Render as HTML
};

export default formatContent;
