
# Epicgames Xal

Encoding and decoding function of the parameter **xal** of Epic Games API




## Information

Epic Games uses **hCaptcha** as a way to prevent attacks from bots.

However, they are using a custom version of **hCaptcha** called **enterprise**, which has an extra parameter called **rqdata**.

To get that extra parameter, you would have to follow the requests flow that is being made on the browser.
## Request Flow

Base URL: `https://talon-service-prod.ecosec.on.epicgames.com`

```json
POST /v1/init

Request Body: {"flow_id":"login_prod"}
```
## Usage/Examples

```javascript
const EncoderDecoder = require('./utils.js');
const fingerprint = require('./fingerprint.js');

const encoderDecoder = new EncoderDecoder();

const encodedXal = encoderDecoder.encode(fingerprint);
const decodedXal = encoderDecoder.decode(encodedXal);
```

