import dbPool from '../config/database.js';

const addJob = (job) => {
    const SQLQuery = `INSERT IGNORE INTO jobs(external_id, title, company, location, description, salary, url, source, job_type, posted_at) VALUES(?,?,?,?,?,?,?,?,?,?)`;
    const values = [
        job.external_id,
        job.title,
        job.company,
        job.location,
        job.description,
        job.salary,
        job.url,
        job.source,
        job.job_type,
        job.posted_at
    ];

    return dbPool.query(SQLQuery, values);
};

export default {addJob};