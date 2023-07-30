
# Epicgames Xal

Encoding and decoding function of the parameter **xal** of Epic Games API

## Notes

This is just a proof of work of how the **xal fingerprint** is being **encoded** & **decoded**.

This will not work on scale, you would have to find a way to randomize everything inside the fingerprint.
## Xal Information

**Xal** is a parameter required to get the **rqdata** parameter used on **Epic Games**, specifically their protection on the website, called **hCaptcha Enterprise**.

It is being built from the script:

`https://talon-website-prod.ecosec.on.epicgames.com/talon_sdk.js`

**What the script does?**

It collects various data about the user device and it's behaviour, later on, that data is being encoded using **XOR encoding**, using a certain encryption key that is located in the script, which all results in **xal**.


**What does it fingerprint?**

| Browser Properties | WebGL Properties    | Screen Properties    | Date Properties    | FingerprintJS Properties    | Motion Events   | 
| :---:   | :---: | :---: | :---: | :---: | :---: |
| User-Agent | Canvas   | Width   | Timezone Offset | Visitor ID (Hash) | Mouse Movements (Timestamp, X Position, Y Position)
| Webdriver | Graphics Card   | Height   | Timezone | Confidence | Mouse Up (Timestamp, X Position, Y Position)
| | | | | Fonts (Hash) | Mouse Down (Timestamp, X Position, Y Position) |
| | | | | Plugins (Hash) | Touch Events (for mobile) |
| | | | | Audio (Hash) | Keyboard Up (Timestamp)  |
| | | | | Canvas (Hash) | Keyboard Down (Timestamp) |
| | | | | Screen (Hash) | Resize Events - if you resized the browser window (Timestamp, Width, Height) |


## Information

Epic Games uses **hCaptcha** as a way to prevent attacks from bots.

However, they are using a custom version of **hCaptcha** called **enterprise**, which has an extra parameter called **rqdata**.

To get that extra parameter, you would have to follow the requests flow that is being made on the browser.

## Request Flow

Base URL: `https://talon-service-prod.ecosec.on.epicgames.com`

**POST /v1/init**
```javascript
{
   "flow_id":"login_prod"
}
```

This request returns the values (**id**, **ip_address**, **site_key**, **signature**) that are required on the next endpoint.

**POST /v1/init/execute**
```javascript
{
   "session":{
      "session":{
         "version":1,
         "id":"", // From previous request
         "flow_id":"login_prod",
         "ip_address":"", // From previous request
         "timestamp":"", // From previous request
         "plan":{
            "mode":"h_captcha",
            "h_captcha":{
               "plan_name":"h_captcha_login_prod",
               "site_key":"" // From previous request
            }
         },
         "config":{
            "h_captcha_config":{
               "sdk_base_url":"https://js.hcaptcha.com"
            }
         }
      },
      "signature":"" // From previous request
   },
   "v":1,
   "xal":"", // Encoded fingerprint 
   "ewa":"b",
   "kid":"p98hck"
}
```

This request returns the **rqdata** value you need for **hCaptcha**.
## Usage/Examples

```javascript
const EncoderDecoder = require('./utils.js');
const fingerprint = require('./fingerprint.js');

const encoderDecoder = new EncoderDecoder();

const encodedXal = encoderDecoder.encode(fingerprint);
const decodedXal = encoderDecoder.decode(encodedXal);
```
