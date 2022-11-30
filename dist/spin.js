var spin;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "handleRequest": () => (/* binding */ handleRequest)
/* harmony export */ });
const encoder = new TextEncoder('utf-8')
const decoder = new TextDecoder('utf-8')

async function handleRequest(request) {
    var matchesRaw = await fetch('https://worldcupjson.net/matches/today')
    var matchesBody = decoder.decode(await matchesRaw.arrayBuffer() || new Uint8Array())
    var matches = JSON.parse(matchesBody)

    var matchInfo = ''
    
    matches.forEach(match => {
        matchInfo +=
            match.home_team.name + ' vs. ' + 
            match.away_team.name + ' ' +
            match.home_team.goals + '-' + 
            match.away_team.goals + ' ' +
            match.status + '\n'
    })
    
    var resBody = {
        'response_type': 'in_channel',
        'text': matchInfo
    }
    
    var resp = {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
             },
        body: encoder.encode(JSON.stringify(resBody)).buffer
    }
    
    return resp
}

spin = __webpack_exports__;
/******/ })()
;