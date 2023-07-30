const EncoderDecoder = require('./utils.js');
const fingerprint = require('./fingerprint.js');

const encoderDecoder = new EncoderDecoder();

const encodedXal = encoderDecoder.encode(fingerprint);
const decodedXal = encoderDecoder.decode(encodedXal);
