<template>
  <form class="form-inline">
    <div class="form-group">
      <label for="umlWidth">缩放:&nbsp;</label>
      <input type="number" id="umlWidth" step="10" max="300" min="10" v-model="umlWidth" class="form-control" :disabled="!isSvg">
    </div>
    <div class="form-group">
      <label for="umlExtension">图片类型:&nbsp;</label>
      <select id="umlExtension" v-model="umlExtension" class="form-control">
        <option v-for="(option, key, index) in umlExtensions" :value="option.value" :key="index">
          {{ option.text }}
        </option>
      </select>
    </div>
    <div class="form-group">
      <div class="btn-group">
        <button type="button" class="btn btn-default" @click="renderUML" data-toggle="tooltip" data-placement="bottom" title="刷新" data-container="body">
          <span class="glyphicon glyphicon-refresh" :class="{'fa-spin':isLoading}"></span>
        </button>
        <button type="button" class="btn btn-default" @click="save" data-toggle="tooltip" data-placement="bottom" title="收藏" data-container="body">
          <span class="glyphicon glyphicon-plus"></span>
        </button>
        <a :href="src" class="btn btn-default" @click.prevent="download" data-toggle="tooltip" data-placement="bottom" title="下载" data-container="body">
          <span class="glyphicon glyphicon-download-alt"></span>
        </a>
        <button type="button" class="btn btn-default" @click="print" :disabled="umlExtension!='png'" data-toggle="tooltip" data-placement="bottom" title="打印" data-container="body">
          <span class="glyphicon glyphicon-print"></span>
        </button>
        <popover-btn :title="'link'">
          <span slot="popover-btn" class="glyphicon glyphicon-link"></span>
          <span slot="popover-title">UML图地址</span>
          <div slot="popover-content" class="row">
            <div class="col-sm-12">
              <div class="input-group">
                <input type="text" class="form-control" v-model="src" v-clipboard readonly style="width:auto;">
                <span class="input-group-btn">
                  <a :href="src" target="_blank" class="btn btn-default"><i class="fa fa-external-link"></i></a>
                </span>
              </div>
              <span class="help-block">
                点击复制链接 .
              </span>
            </div>
          </div>
        </popover-btn>
        <button type="button" class="btn btn-default" @click="showGistModal" :disabled="umlExtension!='svg'" data-toggle="tooltip" data-placement="bottom" title="分享" data-container="body">
          <span class="glyphicon glyphicon-share-alt"></span>
        </button>
      </div>
    </div>
  </form>
</template>

<script>
/* @flow */

import PopoverBtn from './common/PopoverBtn'
import printjs from 'print-js'

export default {
  name: 'parameters',
  components: {
    PopoverBtn
  },
  computed: {
    src(): string {
      return this.$store.state.plantumlEditor.src
    },
    isSvg(): string {
      return this.$store.getters['plantumlEditor/isSvg']
    },
    isLoading(): boolean {
      return this.$store.state.plantumlEditor.isLoading
    },
    umlWidth: {
      get(): number {
        return this.$store.state.plantumlEditor.umlWidth
      },
      set(value: number) {
        this.$store.dispatch('plantumlEditor/setUmlWidth', value)
      }
    },
    umlExtensions(): any {
      return this.$store.state.plantumlEditor.umlExtensions
    },
    umlExtension: {
      get(): string {
        return this.$store.state.plantumlEditor.umlExtension
      },
      set(value: string) {
        this.$store.dispatch('plantumlEditor/setUmlExtension', value)
        this.$store.dispatch(
          'plantumlEditor/renderUML',
          this.$store.state.plantumlEditor.text
        )
      }
    }
  },
  methods: {
    renderUML() {
      this.$store.dispatch(
        'plantumlEditor/renderUML',
        this.$store.state.plantumlEditor.text
      )
    },
    save() {
      this.$store.dispatch('histories/save', this.$store.state.plantumlEditor)
      this.$store.dispatch('layout/resetColSize')
    },
    showGistModal() {
      window.$('#gist').modal('show')
      window.$('[data-toggle="tooltip"]').tooltip('hide')
    },
    download() {
      this.$store.dispatch('plantumlEditor/download')
    },
    print() {
      printjs('umlArea', 'html')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.form-inline .form-group {
  margin-right: 10px;
}
</style>
