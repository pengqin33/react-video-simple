/* 获得url param */
export const getUrlParams = () => {
  const url = window.location.search;
  const query = {};
  if (url.indexOf('?') !== -1) {
    const str = url.substr(1);

    const strs = str.split('&');
    for (let i = 0; i < strs.length; i++) {
      query[strs[i].split('=')[0]] = decodeURI(strs[i].split('=')[1]);
    }
  }

  const hash = window.location.hash;
  if (hash.indexOf('?') !== -1) {
    const hashStr = hash.substr(hash.indexOf('?') + 1, hash.length);

    const hashArr = hashStr.split('&');
    for (let i = 0; i < hashArr.length; i++) {
      query[hashArr[i].split('=')[0]] = decodeURI(hashArr[i].split('=')[1]);
    }
  }
  return query;
}

/* ios 全屏检测 */
export function detectFullScreen () {
  const rootEl = document.getElementById('root')
  if (navigator.standalone) {
    rootEl.classList.add('full-screen')
  }
}

/* 重新加载 */
export function reload () {
  window.location.reload(true)
}
