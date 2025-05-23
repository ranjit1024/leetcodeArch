"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
const clinet = (0, redis_1.createClient)();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield clinet.connect();
        while (1) {
            let status = "error";
            const channel = "responses";
            const response = yield clinet.brPop('responses', 0);
            console.log(response);
            yield new Promise((resolve) => setTimeout(resolve, 1000));
            if (response) {
                status = "success";
            }
            yield clinet.publish(channel, status);
            console.log("Proceed users resposonse");
        }
    });
}
main();
