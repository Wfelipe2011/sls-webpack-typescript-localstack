const AWS = require('aws-sdk');


const isLocal = process.env.IS_LOCAL;


if (isLocal) {
  AWS.config.update({
    region: 'us-east-1',
    accessKeyId: 'test',
    secretAccessKey: 'test',
    endpoint: new AWS.Endpoint('http://localstack:4566'),
  });
}


const sns = new AWS.SNS();


module.exports.publishMessage = async (event) => {
  const message = JSON.parse(event.body).message;


  const params = {
    Message: message,
    TopicArn: 'arn:aws:sns:us-east-1:000000000000:meu-projeto-sns',
  };
  console.log('Publicando mensagem:', message);
  await sns.publish(params).promise();


  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Mensagem publicada com sucesso!' }),
  };
};

module.exports.processMessage = async (event) => {
  const message = event.Records[0].body;
  console.log('Mensagem recebida:', message);


  return {
    statusCode: 200,
  };
};
