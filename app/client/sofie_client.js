const axios = require('axios-https-proxy-fix');

const sofiePostRequest = (url, data) => {
    return new Promise((resolve, reject) => {
        axios
            .post(
                url,
                data,
                {
                    headers: {
                        'content-type': 'application/json',
                        'accept': 'application/json',
                        'origin': 'https://tst.cloud.rethinkit.eu',
                    },
                    proxy: {
                        host: 'proxy.openbroker.be',
                        protocol: 'https',
                        port: 3128,
                        auth: {
                            username: 'deecide',
                            password: 'DeeCide2017'
                        }
                    },
                },
            )
            .then((response) => {
                console.log("ok");
                resolve(response.data);
            })
            .catch((error) => {
                reject(new Error(error.response.data.error.message));
            });
    });
}

const createLead = async (data) => {
    console.log("### CREATE LEAD")
    const url = "https://tst.cloud.rethinkit.eu/deecide/api/stores/63bbda8fc30a5803faf82728/pricing";
    return sofiePostRequest(url, data);
};


const getOffers = async (leadId, organisationId) => {

    console.log("### GET OFFERS")
    const url = "https://tst.cloud.rethinkit.eu/deecide/api/stores/63bbda8fc30a5803faf82728/pricing/"+leadId+"?organisationId="+organisationId;

    return new Promise((resolve, reject) => {
        axios
            .get(
                url,
                {
                    headers: {
                        'content-type': 'application/json',
                        'accept': 'application/json',
                        'origin': 'https://tst.cloud.rethinkit.eu',
                    },
                    proxy: {
                        host: 'proxy.openbroker.be',
                        protocol: 'https',
                        port: 3128,
                        auth: {
                            username: 'deecide',
                            password: 'DeeCide2017'
                        }
                    },
                },
            )
            .then((response) => {
                console.log("ok")
                resolve(response.data);
            })
            .catch((error) => {
                console.log("not ok")
                reject(error.response);
            });
    });
};

const requestOffer = async (leadId, productId, organisationId) => {

    console.log("### REQUEST OFFER")
    const url = "https://tst.cloud.rethinkit.eu/deecide/api/stores/63bbda8fc30a5803faf82728/pricing/"+leadId+"/offers?organisationId="+organisationId;
    const data = {productIds: [productId]};

    return sofiePostRequest(url, data)
};

const orderPolicy = async (offerId, startDate, renewalDate, organisationId) => {

    console.log("wait to order policy")
    await new Promise(resolve => setTimeout(resolve, 5000));

    console.log("### ORDER POLICY")
    const url = "https://tst.cloud.rethinkit.eu/deecide/api/stores/63bbda8fc30a5803faf82728/offers/"+offerId+"/order?organisationId="+organisationId;
    const data = {
        startDate: startDate,
        renewalDate: renewalDate
    };

    console.log("url", url);
    console.log("data", data);

    return sofiePostRequest(url, data);
};

module.exports = {
    createLead,
    getOffers,
    requestOffer,
    orderPolicy
}

