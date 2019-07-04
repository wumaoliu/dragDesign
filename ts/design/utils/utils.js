const RATE = 5

const reg = /(px|mm)/g

export const LIMIT = {
  maxX: 150,
  maxY: 100,
  minX: 100,
  minY: 70
}

export const INIT = {
  x: 100,
  y: 70
}

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

/**
 * size => number
 * @param {String} s
 */
export const size2number = (s) => +s.replace(reg, '')

/**
 * 范围内取值
 * @param {Number} num
 * @param {Array} limit
 */
export const calcPosition = (num, limit) => {
  let result
  let [min, max] = limit
  if (num <= min) {
    result = min
  } else if (num >= max) {
    result = max
  } else {
    result = num
  }
  return result
}

/**
 * 获取指定单位对应key数组
 * @param {Array} configs
 * @param {Array} unit
 */
export const getUnitKeys = (configs, units) => {
  return configs.filter(item => units.includes(item.unit)).map(item => item.key)
}
