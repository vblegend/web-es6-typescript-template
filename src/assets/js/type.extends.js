
/**
 * date format extends
 * @param {string} fmt yyyy-MM-dd HH:mm:ss S
 * @returns 
 */
Date.prototype['format'] = function (fmt) {
    var object = {
        'M+': this.getMonth() + 1, // 月份 
        'd+': this.getDate(), // 日 
        'h+': this.getHours(), // 小时 
        'H+': this.getHours(), // 小时 
        'm+': this.getMinutes(), // 分 
        's+': this.getSeconds(), // 秒 
        'q+': Math.floor((this.getMonth() + 3) / 3), // 季度 
        'S': this.getMilliseconds() // 毫秒 
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (const k in object) {
        if (new RegExp(`(${k})`).test(fmt)) {
            const value = object[k];
            const v = (RegExp.$1.length == 1) ? value : (('00' + value).substr(('' + value).length));
            fmt = fmt.replace(RegExp.$1, v);
        }
    }
    return fmt;
};



/**
 * window get url params variables extends
 * @returns {key:value ... }
 */
Window.prototype['getUrlVariables'] = function () {
    const result = {};
    const query = window.location.search.substring(1);
    if (query === '') return result;
    const queryParams = decodeURI(query);
    const vars = queryParams.split('&');
    for (const svar of vars) {
        const pair = svar.split('=');
        result[pair[0]] = pair[1];
    }
    return result;
};
