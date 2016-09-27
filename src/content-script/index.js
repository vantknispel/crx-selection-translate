import app from './app'
import getSelection from '../utils/selection'
import matchParent from '../utils/matchParent'

app.once('initialized', function () {
  const { $el: appContainer } = app.vueApp

  // 点击翻译按钮时阻止浏览器清除拖蓝
  appContainer.addEventListener('mousedown', function (e) {
    const translateBtn = matchParent(e.target, '.__translate-btn__', appContainer)
    if (!translateBtn) return
    e.preventDefault()
  }, true)

  // 点击翻译按钮时开始翻译
  appContainer.addEventListener('click', function (e) {
    const translateBtn = matchParent(e.target, '.__translate-btn__', appContainer)
    if (!translateBtn) return
    app.hideBtn()
    const sl = getSelection()
    if (!sl) return
    app.vueApp.loading = true
    app.showWin(sl.rect)
    setTimeout(function () {
      app.vueApp.resultObj = { hello: 'world' }
      app.vueApp.loading = false
    }, 1000)
  })
})

document.addEventListener('DOMContentLoaded', function () {
  const { body } = document

  // 按下 ESC 键时隐藏
  document.addEventListener('keyup', function (e) {
    if (27 === e.keyCode) { // keyCode 虽然已被弃用，但目前几乎没有浏览器实现了 e.key
      app.hide()
    }
  })

  // 鼠标抬起时先隐藏，然后显示翻译按钮
  body.addEventListener('mouseup', function () {
    app.hide()
    const sl = getSelection()
    if (!sl) return
    app.showBtn(sl.rect)
  })
})