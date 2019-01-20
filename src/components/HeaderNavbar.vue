<template>
  <div class="navbar navbar-inverse navbar-static-top">
    <div class="container-fluid">
      <ul class="nav navbar-nav navbar-left">
        <li>
          <a href="#" @click.prevent="changeHistoryColSize">
            <span class="glyphicon glyphicon-menu-hamburger" :class="{'fa-rotate-90': isCloseHistory}"></span>
          </a>
        </li>
      </ul>
      <div class="navbar-header">
        <a class="navbar-brand" href="#" @click.prevent>PlantUML Editor <span class="h6">98k</span></a>
      </div>
      <umlTemplate></umlTemplate>
      <ul class="nav navbar-nav">
        <li class="dropdown">
          <a class="dropdown-toggle" data-toggle="dropdown" role="button">
            <span class="glyphicon glyphicon-info-sign"></span> 语法提示 <b class="caret"></b>
          </a>
          <ul class="dropdown-menu">
            <li><a href="#CommonCheatSheet" @click.prevent="changeCheatSheetColSize">基础语法</a></li>
            <li class="divider"></li>
            <li class="dropdown-header">行为图</li>
            <li><a href="#UseCaseCheatSheet" @click.prevent="changeCheatSheetColSize">用例图</a></li>
            <li><a href="#ActivityCheatSheet" @click.prevent="changeCheatSheetColSize">活动图（流程图）</a></li>
            <li><a href="#SequenceCheatSheet" @click.prevent="changeCheatSheetColSize">时序图</a></li>
            <li class="divider"></li>
            <li class="dropdown-header">结构图</li>
            <li><a href="#ObjectCheatSheet" @click.prevent="changeCheatSheetColSize">对象图</a></li>
            <li><a href="#ClassCheatSheet" @click.prevent="changeCheatSheetColSize">类图</a></li>
            <li><a href="#ERCheatSheet" @click.prevent="changeCheatSheetColSize">ER 图</a></li>
            <li class="divider"></li>
            <li><a href="" @click.prevent="closeCheatSheetColSize">关闭提示</a></li>
          </ul>
        </li>
      </ul>
      <ul class="nav navbar-nav">
        <li>
          <a href="#" data-toggle="modal" data-target="#options">
            <span class="glyphicon glyphicon-cog"></span> 选项
          </a>
        </li>
      </ul>
      <ul class="nav navbar-nav">
        <li>
          <a href="#" data-toggle="modal" data-target="#help">
            <span class="glyphicon glyphicon-question-sign"></span> 帮助
          </a>
        </li>
      </ul>
      <div class="navbar-header navbar-right">
        <ul class="navbar-text list-inline">
          <!--<li><a href="https://github.com/kkeisuke/plantuml-editor" class="navbar-link" target="_blank"><i class="fa fa-github fa-lg"></i></a></li>-->
          <!--<li><a href="https://twitter.com/kkeisuke" class="navbar-link" target="_blank"><i class="fa fa-twitter fa-lg"></i></a></li>-->
          <li><a href="http://haha98k.com/" class="navbar-link" target="_blank"><i class="fa fa-home fa-lg"></i></a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
/* @flow */

import UmlTemplate from './UmlTemplate'

export default {
  name: 'headerNavbar',
  components: {
    UmlTemplate
  },
  computed: {
    isCloseHistory(): string {
      return this.$store.getters['layout/isCloseHistory']
    }
  },
  methods: {
    changeHistoryColSize() {
      if (this.$store.state.layout.colSize.history) {
        this.$store.dispatch('layout/setEditColSize')
      } else {
        this.$store.dispatch('layout/resetColSize')
      }
    },
    closeCheatSheetColSize() {
      if (this.$store.state.layout.colSize.history) {
        this.$store.dispatch('layout/resetColSize')
      } else {
        this.$store.dispatch('layout/setEditColSize')
      }
    },
    changeCheatSheetColSize(event: any) {
      this.$store.dispatch('layout/setCheatSheetColSize')
      window.setTimeout(() => {
        const target: HTMLAnchorElement = event.target
        if (target && target.hash) {
          location.hash = target.hash
        }
        // 強制的にハッシュ削除
        window.setTimeout(() => {
          location.hash = ''
        }, 100)
      }, 100)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
