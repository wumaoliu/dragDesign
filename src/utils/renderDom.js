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
      style = {
        ...style,
        ...(this.isDesign ? {} : {position: 'absolute'}),
        top: mm2px(coordinate.y) + 'px',
        left: mm2px(coordinate.x) + 'px',
        fontSize: mm2px(style.fontSize || 1) + 'px'
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
