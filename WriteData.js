const AWS = require('aws-sdk')
const ddb = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'})

exports.handler = async (event, context, callback) => {
    const requestId = context.awsRequestId;
    
    if(event.firstName && event.lastName && event.breedType && event.birthDate) {
    
        await createMessage(requestId, event).then(() => {
            callback(null, {
                statusCode: 201,
                body: '',
                headers: {
                    'Access-Control-Allow-Origin' : '*'
                }
            });
        }).catch((err) => {
            console.error(err)
        })
    } else {
        callback(null, {
                statusCode: 400,
                body: 'Bad Request',
                headers: {
                    'Access-Control-Allow-Origin' : '*'
                }
            });
    }
};

function createMessage(requestId, event) {
    const params = {
        TableName: 'DogData',
        Item: {
            'petId' : requestId,
            'firstName': event.firstName,
            'lastName': event.lastName,
            'breedType': event.breedType,
            'birthDate': event.birthDate,
            'sprayedNeutered': event.sprayedNeutered,
            'rabiesVaccine': event.rabiesVaccine,
            'bordetellaVaccine': event.bordetellaVaccine
        }
    }
    return ddb.put(params).promise();
}
