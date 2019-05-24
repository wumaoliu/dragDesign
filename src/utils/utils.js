const RATE = 5

/**
 * 毫米 => 像素
 * @param {Number} n
 */
export const mm2px = (n) => (n * RATE).toFixed(2)

/**
 * 像素 => 毫米
 * @param {Number} n
 */
export const px2mm = (n) => (n / RATE).toFixed(2)
