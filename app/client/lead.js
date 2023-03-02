const { appsignal } = require( "../../appsignal");
const { createLead } = require('./sofie_client');

const testMethod = async (event) => {

    appsignal
        .wrap(() => {
            throw new Error("Inside wrap");
        })
        .catch((e) => {
        console.log("Inside wrap caught");
    });

    await createLead();

    await appsignal.sendError(new Error("test appSignal"));
    console.log("after test appSignal", appsignal);

    return {
        statusCode: 200,
        headers: {
            'content-type': 'application/json',
        }
    };
};


module.exports = {
    testMethod
}
