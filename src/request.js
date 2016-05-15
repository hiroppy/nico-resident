'use strict';
const http  = require('http');
const FeedParser = require('feedparser');

module.exports = (period='毎時', genre='カテゴリ合算') => {
  const convertedPeriod = convertPeriod(period);
  const convertedGenre = convertGenre(genre);
  const url = `http://www.nicovideo.jp/ranking/fav/${convertedPeriod}/${convertedGenre}?rss=2.0`;
  const info = [];

  return new Promise((resolve, reject) => {
    const options = {
      host: url
    };
    http.get(url, (res) => {
      res
        .setEncoding('utf8')
        .pipe(new FeedParser({}))
        .on('data', (chunk) => info.push(chunk))
        .on('end', () => {
          resolve(info);
        })
    }).on('error', (e) => {
      console.error(e);
    });
  });
};

function convertPeriod(period) {
  if (period === '毎時')   return 'hourly';
  if (period === '24時間') return 'daily';
  if (period === '週間')   return 'weekly';
  if (period === '月間')   return 'monthly';
  if (period === '合計')   return 'total';
}

function convertGenre(genre) {
  if (genre === 'カテゴリ合算')       return 'all';
  if (genre === 'エンタメ・音楽')     return 'g_ent2';
  if (genre === '生活・一般・スポ')   return 'g_life2';
  if (genre === '政治')               return 'g_politics';
  if (genre === '科学・技術')         return 'g_tech';
  if (genre === 'アニメ・ゲーム・絵') return 'g_culture2';
  if (genre === 'その他')             return 'g_other';
}
