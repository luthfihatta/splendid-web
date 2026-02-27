import dbPool from '../config/database.js';

const getUserByEmail = (email) => {
    const SQLQuery = 'SELECT * FROM users WHERE email = ?';
    return dbPool.execute(SQLQuery, [email]);
}

const createNewUser = (userData) => {
    const SQLQuery = 'INSERT INTO users (name,email,password,provider) VALUES (?, ?, ?, ?)';
    const values = [
        userData.name,
        userData.email,
        userData.password,
        userData.provider || 'local'
    ];
    return dbPool.execute(SQLQuery, values);
}

const createGoogleUser = (userData) => {
    const SQLQuery = 'INSERT INTO users (name, email, google_id, provider) VALUES (?,?,?,?)';
    const values = [
        userData.name,
        userData.email,
        userData.google_id,
        'google'
    ];
    return dbPool.execute(SQLQuery, values)
}


export default {
    getUserByEmail,
    createNewUser,
    createGoogleUser
}