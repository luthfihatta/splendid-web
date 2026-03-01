import dbPool from "../config/database.js";

const saveJob = (userId, jobId) => {
    const SQLQuery = 'INSERT IGNORE INTO saved_jobs(user_id, job_id) VALUES (?,?)'
    return dbPool.query*(SQLQuery, [userId, jobId])
};

const getSavedJobsByUser = (userId) => {
    const SQLQuery = `SELECT *, saved_jobs.saved_at 
                      FROM saved_jobs
                      JOIN jobs ON saved_jobs.job_id = jobs.id
                      WHERE saved_jobs.user_id = ?
                      ORDER BY saved_jobs.saved_at DESC`;
    return dbPool.query(SQLQuery, [userId]);
};

const unsaveJob = (userId, jobId) => {
    const SQLQuery = 'DELETE FROM saved_jobs WHERE user_id=? AND job_id=?';
    return dbPool.query(SQLQuery, [userId, jobId]);
}

export default {saveJob, getSavedJobsByUser, unsaveJob};