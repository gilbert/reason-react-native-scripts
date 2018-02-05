'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var eject = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var filesWithExpo, usingExpo, expoSdkWarning, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, filename, reactNativeOptionMessage, questions, _ref2, ejectMethod, useYarn, npmOrYarn, appJson, pkgJson, newName, newDisplayName, expName, _ref3, enteredName, enteredDisplayname, ejectCommand, ejectArgs, _spawn$sync, status, newDevDependencies, projectBabelPath, projectBabelRc, babelRcJson, lolThatsSomeComplexCode, args, stdio;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return filesUsingExpoSdk();

          case 3:
            filesWithExpo = _context.sent;
            usingExpo = filesWithExpo.length > 0;
            expoSdkWarning = void 0;

            if (!usingExpo) {
              _context.next = 30;
              break;
            }

            expoSdkWarning = _chalk2.default.bold('Warning!') + ' We found at least one file where your project imports the Expo SDK:\n';

            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 11;
            for (_iterator = (0, _getIterator3.default)(filesWithExpo); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              filename = _step.value;

              expoSdkWarning += '  ' + _chalk2.default.cyan(filename) + '\n';
            }

            _context.next = 19;
            break;

          case 15:
            _context.prev = 15;
            _context.t0 = _context['catch'](11);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 19:
            _context.prev = 19;
            _context.prev = 20;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 22:
            _context.prev = 22;

            if (!_didIteratorError) {
              _context.next = 25;
              break;
            }

            throw _iteratorError;

          case 25:
            return _context.finish(22);

          case 26:
            return _context.finish(19);

          case 27:
            expoSdkWarning += '\n' + _chalk2.default.yellow.bold('If you choose the "plain" React Native option below, these imports will stop working.');
            _context.next = 31;
            break;

          case 30:
            expoSdkWarning = 'We didn\'t find any uses of the Expo SDK in your project, so you should be fine to eject to\n"Plain" React Native. (This check isn\'t very sophisticated, though.)';

          case 31:

            (0, _log2.default)('\n' + expoSdkWarning + '\n\nWe ' + _chalk2.default.italic('strongly') + ' recommend that you read this document before you proceed:\n  ' + _chalk2.default.cyan('https://github.com/react-community/create-react-native-app/blob/master/EJECTING.md') + '\n\nEjecting is permanent! Please be careful with your selection.\n');

            reactNativeOptionMessage = "React Native: I'd like a regular React Native project.";


            if (usingExpo) {
              reactNativeOptionMessage = _chalk2.default.italic("(WARNING: See above message for why this option may break your project's build)\n  ") + reactNativeOptionMessage;
            }

            questions = [{
              type: 'list',
              name: 'ejectMethod',
              message: 'How would you like to eject from create-react-native-app?',
              default: usingExpo ? 'expoKit' : 'raw',
              choices: [{
                name: reactNativeOptionMessage,
                value: 'raw'
              }, {
                name: "ExpoKit: I'll create or log in with an Expo account to use React Native and the Expo SDK.",
                value: 'expoKit'
              }, {
                name: "Cancel: I'll continue with my current project structure.",
                value: 'cancel'
              }]
            }];
            _context.next = 37;
            return _inquirer2.default.prompt(questions);

          case 37:
            _ref2 = _context.sent;
            ejectMethod = _ref2.ejectMethod;

            if (!(ejectMethod === 'raw')) {
              _context.next = 117;
              break;
            }

            _context.next = 42;
            return _fsExtra2.default.exists(_path2.default.resolve('yarn.lock'));

          case 42:
            useYarn = _context.sent;
            npmOrYarn = useYarn ? 'yarn' : 'npm';
            _context.t1 = JSON;
            _context.next = 47;
            return _fsExtra2.default.readFile(_path2.default.resolve('app.json'));

          case 47:
            _context.t2 = _context.sent;
            appJson = _context.t1.parse.call(_context.t1, _context.t2);
            _context.t3 = JSON;
            _context.next = 52;
            return _fsExtra2.default.readFile(_path2.default.resolve('package.json'));

          case 52:
            _context.t4 = _context.sent;
            pkgJson = _context.t3.parse.call(_context.t3, _context.t4);
            newName = appJson.name, newDisplayName = appJson.displayName, expName = appJson.expo.name;

            // we ask user to provide a project name (default is package name stripped of dashes)
            // but we want to infer some good default choices, especially if they've set them up in app.json

            if (!newName) {
              newName = stripDashes(pkgJson.name);
            }

            if (!newDisplayName && expName) {
              newDisplayName = expName;
            }

            (0, _log2.default)("We have a couple of questions to ask you about how you'd like to name your app:");
            _context.next = 60;
            return _inquirer2.default.prompt([{
              name: 'enteredDisplayname',
              message: "What should your app appear as on a user's home screen?",
              default: newDisplayName,
              validate: function validate(s) {
                return s.length > 0;
              }
            }, {
              name: 'enteredName',
              message: 'What should your Android Studio and Xcode projects be called?',
              default: newName,
              validate: function validate(s) {
                return s.length > 0 && s.indexOf('-') === -1 && s.indexOf(' ') === -1;
              }
            }]);

          case 60:
            _ref3 = _context.sent;
            enteredName = _ref3.enteredName;
            enteredDisplayname = _ref3.enteredDisplayname;


            appJson.name = enteredName;
            appJson.displayName = enteredDisplayname;

            (0, _log2.default)('Writing your selections to app.json...');
            // write the updated app.json file
            _context.next = 68;
            return _fsExtra2.default.writeFile(_path2.default.resolve('app.json'), (0, _stringify2.default)(appJson, null, 2));

          case 68:
            (0, _log2.default)(_chalk2.default.green('Wrote to app.json, please update it manually in the future.'));

            ejectCommand = 'node';
            ejectArgs = [_path2.default.resolve('node_modules', 'react-native', 'local-cli', 'cli.js'), 'eject'];
            _spawn$sync = _crossSpawn2.default.sync(ejectCommand, ejectArgs, {
              stdio: 'inherit'
            }), status = _spawn$sync.status;


            if (status !== 0) {
              (0, _log2.default)(_chalk2.default.red('Eject failed with exit code ' + status + ', see above output for any issues.'));
              (0, _log2.default)(_chalk2.default.yellow('You may want to delete the `ios` and/or `android` directories.'));
              process.exit(1);
            } else {
              (0, _log2.default)('Successfully copied template native code.');
            }

            newDevDependencies = [];
            // Try to replace the Babel preset.

            _context.prev = 74;
            projectBabelPath = _path2.default.resolve('.babelrc');
            // If .babelrc doesn't exist, the app is using the default config and
            // editing the config is not necessary.

            _context.next = 78;
            return _fsExtra2.default.exists(projectBabelPath);

          case 78:
            if (!_context.sent) {
              _context.next = 89;
              break;
            }

            _context.next = 81;
            return _fsExtra2.default.readFile(projectBabelPath);

          case 81:
            projectBabelRc = _context.sent.toString();


            // We assume the .babelrc is valid JSON. If we can't parse it (e.g. if
            // it's JSON5) the error is caught and a message asking to change it
            // manually gets printed.
            babelRcJson = JSON.parse(projectBabelRc);

            if (!(babelRcJson.presets && babelRcJson.presets.includes('babel-preset-expo'))) {
              _context.next = 89;
              break;
            }

            babelRcJson.presets = babelRcJson.presets.map(function (preset) {
              return preset === 'babel-preset-expo' ? 'babel-preset-react-native-stage-0/decorator-support' : preset;
            });
            _context.next = 87;
            return _fsExtra2.default.writeFile(projectBabelPath, (0, _stringify2.default)(babelRcJson, null, 2));

          case 87:
            newDevDependencies.push('babel-preset-react-native-stage-0');
            (0, _log2.default)(_chalk2.default.green('Babel preset changed to `babel-preset-react-native-stage-0/decorator-support`.'));

          case 89:
            _context.next = 95;
            break;

          case 91:
            _context.prev = 91;
            _context.t5 = _context['catch'](74);

            (0, _log2.default)(_chalk2.default.yellow('We had an issue preparing your .babelrc for ejection.\nIf you have a .babelrc in your project, make sure to change the preset\nfrom `babel-preset-expo` to `babel-preset-react-native-stage-0/decorator-support`.'));
            (0, _log2.default)(_chalk2.default.red(_context.t5));

          case 95:

            delete pkgJson.main;

            // NOTE: expo won't work after performing a raw eject, so we should delete this
            // it will be a better error message for the module to not be found than for whatever problems
            // missing native modules will cause
            delete pkgJson.dependencies.expo;
            delete pkgJson.devDependencies['react-native-scripts'];

            pkgJson.scripts.start = 'react-native start';
            pkgJson.scripts.ios = 'react-native run-ios';
            pkgJson.scripts.android = 'react-native run-android';

            // no longer relevant to an ejected project (maybe build is?)
            delete pkgJson.scripts.eject;

            (0, _log2.default)('Updating your ' + npmOrYarn + ' scripts in package.json...');

            _context.next = 105;
            return _fsExtra2.default.writeFile(_path2.default.resolve('package.json'), (0, _stringify2.default)(pkgJson, null, 2));

          case 105:

            (0, _log2.default)(_chalk2.default.green('Your package.json is up to date!'));

            (0, _log2.default)('Adding entry point...');

            lolThatsSomeComplexCode = 'import { AppRegistry } from \'react-native\';\nimport App from \'./App\';\nAppRegistry.registerComponent(\'' + newName + '\', () => App);\n';
            _context.next = 110;
            return _fsExtra2.default.writeFile(_path2.default.resolve('index.js'), lolThatsSomeComplexCode);

          case 110:

            (0, _log2.default)(_chalk2.default.green('Added new entry points!'));

            (0, _log2.default)('\nNote that using `' + npmOrYarn + ' start` will now require you to run Xcode and/or\nAndroid Studio to build the native code for your project.');

            (0, _log2.default)('Removing node_modules...');
            _rimraf2.default.sync(_path2.default.resolve('node_modules'));
            if (useYarn) {
              (0, _log2.default)('Installing packages with yarn...');
              args = newDevDependencies.length > 0 ? ['add', '--dev'].concat(newDevDependencies) : [];

              _crossSpawn2.default.sync('yarnpkg', args, { stdio: 'inherit' });
            } else {
              // npm prints the whole package tree to stdout unless we ignore it.
              stdio = [process.stdin, 'ignore', process.stderr];


              (0, _log2.default)('Installing existing packages with npm...');
              _crossSpawn2.default.sync('npm', ['install'], { stdio: stdio });

              if (newDevDependencies.length > 0) {
                (0, _log2.default)('Installing new packages with npm...');
                _crossSpawn2.default.sync('npm', ['install', '--save-dev'].concat(newDevDependencies), {
                  stdio: stdio
                });
              }
            }
            _context.next = 124;
            break;

          case 117:
            if (!(ejectMethod === 'expoKit')) {
              _context.next = 122;
              break;
            }

            _context.next = 120;
            return (0, _expo.detach)();

          case 120:
            _context.next = 124;
            break;

          case 122:
            // we don't want to print the survey for cancellations
            (0, _log2.default)('OK! If you change your mind you can run this command again.');
            return _context.abrupt('return');

          case 124:

            (0, _log2.default)(_chalk2.default.green('Ejected successfully!') + '\nPlease consider letting us know why you ejected in this survey:\n  ' + _chalk2.default.cyan('https://goo.gl/forms/iD6pl218r7fn9N0d2'));
            _context.next = 130;
            break;

          case 127:
            _context.prev = 127;
            _context.t6 = _context['catch'](0);

            console.error(_chalk2.default.red('Error running eject: ' + _context.t6));

          case 130:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 127], [11, 15, 19, 27], [20,, 22, 26], [74, 91]]);
  }));

  return function eject() {
    return _ref.apply(this, arguments);
  };
}();

