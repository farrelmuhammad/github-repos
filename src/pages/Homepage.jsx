import React from 'react'

const Homepage = () => {
    return (
        <>
            <div className="flex h-screen items-center justify-center">
                <div className="max-w-md w-full bg-white rounded-lg shadow-lg px-4 py-6">
                    <div className="flex flex-col items-center gap-3">
                        <h2 className="text-2xl font-semibold mb-2">Input your username github</h2>
                        <input
                            type="text"
                            className="border-gray-300 border-2 rounded-lg py-2 px-4 w-full"
                            placeholder="Enter text here..."
                            defaultValue={'farrelmuhammad'}
                        />
                        <button className="bg-blue-500 text-white w-full py-2 px-4 rounded-lg">Submit</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Homepage