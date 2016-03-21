var ICON_CELL_INDEX = 0,
    FILE_NAME_CELL_INDEX = 1,
    PROGRESS_CELL_INDEX = 2,
    CANCEL_CELL_INDEX = 3;

function addDownloadFile() {
  var fileName = document.getElementById('file-name-input').value;

  if (!fileName) {
    return;
  }

  var table = document
      .getElementById('downloading-table')
      .getElementsByTagName('tbody')[0];
  var row = table.insertRow(table.rows.length);
  var iconCell = row.insertCell(ICON_CELL_INDEX);
  var fileNameCell = row.insertCell(FILE_NAME_CELL_INDEX);
  var progressCell = row.insertCell(PROGRESS_CELL_INDEX);
  var cancelCell = row.insertCell(CANCEL_CELL_INDEX);

  iconCell.innerHTML =
      '<img src="assets/images/download-file-icon.png" alt="downloading">';
  fileNameCell.innerHTML = fileName;
  progressCell.innerHTML = '<progress value="0" max="100"></progress>';
  cancelCell.innerHTML =
      '<img src="assets/images/delete-icon.png" alt="delete">';
}

function downloadAll() {
  var table = document
      .getElementById('downloading-table')
      .getElementsByTagName('tbody')[0];

  for (var i = 0; i < table.rows.length; i++) {
    // var progress = table.rows[i].cells[PROGRESS_CELL_INDEX]
    //     .getElementsByTagName('progress')[0];
    var performDownloading = function(i) {
      var progress = table.rows[i].cells[PROGRESS_CELL_INDEX]
          .getElementsByTagName('progress')[0];
      var timer = setInterval(function() {
        var val = progress.getAttribute('value');
        if (val >= 100) {
          clearInterval(timer);
          return;
        }

        progress.setAttribute('value',val + 10);
      }, 1000);
    };

    setTimeout(performDownloading(i), 0);
  }
}
