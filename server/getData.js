const axios = require('axios');
const cheerio = require('cheerio');
const dateFormat = require('dateformat');

const getData = async callback => {
  try {
    const html = await axios.get('http://ncov.mohw.go.kr/bdBoardList_Real.do?brdId=1&brdGubun=11&ncvContSeq=&contSeq=&board_id=&gubun=');
    const $ = cheerio.load(html.data);
    
    const data = {
      confirmed: {
        description: '확진환자',
        total: parseInt($('.ca_body').eq(0).find('dl').eq(0).find('dd').text().replace(/,/gi, '')),
        dailyChange: {
          subtotal: parseInt($('.ca_body').eq(0).find('dl').eq(1).find('li p').eq(0).text().replace(/,/gi, '').replace(/ /gi, '')),
          local: parseInt($('.ca_body').eq(0).find('dl').eq(1).find('li p').eq(1).text().replace(/,/gi, '')),
          imported: parseInt($('.ca_body').eq(0).find('dl').eq(1).find('li p').eq(2).text().replace(/,/gi, ''))
        }
      },
      released: {
        description: '격리해제',
        total: parseInt($('.ca_body').eq(1).find('dl').eq(0).find('dd').text().replace(/,/gi, '')),
        dailyChange: parseInt($('.ca_body').eq(1).find('dl').eq(1).find('dd').text().replace(/,/gi, '').replace(/ /gi, '')),
      },
      quarantined: {
        description: '격리중',
        total: parseInt($('.ca_body').eq(2).find('dl').eq(0).find('dd').text().replace(/,/gi, '')),
        dailyChange: parseInt($('.ca_body').eq(2).find('dl').eq(1).find('dd').text().replace(/,/gi, '').replace(/ /gi, '')),
      },
      deceased: {
        description: '사망',
        total: parseInt($('.ca_body').eq(3).find('dl').eq(0).find('dd').text().replace(/,/gi, '')),
        dailyChange: parseInt($('.ca_body').eq(3).find('dl').eq(1).find('dd').text().replace(/,/gi, '').replace(/ /gi, '')),
      },
      date: dateFormat(new Date(), 'yyyy-mm-dd HH:MM')
    };

    callback(null, data);
  } catch(err) {
    callback(err);
  }
};

module.exports = getData;