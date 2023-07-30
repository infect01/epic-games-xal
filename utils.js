const ENCRYPTION_KEY = "\x030é\b7°\x94\x0E-³x\x9DûËfîâÀ\x0EZâ©\x04\x9CSÑä`\x88\x9CÁ'"

class EncoderDecoder {

  encode(input) {
    for (var stringifiedJson = unescape(encodeURIComponent(JSON.stringify(input))), xal = '', i = 0; i < stringifiedJson.length; i++) {
        var encodedCharcode = stringifiedJson.charCodeAt(i) ^ ENCRYPTION_KEY.charCodeAt(i % ENCRYPTION_KEY.length);
        xal += '0'.concat((255 & encodedCharcode).toString(16)).slice(-2);
    }
    return xal;
  }

  decode(input) {
    var stringifiedJson = '';
    for (var i = 0; i < input.length; i += 2) {
      var hexByte = input.substr(i, 2);
      var encodedCharcode = parseInt(hexByte, 16);
      var originalCharcode = encodedCharcode ^ ENCRYPTION_KEY.charCodeAt(i / 2 % ENCRYPTION_KEY.length);
      stringifiedJson += String.fromCharCode(originalCharcode);
    }
    var decodedXal = JSON.parse(decodeURIComponent(escape(stringifiedJson)));
    return decodedXal;
  }
}

module.exports = EncoderDecoder;
