var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var inquirer = require('inquirer');
var consola = require('consola');
var Action;
(function (Action) {
    Action["List"] = "list";
    Action["Add"] = "add";
    Action["Remove"] = "remove";
    Action["Quit"] = "quit";
})(Action || (Action = {}));
var MessageVariant;
(function (MessageVariant) {
    MessageVariant["Success"] = "success";
    MessageVariant["Info"] = "info";
    MessageVariant["Error"] = "error";
})(MessageVariant || (MessageVariant = {}));
var Message = /** @class */ (function () {
    function Message(content) {
        this.content = content;
    }
    Message.prototype.show = function () {
        console.log(this.content);
    };
    Message.prototype.capitalize = function () {
        this.content = this.content.charAt(0).toUpperCase() + this.content.slice(1).toLowerCase();
    };
    Message.prototype.toUpperCase = function () {
        this.content = this.content.toUpperCase();
    };
    Message.prototype.toLowerCase = function () {
        this.content = this.content.toLowerCase();
    };
    Message.showColorized = function (variant, text) {
        switch (variant) {
            case MessageVariant.Success:
                consola.success(text);
                break;
            case MessageVariant.Info:
                consola.info(text);
                break;
            case MessageVariant.Error:
                consola.error(text);
                break;
        }
    };
    return Message;
}());
var UsersData = /** @class */ (function () {
    function UsersData() {
        this.data = [];
    }
    UsersData.prototype.showAll = function () {
        if (this.data.length === 0) {
            Message.showColorized(MessageVariant.Info, 'No data...');
        }
        else {
            console.log("\u2139 Users data");
            console.table(this.data);
        }
    };
    UsersData.prototype.add = function (newUser) {
        if (typeof newUser.age !== 'number' || newUser.age <= 0 || newUser.name.trim().length === 0) {
            Message.showColorized(MessageVariant.Error, 'Wrong data!');
        }
        else {
            this.data.push(newUser);
            Message.showColorized(MessageVariant.Success, 'User has been successfully added');
        }
    };
    UsersData.prototype.remove = function (userName) {
        var index = this.data.findIndex(function (user) { return user.name === userName; });
        if (index !== -1) {
            this.data.splice(index, 1);
            Message.showColorized(MessageVariant.Success, 'User deleted!');
        }
        else {
            Message.showColorized(MessageVariant.Error, 'User not found...');
        }
    };
    return UsersData;
}());
var users = new UsersData();
console.log("\n");
console.info("???? Welcome to the UsersApp!");
console.log("====================================");
Message.showColorized(MessageVariant.Info, "Available actions");
console.log("\n");
console.log("list – show all users");
console.log("add – add new user to the list");
console.log("remove – remove user from the list");
console.log("quit – quit the app");
console.log("\n");
var startApp = function () {
    inquirer.prompt([{
            name: 'action',
            type: 'input',
            message: 'How can I help you?',
        }]).then(function (answers) { return __awaiter(_this, void 0, void 0, function () {
        var _a, user, name_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = answers.action;
                    switch (_a) {
                        case Action.List: return [3 /*break*/, 1];
                        case Action.Add: return [3 /*break*/, 2];
                        case Action.Remove: return [3 /*break*/, 4];
                        case Action.Quit: return [3 /*break*/, 6];
                    }
                    return [3 /*break*/, 7];
                case 1:
                    users.showAll();
                    return [3 /*break*/, 7];
                case 2: return [4 /*yield*/, inquirer.prompt([{
                            name: 'name',
                            type: 'input',
                            message: 'Enter name',
                        }, {
                            name: 'age',
                            type: 'number',
                            message: 'Enter age',
                        }])];
                case 3:
                    user = _b.sent();
                    users.add(user);
                    return [3 /*break*/, 7];
                case 4: return [4 /*yield*/, inquirer.prompt([{
                            name: 'name',
                            type: 'input',
                            message: 'Enter name',
                        }])];
                case 5:
                    name_1 = _b.sent();
                    users.remove(name_1.name);
                    return [3 /*break*/, 7];
                case 6:
                    Message.showColorized(MessageVariant.Info, "Bye bye!");
                    return [2 /*return*/];
                case 7:
                    startApp();
                    return [2 /*return*/];
            }
        });
    }); });
};
