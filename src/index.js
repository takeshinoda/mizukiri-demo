import Mizukiri from 'mizukiri'

exports.handler = (event, context) => {
  new Mizukiri({ 'lodash': '3.10.1' },
               { lambdaConfig:
                 {
                   region: 'us-west-2',
                   role: 'arn:aws:iam::040621507411:role/lambda-test-1',
                   timeout: 300
                 }
               })
    .entry((line) => {
             console.log(line)
             return line + 1
           },
           { name: 'demo-func-1', require: { '_': 'lodash' } }) 
    .chain((line) => {
             console.log(line)
             return line + 1
           },
           { name: 'demo-func-2' }) 
    .chain(line => console.log(line) ,
           { name: 'demo-func-3' })
    .deployApplications()
    .exec([1, 2, 3, 4, 5, 6, 7])
    .then((value) => {
      context.succeed()
    })
    .catch(e => context.fail(e))
}

