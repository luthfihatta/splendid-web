import JobsModel from '../model/jobs.js';
import axios from 'axios';


export const fetchJoobleJobs = async (req,res) => {
    try {
        const url = `https://id.jooble.org/api/${process.env.JOOBLE_API_ID}`;
        const maxPagesToFetch = 5;
        let totalJobsFetched = 0;
        let totalNewJobsAdded = 0;
        console.log("Starting Jooble Aggregator...");

        for(let currentPage = 1; currentPage <= maxPagesToFetch; currentPage++){
            console.log(`Fetching jooble data - Page ${currentPage}`);
            
            const response = await axios.post(url, {
                keywords: 'IT Developer',
                location: 'Indonesia',
                page: currentPage
            });
    
            const jobsData = response.data.jobs;
    
            if (!jobsData || jobsData.length === 0) {
                console.log(`No more jobs found on page ${currentPage}. Stopping fetch.`);
                break;
            }
    
            totalJobsFetched += jobsData.length;
    
            for (let job of jobsData) {
                const normalizedJob = {
                    external_id: `JOOBLE-${job.id}`,
                    title: job.title || "No Title",
                    company: job.company || "Unknown Company",
                    location: job.location || "Remote/Unspecified",
                    description: job.snippet || "",
                    salary: job.salary || "Not specified",
                    url: job.link || "",
                    source: "Jooble",
                    job_type: job.type || "Full-time",
                    posted_at: job.updated ? new Date(job.updated) : new Date()
                }
                const [result] = await JobsModel.addJob(normalizedJob);
                
                if (result.affectedRows > 0) {
                    totalNewJobsAdded++;
                }
            }

        }
        res.status(200).json({
            message: "Successfully fetched and synced jobs from Jooble.",
            pages_scanned: maxPagesToFetch,
            total_jobs_fetched: totalJobsFetched,
            new_jobs_added: totalNewJobsAdded
        });

    } catch (error) {
        console.error("Jooble fetch error:", error.message);
        res.status(500).json({
            message: 'Server error while fetching data from Jooble',
            serverMessage: error.message
        });
    };
};

export const fetchAdzunaJobs = async (req,res) => {
    try {
        const appId = process.env.ADZUNA_APP_ID;
        const appKey = process.env.ADZUNA_APP_KEY;
        const maxPagesToFetch = 5;
        let totalJobsFetched = 0;
        let totalNewJobsAdded = 0;
        console.log("Starting Adzuna Aggregator...");

        for(let currentPage = 1; currentPage <= maxPagesToFetch; currentPage++){
            console.log(`Fetching Adzuna data - Page ${currentPage}`);

            const url = `https://api.adzuna.com/v1/api/jobs/us/search/${currentPage}`;
            
            const response = await axios.get(url, {
                params: {
                    app_id: appId,
                    app_key: appKey,
                    what: 'IT Developer',
                    results_per_page:30
                }
            });
    
            const jobsData = response.data.results;
    
            if (!jobsData || jobsData.length === 0) {
                console.log(`No more jobs found on page ${currentPage}. Stopping fetch.`);
                break;
            }
    
            totalJobsFetched += jobsData.length;
    
            for (let job of jobsData) {
                const normalizedJob = {
                    external_id: `ADZUNA-${job.id}`,
                    title: job.title || "No Title",
                    company: job.company?.display_name || "Unknown Company",
                    location: job.location?.display_name || "Remote/Unspecified",
                    description: job.description || "",
                    salary: job.salary_min ? `$${job.salary_min} - $${job.salary_max}` : "Not specified",
                    url: job.redirect_url || "",
                    source: "Adzuna",
                    job_type: job.contract_time || "Full-time",
                    posted_at: job.created ? new Date(job.created) : new Date()
                }
                const [result] = await JobsModel.addJob(normalizedJob);
                
                if (result.affectedRows > 0) {
                    totalNewJobsAdded++;
                }
            }

        }
        res.status(200).json({
            message: "Successfully fetched and synced jobs from Adzuna.",
            pages_scanned: maxPagesToFetch,
            total_jobs_fetched: totalJobsFetched,
            new_jobs_added: totalNewJobsAdded
        });

    } catch (error) {
        console.error("Jooble fetch error:", error.message);
        res.status(500).json({
            message: 'Server error while fetching data from Adzuna',
            serverMessage: error.message
        });
    };
};