var filesUsingExpoSdk = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
    var projectJsFiles, jsFileContents, filesUsingExpo, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _ref6, filename, contents, requires;

    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return findJavaScriptProjectFilesInRoot(process.cwd());

          case 2:
            projectJsFiles = _context2.sent;
            _context2.next = 5;
            return _promise2.default.all(projectJsFiles.map(function (f) {
              return _fsExtra2.default.readFile(f);
            }));

          case 5:
            _context2.t0 = function (buf, i) {
              return {
                filename: projectJsFiles[i],
                contents: buf.toString()
              };
            };

            jsFileContents = _context2.sent.map(_context2.t0);
            filesUsingExpo = [];
            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _iteratorError2 = undefined;
            _context2.prev = 11;


            for (_iterator2 = (0, _getIterator3.default)(jsFileContents); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              _ref6 = _step2.value;
              filename = _ref6.filename, contents = _ref6.contents;
              requires = _matchRequire2.default.findAll(contents);


              if (requires.includes('expo')) {
                filesUsingExpo.push(filename);
              }
            }

            _context2.next = 19;
            break;

          case 15:
            _context2.prev = 15;
            _context2.t1 = _context2['catch'](11);
            _didIteratorError2 = true;
            _iteratorError2 = _context2.t1;

          case 19:
            _context2.prev = 19;
            _context2.prev = 20;

            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }

          case 22:
            _context2.prev = 22;

            if (!_didIteratorError2) {
              _context2.next = 25;
              break;
            }

            throw _iteratorError2;

          case 25:
            return _context2.finish(22);

          case 26:
            return _context2.finish(19);

          case 27:
            filesUsingExpo.sort();

            return _context2.abrupt('return', filesUsingExpo);

          case 29:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this, [[11, 15, 19, 27], [20,, 22, 26]]);
  }));

  return function filesUsingExpoSdk() {
    return _ref4.apply(this, arguments);
  };
}();

