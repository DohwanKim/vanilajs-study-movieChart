describe('HistorySearch Test', () => {
    let page
    let baseUrl = 'http://localhost:3001'
    async function wait(ms){
      return new Promise((resolve)=>{
        setTimeout(()=>{resolve()}, ms*1000)
      })
    }
    beforeAll(async () => {
      page = await global.__BROWSER__.newPage()
    })

    beforeEach(async() => {
      page = await global.__BROWSER__.newPage()
      await page.goto(baseUrl)

      await page.waitForSelector('#tabs')
      await page.waitForSelector('#search-history')
      await page.click('#tabs > li:nth-child(2)')
    })

    it('탭아래 위치에 있는지 확인', async () => {

      var tabs_y = await page.evaluate(async()=>{
        var posTop = $('#tabs').position().top
        var height = $('#tabs').outerHeight(true)
        return posTop + height
      })

      var history_y = await page.evaluate(async()=>{
        var posTop = $('#search-history').position().top
        var height = $('#search-history').outerHeight(true)
        return posTop + height
      })
      console.log(tabs_y, history_y)
      expect(!!!(tabs_y>=history_y)).toBe(true)
    })

    // it('검색 기록이 없다면 기록이 없어요 표시가 되는지', async () => {
    //   var expectText = '검색 기록이 없어요.'
    //   let text = await page.evaluate(() => document.querySelector('#textMsg').textContent)
    //   expect(text).toBe(expectText)
    // })

    it('검색일자, 검색어, x표시 엘리멘트가 보이는가?', async () => {
      var selectors = ['.date', '.history_query', '.btn-remove']
      await page.waitForSelector(selectors[0], {visible: true})
      await page.waitForSelector(selectors[1], {visible: true})
      await page.waitForSelector(selectors[2], {visible: true})
    })

    it('검색어를 클릭하면 (전부) 검색결과가 표시되는지', async () => {
      await page.waitForSelector('#search-history > ul > li', {visible: true})
      var title = await page.evaluate(async()=>{
        var t = document.querySelectorAll('#search-history > ul > li')[0].getAttribute('data-title')
        return t
      })

      await page.click('#search-history > ul > li')
      var inputTitle = await page.evaluate(async()=>{
        var t = document.querySelector('input').value
        return t
      })

      expect(inputTitle).toContain(title)
    })
    
    it('히스토리 탭의 키워드를 클릭하면 결과가 표시되는지', async () => {
      await page.waitForSelector('#search-history>ul>li', {visible: true})
      await page.click('#search-history>ul>li')
      await page.waitForSelector('#search-result', {visible : true})
    })

    it('검색을하면 검색기록에 추가되는지', async () => {
      var searchText = "shark"
      var len = await page.evaluate(() => document.querySelectorAll('#search-history>ul>li').length)
      await page.waitForSelector('input')
      await page.type('input', searchText)
      await page.focus('input')
      await page.keyboard.down('Enter')
      await page.keyboard.press('Enter')
      await wait(3)
      
      await page.click('body>div.container>form>button')
      await page.waitForSelector('#tabs')
      await page.waitForSelector('#search-history')
      await page.click('#tabs > li:nth-child(2)')

      var resLen = await page.evaluate(() => document.querySelectorAll('#search-history>ul>li').length)
      var resText = await page.evaluate((resLen) => document.querySelectorAll('#search-history>ul>li')[resLen-1].getAttribute('data-title'), resLen)
      
      expect(resLen).toBe(len+1)
      expect(resText).toBe(searchText)
    })
  
  },
)
