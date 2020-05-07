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
/// <reference path="../types/spider.d.ts" />
var Guid = /** @class */ (function () {
    function Guid() {
    }
    Guid.NewGuid = function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            // tslint:disable-next-line:no-bitwise
            var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };
    return Guid;
}());
var XmlUtility = /** @class */ (function () {
    function XmlUtility() {
    }
    XmlUtility.Xml2json = function (data, arrayChecker) {
        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(data, 'text/xml');
        var root = xmlDoc.children[0];
        var obj = XmlUtility.xml2jsonRec(root, arrayChecker);
        return obj;
    };
    XmlUtility.tryParse = function (obj) {
        var newObj = obj;
        if (newObj.toLowerCase() === 'true') {
            return true;
        }
        if (newObj.toLowerCase() === 'false') {
            return false;
        }
        var valueFloat = Number(newObj);
        if (!isNaN(valueFloat)) {
            newObj = valueFloat;
        }
        return newObj;
    };
    XmlUtility.xml2jsonRec = function (node, arrayChecker) {
        var obj = undefined;
        var tempArrayNodes = [];
        // Push to array
        for (var index = 0; index < node.children.length; index++) {
            var element = node.children[index];
            tempArrayNodes.push(element);
        }
        // Check Array Type
        if (arrayChecker(node)) { // !!!Jerry: if array type, attribute will be ignored
            obj = [];
            tempArrayNodes.forEach(function (element) {
                obj.push(XmlUtility.xml2jsonRec(element, arrayChecker));
            });
        }
        else {
            if (tempArrayNodes.length === 0) { // root emtpy: <a>{here empty}</a>
                if (node.textContent && node.textContent.trim().length) { // if empty textContent use attribute
                    obj = XmlUtility.tryParse(node.textContent.trim()); // try Parse number
                }
                else { // if not empty textContent ignore attribute
                    if (node.attributes.length) {
                        obj = {};
                        // treat attribue as node
                        for (var index = 0; index < node.attributes.length; index++) {
                            var element = node.attributes[index];
                            var propName = XmlUtility.getUniqueName(obj, element.nodeName);
                            obj[propName] = XmlUtility.tryParse(element.value);
                        }
                    }
                    else {
                        obj = '';
                    }
                }
            }
            else {
                obj = {};
                // treat attribue as node
                for (var index = 0; index < node.attributes.length; index++) {
                    var element = node.attributes[index];
                    var propName = XmlUtility.getUniqueName(obj, element.nodeName);
                    obj[propName] = XmlUtility.tryParse(element.value);
                }
                // sub element rec
                tempArrayNodes.forEach(function (element) {
                    var propName = XmlUtility.getUniqueName(obj, element.nodeName);
                    obj[propName] = XmlUtility.xml2jsonRec(element, arrayChecker);
                });
            }
        }
        return obj;
    };
    XmlUtility.getUniqueName = function (obj, name) {
        var propName = name;
        var i = 0;
        while (obj[propName]) {
            propName = name + '.' + i;
            i++;
        }
        return propName;
    };
    return XmlUtility;
}());
var HttpClient = /** @class */ (function () {
    function HttpClient() {
    }
    HttpClient.get = function (url) {
        var promise = new Promise(function (resolve) {
            var anHttpRequest = new XMLHttpRequest();
            anHttpRequest.onreadystatechange = function () {
                if (anHttpRequest.readyState == 4) {
                    resolve(anHttpRequest.responseText);
                }
            };
            anHttpRequest.open("GET", url, true);
            anHttpRequest.send(null);
        });
        return promise;
    };
    return HttpClient;
}());
var FileSystem = /** @class */ (function () {
    function FileSystem() {
    }
    FileSystem.GetFileSystems = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var resp, fses, reRow, result, name_1, isDir, reRow, result, name_2, isDir, reRow, result, name_3, isDir;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, HttpClient.get(url)];
                    case 1:
                        resp = _a.sent();
                        fses = [];
                        // chrome 75
                        if (resp.includes('addRow') && resp.includes('onHasParentDirectory();')) {
                            reRow = /<script>addRow\("(.*)","(.*)",(.*),(.*),"(.*)",(\d*),"(.*)"\);<\/script>/g;
                            result = void 0;
                            while ((result = reRow.exec(resp)) !== null) {
                                name_1 = result[1];
                                isDir = result[3] === "1";
                                fses.push({
                                    name: name_1,
                                    isDir: isDir
                                });
                            }
                        }
                        // chrome 49
                        if (resp.includes('addRow') && !resp.includes('onHasParentDirectory();')) {
                            reRow = /<script>addRow\("([^(..)].*)","(([^(..)]).*)",(\d*),"(.*)"\);<\/script>/g;
                            result = void 0;
                            while ((result = reRow.exec(resp)) !== null) {
                                name_2 = result[1];
                                isDir = result[4] === "1";
                                fses.push({
                                    name: name_2,
                                    isDir: isDir
                                });
                            }
                        }
                        // iis
                        if (resp.includes('<pre>')) {
                            reRow = /([^<]*)(\s+)((&lt;dir&gt;)|(\d*)) <A HREF="([^<]*)">([^>]*)<\/A><br>/g;
                            result = void 0;
                            while ((result = reRow.exec(resp)) !== null) {
                                name_3 = result[7];
                                isDir = result[3] === '&lt;dir&gt;';
                                fses.push({
                                    name: name_3,
                                    isDir: isDir
                                });
                            }
                        }
                        return [2 /*return*/, fses];
                }
            });
        });
    };
    return FileSystem;
}());
//# sourceMappingURL=spiderlib.js.map