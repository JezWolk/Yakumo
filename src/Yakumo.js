const YAML = require('yaml');
const config = YAML.parse(require('fs').readFileSync('config.yaml', 'utf-8'));
const YakumoClient = require('./client/YakumoClient.js');
const client = new YakumoClient(config);
client.start();