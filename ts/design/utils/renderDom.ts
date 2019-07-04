// 渲染类
import wrapper from '../components/wrapper'
import {configs} from '../components/repository'
import {mm2px, getUnitKeys} from './utils'

class RenderDom {
  /**
   * 构造函数
   * @param h 
   * @param isDesign 
   */
  constructor (public h: Function, public isDesign: boolean) {}
}