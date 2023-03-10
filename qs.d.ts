declare module 'qs' {
  const stringify = require("./stringify");
  const parse = require("./parse");
  const formats = require("./formats");

  export default {
    formats: formats,
    parse: parse,
    stringify: stringify
  };
}