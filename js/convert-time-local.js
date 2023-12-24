function convertReleaseTimeLocal(isSidebar = false) {
  let attributeRelease = isSidebar ? $("#sidebar").contents().find(".release_time") : $('.release_time')

  attributeRelease.each(function(index) {
    let dateString = $(this).text().replaceAll('-', '/');
    let date = new Date(dateString);
    date = date.toLocaleString('ja-JP', { year: 'numeric', month: 'numeric', day: 'numeric' });
    $(this).html(date)
  });
}
