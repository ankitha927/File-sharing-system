const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
    path: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    downloadCount: {
        type: Number,
        required: true,
        default: 0
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users', 
        required: true
        
    }
});

const File = mongoose.model('File', FileSchema);

module.exports = File;
