import React, { useContext, useEffect, useState } from 'react'
import LeftSidebar from '../components/LeftSideBar'
import MainContent from '../components/MainContent'
import RightSidebar from '../components/RightSidebar'
import { Context, server } from '../main';
import axios from 'axios';
import toast from 'react-hot-toast';
import Login from './Login'
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../components/Loader';

function Home() {

    const [user, setUser] = useState({});
    const { setIsAuthenticated, setLoading } = useContext(Context);
    // const userId = useParams().id;
    // //const id = "65d819f1604aae6153edf1c8"
    // console.log(userId)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const { data } = await axios.get(`${server}/api/users`, {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true

                });
                console.log(data.user)
                setUser(data.user);
                toast.success(data.user.message);
                setIsAuthenticated(true);

                // // Fetch education details for each education ID
                // const educationPromises = data.education.map(async (eduId) => {
                //     const eduResponse = await axios.get(`${server}/api/education/` + eduId);
                //     return eduResponse.data;
                // });
                // const educationResults = await Promise.all(educationPromises);
                // setEducationData(educationResults);

            } catch (error) {
                toast.error(error.response.data.message);
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        }
        fetchData();

    }, []);
    //console.log(user)

    // Check if user exists before rendering
    if (!user) {
        return <Loader />
    }


    return (
        <div className='container'>
            <LeftSidebar user={user} />
            <MainContent />
            <RightSidebar />

        </div>
    )
}

export default Home