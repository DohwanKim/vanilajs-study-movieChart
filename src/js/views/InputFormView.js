import View from "./View.js"

const InputFormView = Object.create(View) // View 기능을 포함한 InputFormView 새로 생성
const KEY_ENTER = 13

InputFormView.setup = function(el){  //생성 후 기본 기능 설정
    this.init(el)
    this.inputEl = this.el.querySelector('input')
    this.resetBtnEl = this.el.querySelector('button')
    this.showBtn(false)
    this.bindEvnet()
    return this
}

InputFormView.bindEvnet = function(){
    this.el.addEventListener('submit', (evt)=>{evt.preventDefault()})
    this.inputEl.addEventListener('keyup', (evt)=>{this.inputKeyUp(evt)}) //엔터 미리 감지용으로 evt를 미리 받아옴
    this.resetBtnEl.addEventListener('click', ()=>{this.showBtn(false)})
}

InputFormView.inputKeyUp = function(evt){
    if(evt.keyCode == KEY_ENTER){
        this.emit('@search', this.inputEl.value)
    }
    this.showBtn(!!this.inputEl.value)
}

InputFormView.showBtn = function(isShow = true){
    this.resetBtnEl.style.display = isShow == true?'':'none'
    this.emit('@input', {isShow : isShow})
}
export default InputFormView