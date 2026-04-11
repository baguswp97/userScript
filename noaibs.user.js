// ==UserScript==
// @name         Permanent Google Classic Search
// @version      1.0
// @description  nuke them "Web Guide" bs
// @author       baguswp97
// @match        https://www.google.com/search*
// @icon         https://www.google.com/s2/favicons?domain=google.com
// @updateURL    https://github.com/baguswp97/userScript/raw/2/noaibs.user.js
// @downloadURL  https://github.com/baguswp97/userScript/raw/2/noaibs.user.js
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    function forceClassic() {
        const url = new URL(window.location.href);
        const params = url.searchParams;
        const isAllTab = !params.has('tbm') || params.get('tbm') === '';

        if (isAllTab && params.get('wgt') !== '2') {
            params.set('wgt', '2');
            window.location.replace(url.toString());
        }
    }

    forceClassic();
    window.addEventListener('popstate', forceClassic);
    let lastUrl = location.href;
    new MutationObserver(() => {
      if (location.href !== lastUrl) {
        lastUrl = location.href;
        forceClassic();
      }
    }).observe(document, {subtree: true, childList: true});
}
)();
