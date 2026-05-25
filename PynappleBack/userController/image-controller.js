const File = require('../models/file');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

dotenv.config();


const uploadImage = async (request, response) => {
    const fileObj = {
        path: request.file.path,
        name: request.file.originalname,
        user:request.body.uid
    };
    
    try {
       

        // console.log(fileObj)
        const file = await File.create(fileObj);
        // console.log(file);
        

        response.status(200).json({ path: `${process.env.backend}/api/v1/file/${file._id}` });
    } catch (error) {
        console.error(error.message);
        response.status(500).json({ error: error.message });
    }
};

const getImage = async (request, response) => {
    try {
        const file = await File.findById(request.params.fileId);
        console.log(file)
        if (!file) {
            return response.status(404).json({ msg: 'File not found' });
        }

        // console.log("File Downloaded");
        // file.downloadCount++;
        // await file.save();

        const htmlPath = path.join(__dirname, '../static/ddownload.html');
            fs.readFile(htmlPath, 'utf8', (err, html) => {
                if (err) {
                    console.error('Error reading HTML file:', err);
                    return response.status(500).send("Error reading HTML file");
                }
              
                const htmlResponse = html.replace('${token}', file._id);
                return response.status(200).send(htmlResponse);
            });

        // response.status(200).download(file.path, file.name);
    } catch (error) {
        console.error(error.message);
        response.status(500).json({ msg: error.message });
    }
};



const downloadFile = async (request, response) => {
    const file = await File.findById(request.params.fileId);
    
    try{

        if (!file) {
            return response.status(404).json({ msg: 'File not found' });
        }
        console.log("File Downloaded");
        file.downloadCount++;
        await file.save();
        return response.status(200).download(file.path, file.name);
    

    } catch (error) {
        console.error(error.message);
        response.status(500).json({ msg: error.message });
    }
};

module.exports = {
    uploadImage,
    getImage,
    downloadFile
};
