$( "#datepicker" ).datepicker();
var recordedProjectName = [];
var recordedProjectType = [];
var recordedDueDate = [];

init()

function setTime() {
  var today = dayjs();
  $('#dateTime').text(today.format('MMM DD, YYYY [ at ] hh:mm:ss a'));
  var timerInterval = setInterval(function() {
    today = dayjs().add(1, 's');
    $('#dateTime').text(today.format('MMM DD, YYYY [ at ] hh:mm:ss a'));
    if(today === 0) {
      clearInterval(timerInterval);
    }
  }, 1000);
}

function displayRecords() {
  $('tbody').empty();
  for (var i = 0; i < recordedProjectName.length; i++) {
    var projectItem = 
      "<tr>"
      +"<td>"+recordedProjectName[i]+"</td>"
      +"<td>"+recordedProjectType[i]+"</td>"
      +"<td>"+(recordedDueDate[i])+"</td>"
      +"<td><button class='deleteProject'>x</button></td>"
      +"</tr>";
    $(projectItem).appendTo($('tbody'));
  };
};

$('tbody').on("click", "tr", ".deleteProject", function() {
  var index = $(this).index();
  recordedProjectName.splice(index,1);
  recordedProjectType.splice(index,1);
  recordedDueDate.splice(index,1);
  localStorage.setItem("recordedProjectName", JSON.stringify(recordedProjectName));
  localStorage.setItem("recordedProjectType", JSON.stringify(recordedProjectType));
  localStorage.setItem("recordedDueDate", JSON.stringify(recordedDueDate));
  $(this).closest("tr").remove();
});

$('#addProject').on('click', function () {
  if ($('input').val() !== "" && $('select :selected').text() !== "" ) {
    recordedProjectName.push($('input[id="projectName"]').val());
    recordedProjectType.push($('select[id="projectType"] :selected').text()); 
    recordedDueDate.push($('input[id="datepicker"]').val());

    localStorage.setItem("recordedProjectName", JSON.stringify(recordedProjectName));
    localStorage.setItem("recordedProjectType", JSON.stringify(recordedProjectType));
    localStorage.setItem("recordedDueDate", JSON.stringify(recordedDueDate));

    displayRecords();

    $('input').val('');
    $('select').val('');
    $('#projectModal').modal('hide');
  } else {
    alert("Must fill in all values.");
  }
});

function init() {
  setTime();
  var storedProjectName = JSON.parse(localStorage.getItem("recordedProjectName"));
  if (storedProjectName !== null) {
    recordedProjectName = storedProjectName;
  };
  var storedProjectType = JSON.parse(localStorage.getItem("recordedProjectType"));
  if (storedProjectType !== null) {
    recordedProjectType = storedProjectType;
  };
  var storedDueDate = JSON.parse(localStorage.getItem("recordedDueDate"));
  if (storedDueDate !== null) {
    recordedDueDate = storedDueDate;
  };
  displayRecords();
}