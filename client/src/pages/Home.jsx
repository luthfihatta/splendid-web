import { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:3000/jobs/api/jobs?page=1&limit=10');
        setJobs(response.data.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching jobs: ", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Public Job Board</h1>
      {loading && <p className="text-blue-500 font-semibold">Fetching jobs from backend...</p>}
      {error && <p className="text-red-500 font-semibold">Error: {error}</p>}
      <div className="flex flex-col gap-4">
        {!loading && jobs.map((job) => (
          <div key={job.id} className="p-4 bg-white rounded shadow border border-gray-200">
            <h2 className="text-xl font-bold text-blue-600">{job.title}</h2>
            <p className="text-gray-700 font-medium">{job.company} • {job.location}</p>
            <span className="inline-block mt-2 px-2 py-1 bg-gray-100 text-xs font-semibold text-gray-600 rounded">
              Source: {job.source}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;