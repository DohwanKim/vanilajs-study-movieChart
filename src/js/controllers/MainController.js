import HeaderView from "../views/HeaderView.js"
import InputFormView from "../views/InputFormView.js"
import MoiveAPI from "../api/getMovieAPI.js"
import ResultView from "../views/ResultView.js";

export default {
    init(){
        HeaderView.setup(document.querySelector('header'))
        InputFormView.setup(document.querySelector('form'))
        .on('@input', (evt)=>{this.hideHeader(evt.detail.isShow)})
        .on('@search', (evt)=>{this.searchMovie(evt.detail)})
        ResultView.setup(document.querySelector('#search-result'))
    },
    hideHeader(isHide = ture){
        if(isHide){
            HeaderView.hide()
        }else{
            HeaderView.show()
            ResultView.hide()
        }
    },
    async searchMovie(title){
        //TODO : title empty handler
        const data = await MoiveAPI.searchMovie(title)
        ResultView.render(data)
        
    }
}