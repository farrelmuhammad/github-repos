import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getRepos } from '../store/reposReducer';

const Homepage = () => {
    const [username, setUsername] = useState('farrelmuhammad');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = () => {
        // dispatch(getRepos(username))
        navigate(`/repositories?username=${username}`)
    }

    return (
        <>
            <div className="flex h-screen items-center justify-center">
                <div className="max-w-md w-full bg-white rounded-lg shadow-2xl px-4 py-6">
                    <div className="flex flex-col items-center gap-3">
                        <h2 className="text-2xl font-semibold mb-2">Input your username github</h2>
                        <input
                            type="text"
                            className="border-gray-300 border-2 rounded-lg py-2 px-4 w-full"
                            placeholder="Enter text here..."
                            defaultValue={username}
                            onChange={(event) => setUsername(event.target.value)}
                        />
                        <button
                            className="bg-blue-500 text-white w-full py-2 px-4 rounded-lg"
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Homepage