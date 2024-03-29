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

/** 防抖函数
 * @param {Function} func 要进行防抖的函数
 * @param {number} delay 防抖延时
 * @returns {Function} 返回一个函数,执行该函数可以实现防抖
 * @abstract
 * 在delay期间内重复触发返回的这个函数,则一直重置计时器,
 * 直到两次触发的间隔超过delay才能成功执行一次。
 */
export function debounce(func, delay = 500) {
	// 声明全局变量timeout
	let timeout;
	// 返回一个函数(通过结构方法将所有变量传给args)
	return function (...args) {
		// 获取this的值
		const context = this;
		// 清除超时
		clearTimeout(timeout);
		// 设置超时
		timeout = setTimeout(() => {
			// 调用函数
			func.apply(context, args);
		}, delay);
	};
}
