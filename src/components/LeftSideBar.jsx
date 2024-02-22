import React from 'react';

const LeftSidebar = () => {
    const toggleActivity = () => {
        // Define your toggleActivity function logic here
    };

    return (
        <div className="left-sidebar">
            <div className="sidebar-profile-box">
                <img src="./images/cover-pic.png" width="100%" alt="cover-pic" />
                <div className="sidebar-profile-info">
                    <img src="./images/user-1.png" alt="user-1" />
                    <h1>Vikas Prajapati</h1>
                    <h3>Student at UIM (Fugs)</h3>
                    <ul>
                        <li>
                            Your profile views <span>100</span>
                        </li>
                        <li>
                            Your post views <span>240</span>
                        </li>
                        <li>
                            Your connections <span>500+</span>
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
        </div>
    );
};

export default LeftSidebar;
