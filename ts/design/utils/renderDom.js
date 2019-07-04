// 渲染类
import wrapper from '../components/wrapper'
import {configs} from '../components/repository'
import {mm2px, getUnitKeys} from './utils'

class RenderDom {
  /**
   * 构造器
   * @param {Function} h
   * @param {Boolean} isDesign
   */
  constructor (h, isDesign) {
    this.$createElement = h
    this.isDesign = isDesign
  }

  /**
   * 渲染函数
   * @param {Array} nodeTree
   */
  render (nodeList) {
    return nodeList.map((node, index) => {
      // 配置节点index
      node.$index = index
      let {type, props, style} = node
      let styleConfig = configs[type].style
      let mmKey = getUnitKeys(styleConfig, ['mm'])
      let pxKey = getUnitKeys(styleConfig, ['px'])
      // 设计态保持毫米转px
      let position = {
        x: mm2px(style.left),
        y: mm2px(style.top)
      }
      let sizeObj = {}
      Object.keys(style).map(key => {
        if (mmKey.includes(key)) {
          sizeObj[key] = mm2px(style[key] || 1) + 'px'
        } else if (pxKey.includes(key)) {
          sizeObj[key] = style[key] + 'px'
        }
      })
      style = {
        ...style,
        ...sizeObj,
        position: this.isDesign ? 'none' : 'absolute'
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
            index,
            position
          },
          scopedSlots: {
            default: () => component
          },
          ref: index
        })
      } else {
        result = component
      }
      return result
    })
  }
}

export default RenderDom
