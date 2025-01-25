import { S3 } from "aws-sdk";

export const uploadToS3 = async (fileData: string, fileName: string) => {
	const s3 = new S3({
		accessKeyId: process.env.AWS_ACCESS_KEY_ID,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	});
	const imgFields = extractFields(fileData);
	const params = {
		Bucket: process.env.S3_BUCKET ?? "",
		Key: fileName + imgFields.fileEnding,
		Body: Buffer.from(imgFields.data, 'base64'),
		ContentEncoding: 'base64',
		ContentType: imgFields.type
	};

	try {
		const res = await s3.upload(params).promise();
		console.log("File Uploaded with Successfull", res.Location);
		return { success: true, message: "File Uploaded with Successfull", data: res.Location };
	} catch (error) {
		return { success: false, message: "Unable to Upload the file", data: error };
	}
}

const extractFields = (base64: string): { data: string, type: string, fileEnding: string } => {
	console.log(base64.split(",", 2));
	const data = base64.split(",", 2)[1];
	const type = base64.split(":")[1].split(";")[0];
	let fileEnding = "";
	if (type === 'image/png') {
		fileEnding = ".png";
	} else if (type === 'image/jpeg') {
		fileEnding = ".jpeg";
	} else if (type === 'image/gif') {
		fileEnding = ".gif";
	} else if (type === 'image/webp') {
		fileEnding = ".webp";
	}
	return {
		data: data,
		type: type,
		fileEnding: fileEnding
	}

}
