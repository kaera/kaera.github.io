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
})({"smVQ":[function(require,module,exports) {

},{}],"Qc3q":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EmailsInput = void 0;

require("./emails-input.css");

function getClipboardText(e) {
  var _a;

  var clipboardData = e.clipboardData || ((_a = e.originalEvent) === null || _a === void 0 ? void 0 : _a.clipboardData);

  if (clipboardData) {
    return clipboardData.getData('text/plain');
  }

  if (window.clipboardData) {
    // IE11
    return window.clipboardData.getData('Text');
  }
}

function buildInput(addEmail) {
  var flushInputValue = function flushInputValue() {
    if (input.value) {
      addEmail(input.value);
    }

    input.value = '';
  };

  var input = document.createElement('input');
  input.setAttribute('placeholder', 'add more people...');
  input.className = 'emails-input--input';
  input.addEventListener('keypress', function (e) {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      flushInputValue();
    }
  });
  input.addEventListener('blur', flushInputValue);
  input.addEventListener('paste', function (e) {
    e.preventDefault();
    flushInputValue();
    var clipboardText = getClipboardText(e);

    if (clipboardText) {
      clipboardText.split(/[,\s]+/).forEach(addEmail);
    }
  });
  return input;
}

function EmailsInput(rootNode) {
  if (!rootNode) {
    throw new Error('Missing root node');
  }

  if (rootNode.classList.contains('emails-input')) {
    throw new Error("EmailsInput is already initialized on " + rootNode);
  }

  var validEmailCount = 0;
  var emails = {};
  rootNode.classList.add('emails-input');
  rootNode.addEventListener('click', function (e) {
    var target = e.target;

    if (target.className === 'emails-input--remove-button') {
      var emailTag = target.parentNode;
      var email = emails[target.dataset.value];
      email.num--;

      if (email.num === 0) {
        validEmailCount--;
      }

      rootNode.removeChild(emailTag);
    } else {
      input.focus();
    }
  });

  var addEmail = function addEmail(value) {
    value = value.trim();

    if (!value) {
      return;
    }

    if (!(value in emails)) {
      emails[value] = {
        num: 0,
        isValid: /^[^\s,@]+@[^\s,@]+$/.test(value)
      };
    }

    var email = emails[value];
    email.num++;

    if (email.isValid && email.num === 1) {
      validEmailCount++;
    }

    var emailTag = document.createElement('span');
    emailTag.textContent = value;
    emailTag.classList.add('emails-input--tag');
    emailTag.classList.add(email.isValid ? 'emails-input--tag-valid' : 'emails-input--tag-invalid');
    var removeBtn = document.createElement('span');
    removeBtn.className = 'emails-input--remove-button';
    removeBtn.dataset.value = value;
    emailTag.appendChild(removeBtn);
    rootNode.insertBefore(emailTag, input);
  };

  var input = buildInput(addEmail);
  rootNode.appendChild(input);
  return {
    addEmail: addEmail,
    getEmailCount: function getEmailCount() {
      return validEmailCount;
    }
  };
}

exports.EmailsInput = EmailsInput;
window.EmailsInput = EmailsInput;
},{"./emails-input.css":"smVQ"}]},{},["Qc3q"], null)
//# sourceMappingURL=/emails-input.444dc99e.js.map