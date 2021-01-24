"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
            var index = Array.from(rootNode.childNodes).indexOf(emailTag);
            emails.splice(index, 1);
            rootNode.removeChild(emailTag);
        }
        else {
            input.focus();
        }
    });
    var flushInputValue = function () {
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
    var addEmail = function (email) {
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
        emailTag.appendChild(removeBtn);
        rootNode.insertBefore(emailTag, input);
    };
    return {
        addEmail: addEmail,
        getEmailCount: function () {
            return new Set(emails
                .filter(function (email) { return email.isValid; })
                .map(function (email) { return email.value; })).size;
        }
    };
}
exports.EmailsInput = EmailsInput;
