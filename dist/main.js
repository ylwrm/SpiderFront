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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var com, settingStr, setting, iL, lib, libsettingStr, libsetting, iS, spt, iS, css, iS, spt, table, rootDiv;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                com = 'SpiderTable';
                return [4 /*yield*/, HttpClient.get('Components/' + com + '.json')];
            case 1:
                settingStr = _a.sent();
                setting = JSON.parse(settingStr);
                iL = 0;
                _a.label = 2;
            case 2:
                if (!(iL < setting.libs.length)) return [3 /*break*/, 12];
                lib = setting.libs[iL];
                return [4 /*yield*/, HttpClient.get('LibSettings/' + lib + '.json')];
            case 3:
                libsettingStr = _a.sent();
                libsetting = JSON.parse(libsettingStr);
                iS = 0;
                _a.label = 4;
            case 4:
                if (!(iS < libsetting.scripts.length)) return [3 /*break*/, 7];
                spt = libsetting.scripts[iS];
                return [4 /*yield*/, DomLoader.LoadScript(spt)];
            case 5:
                _a.sent();
                _a.label = 6;
            case 6:
                iS++;
                return [3 /*break*/, 4];
            case 7:
                iS = 0;
                _a.label = 8;
            case 8:
                if (!(iS < libsetting.csses.length)) return [3 /*break*/, 11];
                css = libsetting.csses[iS];
                return [4 /*yield*/, DomLoader.LoadCss(css)];
            case 9:
                _a.sent();
                _a.label = 10;
            case 10:
                iS++;
                return [3 /*break*/, 8];
            case 11:
                iL++;
                return [3 /*break*/, 2];
            case 12:
                iS = 0;
                _a.label = 13;
            case 13:
                if (!(iS < setting.scripts.length)) return [3 /*break*/, 16];
                spt = setting.scripts[iS];
                return [4 /*yield*/, DomLoader.LoadScript(spt)];
            case 14:
                _a.sent();
                _a.label = 15;
            case 15:
                iS++;
                return [3 /*break*/, 13];
            case 16:
                table = new window[com]();
                rootDiv = document.createElement('div');
                document.body.appendChild(rootDiv);
                table.init(rootDiv);
                return [2 /*return*/];
        }
    });
}); })();
//# sourceMappingURL=main.js.map