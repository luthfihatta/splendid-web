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

const getAllJobs = async (filters) => {
    const {search, source, limit, offset} = filters;

    let SQLQuery = `SELECT * FROM jobs`;
    let countQuery = `SELECT COUNT(*) as total FROM jobs`;

    let whereClauses = [];
    let values = [];

    if (search) {
        whereClauses.push('(title LIKE ? OR company LIKE ? OR location LIKE ?)');
        const searchStr = `%${search}%`;
        values.push(searchStr, searchStr, searchStr);
    }

    if (source) {
        whereClauses.push('source = ?');
        values.push(source);
    }

    if (whereClauses.length > 0) {
        const whereString = ' WHERE ' + whereClauses.join(' AND ');
        SQLQuery += whereString;
        countQuery += whereString;
    }

    SQLQuery += ` ORDER BY posted_at DESC LIMIT ${limit} OFFSET ${offset}`;

    const [data] = await dbPool.execute(SQLQuery, values);
    const [countResult] = await dbPool.execute(countQuery, values);

    return {
        data: data,
        total: countResult[0].total
    };
};

export default {addJob, getAllJobs};