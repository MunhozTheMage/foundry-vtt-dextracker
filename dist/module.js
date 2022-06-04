(function () {
  'use strict';

  function curry(fn, args = []) {
    return (..._args) => (rest => rest.length >= fn.length ? fn(...rest) : curry(fn, rest))([...args, ..._args]);
  }

  const _isArray = Array.isArray;

  function clampFn(min, max, input) {
    if (min > max) {
      throw new Error('min must not be greater than max in clamp(min, max, value)');
    }

    if (input >= min && input <= max) return input;
    if (input > max) return max;
    if (input < min) return min;
  }

  const clamp = curry(clampFn);

  const _keys = Object.keys;

  function reduceFn(reducer, acc, list) {
    if (!_isArray(list)) {
      throw new TypeError('reduce: list must be array or iterable');
    }

    let index = 0;
    const len = list.length;

    while (index < len) {
      acc = reducer(acc, list[index], index, list);
      index++;
    }

    return acc;
  }
  const reduce = curry(reduceFn);

  function mapArray(fn, list, isIndexed = false) {
    let index = 0;
    const willReturn = Array(list.length);

    while (index < list.length) {
      willReturn[index] = isIndexed ? fn(list[index], index) : fn(list[index]);
      index++;
    }

    return willReturn;
  }
  function mapObject(fn, obj) {
    let index = 0;

    const keys = _keys(obj);

    const len = keys.length;
    const willReturn = {};

    while (index < len) {
      const key = keys[index];
      willReturn[key] = fn(obj[key], key, obj);
      index++;
    }

    return willReturn;
  }
  function map(fn, iterable) {
    if (arguments.length === 1) return _iterable => map(fn, _iterable);

    if (!iterable) {
      throw new Error('Incorrect iterable input');
    }

    if (_isArray(iterable)) return mapArray(fn, iterable);
    return mapObject(fn, iterable);
  }

  function filterObject(predicate, obj) {
    const willReturn = {};

    for (const prop in obj) {
      if (predicate(obj[prop], prop, obj)) {
        willReturn[prop] = obj[prop];
      }
    }

    return willReturn;
  }
  function filterArray(predicate, list, indexed = false) {
    let index = 0;
    const len = list.length;
    const willReturn = [];

    while (index < len) {
      const predicateResult = indexed ? predicate(list[index], index) : predicate(list[index]);

      if (predicateResult) {
        willReturn.push(list[index]);
      }

      index++;
    }

    return willReturn;
  }
  function filter(predicate, iterable) {
    if (arguments.length === 1) return _iterable => filter(predicate, _iterable);

    if (!iterable) {
      throw new Error('Incorrect iterable input');
    }

    if (_isArray(iterable)) return filterArray(predicate, iterable, false);
    return filterObject(predicate, iterable);
  }

  function flatten(list, input) {
    const willReturn = input === undefined ? [] : input;

    for (let i = 0; i < list.length; i++) {
      if (_isArray(list[i])) {
        flatten(list[i], willReturn);
      } else {
        willReturn.push(list[i]);
      }
    }

    return willReturn;
  }

  function multiply(x, y) {
    if (arguments.length === 1) return _y => multiply(x, _y);
    return x * y;
  }

  reduce(multiply, 1);

  function range(start, end) {
    if (arguments.length === 1) return _end => range(start, _end);

    if (Number.isNaN(Number(start)) || Number.isNaN(Number(end))) {
      throw new TypeError('Both arguments to range must be numbers');
    }

    if (end < start) return [];
    const len = end - start;
    const willReturn = Array(len);

    for (let i = 0; i < len; i++) {
      willReturn[i] = start + i;
    }

    return willReturn;
  }

  function times(fn, howMany) {
    if (arguments.length === 1) return _howMany => times(fn, _howMany);

    if (!Number.isInteger(howMany) || howMany < 0) {
      throw new RangeError('n must be an integer');
    }

    return map(fn, range(0, howMany));
  }

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function getAugmentedNamespace(n) {
    var f = n.default;
  	if (typeof f == "function") {
  		var a = function () {
  			return f.apply(this, arguments);
  		};
  		a.prototype = f.prototype;
    } else a = {};
    Object.defineProperty(a, '__esModule', {value: true});
  	Object.keys(n).forEach(function (k) {
  		var d = Object.getOwnPropertyDescriptor(n, k);
  		Object.defineProperty(a, k, d.get ? d : {
  			enumerable: true,
  			get: function () {
  				return n[k];
  			}
  		});
  	});
  	return a;
  }

  var typeGuard = {};

  var isArray$1 = {};

  Object.defineProperty(isArray$1, "__esModule", { value: true });
  /**
   * @category Guard
   * @returns `true` if the value is an array
   * @example
   * ```typescript
   *   if(isArray(value)) return value.map((e) =>({ e }));
   * ```
   */
  const isArray = (value) => Array.isArray(value);
  isArray$1.default = isArray;

  var isObject$1 = {};

  Object.defineProperty(isObject$1, "__esModule", { value: true });
  /**
   * @category Guard
   * @returns `true` if value is **strictly** an instance of **`Object`**
   * @example
   * ```typescript
   *   if(isObject(values)) return { ...values, completed:true };
   * ```
   */
  const isObject = (value) => {
      return (value instanceof Object && Object === Object.getPrototypeOf(value).constructor);
  };
  isObject$1.default = isObject;

  var isNumber$1 = {};

  Object.defineProperty(isNumber$1, "__esModule", { value: true });
  /**
   * @category Guard
   * @returns `true` if `typeof value` is "number"
   * @example
   * ```typescript
   *   if(isNumber(value)) return value + 10;
   * ```
   */
  const isNumber = (value) => typeof value === "number";
  isNumber$1.default = isNumber;

  var isString$1 = {};

  Object.defineProperty(isString$1, "__esModule", { value: true });
  /**
   * @category Guard
   * @returns `true` if `typeof value` is "string"
   * @example
   * ```typescript
   *   if(isString(value)) return `${value} - ready`;
   * ```
   */
  const isString = (value) => typeof value === "string";
  isString$1.default = isString;

  var isBoolean$1 = {};

  Object.defineProperty(isBoolean$1, "__esModule", { value: true });
  /**
   * @category Guard
   * @returns `true` if `typeof value` is "boolean"
   * @example
   * ```typescript
   *   if(isBoolean(value)) return !value;
   * ```
   */
  const isBoolean = (value) => typeof value === "boolean";
  isBoolean$1.default = isBoolean;

  var isNull$1 = {};

  Object.defineProperty(isNull$1, "__esModule", { value: true });
  /**
   * @category Guard
   * @returns `true` if value is `null`
   * @example
   * ```typescript
   *   if(isNull(value)) return;
   * ```
   */
  const isNull = (value) => value === null;
  isNull$1.default = isNull;

  var isDefined$1 = {};

  Object.defineProperty(isDefined$1, "__esModule", { value: true });
  /**
   * @category Guard
   * @returns `true` if the value is defined
   * @example
   * ```typescript
   *   const value: string | undefined = record.get("something");
   *   if(isDefined(value)) return [value];
   * ```
   */
  const isDefined = (value) => value !== undefined;
  isDefined$1.default = isDefined;

  var isPresent$1 = {};

  Object.defineProperty(isPresent$1, "__esModule", { value: true });
  /**
   * @category Guard
   * @returns `true` if the value is defined and has a value, AKA is not null
   * @example
   * ```typescript
   *   const value: string | null = localStorage.getItem("something");
   *   if(isPresent(value)) return [value];
   * ```
   */
  const isPresent = (value) => value !== undefined && value !== null;
  isPresent$1.default = isPresent;

  var objectOf = {};

  /******************************************************************************
  Copyright (c) Microsoft Corporation.

  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.

  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** */
  /* global Reflect, Promise */

  var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
      return extendStatics(d, b);
  };

  function __extends(d, b) {
      if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() { this.constructor = d; }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  }

  var __assign = function() {
      __assign = Object.assign || function __assign(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
              s = arguments[i];
              for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
          }
          return t;
      };
      return __assign.apply(this, arguments);
  };

  function __rest$1(s, e) {
      var t = {};
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
          t[p] = s[p];
      if (s != null && typeof Object.getOwnPropertySymbols === "function")
          for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
              if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                  t[p[i]] = s[p[i]];
          }
      return t;
  }

  function __decorate(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
  }

  function __param(paramIndex, decorator) {
      return function (target, key) { decorator(target, key, paramIndex); }
  }

  function __metadata(metadataKey, metadataValue) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
  }

  function __awaiter$a(thisArg, _arguments, P, generator) {
      function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
      return new (P || (P = Promise))(function (resolve, reject) {
          function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
          function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
          function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
  }

  function __generator(thisArg, body) {
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
  }

  var __createBinding = Object.create ? (function(o, m, k, k2) {
      if (k2 === undefined) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() { return m[k]; } };
      }
      Object.defineProperty(o, k2, desc);
  }) : (function(o, m, k, k2) {
      if (k2 === undefined) k2 = k;
      o[k2] = m[k];
  });

  function __exportStar(m, o) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
  }

  function __values(o) {
      var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
      if (m) return m.call(o);
      if (o && typeof o.length === "number") return {
          next: function () {
              if (o && i >= o.length) o = void 0;
              return { value: o && o[i++], done: !o };
          }
      };
      throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
  }

  function __read(o, n) {
      var m = typeof Symbol === "function" && o[Symbol.iterator];
      if (!m) return o;
      var i = m.call(o), r, ar = [], e;
      try {
          while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
      }
      catch (error) { e = { error: error }; }
      finally {
          try {
              if (r && !r.done && (m = i["return"])) m.call(i);
          }
          finally { if (e) throw e.error; }
      }
      return ar;
  }

  /** @deprecated */
  function __spread() {
      for (var ar = [], i = 0; i < arguments.length; i++)
          ar = ar.concat(__read(arguments[i]));
      return ar;
  }

  /** @deprecated */
  function __spreadArrays() {
      for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
      for (var r = Array(s), k = 0, i = 0; i < il; i++)
          for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
              r[k] = a[j];
      return r;
  }

  function __spreadArray(to, from, pack) {
      if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
          if (ar || !(i in from)) {
              if (!ar) ar = Array.prototype.slice.call(from, 0, i);
              ar[i] = from[i];
          }
      }
      return to.concat(ar || Array.prototype.slice.call(from));
  }

  function __await(v) {
      return this instanceof __await ? (this.v = v, this) : new __await(v);
  }

  function __asyncGenerator(thisArg, _arguments, generator) {
      if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
      var g = generator.apply(thisArg, _arguments || []), i, q = [];
      return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
      function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
      function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
      function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
      function fulfill(value) { resume("next", value); }
      function reject(value) { resume("throw", value); }
      function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
  }

  function __asyncDelegator(o) {
      var i, p;
      return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
      function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
  }

  function __asyncValues(o) {
      if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
      var m = o[Symbol.asyncIterator], i;
      return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
      function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
      function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
  }

  function __makeTemplateObject(cooked, raw) {
      if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
      return cooked;
  }
  var __setModuleDefault = Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
  }) : function(o, v) {
      o["default"] = v;
  };

  function __importStar(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      __setModuleDefault(result, mod);
      return result;
  }

  function __importDefault(mod) {
      return (mod && mod.__esModule) ? mod : { default: mod };
  }

  function __classPrivateFieldGet(receiver, state, kind, f) {
      if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
  }

  function __classPrivateFieldSet(receiver, state, value, kind, f) {
      if (kind === "m") throw new TypeError("Private method is not writable");
      if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
      return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
  }

  function __classPrivateFieldIn(state, receiver) {
      if (receiver === null || (typeof receiver !== "object" && typeof receiver !== "function")) throw new TypeError("Cannot use 'in' operator on non-object");
      return typeof state === "function" ? receiver === state : state.has(receiver);
  }

  var tslib_es6 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    __extends: __extends,
    get __assign () { return __assign; },
    __rest: __rest$1,
    __decorate: __decorate,
    __param: __param,
    __metadata: __metadata,
    __awaiter: __awaiter$a,
    __generator: __generator,
    __createBinding: __createBinding,
    __exportStar: __exportStar,
    __values: __values,
    __read: __read,
    __spread: __spread,
    __spreadArrays: __spreadArrays,
    __spreadArray: __spreadArray,
    __await: __await,
    __asyncGenerator: __asyncGenerator,
    __asyncDelegator: __asyncDelegator,
    __asyncValues: __asyncValues,
    __makeTemplateObject: __makeTemplateObject,
    __importStar: __importStar,
    __importDefault: __importDefault,
    __classPrivateFieldGet: __classPrivateFieldGet,
    __classPrivateFieldSet: __classPrivateFieldSet,
    __classPrivateFieldIn: __classPrivateFieldIn
  });

  var require$$0 = /*@__PURE__*/getAugmentedNamespace(tslib_es6);

  var recursiveError = {};

  Object.defineProperty(recursiveError, "__esModule", { value: true });
  /**
   * @internal
   */
  class RecursiveError extends ReferenceError {
      static assert(iif) {
          const proxyHandler = {
              apply() {
                  throw new RecursiveError();
              },
          };
          const result = iif((fn) => new Proxy(fn, proxyHandler));
          delete proxyHandler.apply;
          return result;
      }
      constructor() {
          super("Cannot call the 'self' guard inside the constructor function when using the recursive mode");
      }
  }
  recursiveError.default = RecursiveError;

  Object.defineProperty(objectOf, "__esModule", { value: true });
  const tslib_1$4 = require$$0;
  const is_object_1$1 = (0, tslib_1$4.__importDefault)(isObject$1);
  const recursive_error_1$4 = (0, tslib_1$4.__importDefault)(recursiveError);
  /**
   * @category High Order Guard
   * @return a `Guard` that checks if the value respect the structure described by the guard object passed
   * @throws {RecursiveError} When calling the `self` guard in the callback
   * @example
   * ```typescript
   *   const isPerson = ObjectOf({
   *     firstName: isString,
   *     lastName: isString,
   *     age: isNumber,
   *   });
   * ```
   * @example
   * ```typescript
   *   type Person = {
   *     firstName: string;
   *     lastName: string;
   *     age: number;
   *     spouse: Person | null;
   *   };
   *
   *   const isPerson = ObjectOf<Person>((self) => ({
   *     firstName: isString,
   *     lastName: isString,
   *      age: isNumber,
   *      spouse: OneOf([self, isNull]),
   *   }));
   * ```
   */
  const ObjectOf = (guards) => {
      const isObjectOf = (obj) => (0, is_object_1$1.default)(obj) &&
          Object.entries(generatedGuards).every(([key, guard]) => guard.optional
              ? obj[key] === undefined || guard(obj[key])
              : key in obj && guard(obj[key]));
      const generatedGuards = recursive_error_1$4.default.assert((forbidCall) => typeof guards === "function" ? guards(forbidCall(isObjectOf)) : guards);
      return isObjectOf;
  };
  objectOf.default = ObjectOf;

  var recordOf = {};

  Object.defineProperty(recordOf, "__esModule", { value: true });
  const tslib_1$3 = require$$0;
  const is_object_1 = (0, tslib_1$3.__importDefault)(isObject$1);
  const recursive_error_1$3 = (0, tslib_1$3.__importDefault)(recursiveError);
  /**
   * @category High Order Guard
   * @return a `Guard` that checks if the values of the object passed respect the types of the guards passed
   * @throws {RecursiveError} When calling the `self` guard in the callback
   * @example
   * ```typescript
   *     const isGrades = RecordOf([isNumber]);
   * ```
   * @example
   * ```typescript
   *   type Grades = { [name: string]: number | Grades };
   *   const isGrades = RecordOf<Grades>((self) => [isNumber, self]);
   * ```
   */
  const RecordOf = (guards) => {
      const isRecordOf = (rec) => {
          return ((0, is_object_1.default)(rec) &&
              Object.values(rec).every((v) => generatedGuards.some((guard) => guard(v))));
      };
      const generatedGuards = recursive_error_1$3.default.assert((forbidCall) => typeof guards === "function" ? guards(forbidCall(isRecordOf)) : guards);
      return isRecordOf;
  };
  recordOf.default = RecordOf;

  var arrayOf = {};

  Object.defineProperty(arrayOf, "__esModule", { value: true });
  const tslib_1$2 = require$$0;
  const is_array_1$1 = (0, tslib_1$2.__importDefault)(isArray$1);
  const recursive_error_1$2 = (0, tslib_1$2.__importDefault)(recursiveError);
  /**
   * @category High Order Guard
   * @return a `Guard` that checks if every element of an array is one of the guards passed
   * @throws {RecursiveError} When calling the `self` guard in the callback
   * @example
   * ```typescript
   *   const isStringArray = ArrayOf([isString]);
   * ```
   * @example
   * ```typescript
   *   const isStringOrNumberArray = ArrayOf([isString, isNumber]);
   * ```
   * @example
   * ```typescript
   *   type FullNames = (string | FullNames)[];
   *   const isFullNames = ArrayOf<FullNames>((self) => [isString, self]);
   * ```
   */
  const ArrayOf = (guards) => {
      const isArrayOf = (value) => {
          return ((0, is_array_1$1.default)(value) &&
              value.every((value) => generatedGuards.some((guard) => guard(value))));
      };
      const generatedGuards = recursive_error_1$2.default.assert((forbidCall) => typeof guards === "function" ? guards(forbidCall(isArrayOf)) : guards);
      return isArrayOf;
  };
  arrayOf.default = ArrayOf;

  var tupleOf = {};

  Object.defineProperty(tupleOf, "__esModule", { value: true });
  const tslib_1$1 = require$$0;
  const is_array_1 = (0, tslib_1$1.__importDefault)(isArray$1);
  const recursive_error_1$1 = (0, tslib_1$1.__importDefault)(recursiveError);
  /**
   * @category High Order Guard
   * @return a `Guard` that checks if the values of the tuple passed respect the types of the guards passed
   * @throws {RecursiveError} When calling the `self` guard in the callback
   * @example
   * ```typescript
   *   const isPersonTuple = TupleOf([isString, isNumber]);
   * ```
   * @example
   * ```typescript
   *   type Person = [string, number, Person | null];
   *   const isPersonTuple = TupleOf<Person>((self) => [
   *     isString,
   *     isNumber,
   *     OneOf([self, isNull]),
   *   ]);
   * ```
   */
  const TupleOf = (guards) => {
      const isTupleOf = (tuple) => {
          return ((0, is_array_1.default)(tuple) &&
              tuple.length <= generatedGuards.length &&
              generatedGuards.every((guard, i) => (guard.optional && tuple[i] === undefined) || guard(tuple[i])));
      };
      const generatedGuards = recursive_error_1$1.default.assert((forbidCall) => typeof guards === "function" ? guards(forbidCall(isTupleOf)) : guards);
      const optionalBoundary = generatedGuards.reduceRight((i, guard, j) => (guard.optional ? j : i), generatedGuards.length);
      const hasRequiredAfterBoundary = generatedGuards.some(({ optional }, j) => optional ? j < optionalBoundary : j >= optionalBoundary);
      if (hasRequiredAfterBoundary)
          throw new TypeError("A required guard cannot follow an optional guard");
      return isTupleOf;
  };
  tupleOf.default = TupleOf;

  var oneOf = {};

  Object.defineProperty(oneOf, "__esModule", { value: true });
  const tslib_1 = require$$0;
  const recursive_error_1 = (0, tslib_1.__importDefault)(recursiveError);
  /**
   * @category High Order Guard
   * @return a `Guard` that checks if the value is of one of the passed guards types
   * @throws {RecursiveError} When calling the `self` guard in the callback
   * @example
   * ```typescript
   *       const isGrade = OneOf([isString, isNumber]);
   * ```
   * @example
   * ```typescript
   *     type Grades = string | number | { [k: string]: Grades };
   *     const isGrades = OneOf<Grades>((self) => [
   *       isString,
   *       isNumber,
   *       RecordOf([self]),
   *     ]);
   * ```
   */
  const OneOf = (guards) => {
      const isOneOf = (value) => {
          return generatedGuards.some((guard) => guard(value));
      };
      const generatedGuards = recursive_error_1.default.assert((forbidCall) => typeof guards === "function" ? guards(forbidCall(isOneOf)) : guards);
      return isOneOf;
  };
  oneOf.default = OneOf;

  var instanceOf = {};

  Object.defineProperty(instanceOf, "__esModule", { value: true });
  /**
   * @category Guard Factory
   * @return a Guard that checks if a value is instance of one of the constructor passed
   * @example
   * ```typescript
   *   const isDate = InstanceOf([Date]);
   * ```
   * @example
   * ```typescript
   *   const isBytes = InstanceOf([Buffer, Uint8Array]);
   * ```
   */
  const InstanceOf = (constructors) => {
      return (value) => {
          return constructors.some((constructor) => value instanceof constructor);
      };
  };
  instanceOf.default = InstanceOf;

  var valueOf = {};

  Object.defineProperty(valueOf, "__esModule", { value: true });
  /**
   * @category Guard Factory
   * @return a Guard that checks if a value is **identical** to one of the values passed
   * @example
   * ```typescript
   *   const isCurrency = ValueOf(["USD", "EUR", "GBP"] as const);
   * ```
   */
  const ValueOf = (expectedValues) => {
      return (value) => {
          return expectedValues.some(expected => value === expected);
      };
  };
  valueOf.default = ValueOf;

  var optionalOf = {};

  Object.defineProperty(optionalOf, "__esModule", { value: true });
  const optional = { optional: true };
  /**
   * @category High Order Guard
   * @description
   * This returns a contextual guard that allows keyed High Order Guards, I.E: TupleOf, that the key might not be present.
   * @return a `OptionalGuard` of the same type as the guard passed
   * @example
   * ```typescript
   *   const isOptionalAge = OptionalOf(isNumber);
   *   const isPersonTuple: Guard<[string, number?]> = TupleOf([isString, isOptionalAge]);
   * ```
   */
  const OptionalOf = (guard) => {
      return Object.assign((v) => guard(v), optional);
  };
  optionalOf.default = OptionalOf;

  var nullableOf = {};

  Object.defineProperty(nullableOf, "__esModule", { value: true });
  /**
   * @category High Order Guard
   * @return a `Guard` that checks that the value is of the type of the guard passed or null
   * @example
   * ```typescript
   *   const isNullableAge = NullableOf(isNumber);
   *   const isPersonTuple: Guard<[string, number | null]> = TupleOf([isString, isNullableAge]);
   * ```
   */
  const NullableOf = (guard) => {
      return (v) => v === null || guard(v);
  };
  nullableOf.default = NullableOf;

  var maybeOf = {};

  Object.defineProperty(maybeOf, "__esModule", { value: true });
  /**
   * @category High Order Guard
   * @return a `Guard` that checks that the value is of the type of the guard passed or undefined
   * @example
   * ```typescript
   *   const isMaybeAge = MaybeOf(isNumber);
   *   const isPersonTuple: Guard<[string, number | undefined]> = TupleOf([isString, isMaybeAge]);
   * ```
   */
  const MaybeOf = (guard) => {
      return (v) => v === undefined || guard(v);
  };
  maybeOf.default = MaybeOf;

  (function (exports) {
  	var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
  	    return (mod && mod.__esModule) ? mod : { "default": mod };
  	};
  	Object.defineProperty(exports, "__esModule", { value: true });
  	exports.MaybeOf = exports.NullableOf = exports.OptionalOf = exports.ValueOf = exports.InstanceOf = exports.OneOf = exports.TupleOf = exports.ArrayOf = exports.RecordOf = exports.ObjectOf = exports.isPresent = exports.isDefined = exports.isNull = exports.isBoolean = exports.isString = exports.isNumber = exports.isObject = exports.isArray = void 0;
  	var is_array_1 = isArray$1;
  	Object.defineProperty(exports, "isArray", { enumerable: true, get: function () { return __importDefault(is_array_1).default; } });
  	var is_object_1 = isObject$1;
  	Object.defineProperty(exports, "isObject", { enumerable: true, get: function () { return __importDefault(is_object_1).default; } });
  	var is_number_1 = isNumber$1;
  	Object.defineProperty(exports, "isNumber", { enumerable: true, get: function () { return __importDefault(is_number_1).default; } });
  	var is_string_1 = isString$1;
  	Object.defineProperty(exports, "isString", { enumerable: true, get: function () { return __importDefault(is_string_1).default; } });
  	var is_boolean_1 = isBoolean$1;
  	Object.defineProperty(exports, "isBoolean", { enumerable: true, get: function () { return __importDefault(is_boolean_1).default; } });
  	var is_null_1 = isNull$1;
  	Object.defineProperty(exports, "isNull", { enumerable: true, get: function () { return __importDefault(is_null_1).default; } });
  	var is_defined_1 = isDefined$1;
  	Object.defineProperty(exports, "isDefined", { enumerable: true, get: function () { return __importDefault(is_defined_1).default; } });
  	var is_present_1 = isPresent$1;
  	Object.defineProperty(exports, "isPresent", { enumerable: true, get: function () { return __importDefault(is_present_1).default; } });
  	var object_of_1 = objectOf;
  	Object.defineProperty(exports, "ObjectOf", { enumerable: true, get: function () { return __importDefault(object_of_1).default; } });
  	var record_of_1 = recordOf;
  	Object.defineProperty(exports, "RecordOf", { enumerable: true, get: function () { return __importDefault(record_of_1).default; } });
  	var array_of_1 = arrayOf;
  	Object.defineProperty(exports, "ArrayOf", { enumerable: true, get: function () { return __importDefault(array_of_1).default; } });
  	var tuple_of_1 = tupleOf;
  	Object.defineProperty(exports, "TupleOf", { enumerable: true, get: function () { return __importDefault(tuple_of_1).default; } });
  	var one_of_1 = oneOf;
  	Object.defineProperty(exports, "OneOf", { enumerable: true, get: function () { return __importDefault(one_of_1).default; } });
  	var instance_of_1 = instanceOf;
  	Object.defineProperty(exports, "InstanceOf", { enumerable: true, get: function () { return __importDefault(instance_of_1).default; } });
  	var value_of_1 = valueOf;
  	Object.defineProperty(exports, "ValueOf", { enumerable: true, get: function () { return __importDefault(value_of_1).default; } });
  	var optional_of_1 = optionalOf;
  	Object.defineProperty(exports, "OptionalOf", { enumerable: true, get: function () { return __importDefault(optional_of_1).default; } });
  	var nullable_of_1 = nullableOf;
  	Object.defineProperty(exports, "NullableOf", { enumerable: true, get: function () { return __importDefault(nullable_of_1).default; } });
  	var maybe_of_1 = maybeOf;
  	Object.defineProperty(exports, "MaybeOf", { enumerable: true, get: function () { return __importDefault(maybe_of_1).default; } });
  } (typeGuard));

  // =====================================
  // Module
  // =====================================
  const MODULE_NAME = "foundry-vtt-dextracker";
  // =====================================
  // Paths
  // =====================================
  const MODULE_LOCATION = "modules/foundry-vtt-dextracker";
  const TEMPLATES_LOCATION = `${MODULE_LOCATION}/templates`;
  const PATHS = {
      TEMPLATES: {
          DEX: `${TEMPLATES_LOCATION}/dex.hbs`,
          IMPORTS_AND_EXPORTS: `${TEMPLATES_LOCATION}/imports-and-exports.hbs`,
          CREATURE_EDIT: `${TEMPLATES_LOCATION}/creature-edit.hbs`,
      },
  };

  var __awaiter$9 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
      function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
      return new (P || (P = Promise))(function (resolve, reject) {
          function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
          function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
          function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
  };
  class DextrackerUtils {
      static log(text) {
          console.log(`DexTracker | ${text}`);
      }
      static createSceneControlButton(sceneControlContainer, newTool) {
          sceneControlContainer.tools.push(newTool);
      }
      static ensureDirectoryExists(source, path) {
          return __awaiter$9(this, void 0, void 0, function* () {
              try {
                  const foundFolder = yield FilePicker.browse(source, path);
                  return foundFolder;
              }
              catch (_a) {
                  DextrackerUtils.log(`Created directory: ${path}`);
                  yield FilePicker.createDirectory(source, path);
                  const createdFolder = yield FilePicker.browse(source, path);
                  return createdFolder;
              }
          });
      }
      static checkIfFileExists(source, path, fileName) {
          return __awaiter$9(this, void 0, void 0, function* () {
              const dir = yield FilePicker.browse(source, path);
              return dir.files
                  .map((file) => file.split("/").pop())
                  .some((currentFileName) => fileName === currentFileName);
          });
      }
      static saveFileLocaly(contents, type, fileName) {
          const a = document.createElement("a");
          a.href = URL.createObjectURL(new Blob(contents, { type }));
          a.download = fileName;
          a.click();
      }
      static loadLocalFile(file) {
          return __awaiter$9(this, void 0, void 0, function* () {
              const reader = new FileReader();
              const readFilePromise = new Promise((resolve, reject) => {
                  reader.onload = resolve;
                  reader.onerror = reject;
              });
              reader.readAsText(file);
              yield readFilePromise;
              return reader.result;
          });
      }
  }

  var __awaiter$8 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
      function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
      return new (P || (P = Promise))(function (resolve, reject) {
          function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
          function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
          function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
  };
  class JSONUploader {
      constructor({ fileName, path, source = "data", }) {
          this.fileName = fileName;
          this.path = path;
          this.source = source;
      }
      init() {
          return __awaiter$8(this, void 0, void 0, function* () {
              yield this._ensureDirectoryExists();
          });
      }
      upload(data) {
          return __awaiter$8(this, void 0, void 0, function* () {
              const jsonData = JSON.stringify(data);
              const file = new File([jsonData], this.fileName, {
                  type: "application/json",
              });
              const response = yield FilePicker.upload(this.source, this.path, file);
              if (!response || !("path" in response) || !response.path) {
                  throw new Error(`Error while uploading file: ${this.fileName}`);
              }
              console.log(response);
          });
      }
      getJsonData() {
          return __awaiter$8(this, void 0, void 0, function* () {
              const request = yield fetch(`${this.path}/${this.fileName}`);
              const data = yield request.json();
              return data;
          });
      }
      // ===============================================
      // Private methods
      // ===============================================
      _ensureDirectoryExists() {
          return __awaiter$8(this, void 0, void 0, function* () {
              DextrackerUtils.ensureDirectoryExists(this.source, this.path);
          });
      }
  }

  var __awaiter$7 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
      function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
      return new (P || (P = Promise))(function (resolve, reject) {
          function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
          function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
          function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
  };
  class BaseData {
      constructor({ baseDir, fileName }) {
          this.uploader = new JSONUploader({
              fileName,
              path: baseDir,
          });
      }
      init() {
          return __awaiter$7(this, void 0, void 0, function* () {
              yield this.uploader.init();
              yield this._createFileIfNotPresent();
          });
      }
      get defaultData() {
          return {};
      }
      getData() {
          return __awaiter$7(this, void 0, void 0, function* () {
              const data = yield this.uploader.getJsonData();
              return data;
          });
      }
      _createFileIfNotPresent() {
          return __awaiter$7(this, void 0, void 0, function* () {
              const fileExists = yield DextrackerUtils.checkIfFileExists(this.uploader.source, this.uploader.path, this.uploader.fileName);
              if (fileExists)
                  return;
              yield this.uploader.upload(this.defaultData);
          });
      }
  }

  var __awaiter$6 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
      function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
      return new (P || (P = Promise))(function (resolve, reject) {
          function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
          function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
          function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
  };
  const isCreatureObject = typeGuard.ObjectOf({
      id: typeGuard.isNumber,
      name: typeGuard.isString,
      image: typeGuard.isString,
  });
  const isCreatureData = typeGuard.ObjectOf({
      currentId: typeGuard.isNumber,
      creatures: typeGuard.ArrayOf([isCreatureObject]),
  });
  class Creatures extends BaseData {
      constructor({ baseDir }) {
          super({
              fileName: "creatures.json",
              baseDir,
          });
      }
      get defaultData() {
          return { currentId: 0, creatures: [] };
      }
      getData() {
          return __awaiter$6(this, void 0, void 0, function* () {
              const data = yield this.uploader.getJsonData();
              if (!isCreatureData(data)) {
                  console.log(data);
                  throw new Error("Invalid creatures data");
              }
              return data;
          });
      }
      importFromObject(data, { overwrite = true } = {}) {
          return __awaiter$6(this, void 0, void 0, function* () {
              const currentData = yield this.getData();
              let currentId = overwrite ? 0 : currentData.currentId;
              const importedCreatures = data.creatures.map((creature) => (Object.assign(Object.assign({}, creature), { id: currentId++ })));
              const newObject = {
                  currentId,
                  creatures: overwrite
                      ? importedCreatures
                      : Object.assign(Object.assign({}, currentData.creatures), importedCreatures),
              };
              yield this._setCreatures(newObject);
              return newObject;
          });
      }
      exportCurrentData() {
          return __awaiter$6(this, void 0, void 0, function* () {
              const currentData = yield this.getData();
              const inputFormatData = {
                  creatures: currentData.creatures.map((creature) => ({
                      name: creature.name,
                      image: creature.image,
                  })),
              };
              return JSON.stringify(inputFormatData);
          });
      }
      paginateCreatures(creatures, amountPerPage = 15) {
          const pages = Math.ceil(creatures.length / amountPerPage);
          const paginatedCreatures = times((i) => filter(Boolean, range(i * amountPerPage, i * amountPerPage + amountPerPage).map((i) => creatures[i])), pages);
          return {
              pages,
              paginatedCreatures,
          };
      }
      _setCreatures(creatures) {
          return __awaiter$6(this, void 0, void 0, function* () {
              this.uploader.upload(creatures);
          });
      }
  }

  var __awaiter$5 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
      function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
      return new (P || (P = Promise))(function (resolve, reject) {
          function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
          function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
          function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
  };
  class UserCreaturesTracking extends BaseData {
      constructor({ baseDir, userId }) {
          super({
              fileName: `user_${userId}_tracker.json`,
              baseDir,
          });
          this.userId = userId;
      }
      get defaultData() {
          return {};
      }
      get user() {
          return [...((game === null || game === void 0 ? void 0 : game.users) || [])].find((user) => user.id === this.userId);
      }
      setCreaturesTracking(trackings) {
          return __awaiter$5(this, void 0, void 0, function* () {
              this.uploader.upload(trackings);
          });
      }
  }

  var __awaiter$4 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
      function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
      return new (P || (P = Promise))(function (resolve, reject) {
          function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
          function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
          function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
  };
  class Data {
      static init(baseDir) {
          return __awaiter$4(this, void 0, void 0, function* () {
              Data.CreaturesData = new Creatures({ baseDir });
              yield Data.CreaturesData.init();
          });
      }
      static postInit(baseDir) {
          return __awaiter$4(this, void 0, void 0, function* () {
              Data.UserCreaturesTrackingDataCollection = (game.users || []).reduce((collection, user) => (Object.assign(Object.assign({}, collection), { [user.id]: new UserCreaturesTracking({
                      baseDir: `${baseDir}/userData`,
                      userId: user.id,
                  }) })), {});
              yield Promise.all(Object.values(Data.UserCreaturesTrackingDataCollection).map((data) => data.init()));
          });
      }
  }

  class DextrackerGlobal {
      static finishLoading() {
          DextrackerUtils.log("Module was loaded!!!");
          this.globalObject.loaded = true;
      }
      static runIfLoaded(cb) {
          if (this.globalObject.loaded) {
              cb();
          }
          else {
              DextrackerUtils.log("Action cannot be performed while module is not loaded...");
          }
      }
  }
  DextrackerGlobal.globalObject = {
      loaded: false,
  };

  var __awaiter$3 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
      function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
      return new (P || (P = Promise))(function (resolve, reject) {
          function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
          function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
          function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
  };
  class ImportsAndExportsFormApplication extends FormApplication {
      constructor() {
          super({});
      }
      render(...params) {
          DextrackerGlobal.runIfLoaded(() => super.render(...params));
      }
      static get defaultOptions() {
          const options = super.defaultOptions;
          options.template = PATHS.TEMPLATES.IMPORTS_AND_EXPORTS;
          options.title = "Dextracker.Application.ImportsAndExports.Title";
          options.resizable = true;
          options.width = 500;
          options.height = 300;
          options.top = 100;
          options.left = 100;
          return options;
      }
      activateListeners(html) {
          super.activateListeners(html);
          const { IMPORT_MODE_SELECT, IMPORT_BUTTON, EXPORT_BUTTON, IMPORT_FILE_INPUT, } = this.DOM_ELEMENTS;
          IMPORT_MODE_SELECT.on("change", (e) => this._onChangeImportMode(e));
          IMPORT_BUTTON.on("click", (e) => this._onClickImport(e));
          EXPORT_BUTTON.on("click", (e) => this._onClickExport(e));
          IMPORT_FILE_INPUT.on("change", () => this._onUpdateImportFile());
      }
      _updateObject() {
          return __awaiter$3(this, void 0, void 0, function* () {
              return undefined;
          });
      }
      // ======================================
      // Private DOM Manipulation Methods
      // ======================================
      get DOM_ELEMENTS() {
          return {
              WARNING_TEXT: $("#creatures-warning"),
              IMPORT_BUTTON: $("#creatures-import"),
              EXPORT_BUTTON: $("#creatures-export"),
              IMPORT_MODE_SELECT: $("#creatures-import-mode"),
              IMPORT_FILE_INPUT: $("#creatures-import-file"),
          };
      }
      _setCreaturesWarningShowing(show) {
          const { WARNING_TEXT } = this.DOM_ELEMENTS;
          show ? WARNING_TEXT.show() : WARNING_TEXT.hide();
      }
      _updateImportButtonEnabledState() {
          const { IMPORT_FILE_INPUT, IMPORT_BUTTON } = this.DOM_ELEMENTS;
          IMPORT_BUTTON.prop("disabled", IMPORT_FILE_INPUT.val() === "");
      }
      // ======================================
      // Private Data Manipulation Methods
      // ======================================
      _exportCreaturesData() {
          return __awaiter$3(this, void 0, void 0, function* () {
              const jsonData = yield Data.CreaturesData.exportCurrentData();
              DextrackerUtils.saveFileLocaly([jsonData], "application/json", "fvtt-dextracker-creatures.json");
          });
      }
      _loadImportFile() {
          return __awaiter$3(this, void 0, void 0, function* () {
              const { IMPORT_FILE_INPUT } = this.DOM_ELEMENTS;
              if (IMPORT_FILE_INPUT.val() === "")
                  throw new Error("No file to upload");
              const file = yield DextrackerUtils.loadLocalFile(IMPORT_FILE_INPUT.prop("files")[0]);
              return file;
          });
      }
      _importCreaturesData(json) {
          return __awaiter$3(this, void 0, void 0, function* () {
              Data.CreaturesData.importFromObject(JSON.parse(json));
          });
      }
      // ======================================
      // Private Event Methods
      // ======================================
      _onChangeImportMode(event) {
          const newValue = event.target.value;
          if (newValue === "merge") {
              this._setCreaturesWarningShowing(false);
              return;
          }
          if (newValue === "overwrite") {
              this._setCreaturesWarningShowing(true);
              return;
          }
      }
      _onClickImport(event) {
          return __awaiter$3(this, void 0, void 0, function* () {
              event.preventDefault();
              const jsonFile = yield this._loadImportFile();
              this._importCreaturesData(jsonFile);
          });
      }
      _onClickExport(event) {
          event.preventDefault();
          this._exportCreaturesData();
      }
      _onUpdateImportFile() {
          this._updateImportButtonEnabledState();
      }
  }

  class DextrackerSetting {
      constructor(data) {
          this.name = data.name;
          this.options = data.options;
      }
      init() {
          if (!("settings" in game))
              return;
          game.settings.register(MODULE_NAME, this.name, this.options);
      }
      get() {
          return game.settings.get(MODULE_NAME, this.name);
      }
  }
  class DextrackerSettingMenu {
      constructor(data) {
          this.name = data.name;
          this.options = data.options;
      }
      init() {
          if (!("settings" in game))
              return;
          game.settings.registerMenu(MODULE_NAME, this.name, this.options);
      }
  }
  class DextrackerSettingEntries {
      static init() {
          DextrackerSettingEntries.DexName.init();
          DextrackerSettingEntries.ImportsAndExportsMenu.init();
      }
  }
  DextrackerSettingEntries.DexName = new DextrackerSetting({
      name: "dex-name",
      options: {
          name: "Dextracker.Config.DexName.Name",
          hint: "Dextracker.Config.DexName.Hint",
          scope: "world",
          config: true,
          type: String,
          default: "Dex",
      },
  });
  DextrackerSettingEntries.ImportsAndExportsMenu = new DextrackerSettingMenu({
      name: "imports-and-exports",
      options: {
          name: "Dextracker.Config.ImportsAndExports.Name",
          label: "Dextracker.Config.ImportsAndExports.Label",
          hint: "Dextracker.Config.ImportsAndExports.Hint",
          icon: "fas fa-folder",
          type: ImportsAndExportsFormApplication,
          restricted: true,
      },
  });

  class Filter {
      constructor(initialFilter) {
          this.currentFilter = initialFilter;
          this.updatedFilter = initialFilter;
      }
      get value() {
          return this.updatedFilter;
      }
      set value(newValue) {
          this.updatedFilter = newValue;
      }
      filterChanged() {
          return this.currentFilter !== this.updatedFilter;
      }
      updateValue() {
          this.currentFilter = this.updatedFilter;
      }
  }

  class BaseApplication extends Application {
      render(...params) {
          DextrackerGlobal.runIfLoaded(() => super.render(...params));
      }
  }

  var __awaiter$2 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
      function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
      return new (P || (P = Promise))(function (resolve, reject) {
          function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
          function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
          function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
  };
  class CreatureEditApplication extends BaseApplication {
      constructor() {
          super();
          this.onClose = () => { };
      }
      static get defaultOptions() {
          const options = super.defaultOptions;
          options.template = PATHS.TEMPLATES.CREATURE_EDIT;
          options.title = "Dextracker.Application.CreatureEdit.Title";
          options.width = 400;
          options.height = 250;
          options.top = 100;
          options.left = 100;
          return options;
      }
      getData() {
          return __awaiter$2(this, void 0, void 0, function* () {
              return {
                  creature: this.creature,
                  initialStatus: this.initialStatus,
              };
          });
      }
      activateListeners(html) {
          return __awaiter$2(this, void 0, void 0, function* () {
              const { CREATURE_STATUS_SELECT, SAVE_BUTTON } = this.DOM_ELEMENTS;
              CREATURE_STATUS_SELECT.prop("value", this.initialStatus);
              SAVE_BUTTON.on("click", (e) => this._onClickSave(e));
          });
      }
      close(options) {
          const _super = Object.create(null, {
              close: { get: () => super.close }
          });
          return __awaiter$2(this, void 0, void 0, function* () {
              _super.close.call(this);
              this.onClose();
          });
      }
      // ======================================
      // Private Data Manipulation Methods
      // ======================================
      _saveCurrentUserTracker(newObject) {
          return __awaiter$2(this, void 0, void 0, function* () {
              const currentUserTracker = yield Data.UserCreaturesTrackingDataCollection[game.user.id];
              const currentData = yield currentUserTracker.getData();
              yield currentUserTracker.setCreaturesTracking(Object.assign(Object.assign({}, currentData), newObject));
          });
      }
      // ======================================
      // Private DOM Manipulation Methods
      // ======================================
      get DOM_ELEMENTS() {
          return {
              CREATURE_STATUS_SELECT: $("#user-creature-status"),
              SAVE_BUTTON: $("#save-creature-edit"),
          };
      }
      // ======================================
      // Private Event Methods
      // ======================================
      _onClickSave(event) {
          return __awaiter$2(this, void 0, void 0, function* () {
              console.log(this.DOM_ELEMENTS.CREATURE_STATUS_SELECT.prop("value"));
              yield this._saveCurrentUserTracker({
                  [this.creature.id]: {
                      status: this.DOM_ELEMENTS.CREATURE_STATUS_SELECT.prop("value"),
                  },
              });
              this.close();
          });
      }
  }

  var __awaiter$1 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
      function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
      return new (P || (P = Promise))(function (resolve, reject) {
          function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
          function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
          function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
  };
  var __rest = (undefined && undefined.__rest) || function (s, e) {
      var t = {};
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
          t[p] = s[p];
      if (s != null && typeof Object.getOwnPropertySymbols === "function")
          for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
              if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                  t[p[i]] = s[p[i]];
          }
      return t;
  };
  class DexApplication extends BaseApplication {
      constructor() {
          super();
          this.editCreatureApp = new CreatureEditApplication();
          this._resetApplicationState();
          this.editCreatureApp.onClose = () => this.render();
      }
      static get defaultOptions() {
          const options = super.defaultOptions;
          options.template = PATHS.TEMPLATES.DEX;
          options.title = "Dextracker.Title";
          options.resizable = true;
          options.width = 900;
          options.height = 600;
          options.top = 100;
          options.left = 100;
          return options;
      }
      getData() {
          var _a, _b;
          return __awaiter$1(this, void 0, void 0, function* () {
              const paginatedCreatures = yield this._getCreatures();
              const creatures = yield this._getTrackedCreatures();
              return {
                  user: {
                      color: "user" in game && ((_a = game.user) === null || _a === void 0 ? void 0 : _a.color) ? game.user.color : "#ffffff",
                      name: "user" in game && ((_b = game.user) === null || _b === void 0 ? void 0 : _b.name) ? game.user.name : "",
                  },
                  dexName: DextrackerSettingEntries.DexName.get(),
                  creatures: creatures.map((_a) => {
                      var { status } = _a, creature = __rest(_a, ["status"]);
                      return (Object.assign(Object.assign({}, creature), { status: {
                              type: status,
                              text: { "not-seen": "Not seen", seen: "Seen", caught: "Caught" }[status],
                          } }));
                  }),
                  currentPage: this.currentPage + 1,
                  totalPages: paginatedCreatures.pages,
              };
          });
      }
      activateListeners(html) {
          const _super = Object.create(null, {
              activateListeners: { get: () => super.activateListeners }
          });
          return __awaiter$1(this, void 0, void 0, function* () {
              _super.activateListeners.call(this, html);
              yield this._applicationFinishedRendering();
              const { PAGINATION_PREV, PAGINATION_NEXT, PAGINATION_INPUT_BUTTON, SEARCH_BUTTON, CREATURES_BUTTONS, } = this.DOM_ELEMENTS;
              PAGINATION_PREV.on("click", (e) => this._onClickPrev(e));
              PAGINATION_NEXT.on("click", (e) => this._onClickNext(e));
              PAGINATION_INPUT_BUTTON.on("click", (e) => this._onClickGoToPage(e));
              SEARCH_BUTTON.on("click", (e) => this._onClickSearch(e));
              CREATURES_BUTTONS.on("click", (e) => this._onClickEditCreatureEntry(e));
          });
      }
      close(options) {
          const _super = Object.create(null, {
              close: { get: () => super.close }
          });
          return __awaiter$1(this, void 0, void 0, function* () {
              this._resetApplicationState();
              _super.close.call(this, options);
          });
      }
      _resetApplicationState() {
          this.currentPage = 0;
          this.creaturesCache = undefined;
          this.search = {
              text: new Filter(undefined),
          };
      }
      _applicationFinishedRendering() {
          return __awaiter$1(this, void 0, void 0, function* () {
              yield this._disablePaginationButtonIfNeeded();
              this._setSearchTextToCurrentValue();
          });
      }
      _updateFilters() {
          Object.values(this.search).forEach((filter) => {
              filter.updateValue();
          });
      }
      _filtersChanged() {
          return Object.values(this.search).every((filter) => filter.filterChanged());
      }
      // ======================================
      // Private Data Manipulation Methods
      // ======================================
      _getCreatures() {
          return __awaiter$1(this, void 0, void 0, function* () {
              if (this.creaturesCache === undefined || this._filtersChanged()) {
                  this._updateFilters();
                  const { creatures } = yield Data.CreaturesData.getData();
                  const filteredCreatures = this._filterCreatures(creatures);
                  this.creaturesCache =
                      Data.CreaturesData.paginateCreatures(filteredCreatures);
              }
              return this.creaturesCache;
          });
      }
      _filterCreatures(creatures) {
          return creatures.filter((creature) => {
              var _a;
              return this.search.text.value
                  ? creature.name
                      .toLowerCase()
                      .includes((_a = this.search.text.value) === null || _a === void 0 ? void 0 : _a.toLowerCase())
                  : true;
          });
      }
      _getTrackedCreatures() {
          return __awaiter$1(this, void 0, void 0, function* () {
              const trackers = yield Data.UserCreaturesTrackingDataCollection[game.user.id].getData();
              console.log(trackers);
              const { paginatedCreatures } = yield this._getCreatures();
              const creatures = paginatedCreatures[this.currentPage];
              return creatures.map((creature) => {
                  var _a;
                  return (Object.assign(Object.assign({}, creature), { status: ((_a = trackers[creature.id]) === null || _a === void 0 ? void 0 : _a.status) || "not-seen" }));
              });
          });
      }
      _findCreatureById(id) {
          return __awaiter$1(this, void 0, void 0, function* () {
              const { paginatedCreatures } = yield this._getCreatures();
              const creatures = flatten(paginatedCreatures);
              return creatures.find((creature) => creature.id === id);
          });
      }
      // ======================================
      // Private DOM Manipulation Methods
      // ======================================
      get DOM_ELEMENTS() {
          return {
              PAGINATION_PREV: $("#pagination-prev"),
              PAGINATION_NEXT: $("#pagination-next"),
              PAGINATION_INPUT: $("#pagination-input"),
              PAGINATION_INPUT_BUTTON: $("#pagination-input-button"),
              SEARCH_TEXT_INPUT: $("#search-text"),
              SEARCH_BUTTON: $("#search-button"),
              CREATURES_BUTTONS: $(".creature-edit-entry"),
          };
      }
      _disablePaginationButtonIfNeeded() {
          return __awaiter$1(this, void 0, void 0, function* () {
              const paginatedCreatures = yield this._getCreatures();
              this.DOM_ELEMENTS.PAGINATION_PREV.prop("disabled", this.currentPage <= 0);
              this.DOM_ELEMENTS.PAGINATION_NEXT.prop("disabled", this.currentPage >= paginatedCreatures.pages - 1);
          });
      }
      _getGoToPageInputValue() {
          const inputValue = this.DOM_ELEMENTS.PAGINATION_INPUT.val();
          const value = Number(inputValue);
          if (isNaN(value) || value % 1 > 0)
              return 0;
          return value;
      }
      _setSearchTextToCurrentValue() {
          const { SEARCH_TEXT_INPUT } = this.DOM_ELEMENTS;
          SEARCH_TEXT_INPUT.prop("value", this.search.text.value || "");
      }
      // ======================================
      // Private Event Methods
      // ======================================
      _onClickNext(event) {
          this.currentPage += 1;
          this.render();
      }
      _onClickPrev(event) {
          this.currentPage -= 1;
          this.render();
      }
      _onClickGoToPage(event) {
          return __awaiter$1(this, void 0, void 0, function* () {
              const paginatedCreatures = yield this._getCreatures();
              this.currentPage = clamp(0, paginatedCreatures.pages - 1, this._getGoToPageInputValue() - 1);
              this.render();
          });
      }
      _onClickSearch(event) {
          const { SEARCH_TEXT_INPUT } = this.DOM_ELEMENTS;
          const text = SEARCH_TEXT_INPUT.val();
          if (typeof text !== "string")
              return;
          this.search.text.value = text;
          this.currentPage = 0;
          this.render();
      }
      _onClickEditCreatureEntry(event) {
          var _a;
          return __awaiter$1(this, void 0, void 0, function* () {
              const trackers = yield Data.UserCreaturesTrackingDataCollection[game.user.id].getData();
              const creatureId = Number(event.target.dataset.creatureId);
              const creature = yield this._findCreatureById(creatureId);
              if (!creature)
                  return;
              this.editCreatureApp.creature = creature;
              this.editCreatureApp.initialStatus =
                  ((_a = trackers[creature.id]) === null || _a === void 0 ? void 0 : _a.status) || "not-seen";
              this.editCreatureApp.render(true);
          });
      }
  }

  class DextrackerApplications {
  }
  DextrackerApplications.DexApplication = new DexApplication();

  var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
      function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
      return new (P || (P = Promise))(function (resolve, reject) {
          function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
          function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
          function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
  };
  class DextrackerHooks {
      static init() {
          return __awaiter(this, void 0, void 0, function* () {
              DextrackerSettingEntries.init();
              const baseDir = DextrackerHooks._baseDir();
              yield DextrackerUtils.ensureDirectoryExists("data", baseDir);
              yield DextrackerUtils.ensureDirectoryExists("data", `${baseDir}/userData`);
              yield Data.init(baseDir);
          });
      }
      static ready() {
          return __awaiter(this, void 0, void 0, function* () {
              const baseDir = DextrackerHooks._baseDir();
              yield Data.postInit(baseDir);
              DextrackerGlobal.finishLoading();
          });
      }
      static getSceneControlButtons(controls) {
          const tokenControls = controls.find((control) => control.name === "token");
          if (tokenControls) {
              DextrackerHooks._createDextrackerMenuButton(tokenControls);
          }
      }
      static _baseDir() {
          const currentWorld = game.world.id;
          return `./worlds/${currentWorld}/dextracker`;
      }
  }
  // ===============================================
  // Private methods
  // ===============================================
  DextrackerHooks._createDextrackerMenuButton = (sceneControlContainer) => {
      DextrackerUtils.createSceneControlButton(sceneControlContainer, {
          name: "dextracker",
          title: "Dextracker.Title",
          icon: "fas fa-atlas",
          onClick: () => DextrackerApplications.DexApplication.render(true),
          button: true,
      });
  };

  Hooks.on("init", DextrackerHooks.init);
  Hooks.on("ready", DextrackerHooks.ready);
  Hooks.on("getSceneControlButtons", DextrackerHooks.getSceneControlButtons);

})();
