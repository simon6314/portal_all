// 最簡版 Service Worker：只為了讓瀏覽器允許安裝，不快取任何內容（入口與子應用有密碼保護，不應留在離線快取）
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', () => {});
