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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const node_ssh_1 = require("node-ssh");
const node_ssh_2 = require("./src/usecase/node-ssh");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();
});
const sshNode = new node_ssh_1.NodeSSH();
const makeSsh = () => {
    return new node_ssh_2.Ssh(sshNode);
};
app.post('/sessionId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { internalId } = req.body;
        const shh = makeSsh();
        const id = yield shh.execCommand(`cd /var/bigbluebutton/learning-dashboard/${internalId} && ls`);
        res.status(200).json({ sessionId: id });
    }
    catch (error) {
        console.log(error);
    }
}));
app.listen(3000, () => console.log('Server running at http://localhost:3000'));
