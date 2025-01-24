import { S3 } from "aws-sdk";

export const uploadToS3 = async (fileData: string, fileName: string) => {
	const s3 = new S3({
		accessKeyId: process.env.AWS_ACCESS_KEY_ID,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	});

	const params = {
		Bucket: process.env.S3_BUCKET ?? "",
		Key: fileName,
		Body: fileData
	};

	try {
		const res = await s3.upload(params).promise();
		console.log("File Uploaded with Successfull", res.Location);
		return { success: true, message: "File Uploaded with Successfull", data: res.Location };
	} catch (error) {
		return { success: false, message: "Unable to Upload the file", data: error };
	}
}
