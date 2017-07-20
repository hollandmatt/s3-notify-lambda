const https = require('https');
const util = require('util');

const path = process.env.SLACK_WEBHOOK_URL;
const LOCALE = 'en-US';

exports.handler = (event, context) => {
  const options = {
    method: 'POST',
    hostname: 'hooks.slack.com',
    port: 443,
    path
  };

  const eventData = JSON.parse(event.Records[0].Sns.Message);

  eventData.Records.forEach((record) => {
    const fileSize = record.s3.object.size / 1000;
    const postData = {
      text: `New file uploaded: ${record.s3.object.key} to bucket: ${record.s3.bucket.name} with size: ${fileSize.toLocaleString(LOCALE)} KB`
    };

    const req = https.request(options, (res) => {
      res.setEncoding('utf8');
      res.on('data', () => {
        context.done(null);
      });
    }) ;

    req.on('error', (e) => {
      console.log('problem with request: ' + e.message);
    });

    req.write(util.format("%j", postData));
    req.end();
  });
};
