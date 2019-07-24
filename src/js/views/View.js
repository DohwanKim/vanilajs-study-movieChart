export default {
    init(el){
        if(!el) throw el

        this.el = el
        return this
    },
    on(event, handler){ //기능 이벤트 리스너
        this.el.addEventListener(event, handler)
        return this
    },
    emit(event, data){ //커스텀 이벤트 기능
        const custEvt = new CustomEvent(event, {detail: data})
        this.el.dispatchEvent(custEvt)
        return this
    },
    show(){ //엘리멘트 보이기
        this.el.style.display = ''
        return this
    },
    hide(){ //엘리멘트 숨기기
        this.el.style.display = 'none'
        return this
    }
}