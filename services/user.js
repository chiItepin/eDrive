const User = require('../models/user')

exports.getUsers = async function (query, page, limit) {
    try {
        const users = await User.find(query)
        return users;
    } catch (err) {
        // Log Errors
        console.log(err)
        throw Error('Error while retrieving Users')
    }
}

exports.getUser = async function (query) {
    try {
        const user = await User.findOne(query)
        return user;
    } catch (err) {
        console.log(err)
        throw Error('Error while retrieving User')
    }
}

exports.create = async function (body) {
    try {
        const user = await User.create(body)
        return user;
    } catch (err) {
        console.log(err)
        throw Error('Error while creating User')
    }
}