// 渲染类
import wrapper from '@/components/wrapper'

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
    return nodeList.map(node => {
      let {type, props, style} = node
      let result
      let component = this.$createElement(
        type,
        {
          props,
          style
        }
      )
      if (this.state === 'design') {
        result = this.$createElement(wrapper, {
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
