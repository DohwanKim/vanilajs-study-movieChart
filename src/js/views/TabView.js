import View from './View.js'

const TabView = Object.create(View)
TabView.selectTab = 0

TabView.setup = function(el){
  this.init(el)
  this.bindEvent()
  this.selectEvent()
  return this
}

TabView.bindEvent = function(){
  Array.from(this.el.children).forEach((e, idx)=>{
    e.addEventListener('click', ()=>{
      this.selectTab = idx
      this.selectEvent()
      this.emit('@selectTab', idx)
    })
  })
}

TabView.selectEvent = function(){
  Array.from(this.el.children).forEach((e, idx)=>{
    e.className = idx==this.selectTab?'active':''
  }) //어레이이긴 한데 확신 안서서 어레이 한번 더 맥임
}



export default TabView