"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function interestCheck(e){return e>=.7}function store(e,t){_redisClient2["default"].rpush(["recentPickles",e.fact],function(r){if(r)throw r;t.send(e)})}function factGet(e,t){(0,_request2["default"])("https://hook.io/samhavens/pickle",function(r,i,s){if(r)throw r;var n=JSON.parse(s);return interestCheck(n.interesting)?store(n,t):factGet(e,t)})}Object.defineProperty(exports,"__esModule",{value:!0}),exports.interestCheck=interestCheck,exports.store=store,exports["default"]=factGet;var _request=require("request"),_request2=_interopRequireDefault(_request),_redisClient=require("./redisClient"),_redisClient2=_interopRequireDefault(_redisClient);