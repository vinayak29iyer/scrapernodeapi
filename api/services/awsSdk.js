import MimeLookup from 'mime-lookup'
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3"
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses"



import moment from 'moment-timezone';

const mime = new MimeLookup(require('mime-db'));
const { S3BUCKET, ENV, AWS_ACCESS_KEY, AWS_SECRET_KEY, AWS_DEFAULT_REGION } = process.env
let s3 = new S3Client({
    region: AWS_DEFAULT_REGION
})
let sesClient = new SESClient({ region: AWS_DEFAULT_REGION })
if(ENV === "staging" || ENV === "production"){
    // AWS.config.update({
    //     "region": awsConfig.sns_config.region
    // });
}else{
    s3 = new S3Client({
        region: AWS_DEFAULT_REGION,
        credentials:{
            accessKeyId: AWS_ACCESS_KEY,
            secretAccessKey: AWS_SECRET_KEY
        }
    })
    sesClient = new SESClient({ 
      region: AWS_DEFAULT_REGION,
      credentials:{
        accessKeyId: AWS_ACCESS_KEY,
        secretAccessKey: AWS_SECRET_KEY
    }
    })
}
/*
    @params {file, folderName, fileExt}
    @return { status, Key, Location }
*/
export const uploadFileToS3 = async(params) => {
    if(params && !params.fileName){
      params.fileName = `${moment().format('YYYYMMDDHHmmssSSSS')}${(params?.fileExt ? `.${params?.fileExt}`: '')}`
    }
    const { file, folderName = '', fileExt = '', fileName = '' } = params
    // Read content from the file
    const filePath = `${folderName}/${fileName}`
    // Setting up S3 upload parameters
    const s3Params = new PutObjectCommand({
        Bucket: `${S3BUCKET}`,
        Key: filePath, // File name you want to save as in S3
        Body: file,
        ContentType: mime.lookup(fileName)
      })
    try {
        await s3.send(s3Params)
        return {
            status: true,
            fileName,
            filePath
        }
    }catch(err){
      console.log('ERR IN S3 UPLOAD > ', err)
        return {
            status: false,
            error: err.message || 'Unable to upload file to s3'
        }
    }
};
// { toAddressArr: ['email@gmail.com'], htmlData: "<h1>TEST SES HTML</h1>", emailSubj: 'Headline Subject', sourceEmail: 'SomeName <admin@domain.com>' }
export const sendEmailSes = async(params) => {
const { toAddressArr, htmlData, emailSubj, sourceEmail } = params
// // Create sendEmail params
const sesParams = {
  Destination: {
    /* required */
    CcAddresses: [
    //   "EMAIL_ADDRESS",
      /* more items */
    ],
    ToAddresses: [
      /* more items */
      ...toAddressArr
    ],
  },
  Message: {
    /* required */
    Body: {
      /* required */
      Html: {
        Charset: "UTF-8",
        Data: htmlData,
      },
      Text: {
        Charset: "UTF-8",
        Data: "",
      },
    },
    Subject: {
      Charset: "UTF-8",
      Data: emailSubj,
    },
  },
  Source: sourceEmail,
  ReplyToAddresses: [
    // "EMAIL_ADDRESS",
    /* more items */
  ],
};

try {
  const data = await sesClient.send(new SendEmailCommand(sesParams))
  return {
    status: true,
    data
  }
} catch (err) {
  console.error('Error sending email:', err)
  return {
    status: false,
    message: err.message 
  }
}
}