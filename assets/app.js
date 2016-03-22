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

  iconCell.innerHTML = '<img class="downloading-file-icon" alt="downloading" ' +
      'src="assets/images/download-file-icon.png">';
  fileNameCell.innerHTML = fileName;
  progressCell.innerHTML = '<progress value="0" max="100"></progress>';
  cancelCell.innerHTML = '<img class="cancel-icon" ' +
      'src="assets/images/delete-icon.png" ' +
      'alt="delete" onclick="deleteDownloadFile(this)">';

  document.getElementById('file-name-input').value = '';
}

function deleteDownloadFile(elem) {
  var row = elem.parentNode.parentNode;
  row.parentNode.removeChild(row);
}

function downloadAll() {
  var table = document
      .getElementById('downloading-table')
      .getElementsByTagName('tbody')[0];

  var performDownloading = function(rowId) {
    if (rowId >= table.rows.length) {
      return;
    }

    var progress = table.rows[rowId].cells[PROGRESS_CELL_INDEX]
        .getElementsByTagName('progress')[0];

    var timer = setInterval(function() {
      if (progress.value >= 100) {
        clearInterval(timer);
        performDownloading(rowId + 1);
        return;
      }

      progress.value += 10;
    }, 500 /* ms */);
  }

  performDownloading(0);
}

function search(elem) {
  var HIDE_CLASS_NAME = 'hide';
  var searchRegex = new RegExp(elem.value, 'i');

  var rows = document
      .getElementById('downloading-table')
      .getElementsByTagName('tbody')[0]
      .getElementsByTagName('tr');

  for (var i = 0; i < rows.length; i++) {
    var fileNameCell = rows[i].childNodes[FILE_NAME_CELL_INDEX];

    if (!searchRegex.test(fileNameCell.textContent)) {
      rows[i].classList.add(HIDE_CLASS_NAME);
    } else {
      rows[i].classList.remove(HIDE_CLASS_NAME);
    }
  }
}
