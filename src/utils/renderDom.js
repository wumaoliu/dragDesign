// 渲染类
import wrapper from '@/components/wrapper'
import {mm2px} from './utils'

class RenderDom {
  /**
   * 构造器
   * @param {Function} h
   * @param {String} state
   */
  constructor (h, state) {
    this.$createElement = h
    this.state = state
  }

  /**
   * 渲染函数
   * @param {Array} nodeTree
   */
  render (nodeList) {
    // return nodeTree.map(node => {
    //   let {type, props, style, children} = node
    //   let component = this.$createElement(
    //     type,
    //     {
    //       props,
    //       style
    //     },
    //     children.map(child => this.$createElement(child))
    //   )
    //   if (this.state === 'design') {
    //     component = this.$createElement(wrapper, {}, component)
    //   }
    //   return component
    // })
    return nodeList.map((node, index) => {
      // 配置节点index
      node.$index = index
      let {type, props, style, coordinate} = node
      // 坐标位置毫米转px
      style = {
        ...style,
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
      if (this.state === 'design') {
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
