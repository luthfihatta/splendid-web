const JobsModel = require('../model/jobs');
const axios = require('axios');


const getAdzunaJobs = async (req,res) => {
    try {
        const response = await axios.get('https://api.adzuna.com/v1/api/jobs/us/search/1', {
            params: {
                app_id: process.env.ADZUNA_APP_ID,
                app_key: process.env.ADZUNA_APP_KEY,
                what: 'backend developer',
                results_per_page: 5
            }
        });

        const jobs = response.data.results;

        jobs.forEach(JobsModel.AddJobs)

        res.json({ 
            message: "Berhasil mengambil data dari Adzuna & disimpan ke MySQL!",
            total_data: jobs.length 
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error
        })
    }
}

module.exports = {getAdzunaJobs};