const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/productImages/');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() + Math.round(Math.random() * 1e9) + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage
});

module.exports = {
    upload,
};