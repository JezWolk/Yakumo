const YAML = require('js-yaml');
const config = YAML.safeLoad(require('fs').readFileSync('config.yaml', 'utf-8'));
const YakumoClient = require('./client/YakumoClient.js');
const client = new YakumoClient(config);
client.start();