S3 Notify Lambda
================

An AWS Lambda function that posts messages to Slack when a new object is added to a bucket.

You will need
-------------

- An AWS Account with S3, Lambda and SNS permissions
- A Slack team

Setup
-----

1. Create your S3 bucket
2. Set up the bucket to post events to an SNS topic (Via Properties/Events)
3. Create a new "Incoming Webhooks integration" for your Slack team. You can select the channel etc. here. 
Take a note of the Webhook URL.
4. Create a new Lambda function
5. Copy/paste the code from index.js into the Lambda
6. Set the environment variable `SLACK_WEBHOOK_URL` to the webhook address you noted down earlier, without the host part
7. In the "Triggers" tab for your Lambda, add the SNS topic you created earlier
8. Repeat for as many buckets as you like

