<template>
  <div id="app">
    <transition name="fade">
      <loading v-if="isLoading"></loading>
    </transition>

    <headerNavbar></headerNavbar>
    <div class="container-fluid">
      <div class="row">
        <div :class="[historyCol ? `col-sm-${historyCol}` : 'col-sm-2']" v-show="Boolean(historyCol)">
          <historyList :height="height"></historyList>
        </div>
        <div class="col-editor" :class="[editorCol ? `col-sm-${editorCol}` : 'col-sm-4']">
          <editor :height="height"></editor>
        </div>
        <div :class="[cheatSheetCol ? `col-sm-${cheatSheetCol}` : 'col-sm-3']" v-show="Boolean(cheatSheetCol)">
          <cheatSheet :height="height"></cheatSheet>
        </div>
        <div :class="[umlCol ? `col-sm-${umlCol}` : 'col-sm-6']">
          <functionTop></functionTop>
          <uml :height="umlH"></uml>
        </div>
      </div>
    </div>

    <footer style="padding:20px;text-align:center;color:#999;position:relative;">©2019 haha98k.com All right reserved.
      <a href="http://www.miitbeian.gov.cn/" style="font-size:12px;" target="_blank">京ICP备18062638号-1</a>
      邮箱：service@haha98k.com
    </footer>

    <helpModal></helpModal>
    <optionsModal></optionsModal>
    <gistModal></gistModal>
  </div>
</template>

<style scoped lang="css">
  .footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 25px;
    color: white;
    background-color: #222;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
</style>

<script>
/* @flow */

// Bootstrap
import 'bootstrap'

// store
import store from './store'
import directive from './directive'

// components
import HeaderNavbar from './components/HeaderNavbar'
import HelpModal from './components/HelpModal'
import OptionsModal from './components/OptionsModal'
import GistModal from './components/GistModal'
import HistoryList from './components/HistoryList'
import CheatSheet from './components/CheatSheet'
import FunctionTop from './components/FunctionTop'
import Uml from './components/Uml'
import Editor from './components/Editor'

import Loading from './components/loading'

export default {
  name: 'app',
  store,
  directive,
  components: {
    HeaderNavbar,
    HelpModal,
    OptionsModal,
    GistModal,
    HistoryList,
    CheatSheet,
    FunctionTop,
    Uml,
    Editor,
    Loading
  },
  computed: {
    historyCol(): number {
      return this.$store.state.layout.colSize.history
    },
    editorCol(): number {
      return this.$store.state.layout.colSize.editor
    },
    cheatSheetCol(): number {
      return this.$store.state.layout.colSize.cheatSheet
    },
    umlCol(): number {
      return this.$store.state.layout.colSize.uml
    }
  },
  data(): any {
    return {
      height: '0px',
      umlH: '0px',
      isLoading: true
    }
  },
  created() {
    this.resize()
    this.$store.dispatch('plantumlEditor/getLocalStrage')
    this.$store.dispatch(
      'plantumlEditor/renderUML',
      this.$store.state.plantumlEditor.text
    )
    this.$store.dispatch('histories/defineScheme')
  },
  mounted() {
    this.isLoading = false

    this.setHeight()
    window.$('[data-toggle="tooltip"]').tooltip()
  },
  methods: {
    setHeight() {
      const footerHeight: number = 0
      const headerHeight: number = window.$('.navbar-static-top').height()
      const functionTopHeight: number = window.$('.functionTop').height()
      const height: number = window.innerHeight - headerHeight - footerHeight
      const marginTop: number = 20
      const marginBottom: number = 10
      this.height = height + 'px'
      this.umlH = height - (marginTop + functionTopHeight + marginBottom) + 'px'
    },
    resize() {
      let timer: any = null
      window.addEventListener('resize', () => {
        if (timer) {
          clearTimeout(timer)
        }
        timer = setTimeout(() => {
          this.setHeight()
        }, this.$store.state.plantumlEditor.FPS)
      })
    }
  }
}
</script>

<style>
/* font-awesome */
@import '../node_modules/font-awesome/css/font-awesome.min.css';
/* Bootstrap */
@import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

.col-editor {
  margin-top: -20px;
  padding: 0;
}

.alert-default {
  background-color: #f5f5f5;
  border-color: #ddd;
}
</style>
