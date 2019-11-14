<template>
  <div />
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { SLS } from '@/plugins/sls'
import { enterIndentAction } from '@/plugins/editor/actions'

@Component({
  name: 'MonacoEditor'
})
export default class MonacoEditor extends Vue {
  @Prop({ type: String, default: undefined }) private original!: string
  @Prop({ type: String, required: true }) private value!: string
  @Prop({ type: String, default: 'storyscript' }) private theme!: string
  @Prop({ type: String, default: 'storyscript' }) private language!: string
  @Prop({ type: Object, default: () => ({}) }) private options!: any
  @Prop({ type: Boolean, default: false }) private diffEditor!: boolean

  private editor: any = undefined
  private sls : SLS | undefined = undefined

  @Watch('options', { deep: true })
  private onOptionsChange () {
    if (this.editor) {
      const editor = this.getModifiedEditor()
      editor.updateOptions(this.options)
    }
  }

  @Watch('value')
  private onValueChange () {
    if (this.editor) {
      const editor = this.getModifiedEditor()
      if (this.value !== editor.getValue()) {
        editor.setValue(this.value)
      }
      this.autoHeightEditor()
    }
  }

  private autoHeightEditor () {
    if (this.editor) {
      const editor = this.getModifiedEditor()
      const contentHeight = editor.getModel().getLineCount() * 16
      const el = this.$el as HTMLElement
      el.style.height = `${contentHeight}px`
      editor.layout()
    }
  }

  @Watch('language')
  private onLanguageChange () {
    if (this.editor) {
      const editor = this.getModifiedEditor()
      this.$monaco.editor.setModelLanguage(editor.getModel(), this.language)
    }
  }

  @Watch('theme')
  private onThemeChange () {
    if (this.editor) {
      this.$monaco.editor.setTheme(this.theme)
    }
  }

  mounted () {
    this.initMonaco()
  }

  beforeDestroy () {
    this.editor && this.editor.dispose()
    this.sls && this.sls.disconnect()
  }

  private initMonaco () {
    this.$emit('editorWillMount', this.$monaco)

    const options = {
      ...this.options,
      value: this.value,
      theme: this.theme,
      language: this.language,
      glyphMargin: true,
      lightbulb: {
        enabled: true
      }
    }

    if (this.diffEditor) {
      this.editor = this.$monaco.editor.createDiffEditor(this.$el as HTMLElement, options)
      const originalModel = this.$monaco.editor.createModel(
        this.original,
        this.language
      )
      const modifiedModel = this.$monaco.editor.createModel(
        this.value,
        this.language
      )
      this.editor.setModel({
        original: originalModel,
        modified: modifiedModel
      })
    } else {
      this.editor = this.$monaco.editor.create(this.$el as HTMLElement, options)
      this.sls = new SLS(this.editor)
      this.editor.addAction(enterIndentAction(this.sls))
    }

    const editor = this.getModifiedEditor()

    editor.onDidChangeModelContent(this.onDidChangeModelContent)

    this.$emit('editorDidMount', this.editor)
    this.autoHeightEditor()
  }

  private onDidChangeModelContent (event: any) {
    const value = this.getModifiedEditor().getValue()
    if (this.value !== value) {
      this.$emit('change', value, event)
      this.$emit('input', value, event)
    }
  }

  private getModifiedEditor () {
    return this.diffEditor ? this.editor.getModifiedEditor() : this.editor
  }

  public getEditor () {
    return this.editor
  }

  public focus () {
    this.editor.focus()
  }
}
</script>
