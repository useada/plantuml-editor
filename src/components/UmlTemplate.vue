<template>
  <ul class="nav navbar-nav">
    <li class="dropdown">
      <a class="dropdown-toggle" data-toggle="dropdown" role="button">
        <i class="fa fa-pencil-square"></i> 模板 <b class="caret"></b>
      </a>
      <ul class="dropdown-menu">
        <li class="dropdown-header">行为类图表</li>
        <li><a @click="selectTemplate('useCase')">用例图</a></li>
        <li><a @click="selectTemplate('ActivityB')">活动图 &#946;</a></li>
        <li><a @click="selectTemplate('Activity')">活动图</a></li>
        <li><a @click="selectTemplate('Sequence')">时序图</a></li>
        <li class="divider"></li>
        <li class="dropdown-header">结构类图表</li>
        <li><a @click="selectTemplate('Object')">对象图</a></li>
        <li><a @click="selectTemplate('Class')">类图</a></li>
        <li><a @click="selectTemplate('ER')">ER 图</a></li>
      </ul>
    </li>
  </ul>
</template>

<script>
/* @flow */

export default {
  name: 'umlTemplate',
  data(): any {
    return {
      selectMessage: '选择模板会丢失当前编辑内容，你确认么?'
    }
  },
  methods: {
    selectTemplate(prop: string) {
      if (window.confirm(this.selectMessage)) {
        this.$store.dispatch('umlTemplate/selectTemplate', prop)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.dropdown-menu > li > a {
  cursor: pointer;
}
</style>
