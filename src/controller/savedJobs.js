import SavedJobsModel from '../model/savedJobs.js';

export const saveJob = async (req, res) => {
    const {job_id} = req.body;
    const user_id = req.user.id;
    if (!job_id) {
        return res.status(400).json({ message: "job_id is required! "})
    }

    try {
        const [result] = await SavedJobsModel.saveJob(user_id, job_id);

        if (result.affectedRows === 0) {
            res.status(400).json({ message: "Job is already saved!" })
        }
        res.status(200).json({message: "Job saved to your bookmarks"})
    } catch (error) {
        console.error("Save Job Error:", error.message);
        res.status(500).json({ message: "Server Error", serverMessage: error.message });
    }
};

export const getMySavedJobs = async (req, res) => {
    const user_id = req.user.id;

    try {
        const [jobs] = await SavedJobsModel.getSavedJobsByUser(user_id);
        res.status(200).json({
            message: "Successfully fetched your saved jobs",
            total: jobs.length,
            data: jobs
        })
    } catch (error) {
        console.error("Fetch Saved Jobs Error:", error.message);
        res.status(500).json({ message: "Server Error", serverMessage: error.message });
    }
};

export const unsaveJob = async (req, res) => {
    const {job_id} = req.params;
    const user_id = req.user.id;

    try {
        const [result] = await SavedJobsModel.unsaveJob(user_id, job_id);

        if (result.affectedRows === 0) {
            res.status(404).json({ message: "Job not found in your saved list"});
        }

        res.status(200).json({ message: "Job removed from your bookmarks"});
    } catch (error) {
        console.error("Fetch Saved Jobs Error:", error.message);
        res.status(500).json({ message: "Server Error", serverMessage: error.message });
    }
}