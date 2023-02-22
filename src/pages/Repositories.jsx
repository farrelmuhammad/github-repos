import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Footer from '../components/Footer';
import { getRepos } from '../store/reposReducer';

function LoadingCard() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array(3).fill().map((_, index) => {
                return (
                    <div key={index} className="bg-white rounded-lg shadow-md p-4 mb-4 hover:shadow-xl">
                        <div className="animate-pulse flex space-x-4">
                            <div className="flex-1 space-y-4 py-1">
                                <div className="h-4 bg-gray-400 rounded w-3/4"></div>
                                <div className="h-4 bg-gray-400 rounded"></div>
                                <div className="flex items-center gap-2">
                                    <div className="h-4 bg-gray-400 rounded w-1/4"></div>
                                    <div className="h-4 bg-gray-400 rounded w-1/4"></div>
                                </div>

                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

const Repositories = () => {
    const dispatch = useDispatch();
    const repos = useSelector((state) => state.repos);
    const [sortBy, setSortBy] = useState('stars');
    const [isLoading, setIsLoading] = useState(true);
    const [pageNumber, setPageNumber] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const username = searchParams.get('username');

    useEffect(() => {
        setIsLoading(true)
        dispatch(getRepos(username, pageNumber))
            .then(() => setIsLoading(false));
    }, [dispatch, username, pageNumber]);

    useEffect(() => {
        setPageNumber(1);
        setHasMore(true);
    }, [username])

    const handleSort = (event) => {
        setSortBy(event.target.value);
    };

    const handleScroll = () => {
        if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 500 && hasMore && !isLoading) {
            setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    const sortedRepos = repos.sort((a, b) => {
        if (sortBy === 'stars') {
            return b.stargazers_count - a.stargazers_count;
        } else if (sortBy === 'date') {
            return new Date(b.created_at) - new Date(a.created_at);
        } else {
            return a.name.localeCompare(b.name);
        }
    });

    const displayedRepos = sortedRepos.slice(0, pageNumber * 12);

    useEffect(() => {
        setHasMore(displayedRepos.length < sortedRepos.length);
    }, [displayedRepos.length, sortedRepos.length]);

    return (
        <>
            <div className="bg-gray-100 min-h-screen">
                <div className="container mx-auto px-4 py-8">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-bold text-gray-800">GitHub Repositories : {username}</h2>
                        <div className="flex items-center">
                            <span className="text-gray-600 mr-2">Sort by:</span>
                            <select className="bg-white border border-gray-400 rounded-md py-1 px-3 text-gray-600 font-medium" value={sortBy} onChange={handleSort}>
                                <option value="stars">Stars</option>
                                <option value="date">Date</option>
                                <option value="name">Name</option>
                            </select>
                        </div>
                    </div>
                    {isLoading ? (
                        <LoadingCard />
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {displayedRepos.map((repo) => (
                                <div key={repo.id} className="bg-white rounded-lg shadow-md p-4 mb-4 hover:shadow-xl">
                                    <h3 className="text-lg font-bold mb-2 text-gray-800 hover:text-blue-500">
                                        <a href={repo.html_url} target="_blank" rel="noreferrer">
                                            {repo.name}
                                        </a>
                                    </h3>
                                    <p className="text-gray-600 mb-2">{repo.description}</p>
                                    <div className="flex items-center">
                                        <span className="inline-block bg-gray-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                                            {repo.language}
                                        </span>
                                        <span className="text-sm text-gray-500">{repo.stargazers_count} stars</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    {repos.length === 0 && !isLoading ? (
                        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
                            <h3 className="text-lg font-bold mb-2 text-gray-800">No repositories found</h3>
                        </div>
                    ) : null}
                </div>
            </div>
        </>
    );
};

export default Repositories;
