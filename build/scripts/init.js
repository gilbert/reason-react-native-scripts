'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _pathExists = require('path-exists');

var _pathExists2 = _interopRequireDefault(_pathExists);

var _crossSpawn = require('cross-spawn');

var _crossSpawn2 = _interopRequireDefault(_crossSpawn);

var _log = require('../util/log');

var _log2 = _interopRequireDefault(_log);

var _install = require('../util/install');

var _install2 = _interopRequireDefault(_install);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// UPDATE DEPENDENCY VERSIONS HERE
var DEFAULT_DEPENDENCIES = {
  expo: '^25.0.0',
  react: '16.2.0',
  'react-native': '0.52.0',
  'bs-platform': '^2.1.0',
  'bs-react-native': '~0.5.0',
  'reason-react': '~0.3.0'
};

// TODO figure out how this interacts with ejection


var DEFAULT_DEV_DEPENDENCIES = {};

module.exports = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(appPath, appName, verbose) {
    var cwd = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';

    var ownPackageName, ownPath, useYarn, npmOrYarn, npmVersion, readmeExists, appPackagePath, appPackage, data, _ref2, code, command, args, cdpath;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            ownPackageName = require('../../package.json').name;
            ownPath = _path2.default.join(appPath, 'node_modules', ownPackageName);
            _context.next = 4;
            return (0, _pathExists2.default)(_path2.default.join(appPath, 'yarn.lock'));

          case 4:
            useYarn = _context.sent;
            npmOrYarn = useYarn ? 'yarn' : 'npm';

            // FIXME(perry) remove when npm 5 is supported

            if (!useYarn) {
              npmVersion = _crossSpawn2.default.sync('npm', ['--version']).stdout.toString().trim();


              if (npmVersion.match(/\d+/)[0] === '5') {
                console.log(_chalk2.default.yellow('\n*******************************************************************************\nERROR: npm 5 is not supported yet\n*******************************************************************************\n\nIt looks like you\'re using npm 5 which was recently released.\n\nCreate React Native App doesn\'t work with npm 5 yet, unfortunately. We\nrecommend using npm 4 or yarn until some bugs are resolved.\n\nYou can follow the known issues with npm 5 at:\nhttps://github.com/npm/npm/issues/16991\n\n*******************************************************************************\n '));
                process.exit(1);
              }
            }

            _context.next = 9;
            return (0, _pathExists2.default)(_path2.default.join(appPath, 'README.md'));

          case 9:
            readmeExists = _context.sent;

            if (!readmeExists) {
              _context.next = 13;
              break;
            }

            _context.next = 13;
            return _fsExtra2.default.rename(_path2.default.join(appPath, 'README.md'), _path2.default.join(appPath, 'README.old.md'));

          case 13:
            appPackagePath = _path2.default.join(appPath, 'package.json');
            _context.t0 = JSON;
            _context.next = 17;
            return _fsExtra2.default.readFile(appPackagePath);

          case 17:
            _context.t1 = _context.sent;
            appPackage = _context.t0.parse.call(_context.t0, _context.t1);


            // mutate the default package.json in any ways we need to
            appPackage.main = './node_modules/reason-react-native-scripts/build/bin/crna-entry.js';
            appPackage.scripts = {
              start: 'react-native-scripts start',
              eject: 'react-native-scripts eject',
              android: 'react-native-scripts android',
              ios: 'react-native-scripts ios',
              test: 'node node_modules/jest/bin/jest.js --watch'
            };

            // TODO figure out integration with jest
            // appPackage.jest = {
            //   preset: 'jest-expo',
            // };

            if (!appPackage.dependencies) {
              appPackage.dependencies = {};
            }

            if (!appPackage.devDependencies) {
              appPackage.devDependencies = {};
            }

            // react-native-scripts is already in the package.json devDependencies
            // so we need to merge instead of assigning
            (0, _assign2.default)(appPackage.dependencies, DEFAULT_DEPENDENCIES);

            // TODO figure out integration with jest
            // Object.assign(appPackage.devDependencies, DEFAULT_DEV_DEPENDENCIES);

            // Write the new appPackage after copying so that we can include any existing
            _context.next = 26;
            return _fsExtra2.default.writeFile(appPackagePath, (0, _stringify2.default)(appPackage, null, 2));

          case 26:
            _context.next = 28;
            return _fsExtra2.default.copy(_path2.default.join(ownPath, 'template'), appPath);

          case 28:
            _context.prev = 28;
            _context.next = 31;
            return _fsExtra2.default.rename(_path2.default.join(appPath, 'gitignore'), _path2.default.join(appPath, '.gitignore'));

          case 31:
            _context.next = 46;
            break;

          case 33:
            _context.prev = 33;
            _context.t2 = _context['catch'](28);

            if (!(_context.t2.code === 'EEXIST')) {
              _context.next = 45;
              break;
            }

            _context.next = 38;
            return _fsExtra2.default.readFile(_path2.default.join(appPath, 'gitignore'));

          case 38:
            data = _context.sent;
            _context.next = 41;
            return _fsExtra2.default.appendFile(_path2.default.join(appPath, '.gitignore'), data);

          case 41:
            _context.next = 43;
            return _fsExtra2.default.unlink(_path2.default.join(appPath, 'gitignore'));

          case 43:
            _context.next = 46;
            break;

          case 45:
            throw _context.t2;

          case 46:
            _context.next = 48;
            return (0, _install2.default)(appPath);

          case 48:
            _ref2 = _context.sent;
            code = _ref2.code;
            command = _ref2.command;
            args = _ref2.args;

            if (!(code !== 0)) {
              _context.next = 55;
              break;
            }

            console.error('Failed to install');
            // console.error(`\`${command} ${args.join(' ')}\` failed`);
            return _context.abrupt('return');

          case 55:

            // display the cleanest way to get to the app dir
            // if the cwd + appName is equal to the full path, then just cd into appName
            cdpath = void 0;

            if (_path2.default.resolve(cwd, appName) === appPath) {
              cdpath = appName;
            } else {
              cdpath = appPath;
            }

            (0, _log2.default)('\n\nSuccess! Created ' + appName + ' at ' + appPath + '\nInside that directory, you can run several commands:\n\n  ' + _chalk2.default.cyan(npmOrYarn + ' start') + '\n    Starts the development server so you can open your app in the Expo\n    app on your phone.\n\n  ' + _chalk2.default.cyan(npmOrYarn + ' run ios') + '\n    (Mac only, requires Xcode)\n    Starts the development server and loads your app in an iOS simulator.\n\n  ' + _chalk2.default.cyan(npmOrYarn + ' run android') + '\n    (Requires Android build tools)\n    Starts the development server and loads your app on a connected Android\n    device or emulator.\n\n  ' + _chalk2.default.cyan(npmOrYarn + ' test') + '\n    Starts the test runner.\n\n  ' + _chalk2.default.cyan(npmOrYarn + ' run eject') + '\n    Removes this tool and copies build dependencies, configuration files\n    and scripts into the app directory. If you do this, you can\u2019t go back!\n\nWe suggest that you begin by typing:\n\n  ' + _chalk2.default.cyan('cd ' + cdpath) + '\n  ' + _chalk2.default.cyan(npmOrYarn + ' start'));

            if (readmeExists) {
              (0, _log2.default)('\n' + _chalk2.default.yellow('You had a `README.md` file, we renamed it to `README.old.md`'));
            }

            (0, _log2.default)();
            (0, _log2.default)('Happy hacking!');

          case 61:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[28, 33]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
//# sourceMappingURL=init.js.map