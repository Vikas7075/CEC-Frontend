import React from 'react';
import { Link, useParams } from 'react-router-dom';

const LeftSidebar = ({ user }) => {
    console.log(user)
    const toggleActivity = () => {
        // Define your toggleActivity function logic here
    };
    //console.log(userData);    
    //const { userId } = useParams().id;

    return (
        <div className="left-sidebar">
            <div className="sidebar-profile-box">
                <img className=' h-[110px] object-cover' src={user.profilePicture || 'https://cdn.vectorstock.com/i/preview-1x/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg'} width="100%" alt="cover-pic" />
                <div className="sidebar-profile-info">
                    <img src={user.profilePicture || 'https://png.pngtree.com/element_our/20200610/ourmid/pngtree-character-default-avatar-image_2237203.jpg'} alt="user-1" />
                    <Link className=' hover:underline' to={`/userdashboard/${user._id}`}><h1>{user.username}</h1></Link>
                    <h3>{user.headline}</h3>
                    <p>{user.country}, {user.city}</p>
                    <ul>
                        <li>
                            Your profile views <span>1</span>
                        </li>
                        <li>
                            Your post views <span>1</span>
                        </li>
                        <li>
                            Your connections <span>1+</span>
                        </li>
                    </ul>
                </div>
                <div className="sidebar-profile-link">
                    <a href="#">
                        <img src="./images/items.png" alt="items" />
                        My items
                    </a>
                    <a href="#">
                        <img src="./images/premium.png" alt="premium" />
                        Try Premium
                    </a>
                </div>
            </div>
            <div className="sidebar-activity" id="sidebarActivity">
                <h3>Recent</h3>
                <a href="#">
                    <img src="./images/recent.png" alt="recent" />
                    Data Science
                </a>
                <a href="#">
                    <img src="./images/recent.png" alt="recent" />
                    Onlne learning
                </a>
                <a href="#">
                    <img src="./images/recent.png" alt="recent" />
                    Group learning
                </a>
                <a href="#">
                    <img src="./images/recent.png" alt="recent" />
                    User interface
                </a>
                <a href="#">
                    <img src="./images/recent.png" alt="recent" />
                    Full stack development
                </a>
                <a href="#">
                    <img src="./images/recent.png" alt="recent" />
                    Web development
                </a>
                <h3>Group</h3>
                <a href="#">
                    <img src="./images/group.png" alt="group" />
                    Web design group
                </a>
                <a href="#">
                    <img src="./images/group.png" alt="group" />
                    HTML CSS JS
                </a>
                <a href="#">
                    <img src="./images/group.png" alt="group" />
                    Python for data science
                </a>
                <a href="#">
                    <img src="./images/group.png" alt="group" />
                    Machine Learning
                </a>
                <h3>HASTAG</h3>
                <a href="#">
                    <img src="./images/hashtag.png" alt="hashtag" />
                    learncodeonline
                </a>
                <a href="#">
                    <img src="./images/hashtag.png" alt="hashtag" />
                    webdevlopment
                </a>
                <a href="#">
                    <img src="./images/hashtag.png" alt="hashtag" />
                    onlinelearning
                </a>
                <a href="#">
                    <img src="./images/hashtag.png" alt="hashtag" />
                    development
                </a>
                <div className="discover-more-link">
                    <a href="#">Discover More </a>
                </div>
            </div>
            <p id="showMoreLink" onClick={toggleActivity}>
                Show More <b>+</b>
            </p>
        </div >
    );
};

export default LeftSidebar;
