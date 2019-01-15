[![BCH compliance](https://bettercodehub.com/edge/badge/boobo94/alexa-skill-starter-pack-typescript?branch=master)](https://bettercodehub.com/)

# AWS Lambda in TypeScript

## Install

1. Dependencies

  ```bash
  npm install
  ```

2. Download [ngrok](https://ngrok.com/) in the root folder

## Run project

1. Open a console

  ```bash
  npm run ngrok
  ```

  Copy the https link and go to [Alexa Console](https://developer.amazon.com/alexa/console/ask/test/amzn1.ask.skill.15bebd4e-4520-4a06-8fb7-57149258f4d0/development/en_US/), under Endpoint section, select `HTTPS` and paste the link in `Default Region` input field. From the below dropdown choose `My development endpoint is a sub-domain of a domain that has a wildcard certificate from a certificate authority`.
  Every time when you run the ngrok, you need to update the endpoint url. [[1]](https://medium.com/@cnadeau_/allow-alexa-to-run-your-locally-hosted-skill-1786e3ca7a1b)

2. Open another console
  ```bash
  npm start
  ```

## Deploy

Use npm to install ASK CLI. If you already have ASK CLI installed and want to update to the latest version, install it in the same way as a new user.

`$ npm install -g ask-cli`

After you install ask-cli, initialize ASK CLI:

`$ ask init`  

You will be prompted to name your profile (default by default), choose the AWS profile to use, and to log in to your Amazon developer account. Once the initialization is complete, you can use ASK CLI to manage your skill.

If you choose to create a new one, first go in AWS IAM, create an user or choose an existing one and  create an access key.

Press `Add permission` button > `Attach existing policy` > `Create policy` > open JSON format and paste the following code

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "iam:CreateRole",
                "iam:GetRole",
                "iam:AttachRolePolicy",
                "iam:PassRole"
            ],
            "Resource": "arn:aws:iam::*:role/ask-*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "lambda:AddPermission",
                "lambda:CreateFunction",
                "lambda:GetFunction",
                "lambda:UpdateFunctionCode",
                "lambda:ListFunctions"
            ],
            "Resource": "arn:aws:lambda:*:*:function:ask-*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "logs:FilterLogEvents",
                "logs:getLogEvents",
                "logs:describeLogStreams"
            ],
            "Resource": "arn:aws:logs:*:*:log-group:/aws/lambda/ask-*"
        }
    ]
}
```
Refference [here](https://developer.amazon.com/docs/smapi/set-up-credentials-for-an-amazon-web-services-account.html)

Last step, go to `./ask/config` and place you `skill_id` and your lambda arn.

In order to deploy run:

`$ ask deploy`

## Developer tasks

Frequently used `npm script`s:

| Script name   | Description                                                                                                         |
|---------------|---------------------------------------------------------------------------------------------------------------------|
| `start`       | Runs the service locally, so you can call your API endpoints on http://localhost.                                   |
| `ngrok`       | Runs the ngrok service locally, so you can use the https endpoint in Alexa skill:  https://XXXXX.ngrok.io.          |
| `build`       | Clean the build and start a new process to build again the files          |
| `clean`       | Clean the build         |
| `deploy`       | Build the project and then deploy to aws lambda         |
| `sync:model`       | Sync the model from Alexa Skill Console with local model from models folder         |




## Resources

1. https://medium.com/@cnadeau_/allow-alexa-to-run-your-locally-hosted-skill-1786e3ca7a1b
2. https://github.com/balassy/aws-lambda-typescript
3. https://ask-sdk-for-nodejs.readthedocs.io/en/latest/Developing-Your-First-Skill.html
4. https://ngrok.com/
5. https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs
6. https://developer.amazon.com/docs/smapi/ask-cli-command-reference.html
7. https://developer.amazon.com/docs/smapi/quick-start-alexa-skills-kit-command-line-interface.html
