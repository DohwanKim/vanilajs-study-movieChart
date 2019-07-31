import HeaderView from "../views/HeaderView.js"
import InputFormView from "../views/InputFormView.js"
import MoiveAPI from "../api/getMovieAPI.js"
import ResultView from "../views/ResultView.js"
import TabView from "../views/TabView.js"

export default {
    init(){
        HeaderView.setup(document.querySelector('header'))
        InputFormView.setup(document.querySelector('form'))
        .on('@input', (evt)=>{this.resetView(!evt.detail.isShow)})
        .on('@search', (evt)=>{this.searchMovie(evt.detail)})
        ResultView.setup(document.querySelector('#search-result'))
        TabView.setup(document.querySelector('#tabs'))
        .on('@selectTab', (evt)=>{this.selectTab(evt.detail)})
    },
    resetView(isReset = ture){
        if(isReset){
            HeaderView.show()
            ResultView.hide()
            TabView.show()
        }else{
            HeaderView.hide()
            TabView.hide()
        }
    },
    async searchMovie(title){
        //TODO : title empty handler
        const data = await MoiveAPI.searchMovie(title)
        ResultView.render(data)
    },
    selectTab(selNum){
        //TODO : Show SelectNum
        console.log(selNum)
    }
}