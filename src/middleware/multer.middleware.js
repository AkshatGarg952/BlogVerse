import 'dotenv/config';

import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v2 as cloudinary } from 'cloudinary';


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// 🔹 Configure Multer to Use Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'blog-images', // Change this to any folder name you want
    allowed_formats: ['jpg', 'png', 'jpeg']
  }
});
export const upload = multer({ storage });


