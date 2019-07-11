'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function ajax(option) {
    var ajax = new XMLHttpRequest();
    option.type = option.type || 'get';
    if (!option.url || option.url === ' ') {
        throw new Error('请输入接口地址');
    }
    if (option.async == false || option.async == 'false') {
        option.async = false;
    } else {
        option.async = true;
    }
    function objtostring(obj) {
        var arr = [];
        for (var i in obj) {
            arr.push(i + '=' + obj[i]);
        }
        return arr.join('&');
    }
    if (option.data && option.type === 'get') {
        if (_typeof(option.data) === 'object' && !Array.isArray(option.data)) {
            option.data = objtostring(option.data);
        }
        option.url += '?' + option.data;
    }

    ajax.open(option.type, option.url, option.async);
    if (option.data && option.type === 'post') {
        if (_typeof(option.data) === 'object' && !Array.isArray(option.data)) {
            option.data = objtostring(option.data);
        }
        ajax.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        ajax.send(option.data);
    } else {
        ajax.send();
    }
    function getdata(appdata) {
        if (option.dataType === 'json') {
            try {
                appdata = JSON.parse(appdata);
            } catch (e) {
                throw new Error('数据无法转换成json对象');
            }
        }
        option.success && typeof option.success === 'function' && option.success(appdata);
    }
    if (option.async) {
        ajax.onreadystatechange = function () {
            if (ajax.readyState === 4) {
                if (ajax.status === 200) {
                    var appdata = ajax.responseText;
                    getdata(appdata);
                } else {
                    option.error && typeof option.error === 'function' && option.error('接口地址有误!' + ajax.status);
                }
            }
        };
    } else {
        if (ajax.status === 200) {
            var appdata = ajax.responseText;
            getdata(appdata);
        } else {
            option.error && typeof option.error === 'function' && option.error('接口地址有误!' + ajax.status);
        }
    }
}