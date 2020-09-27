const HELLO_MESSAGE = "HELLO! This is DreckGuy :D"

exports.handler = (event, context, callback) => {
    callback(null,HELLO_MESSAGE)
};