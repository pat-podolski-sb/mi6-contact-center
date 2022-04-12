# mi6-contact-center


## Table of contents
* [General info](#general-info)
* [Architecture](#architecture)
* [Setup](#setup)
* [Improvements](#improvements)

## General info
The goal of this project was to create a tool that would receive incoming calls and suggests 3 vanity numbers based on callers phone number. Additionally it would be great if a caller could go to a website and check last 5 calls received by contact center with corresponding vanity numbers.

## Architecture
* architecture diagram - https://main.d1js6r5bmu2bau.amplifyapp.com/#architecture_diagram
* Amazon Connect - created 3 main flows that can be found under /amazon-connect-flows/ folder. One US number was assigned ( Had to use polish one while developing but reassigned it for final tests);
* 2 lambdas ( one to communicate with amazon connect and one to communicate with front end app)
* api gateway to serve getting vanity vanity numbers
* DynamoDB as an DB provider
* AWS SAM is used to create/update Api Gateway, Lambdas, DynamoDB. This deployment configuration can be found under /deploy/template.yaml.
* frontend app created with create-react-app and supported with Material UI components. Application was created in React library and Typescipt was used as a superset language of Javascript.
* Frontend CI/CD configured with use of AWSAmplify - whenever there is commit on "main" branch CI/CD is triggered and deploys what is in "web-app-mi6-cc" folder.
* Web app hosted in AWS - https://main.d1js6r5bmu2bau.amplifyapp.com/

## Setup
Prerequisites:
* Configured AWS CLI && AWS SAM;
* globally installed Node.js v14.x
* bash console (native in linux and MacOS, in windows GitBash can be used).
* IDE - e.g. Visual Studio Code

### AWS Services deployment
Deployment:
In main repository folder run:
```
npm run sam:deploy
```
You will be then guided through some configuration questions and at the end you are going to receive confirmation about created resources.
In order to import flows you must do it manually in Amazon Connect. Additionally remember to bind your lambda responsible for vanity number creation in Amazon Connect/Contact Flows

###
Development:
Only with first initial run you need to run following command while being in main repo folder:
```
npm run web:install
```
Therefore if you want to build your solution locally you need to run:
```
npm run web:local
```
Deployment:
Whenever you create a commit directly to main (remember to push) or through Pull Request's Squash&Merge your code will be automatically build and deployed by AWS service Amplify.


## Improvements
* Beside Frontend Amplify configuration similar CI/CD mechanism could be created with use of github actions. Config written in .yaml and also can be triggered on any merge to main branch.
* In real world developer usually have few environments that is why it would be essential to create environment variables while deploying with SAM and Amplify in .yaml files.
* Instead directly committing to master branch there should be release branches created and squash&merge policy should be applied.
* Dynamo db is not good for getting sorted data, data where table union or merge is required. When you need data to show in any report way you mey need RDS approach - e.g. MySQL or Postgresql.
* Better error handling in lambdas. More cases for error codes (400,401,403 etc).
* Error boundary in Frontend(react);
* Monitoring of AWS services would be a good addition. It would be great to monitor e.g. performance, failures, cost increase. This could be easily be connected with slack channel so development or DEVOPS team could react quickly.
* More detailed .yaml descriptions regarding API gateway and DynamoDB.
* Manual creation of AIM roles that can be assigned to lambdas so actions can be limited to the most necessary ones.