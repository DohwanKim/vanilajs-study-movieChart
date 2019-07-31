// ###> 검색 기록 (local 일시적 저장)
// #####( ) 검색 기록, 목록이 탭 아래에 위치한다.
// - 탭아래에 위치에 있는지 확인
// #####( ) 검색기록이 없다면 ('기록이없어요' 표시)
// - 검색 기록이 없다면 기록이 없어요 표시가 되는지
// #####( ) 검색일자, 검색어, x버튼 표시
// - 검색일자, 검색어, x표시 엘리멘트가 보이는가?
// #####( ) 목록에서 검색어메뉴를 클릭하면 선택된 검색어로 검색결과 표시
// - 검색어를 클릭하면 (전부) 검색결과가 표시되는지
// #####( ) 검색시 검색 기록 목록에 추가 될 것
// - 검색을하면 검색기록에 추가되는지
// - 검색기록을 클릭해도 검색기록이 추가되는지

describe('HistorySearch Test', () => {
    let page
    let baseUrl = 'http://localhost:3003/'
    beforeAll(async () => {
      page = await global.__BROWSER__.newPage()
    })

    afterAll(async () => {
      await page.close()
    })

    beforeEach(async() => {
      await page.goto(baseUrl)
    })

    it('탭아래 위치에 있는지 확인', async () => {
      await page.waitForSelector('#tabs', {visible: true})
      await page.waitForSelector('#search-history', {visible: true})

      const getYPos = (selector)=>{
        var posTop = $(selector).position()
        var height = $(selector).outerHeight(true)
        return posTop + height
      }

      var tabs_y = await page.evaluate(async()=>{
        return getYPos('#tabs')
      })

      var history_y = await page.evaluate(async()=>{
        return getYPos('#search-history')
      })

      expect(!!tabs_y>=history_y).toBe(true)
    })

    it('검색 기록이 없다면 기록이 없어요 표시가 되는지', async () => {
      var expectText = '검색 기록이 없어요.'
      let text = await page.evaluate(() => document.querySelector('#textMsg').textContent)
      expect(text).toBe(expectText)
    })

    it('검색일자, 검색어, x표시 엘리멘트가 보이는가?', async () => {
      var selectors = ['#history_date', '#history_query', '#history_delete_btn']
      await page.waitForSelector(selectors[0], {visible: true})

      Array.from(selectors).forEach(async(selector)=>{
      })
    })

    it('검색어를 클릭하면 (전부) 검색결과가 표시되는지', async () => {
      await page.waitForSelector('li', {visible: true})
      var title = await page.evaluate(async()=>{
        var t = document.querySelector('#search-history>li').children[0].textContent
        return t
      })

      await page.click('#search-history>li')

      var inputTitle = await page.evaluate(async()=>{
        var t = document.querySelector('input').value
        return t
      })

      expect(inputTitle).toContain(title)
    })
    
    it('검색탭을 클릭하면 결과가 표시되는지', async () => {
      var searchText = "test"
      await page.click('#search-history>li')
      await page.waitForSelector('search-result', {visible : true})

    })

    it('검색을하면 검색기록에 추가되는지', async () => {
      var searchText = "shark"
      var len = await page.evaluate(() => document.querySelectorAll('#search-history>li').length)
      await page.waitForSelector('input')
      await page.type('input', searchText)
      await page.keyboard.down('Enter')
      await page.goto(baseUrl)
      var resLen = await page.evaluate(() => document.querySelectorAll('#search-history>li').length)
      var resText = await page.evaluate(() => document.querySelectorAll('#search-history>li').pop()[0].value)
      
      expect(resLen).toBe(len+1)
      expect(resText).toBe(searchText)
    })
  
  },
)
