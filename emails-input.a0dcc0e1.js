// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"Nd5W":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EmailsInput = void 0;

function EmailsInput(rootNode) {
  if (!rootNode) {
    throw new Error('Missing root node');
  }

  rootNode.classList.add('emails-input');
  rootNode.addEventListener('click', function (e) {
    var target = e.target;

    if (target.className === 'remove-button') {
      var emailTag = target.parentNode;
      var emailIndex = 0; // Array.prototype.findIndex isn't available in IE11

      for (var i = 0; i < emails.length; i++) {
        if (emails[i].value === target.dataset.value) {
          emailIndex = i;
          break;
        }
      }

      emails.splice(emailIndex, 1);
      rootNode.removeChild(emailTag);
    } else {
      input.focus();
    }
  });

  var flushInputValue = function flushInputValue() {
    if (input.value) {
      addEmail(input.value);
    }

    input.value = '';
  };

  var input = document.createElement('input');
  input.setAttribute('placeholder', 'add more people...');
  input.className = 'input';
  input.addEventListener('keypress', function (e) {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      flushInputValue();
    }
  });
  input.addEventListener('blur', flushInputValue);
  input.addEventListener('paste', function (e) {
    var _a;

    e.preventDefault();
    flushInputValue();
    var clipboardText = '';
    var clipboardData = e.clipboardData || ((_a = e.originalEvent) === null || _a === void 0 ? void 0 : _a.clipboardData);

    if (clipboardData) {
      clipboardText = clipboardData.getData('text/plain');
    }

    if (window.clipboardData) {
      // IE11
      clipboardText = window.clipboardData.getData('Text');
    }

    if (clipboardText) {
      clipboardText.split(/[,\s]+/).forEach(addEmail);
    }
  });
  rootNode.appendChild(input);
  var style = document.createElement('style');
  style.textContent = "\n        .emails-input {\n            border: 1px solid #c3c2cf;\n            border-radius: 4px;\n            overflow: auto;\n            background: #fff;\n            height: 88px;\n            padding: 4px 7px;\n            cursor: text;\n            font-size: 14px;\n            line-height: 24px;\n            color: #050038;\n        }\n        .email-tag {\n            margin: 4px 8px 0 0;\n            display: inline-block;\n        }\n\n        .valid {\n            background: rgba(102, 153, 255, 0.2);\n            border-radius: 100px;\n            padding: 0 10px;\n        }\n\n        .invalid {\n            border-bottom: 1px dashed #d92929;\n        }\n\n        .remove-button {\n            display: inline-block;\n            width: 8px;\n            height: 8px;\n            margin-left: 8px;\n            background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8 0.8L7.2 0L4 3.2L0.8 0L0 0.8L3.2 4L0 7.2L0.8 8L4 4.8L7.2 8L8 7.2L4.8 4L8 0.8Z' fill='currentColor'/%3E%3C/svg%3E\");\n            cursor: pointer;\n        }\n\n        .input {\n            border: 0;\n            outline: 0;\n            display: inline-block;\n            margin-top: 4px;\n        }\n    ";
  rootNode.appendChild(style);
  var emails = [];

  var addEmail = function addEmail(email) {
    var isValid = /^[^\s,@]+@[^\s,@]+$/.test(email);
    emails.push({
      value: email,
      isValid: isValid
    });
    var emailTag = document.createElement('span');
    emailTag.textContent = email;
    emailTag.classList.add('email-tag');
    emailTag.classList.add(isValid ? 'valid' : 'invalid');
    var removeBtn = document.createElement('span');
    removeBtn.className = 'remove-button';
    removeBtn.dataset.value = email;
    emailTag.appendChild(removeBtn);
    rootNode.insertBefore(emailTag, input);
  };

  return {
    addEmail: addEmail,
    getEmailCount: function getEmailCount() {
      return new Set(emails.filter(function (email) {
        return email.isValid;
      }).map(function (email) {
        return email.value;
      })).size;
    }
  };
}

exports.EmailsInput = EmailsInput;
window.EmailsInput = EmailsInput;
},{}]},{},["Nd5W"], null)
//# sourceMappingURL=/emails-input.a0dcc0e1.js.map