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
    return data.reduce((html, item) => {
        html += this.getSearchItemHtml(item)
        return html
    }, '<ul>') + '</ul>'
}

ResultView.getSearchItemHtml = function (item) {
    var posterUrl = `https://image.tmdb.org/t/p/w500/${item.posterPath}`
    var defaultUrl = `https://www.blackbeltkaratestudio.com/wp-content/uploads/2017/04/default-image.jpg`
    var url = item.posterPath=="null"?defaultUrl:posterUrl
    var title = item.title
    var overview = item.overview
    return `<li>
      <img src="${url}" />
      <div>
        <h3>${title}</h3>
        <p>${overview}</p>
      </div>
    </li>`
}

export default ResultView