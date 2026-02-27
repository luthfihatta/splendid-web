import dbPool from '../config/database.js';

const getUserByEmail = (email) => {
    const SQLQuery = 'SELECT * FROM user WHERE email = ?';
    return dbPool.execute(SQLQuery, [email]);
}

const createNewUser = (userData) => {
    const SQLQuery = 'INSERT INTO user(name,email,password,provider) VALUES(?, ?, ?, ?)';
    values = [
        userData.name,
        userData.email,
        userData.password,
        userData.provider || 'local'
    ];
    return dbPool.execute(SQLQuery, values);
}


export default {
    getUserByEmail,
    createNewUser
}