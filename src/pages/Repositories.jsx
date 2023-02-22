import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRepos } from '../store/reposReducer';

const Repositories = () => {
    const repos = useSelector((state) => state.repos);
    const [sortBy, setSortBy] = useState('stars');

    const handleSort = (event) => {
        setSortBy(event.target.value);
    };

    const sortedRepos = repos.sort((a, b) => {
        if (sortBy === 'stars') {
            return b.stargazers_count - a.stargazers_count;
        } else if (sortBy === 'date') {
            return new Date(b.created_at) - new Date(a.created_at);
        } else {
            return a.name.localeCompare(b.name);
        }
    });

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">GitHub Repositories</h2>
                    <div className="flex items-center">
                        <span className="text-gray-600 mr-2">Sort by:</span>
                        <select className="bg-white border border-gray-400 rounded-md py-1 px-3 text-gray-600 font-medium" value={sortBy} onChange={handleSort}>
                            <option value="stars">Stars</option>
                            <option value="date">Date</option>
                            <option value="name">Name</option>
                        </select>
                    </div>
                </div>
                {sortedRepos.map((repo) => (
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
        </div>
    );
};

export default Repositories;
