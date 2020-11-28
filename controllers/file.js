const FileService = require('../services/file');
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

exports.list = async function (req, res, next) {
    const page = req.query.page ? req.query.page : 1;
    try {
        const users = await FileService.getFiles({}, page);
        return res.status(200).json({ status: 200, data: users, message: "List of files" });
    } catch (err) {
        return res.status(400).json({ status: 400, message: err.message });
    }
}

exports.remove = async function (req, res, next) {
    try {
        const { id } = req.body;

        const fileToBeRemoved = {
            _id: id,
            user_id: res.userId,
          };

        const checkFile = await FileService.getFile({_id: id});
        const fileKey = checkFile.path.match(/\/([^\/]+)\/?$/)[1];
        const s3bucket = new AWS.S3({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: process.env.AWS_DEFAULT_REGION,
        });
      
        // Where you want to store your file
        const params = {
          Bucket: process.env.AWS_BUCKET,
          Key: 'test/' + fileKey,
        };

        s3bucket.deleteObject(params, async function(err, data) {
            if (err) {
              return res.status(400).json({ status: 400, error: true, message: err });
            } else {
                const file = await FileService.remove(fileToBeRemoved);
                return res.status(200).json({ status: 200, data: file, message: "Removed file" });            
            }
        });
        
    } catch (err) {
        return res.status(400).json({ status: 400, message: err.message });
    }
}

exports.create = async function (req, res, next) {
    try {
        const file = req.file;
        const s3FileURL = process.env.AWS_Uploaded_File_URL_LINK;
        if (!file) {
            return res.status(400).json({status: 400, message: 'File must be uploaded'});
        }

        if (file.size >= 10000000) {
            // If file is more than 10MB
            return res.status(400).json({status: 400, message: 'File size must be less than 10 MB'});
        }

        const s3bucket = new AWS.S3({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: process.env.AWS_DEFAULT_REGION,
        });
      
        // Where you want to store your file
        const params = {
          Bucket: process.env.AWS_BUCKET,
          Key: 'test/' + uuidv4() + (file.originalname.trim()),
          Body: file.buffer,
          ContentType: file.mimetype,
          ACL: "public-read"
        };

        s3bucket.upload(params, async function(err, data) {
            if (err) {
              return res.status(400).json({ status: 400, error: true, message: err });
            } else {
              const newFileUploaded = {
                name: file.originalname,
                user_id: res.userId,
                path: s3FileURL + '/' + params.Key,
              };
              const fileUploaded = await FileService.create(newFileUploaded);

              return res.status(201).json({ status: 200, data: fileUploaded, message: "File uploaded successfully" });              
            }
        });

    } catch (err) {
        return res.status(400).json({ status: 400, message: err.message });
    }
}
