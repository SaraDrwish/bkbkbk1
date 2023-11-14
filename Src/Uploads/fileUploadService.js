const fs = require('fs/promises');
const path = require('path');

const uploadDirectory = 'uploads/';

const fileUploadService = {
    uploadFile: async (file) => {
        const fileName = Date.now() + '-' + file.originalname;
        const filePath = path.join(__dirname, '..', uploadDirectory, fileName);

         await fs.mkdir(path.dirname(filePath), { recursive: true });

         await fs.rename(file.path, filePath);

        return fileName;
    },

    deleteFile: async (fileName) => {
        const filePath = path.join(__dirname, '..', uploadDirectory, fileName);

        try {
             await fs.unlink(filePath);
        } catch (error) {
             console.error('Error deleting file:', error.message);
        }
    },
};

module.exports = fileUploadService;
