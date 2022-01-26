const Apify = require('apify');
const { useKVContext } = require('../utils/contextHooks');
const Parser = require('./Parser');

const { log } = Apify.utils;

const createRequestList = async () => {
    const [state] = await useKVContext();
    const requests = [];

    // Logic here

    return Apify.openRequestList('start-urls', requests);
};

const handle = async ({ $, json, request, response, crawler: { requestQueue } }) => {};

module.exports = { createRequestList, handle };
