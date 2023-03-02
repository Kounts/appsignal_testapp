const { testMethod } = require('./app/client/lead');


const test = async (event) => {
    return await testMethod(event);
}

module.exports = {
    test,
}