// ==UserScript==
// @name        Permanent Google Classic Search (nuke them "Web Guide" bs)
// @match       https://google.com/search*
// @grant       none
// @run-at      document-start
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
