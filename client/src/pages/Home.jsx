import { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchJobs = async (searchQuery = "") => {
    setLoading(true);
    setError(null);
    try {
      const url = searchQuery 
        ? `http://localhost:3000/jobs/api/jobs?page=1&limit=10&search=${searchQuery}`
        : `http://localhost:3000/jobs/api/jobs?page=1&limit=10`;
        
      const response = await axios.get(url);
      setJobs(response.data.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching jobs: ", err);
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchJobs(searchTerm);
  };

  const handleSaveJob = async (jobId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to save jobs!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/saved-jobs", {job_id: jobId}, {
        headers: {
          Authorization:`Bearer ${token}`
        }
      });
      alert(response.data.message);
    } catch (err) {
      console.error("Error saving job: ", err);
      alert(err.response?.data?.message || "Failed to save jobs.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Recent Jobs</h1>
          <p className="text-gray-500 mt-2">Discover the latest opportunities aggregated from across the web.</p>
        </div>

        {/* Search bar */}
        <form onSubmit={handleSearch} className="flex w-full md:w-auto shadow-sm">
          <input 
            type="text" 
            placeholder="Search by title, company..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-72 px-4 py-2.5 border border-gray-300 rounded-l-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button 
            type="submit" 
            className="px-5 py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-r-lg hover:bg-blue-600 transition-colors"
          >
            Search
          </button>
        </form>
      </div>

      {/* States */}
      {loading && (
        <div className="flex items-center justify-center p-10">
          <p className="text-blue-600 font-semibold animate-pulse">Loading latest jobs...</p>
        </div>
      )}
      {error && (
        <div className="p-4 bg-red-50 text-red-600 border border-red-200 rounded-lg font-medium">
          Error: {error}
        </div>
      )}

      {/* Job Feed */}
      <div className="flex flex-col gap-4">
        {!loading && jobs.length === 0 && (
          <div className="p-10 text-center text-gray-500 bg-white border border-gray-200 rounded-xl">
            No jobs found matching "{searchTerm}".
          </div>
        )}

        {!loading && jobs.map((job) => (
          <div 
            key={job.id} 
            className="group p-5 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-500 font-bold text-lg shrink-0 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                {job.company.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {job.title}
                </h2>
                <div className="text-sm text-gray-500 font-medium mt-1 flex flex-wrap items-center gap-2">
                  <span className="text-gray-700">{job.company}</span>
                  <span>•</span>
                  <span>{job.location}</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-md">
                    {job.job_type}
                  </span>
                  <span className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-md">
                    {job.source}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:items-end gap-3 mt-2 md:mt-0">
              <div className="text-sm font-bold text-green-600 bg-green-50 px-3 py-1.5 rounded-lg text-center md:text-right">
                {job.salary !== "Not specified" ? job.salary : "Salary unlisted"}
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => handleSaveJob(job.id)} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Save Job">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path></svg>
                </button>
                <button className="text-sm font-semibold text-gray-500 hover:text-blue-600 transition-colors px-3 py-1.5 rounded-lg hover:bg-blue-50">
                  View Details &rarr;
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;