import multer from 'multer';
import fs from 'fs';
import path from 'path';

const uploadPath = path.join(process.cwd(), 'public', 'images');

if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + '-' + file.originalname;
        cb(null, uniqueName);
    }
});

export const uploadFile = multer({ storage: storageConfig });
