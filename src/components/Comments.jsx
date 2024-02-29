import React, { useContext } from 'react'
import { Context, server } from '../main';
import { calculateTimeDifference } from '../utils/timeUtils';

function Comments({ comment }) {
    const { isAuthenticated, setIsAuthenticated, setLoading } = useContext(Context);
    return (
        <>
            <section className="w-full rounded-lg border-2 border-purple-200 p-2 my-2 mx-auto max-w-xl">
                <div className="flex mt-1">
                    <div className="w-12 h-12 rounded-full bg-purple-400/50 flex-shrink-0 flex items-center justify-center">
                        <img className="h-12 w-12 rounded-full object-cover" src={comment.user.profilePicture}
                            alt="userProfile" />
                    </div>
                    <div className="ml-3 p-1 w-full bg-gray-100">
                        <div className='flex justify-between items-center'>
                            <h2 className="font-bold text-purple-800">{comment.user.username}</h2>
                            <p>{calculateTimeDifference(comment.createdAt)}</p>
                        </div>

                        <div className="text-gray-600 text-sm font-light">{comment.user.headline}</div>
                        <div className="mt-2 text-black font-normal">{comment.content}
                        </div>
                    </div>
                </div>


            </section>
        </>
    )
}

export default Comments