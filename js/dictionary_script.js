var DICTIONARY = [];
var DICTIONARY_MODE = 0;
var DICTIONARY_TOOLTIP = false;

function handleDictionary(handleForSidebar) {
  DICTIONARY.forEach(function(e) {
    var domQuery = $(`main :not(:has(*)):contains('${e.name}'), main :has(> a.dictionary_link):contains('${e.name}')`);
    if (domQuery.length == 0) return;

    var domQueryArray = domQuery.toArray();
    var domQueryArrayFiltered = domQueryArray.filter(function(dom, index, arr) {
      if (handleForSidebar) {
        return dom.closest('#sidebar.blog_sidebar, #sidebar.news_sidebar, #sidebar.page_sidebar') !== null;
      }
      return dom.closest('#sidebar.blog_sidebar, #sidebar.news_sidebar, #sidebar.page_sidebar') === null;
    });

    if (domQueryArrayFiltered.length === 0) { return; }

    var newLink = e.name;
    if (DICTIONARY_TOOLTIP) {
      newLink = "<a class='dictionary_link' href='/apj/dictionary/detail/" + encodeURIComponent(e.name) + ".html' data-tooltip='" + e.content + "' data-html='true' style='text-decoration: underline rgba(34, 34, 34, 0.3) !important; display: inline;width: auto;'>" + e.name + "</a>";
    } else {
      newLink = "<a class='dictionary_link' href='/apj/dictionary/detail/" + encodeURIComponent(e.name) + ".html' style='text-decoration: underline rgba(34, 34, 34, 0.3) !important; display: inline;width: auto;'>" + e.name + "</a>";
    }

    if (DICTIONARY_MODE == 1) {
      var oldHTML = domQueryArrayFiltered[0].innerHTML;
      var newHTML = oldHTML.replace(e.name, newLink);
      domQueryArrayFiltered[0].innerHTML = newHTML;
    } else if (DICTIONARY_MODE == 2) {
      domQueryArrayFiltered.forEach((dom) => {
        var oldHTML = dom.innerHTML;
        var newHTML = oldHTML.replaceAll(e.name, newLink);
        dom.innerHTML = newHTML;
      });
    }
  });
}
