const Apify = require('apify');

const { initContext } = require('./src/context');
const { createRequestList, handle } = require('./src/routes');
const { useKVContext } = require('./utils/contextHooks');

const { log } = Apify.utils;

Apify.main(async () => {
    await initContext();
    const [state, dispatch] = await useKVContext();

    const input = await Apify.getInput();

    await dispatch({
        type: 'GENERAL',
        payload: { input },
    });

    const requestList = await createRequestList();
    const requestQueue = await Apify.openRequestQueue();
    const proxyConfiguration = await Apify.createProxyConfiguration();

    const crawler = new Apify.CheerioCrawler({
        requestList,
        requestQueue,
        proxyConfiguration,
        maxConcurrency: 50,
        requestTimeoutSecs: 120,
        handlePageFunction: async (context) => {
            const { label } = context.request.userData;
            switch (label) {
                default: {
                    return;
                }
                case 'MAIN':
                    return handle(context);
            }
        },
    });

    log.info('Starting the crawl.');
    await crawler.run();
    log.info('Crawl finished.');
});
