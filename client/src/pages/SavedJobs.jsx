const SavedJobs = () => {
  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md border-t-4 border-blue-500">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">My Saved Jobs</h1>
      <p className="text-gray-600 mb-4">
        This is a protected page. You will only see this data if you have a valid JWT token!
      </p>
      <div className="bg-blue-50 p-4 rounded text-center text-sm text-blue-700">
        (Your bookmarked jobs will appear here)
      </div>
    </div>
  );
};

export default SavedJobs;