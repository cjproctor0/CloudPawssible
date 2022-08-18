const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'});

exports.handler = async (event, context, callback) => {
    await readMessage().then(data => {
        data.Items.forEach(function(item) {
            console.log(item.firstName)  // match these columns to DynamoDB columns
            console.log(item.lastName)
            console.log(item.breedType)
            console.log(item.sprayedNeutered)
            console.log(item.rabiesVaccine)
            console.log(item.bordetellaVaccine)
        });
        callback(null, {
            statusCode: 200,
            body: data.Items,
            headers: {
                'Access-Control-Allow-Origin' : '*',
            },
        })
    }).catch((err) => {
        console.error(err);
    })
};

function readMessage() {
    const params = {
        TableName: 'DogData',
        //Limit: 30
    }
    return ddb.scan(params).promise();
}
