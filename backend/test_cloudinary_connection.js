require('dotenv').config();
const cloudinary = require('cloudinary').v2;

console.log('Checking Cloudinary Config...');
console.log('Cloud Name:', process.env.CLOUDINARY_CLOUD_NAME);
console.log('API Key:', process.env.CLOUDINARY_API_KEY ? '***' + process.env.CLOUDINARY_API_KEY.slice(-4) : 'Missing');
console.log('API Secret:', process.env.CLOUDINARY_API_SECRET ? '***' + process.env.CLOUDINARY_API_SECRET.slice(-4) : 'Missing');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

cloudinary.uploader.upload('valid_test.png', { folder: 'test_upload' }, (error, result) => {
    if (error) {
        console.error('❌ Upload Failed:', JSON.stringify(error, null, 2));
    } else {
        console.log('✅ Upload Successful!');
        console.log('URL:', result.secure_url);
    }
});
