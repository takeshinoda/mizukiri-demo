# README

This AWS Lambda application is a Mizukiri demo.
Mizukiri is a library that chain calls the AWS Lambda .

## Usage

- Create AWS credential file or addtion to config.js.
- Rewrite  the part of Lambda Role.


## deploy

`$ TEST_ROLE='arn:aws:iam::111111111111:role/lambda-test-1' gulp deploy`

## invoke Test

`$ gulp invoke`

