const UserModel = require('../model/user');

const getAllUser = async (req, res) => {
    try {
        const [data] = await UserModel.getAllUser();
        res.json({
            message: 'GET data berhasil',
            data: data
        })
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error
        })
    }
}

const createNewUser = async (req, res) => {
    const {body} = req;
    try {
        await UserModel.createNewUser(body);
        res.json({
            message: 'POST data berhasil, data berhasil ditambah',
            data: body
        })
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error
        })
    }
}

const updateUser = async (req, res) => {
    const {idUser} = req.params;
    const {body} = req
    
    try {
        await UserModel.updateUser(body, idUser);
        res.json({
            message: 'PATCH data berhasil, data berhasil diubah',
            data : {
                id: idUser,
                ...body
            }
        })
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error
        })
    }

    console.log("id: ", id);
}

const deleteUser = async (req, res) => {
    const {idUser} = req.params;

    try {
        await UserModel.deleteUser(idUser);
        res.json({
            message: 'DELETE data berhasil, data berhasil dihapus'
        })
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error
        })
    }
}

module.exports = {
    getAllUser,
    createNewUser,
    updateUser,
    deleteUser
}