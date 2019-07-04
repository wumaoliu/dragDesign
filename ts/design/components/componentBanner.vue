<template>
  <el-collapse class="banner">
    <el-collapse-item>
      <div class="title" slot="title">标题元素</div>
      <div
        v-for="item in keyList"
        v-text="item.label"
        class="item"
        :key="item.label"
        draggable="true"
        @dragstart="(ev) => {handleDrag(ev, item)}"
      ></div>
    </el-collapse-item>
    <el-collapse-item>
      <div class="title" slot="title">字段元素</div>
      <div
        v-for="item in valueList"
        v-text="item.label"
        class="item"
        :key="item.label"
        draggable="true"
        @dragstart="(ev) => {handleDrag(ev, item)}"
      ></div>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
import {configs} from './repository'

export default {
  name: 'componentBanner',
  data () {
    return {
      configs,
      // keyList: ['名称', '规格', '计价单位', '产地', '零售价', '会员价', '标签'],
      keyList: [
        {
          label: '名称',
          value: '名称：',
          type: 'preset'
        },
        {
          label: '规格',
          value: '规格：',
          type: 'preset'
        },
        {
          label: '计价单位',
          value: '计价单位：',
          type: 'preset'
        },
        {
          label: '产地',
          value: '产地：',
          type: 'preset'
        },
        {
          label: '零售价',
          value: '零售价Ұ：',
          type: 'preset'
        },
        {
          label: '会员价',
          value: '会员价Ұ：',
          type: 'preset'
        }
      ],
      valueList: [
        {
          label: '商品名称',
          key: 'goodsName',
          type: 'remote'
        },
        {
          label: '商品单位',
          key: 'unitName',
          type: 'remote'
        },
        {
          label: '商品代码',
          key: 'goodsCode',
          type: 'remote'
        },
        {
          label: '商品产地',
          key: 'producingArea',
          type: 'remote'
        },
        {
          label: '商品零售价',
          key: 'retPrice',
          type: 'remote'
        },
        {
          label: '商品会员价',
          key: 'vipPrice',
          type: 'remote'
        },
        {
          label: '元',
          key: 'priceUnit',
          type: 'remote'
        },
        {
          label: '物价员',
          key: 'priceMaker',
          type: 'preset'
        },
        {
          label: '通用元素',
          type: 'remote',
          commonTag: true
        }
      ]
    }
  },
  methods: {
    handleDrag (ev, item) {
      let info = JSON.stringify({
        type: 'cell',
        behavior: 'createNode',
        sourceData: item
      })
      ev.dataTransfer.setData('info', info)
    }
  }
}
</script>

<style lang="less" scoped>
.banner{
  width: 140px;
  border-bottom: none;
  & .title{
    font-size: 14px;
    font-weight: bold;
    padding-left: 10px;
  }
  & .item{
    font-size: 14px;
    padding: 5px 0px 5px 10px;
    cursor: pointer;
  }
}
</style>
