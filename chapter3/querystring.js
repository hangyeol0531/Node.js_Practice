const url = require('url')
const querystring = require('querystring');

const parsedUrl = url.parse("https://comic.naver.com/webtoon/detail.nhn?titleId=738143&no=2&weekday=wed");
const query = querystring.parse(parsedUrl.query);
console.log('querystring.parse():', query)
console.log('querystring.stringify():', querystring.stringify(query))