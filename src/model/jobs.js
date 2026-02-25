const dbPool = require('../config/database');

const AddJobs = (job) => {
    const SQLQuery = `INSERT INTO jobs(title, description, location, company, salary) VALUES(?,?,?,?,?)`;
    const values = [
        job.title,
        job.description,
        job.location.display_name,
        job.company.display_name,
        job.salary_min
    ]

    dbPool.query(SQLQuery, values, (err, result) => {
        if (err) console.error("Data pekerjaan tidak tersimpan, ", err.message);
    })
}

module.exports = {AddJobs};