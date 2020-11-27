const File = require('../models/file')

exports.getFiles = async function (query, page = 1) {
    try {
        const PAGE_SIZE = 20;
        const skip = (page - 1) * PAGE_SIZE; // For page 1, the skip is: (1 - 1) * 20 => 0 * 20 = 0
        const files = await File.find(query)
        .skip(skip) // Always apply 'skip' before 'limit'
        .limit(PAGE_SIZE)
        .sort('-createdAt')
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

exports.remove = async function (body) {
    try {
        const file = await File.deleteOne(body)
        return file;
    } catch (err) {
        console.log(err)
        throw Error('Error while removing file')
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