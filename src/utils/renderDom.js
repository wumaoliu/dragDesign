// 渲染类
import wrapper from '@/components/wrapper'
import {mm2px} from './utils'

class RenderDom {
  /**
   * 构造器
   * @param {Function} h
   * @param {Boolean} isDesign
   */
  constructor (h, isDesign) {
    this.$createElement = h
    this.isDesign = isDesign
    this.propsNeedCalc = ['width', 'height', 'fontSize']
  }

  /**
   * 渲染函数
   * @param {Array} nodeTree
   */
  render (nodeList) {
    return nodeList.map((node, index) => {
      // 配置节点index
      node.$index = index
      let {type, props, style, coordinate} = node
      // 毫米转px
      // 处理须换算属性
      let sizeObj = {}
      Object.keys(style).map(key => {
        if (this.propsNeedCalc.includes(key)) {
          sizeObj[key] = mm2px(style[key] || 1) + 'px'
        }
      })
      style = {
        ...style,
        ...sizeObj,
        ...(this.isDesign ? {} : {position: 'absolute'}),
        top: mm2px(coordinate.y) + 'px',
        left: mm2px(coordinate.x) + 'px'
      }
      let result
      let component = this.$createElement(
        type,
        {
          props,
          style
        }
      )
      // 设计态坐标位置绑定至wrapper
      if (this.isDesign) {
        result = this.$createElement(wrapper, {
          props: {
            type,
            index,
            positionX: style.left,
            positionY: style.top
          },
          scopedSlots: {
            default: () => component
          }
        })
      } else {
        result = component
      }
      return result
    })
  }
}

export default RenderDom
