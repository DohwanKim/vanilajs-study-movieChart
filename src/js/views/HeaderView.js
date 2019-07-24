import View from "./View.js"

const HeaderView = Object.create(View) // View 기능을 포함한 HeadView 새로 생성

HeaderView.setup = function(el){
    this.init(el)
    return this
}

export default HeaderView