var findJavaScriptProjectFilesInRoot = function () {
  var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(root) {
    var stats, children, jsFilesInChildren;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (!root.includes('node_modules')) {
              _context3.next = 2;
              break;
            }

            return _context3.abrupt('return', []);

          case 2:
            _context3.next = 4;
            return _fsExtra2.default.stat(root);

          case 4:
            stats = _context3.sent;

            if (!stats.isFile()) {
              _context3.next = 13;
              break;
            }

            if (!root.endsWith('.js')) {
              _context3.next = 10;
              break;
            }

            return _context3.abrupt('return', [root]);

          case 10:
            return _context3.abrupt('return', []);

          case 11:
            _context3.next = 24;
            break;

          case 13:
            if (!stats.isDirectory()) {
              _context3.next = 23;
              break;
            }

            _context3.next = 16;
            return _fsExtra2.default.readdir(root);

          case 16:
            children = _context3.sent;
            _context3.next = 19;
            return _promise2.default.all(children.map(function (f) {
              return findJavaScriptProjectFilesInRoot(_path2.default.join(root, f));
            }));

          case 19:
            jsFilesInChildren = _context3.sent;
            return _context3.abrupt('return', [].concat.apply([], jsFilesInChildren));

          case 23:
            return _context3.abrupt('return', []);

          case 24:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function findJavaScriptProjectFilesInRoot(_x) {
    return _ref7.apply(this, arguments);
  };
}();

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _matchRequire = require('match-require');

var _matchRequire2 = _interopRequireDefault(_matchRequire);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _rimraf = require('rimraf');

var _rimraf2 = _interopRequireDefault(_rimraf);

var _crossSpawn = require('cross-spawn');

var _crossSpawn2 = _interopRequireDefault(_crossSpawn);

var _log = require('../util/log');

var _log2 = _interopRequireDefault(_log);

var _expo = require('../util/expo');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function stripDashes(s) {
  var ret = '';

  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = (0, _getIterator3.default)(s), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var c = _step3.value;

      if (c !== ' ' && c !== '-') {
        ret += c;
      }
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3.return) {
        _iterator3.return();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }

  return ret;
}

eject().then(function () {
  // the expo local github auth server leaves a setTimeout for 5 minutes
  // so we need to explicitly exit (for now, this will be resolved in the nearish future)
  process.exit(0);
}).catch(function (e) {
  console.error('Problem running eject: ' + e);
  process.exit(1);
});
//# sourceMappingURL=eject.js.map