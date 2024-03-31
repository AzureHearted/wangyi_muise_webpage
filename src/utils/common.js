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

// 计算颜色亮度
function getBrightness(rgbColor) {
	// 根据 RGB 值计算亮度，常用的一种计算方法是将 RGB 值分别乘以不同的权重
	return 0.299 * rgbColor[0] + 0.587 * rgbColor[1] + 0.114 * rgbColor[2];
}

// 获取亮度最高、最低、中间色三种颜色
export function findExtremeColorsByBrightness(colors) {
	let brightestIndex = 0;
	let darkestIndex = 0;
	let maxBrightness = getBrightness(colors[0]);
	let minBrightness = getBrightness(colors[0]);

	// 遍历数组，找到最亮和最暗的颜色
	for (let i = 1; i < colors.length; i++) {
		const brightness = getBrightness(colors[i]);
		if (brightness > maxBrightness) {
			maxBrightness = brightness;
			brightestIndex = i;
		} else if (brightness < minBrightness) {
			minBrightness = brightness;
			darkestIndex = i;
		}
	}

	// 找到中间颜色
	let middleIndex = 0;
	let middleBrightness = Infinity;
	for (let i = 0; i < colors.length; i++) {
		if (i !== brightestIndex && i !== darkestIndex) {
			const brightness = getBrightness(colors[i]);
			if (Math.abs(brightness - maxBrightness) < middleBrightness) {
				middleBrightness = Math.abs(brightness - maxBrightness);
				middleIndex = i;
			}
		}
	}

	return {
		high: colors[brightestIndex],
		low: colors[darkestIndex],
		middle: colors[middleIndex],
	};
}

// 示例用法
// const colors = [
// 	[255, 255, 255], // 白色
// 	[0, 0, 0], // 黑色
// 	[255, 0, 0], // 红色
// 	[0, 255, 0], // 绿色
// 	[0, 0, 255], // 蓝色
// ];

// const extremeColors = findExtremeColors(colors);
// console.log("最亮的颜色：", extremeColors.brightest);
// console.log("最暗的颜色：", extremeColors.darkest);
// console.log("中间的颜色：", extremeColors.middle);
