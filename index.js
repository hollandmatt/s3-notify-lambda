const https = require('https');
const util = require('util');

const path = '/services/T0321UYBP/B6AHG8WGZ/Ma3G5NBjXnrZEx4tWBJOCAyn';

exports.handler = (event, context) => {
  const options = {
    method: 'POST',
    hostname: 'hooks.slack.com',
    port: 443,
    path
  };

  const eventData = JSON.parse(event.Records[0].Sns.Message);

  eventData.Records.forEach((record) => {
    const postData = {
      text: `New file uploaded: ${record.s3.object.key} to bucket: ${record.s3.bucket.name} with size: ${record.s3.object.size}`
    };

    const req = https.request(options, (res) => {
      res.setEncoding('utf8');
      res.on('data', (chunk) => {
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
