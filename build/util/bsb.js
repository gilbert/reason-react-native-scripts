'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.spawnBsbWatcherAsync = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var spawnBsbWatcherAsync = exports.spawnBsbWatcherAsync = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var cp;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            cp = void 0;
            _context.next = 3;
            return new _promise2.default(function (resolve) {
              _resolveOnInitialize = resolve;

              cp = execa('bsb', ['-make-world', '-clean-world', '-w'], ['pipe', 'pipe', null]);

              cp.stdout.pipe(split()).pipe(stdout);
              cp.stderr.pipe(split()).pipe(stderr);
            });

          case 3:
            return _context.abrupt('return', { bsbChildProcess: cp });

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function spawnBsbWatcherAsync() {
    return _ref.apply(this, arguments);
  };
}();

var _log = require('./log');

var _log2 = _interopRequireDefault(_log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stream = require('stream');
var execa = require('execa');
var Writable = require('stream').Writable;
var split = require('split');
var stdout = new Writable();
var stderr = new Writable();


var _resolveOnInitialize = void 0;

stdout._write = function (data, encoding, next) {
  if (data.toString().includes('> Finish compiling')) {
    if (_resolveOnInitialize) {
      _resolveOnInitialize();
      _resolveOnInitialize = null;
    }
  }
  _log2.default.withTimestamp('[bsb] ' + data.toString());
  next();
};

stderr._write = function (data, encoding, next) {
  if (data.toString().includes('refmt version missing')) {
    next();
  } else {
    _log2.default.withTimestamp('[bsb] ' + data.toString());
    next();
  }
};
//# sourceMappingURL=bsb.js.map