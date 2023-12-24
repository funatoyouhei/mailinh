function loadsidebarArchive() {
  let releaseDatesData = $("#release-date-list").attr("data-release-dates")
  if (releaseDatesData == undefined) return;

  let releaseDates = JSON.parse(releaseDatesData);
  if (releaseDates.length == 0) return;

  let elementReleaseDates = []
  let yearLocal = []
  for (let date of releaseDates) {
    let dateString = date.replaceAll('-', '/');
    let dateLocal = new Date(dateString).toLocaleString('ja-JP', { year: 'numeric', month: 'numeric', day: 'numeric' });
    elementReleaseDates.push(dateLocal.split("/"))
    let year = dateLocal.split("/")[0]
    if (!yearLocal.includes(year)) yearLocal.push(year) 
  }

  let listArchive = []
  for (let year of yearLocal) {
    let monthLocalOfYear = []
    for (let date of elementReleaseDates) {
      if (date[0] == year) {
        monthLocalOfYear.push(date[1])
      }
    }
    let monthUnique = [...new Set(monthLocalOfYear)];
    let listMonth = []
    for (let month of monthUnique) {
      let countMonth = monthLocalOfYear.filter(i => i == month).length
      listMonth.push({month: month, count: countMonth})
    }
    listArchive.push({year: year, listMonth: listMonth})
  }

  let sidebarArchive = ""
  for (let archive of listArchive) {
    sidebarArchive += `<li><a href="javascript:void(0)">${archive['year']}年</a><ul style="display: none;">`
    for (let month of archive['listMonth']) {
      sidebarArchive += `<li><a href="javascript:void(0)" 
        class="archive-month-item" data-release-year="${archive['year']}" data-release-month="${month['month']}">
        ${month['month']}月 (${month['count']})</a></li>`
    }
    sidebarArchive += `</ul>`
  }
  $("#sidebar-list-archive").html(sidebarArchive);
}
