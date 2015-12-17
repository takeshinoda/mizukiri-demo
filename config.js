module.exports = {
  handler: 'index.handler',
  description: 'demo',
  timeout: 300, // seconds
  memorySize: 1024, // MB
  role: process.env.TEST_ROLE,
  functionName: 'mizukiri-demo',
  region: 'us-west-2'
}

