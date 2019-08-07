const history = {
    searchList : [
      {
        title : "shark",
        time : "2019/08/02"
      },
    ]
}

history.add = function(data){
  history.searchList.push(data)
  console.log('================')
  console.log(history.searchList)
}

history.delete = function(data){
  history.searchList = history.data.filter(item => item.title !== data.title)
}

history.get = function(){
  return history.searchList
}

export default history