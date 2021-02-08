/**
 * 
 * @param {*} arr --数组
 * @param {*} ids --去重条件
 * @param {*} attr --累计对象
 */
export function jsNums(arr, ids, attr) {
    //自带去重
    if (arr.length == 1) return arr;
    // debugger;
    arr.sort((a, b) => {
        return parseFloat(a[ids]) - parseFloat(b[ids]);
    });
    let newArr = [];
    let obj = null;
    for (let i = 0; i < arr.length; i++) {
        if (obj == null) {
            obj = arr[i];
        } else {
            if (obj[ids] == arr[i][ids]) {
                obj[attr] = parseFloat(obj[attr]) + parseFloat(arr[i][attr]) + "";
                if (arr.length - 1 == i) newArr.push(obj);
            } else {
                newArr.push(obj);
                obj = arr[i];
                if (arr.length - 1 == i) newArr.push(obj);
            }
        }
    }
    return newArr;
}
/**
 * 
 * @param {*} n 将小写字母转为大写
 */
export function DXZH(n) {
    if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n))
        return "数据非法";
    var unit = "千百拾亿千百拾万千百拾元角分", str = "";
    n += "00";
    var p = n.indexOf('.');
    if (p >= 0)
        n = n.substring(0, p) + n.substr(p + 1, 2);
    unit = unit.substr(unit.length - n.length);
    for (var i = 0; i < n.length; i++)
        str += '零壹贰叁肆伍陆柒捌玖'.charAt(n.charAt(i)) + unit.charAt(i);
    return str.replace(/零(千|百|拾|角)/g, "零").replace(/(零)+/g, "零").replace(/零(万|亿|元)/g, "$1").replace(/(亿)万|壹(拾)/g, "$1$2").replace(/^元零?|零分/g, "").replace(/元$/g, "元整");
}

