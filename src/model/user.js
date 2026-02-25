const dbPool = require('../config/database');

const getAllUser = () => {
    const SQLQuery = 'SELECT * FROM user';
    return dbPool.execute(SQLQuery);
}

const createNewUser = (body) => {
    const SQLQuery = `INSERT INTO user(name,email,address) VALUES('${body.name}','${body.email}','${body.address}')`;
    return dbPool.execute(SQLQuery);
}

const updateUser = (body, idUser) => {
    const SQLQuery = `UPDATE user SET name='${body.name}', email='${body.email}', address='${body.address}' WHERE id=${idUser}`
    return dbPool.execute(SQLQuery);
}

const deleteUser = (idUser) => {
    const SQLQuery = `DELETE FROM user WHERE id=${idUser}`
    return dbPool.execute(SQLQuery);
}

module.exports = {
    getAllUser,
    createNewUser,
    updateUser,
    deleteUser
}