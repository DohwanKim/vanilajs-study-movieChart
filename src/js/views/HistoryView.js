import View from "./View.js"

const HistoryView = Object.create(View)

HistoryView.setup = function(el){
  this.init(el)
  this.hide()
  return this
}

HistoryView.render = function(data){
  this.el.innerHTML = this.createHtml(data)
  this.bindEvent()
  this.show()
}

HistoryView.createHtml = function(data){
    return data.reduce((html, item) => {
      html += `<li class="history_query" data-title="${item.title}">
        ${item.title} 
        <span class="date">${item.time}</span>
        <button class="btn-remove"></button>
        </li>`
      return html
    }, '<ul class="list">') + "</ul>"
  
}

HistoryView.bindEvent = function(){
  let arr = document.querySelectorAll('.list>li')
  arr.forEach((el)=>{
    el.addEventListener('click', ()=>{
      var query = el.dataset.title
      this.emit('@search', query)
    })
  })
}

export default HistoryView