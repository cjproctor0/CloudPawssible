const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'});

exports.handler = async (event, context, callback) => {
    await readMessage().then(data => {
        data.Items.forEach(function(item) {
            console.log(item.firstname)  // match these columns to DynamoDB columns
            console.log(item.lastname)
            console.log(item.breed)
            console.log(item.spayedneutered)
            console.log(item.gender)
            console.log(item.rabiesvaccine)
            console.log(item.bordetellavaccine)
            console.log(item.petname)
            console.log(item.dateofbirth)
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
        TableName: 'Cloud-Pawssible',
        //Limit: 3
    }
    return ddb.scan(params).promise();
}
