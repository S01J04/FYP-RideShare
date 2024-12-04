import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

export default async function uploadOnCloudnary(localFilePath) {
    // Configure Cloudinary
    cloudinary.config({
        cloud_name: process.env.cloud_name,
        api_key: process.env.api_key,
        api_secret: process.env.api_secret,
    });

    try {
        // Upload the file to Cloudinary
        const uploadResult = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto',
        });

        console.log("File uploaded successfully:", uploadResult.url);

        // Optionally clean up the local file after upload
        fs.unlinkSync(localFilePath);

        return uploadResult; // Return the resolved result
    } catch (error) {
        console.error("Error during file upload:", error);

        // Clean up the local file in case of error
        if(fs.existsSync(localFilePath))
       {
        fs.unlinkSync(localFilePath)
       }

        throw error; // Rethrow the error to be handled by the caller
    }
}
