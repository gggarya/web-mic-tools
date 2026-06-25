
const CACHE_NAME = 'mic2fft-v0.2';

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      cache.addAll([
        './mic2fft.html'
      ])
    )
  );

  self.skipWaiting();//旧のswのタブの停止を待たない
});

self.addEventListener('activate', event => {//インスコ完了後に呼ばれる。skipWaithingがあるのですぐ呼ばれる
  event.waitUntil(
    caches.keys().then(names =>
      Promise.all(
        names
          .filter(name =>
            name.startsWith('mic2fft-v') &&
            name !== CACHE_NAME
          )
          .map(name => caches.delete(name))//違うバージョンのキャッシュがあったら削除
      )
    )
  );
  self.clients.claim();//旧のswのタブがあったらこのswに差し替える
});

self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)//まずネットに取りに行く
      .then(async response => {//fetchが成功したときの処理
        const url = new URL(event.request.url);
        url.search = '';//クエリ部は削除
        if (url.pathname === '/web-mic-tools/mic2fft.html') {//mic2fft.htmlならキャッシュ更新
          const cache = await caches.open(CACHE_NAME);
          await cache.put(new Request(url.toString()), response.clone());//クエリを除いたパスでキャッシュ更新
        }
        return response;
      }).catch(() => {//fetchが失敗したとき
        const url = new URL(event.request.url);
        url.search = '';//クエリ部は削除
        return caches.match(url.toString());//クエリを除いた部分でマッチさせる
      })
  );
});
