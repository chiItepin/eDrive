const File = require('../models/file')

exports.getFiles = async function (query, page, limit) {
    try {
        const files = await File.find(query)
        return files;
    } catch (err) {
        // Log Errors
        console.log(err)
        throw Error('Error while retrieving files')
    }
}

exports.getFile = async function (query) {
    try {
        const file = await File.findOne(query)
        return file;
    } catch (err) {
        console.log(err)
        throw Error('Error while retrieving file')
    }
}

exports.create = async function (body) {
    try {
        const file = await File.create(body)
        return file;
    } catch (err) {
        console.log(err)
        throw Error('Error while creating file')
    }
}