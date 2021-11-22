import AWS from "aws-sdk";

AWS.config.update({
  credentials: {
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
  },
});

export const deleteFromS3 = async file => {
  const removedFoldernameFile = `${file}`.replace(
    `${process.env.S3_ADDRESS}`,
    ""
  );
  const targetBucketParams = {
    Bucket: "instaclong-uploadspeter",
    Key: removedFoldernameFile,
  };
  try {
    const data = await new AWS.S3().deleteObject(
      targetBucketParams,
      function (err, data) {
        if (err) console.log(err, err.stack);
        else console.log(data);
      }
    );
  } catch (e) {
    console.log("Can't delete pic");
  }
};

export const uploadToS3 = async (file, userId, folderName) => {
  const {
    file: { filename, createReadStream },
  } = await file;
  const readStream = createReadStream();
  const objectName = `${folderName}/${userId}-${Date.now()}-${filename}`;
  const { Location } = await new AWS.S3()
    .upload({
      Bucket: "instaclong-uploadspeter",
      Key: objectName,
      ACL: "public-read",
      Body: readStream,
    })
    .promise();
  return Location;
};
