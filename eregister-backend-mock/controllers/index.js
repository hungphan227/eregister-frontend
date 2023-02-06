const express = require("express")
const METHOD_TYPE = require("./method-type");
const commonController = require("./common-controller")

const controllers = [...commonController]
const router = express.Router();

controllers.forEach(method => {
  switch (method.methodType) {
    case METHOD_TYPE.GET: {
      router.get(method.uri, method.handler)
      break;
    }
    case METHOD_TYPE.POST: {
      router.post(method.uri, method.handler)
      break;
    }
    case METHOD_TYPE.PUT: {
      router.put(method.uri, method.handler)
      break;
    }
    case METHOD_TYPE.DELETE: {
      router.delete(method.uri, method.handler)
      break;
    }
    default: {
      break;
    }
  }
});

module.exports = router

