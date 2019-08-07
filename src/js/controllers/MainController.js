//Views
import HeaderView from "../views/HeaderView.js"
import InputFormView from "../views/InputFormView.js"
import MoiveAPI from "../api/getMovieAPI.js"
import ResultView from "../views/ResultView.js"
import TabView from "../views/TabView.js"
import HistoryView from "../views/HistoryView.js"

//Models
import HistoryModel from "../models/HistoryModel.js"

export default {
    init(){
        HeaderView.setup(document.querySelector('header'))
        .on('@reset', (evt)=>{this.resetView(true)})
        InputFormView.setup(document.querySelector('form'))
        .on('@input', (evt)=>{this.resetView(!evt.detail.isShow)})
        .on('@search', (evt)=>{this.searchMovie(evt.detail)})
        ResultView.setup(document.querySelector('#search-result'))
        TabView.setup(document.querySelector('#tabs'))
        .on('@selectTab', (evt)=>{this.selectTab(evt.detail)})
        HistoryView.setup(document.querySelector('#search-history'))
        .on('@search', (evt)=>{InputFormView.searchMovie(evt.detail)})
    },
    resetView(isReset = ture){
        if(isReset){
            HeaderView.show()
            ResultView.hide()
            TabView.selectTab = 0
            TabView.selectEvent()
            TabView.show()
        }else{
            HeaderView.hide()
            TabView.hide()
        }
        HistoryView.hide()
    },
    async searchMovie(title){
        //TODO : title empty handler
        TabView.hide()
        HistoryView.hide()

        const data = await MoiveAPI.searchMovie(title)
        ResultView.render(data)
        var currnetData = Date.now()
        HistoryModel.add({title, time: currnetData})
    },
    selectTab(selNum){
        //TODO : Show SelectNum
        if(selNum){ //1
            var data = this.getHistoryModel()
            HistoryView.render(data)
        }else{ //0
            HistoryView.hide()
        }
    },
    getHistoryModel(){
        return HistoryModel.get()
    }
}