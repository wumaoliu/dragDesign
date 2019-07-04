const RATE = 5

const REG = /(px|mm)/g

export const LIMIT = {
  maxX: 150,
  maxY: 100,
  minX: 100,
  minY: 70
}

export const INIT = {
  x: LIMIT.minX,
  y: LIMIT.minY
}

/**
 * 毫米 => 像素
 * @param n
 */
export const mm2px: (n: number) => number = (n) => + (n * RATE).toFixed(2)

/**
 * 像素 => 毫米
 * @param n 
 */
export const px2mm: (n: number) => number = (n) => + (n / RATE).toFixed(2)

/**
 * size => number
 * @param s 
 */
export const size2number: (s: string) => number = (s) => + s.replace(REG, '')

/**
 * 范围内取值
 * @param n 
 * @param limit 
 */
export const calcPosition: (n: number, limit: Array<number>) => number = (n, limit) => {
  let [min, max] = limit
  if (n <= min) {
    n = min
  } else if (n >= max) {
    n = max
  }
  return n
}

/**
 * 获取指定单位对应key数组
 * @param configs 
 * @param units 
 */
export const getUnitKeys: (c: Array<any>, u: Array<string>) => Array<string> = (configs, units) => {
  return configs.filter(item => units.includes(item.units)).map(item => item.key)
}