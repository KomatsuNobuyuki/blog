#!/bin/bash

URLS=`node ./lighthouse/getCollectUrls.js`
lhci autorun --config=./lighthouse/lighthouserc.js --collect.url=URLS