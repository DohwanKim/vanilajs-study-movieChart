import View from "./View.js"

const ResultView = Object.create(View)

ResultView.setup = function(el){
    this.init(el)
    return this
}

ResultView.render = function(data){
    this.el.innerHTML = this.getSearchResultsHtml(data)
    this.show()
}

ResultView.getSearchResultsHtml = function (data) {
    var a = data.reduce((html, item, idx) => {
      html += this.getSearchItemHtml(item, idx)
      return html
    },'<div>') + ((data.length%2==0)?'</div>':'')+'</div>'
    return a
  }
  
  ResultView.getSearchItemHtml = function (item, idx) {
    var tmp = idx%2
    var posterUrl = `https://image.tmdb.org/t/p/w500/${item.posterPath}`
    var defaultUrl = `https://www.blackbeltkaratestudio.com/wp-content/uploads/2017/04/default-image.jpg`
    var url = posterUrl.split('/').pop()=="null"?defaultUrl:posterUrl
    var title = item.title
    var overview = item.overview
    if(tmp==0){
      return `
      <div class="posterContainer">
        <div class="posterLab">
          <div class="posterBox">
            <img class="poster" src="${url}" />
            <h3 class="poster-title">${title}</h3>
          </div>
        </div>
    `
    }else{
      return `
      <div class="posterLab">
        <div class="posterBox">
          <img class="poster" src="${url}" />
          <h3 class="poster-title">${title}</h3>
        </div>
      </div>
      </div>
      `
    }
  
  }

export default ResultView