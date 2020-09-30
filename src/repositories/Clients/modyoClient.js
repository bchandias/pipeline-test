/* eslint-disable linebreak-style */
/* eslint linebreak-style: ["error", "windows"] */

import axios from 'axios';

const baseURL = window.liquid.siteUrl;

export default axios.create({
  baseURL,
  headers: {
    'app-key': window.liquid.appKey,
    'A-Mall-Id': window.liquid.apiMallId,
    languageId: 2,
    'accept-language': 'es-CL',
    poiStateIdIn: [1, 6],
  },
});
