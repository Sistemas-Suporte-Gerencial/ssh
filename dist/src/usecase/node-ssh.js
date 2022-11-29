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
exports.Ssh = void 0;
class Ssh {
    constructor(ssh) {
        this.ssh = ssh;
        this.ssh = ssh;
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ssh.connect({
                host: '54.145.77.201',
                username: 'ubuntu',
                privateKeyPath: './sgedu.pem'
            });
        });
    }
    execCommand(command) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connect();
            const { stdout } = yield this.ssh.execCommand(command);
            return stdout;
        });
    }
}
exports.Ssh = Ssh;
