const express = require('express');
const { registerUser, loginUser, getUsers} = require('../userController');
const { userRegisterValidate, userLoginValidate } = require('../utils/userValiadation');
const { ensureAuthenticated } = require('../utils/auth');
const {Links}=require('../utils/getlinks.js')
const getIp =require('../utils/getIp')
const routes = express.Router();
const {tuploadImage, tgetImage,tdownloadFile}= require('../userController/a.js')


routes.get('/test', (req, res) => {
    res.status(200).json({ message: 'API is working' });
})
routes.post('/register', userRegisterValidate ,registerUser);
// routes.post('/register' ,registerUser);


routes.post('/login', userLoginValidate, loginUser);

routes.get('/users', ensureAuthenticated, getUsers);

const upload =require('../utils/upload.js');
const { uploadImage, getImage,downloadFile } =require('../userController/image-controller.js');


routes.post('/upload', upload.single('file'), uploadImage);
routes.get('/file/:fileId', getImage);
routes.get('/download/:fileId',getIp,downloadFile );


routes.post('/getlinks',Links)


// Tem files
routes.post('/tupload', upload.single('file'), tuploadImage);
routes.get('/tfile/:fileId', tgetImage);
routes.get('/tdownload/:fileId',tdownloadFile );



  

module.exports = routes;