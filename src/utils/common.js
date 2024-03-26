/** 格式化数字为字符串
 * @abstract 将形如1234567的数字转为字符串"123.567万"或"123万"
 * @param {number} [num=0] 数字
 * @param {number} [rounding=2] 保留的小数位数
 * @returns {string}
 */
export function formatNumber(num = 0, rounding = 2) {
	let str = String(num);
	let units = ["万", "亿", "万亿", "亿亿"];
	for (let i = 0; i < units.length; i++) {
		const unit = units[i];
		num /= 10000;
		if (num < 1) break;
		str = num.toFixed(rounding) + unit;
	}
	return str;
}
