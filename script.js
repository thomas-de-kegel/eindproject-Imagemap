$(document).ready(function () {
  console.log("Loaded and ready!");

  //Load issues from local storage
  issues = JSON.parse(localStorage.getItem("issues")) || [];

  //Initialize maphilight settings
  $.fn.maphilight.defaults = {
    fill: true,
    fillColor: "00FFCC",
    fillOpacity: 0.1,
    stroke: true,
    strokeColor: "00FFCC",
    strokeOpacity: 0.8,
    strokeWidth: 3,
    fade: true,
    alwaysOn: true,
    neverOn: false,
    groupBy: false,
    wrapClass: true,
    shadow: false,
    shadowX: 0,
    shadowY: 0,
    shadowRadius: 6,
    shadowColor: "000000",
    shadowOpacity: 0.8,
    shadowPosition: "outside",
    shadowFrom: false,
  };

  //Maphilight function
  $(".image-map").maphilight();

  //Area click functionality
  let issueLocation = "";
  $("area").click(function () {
    console.log($(this).attr("title"));
    $("#selectionDisplay").text($(this).attr("title"));
    issueLocation = $(this).attr("title");
  });

  //Nightmode functionality
  let nightMode = false;
  $(".night-mode").click(function () {
    $(".image-map").toggleClass("nightMode");
    if (nightMode === false) {
      fillColor = "ff0033";
      nightMode = true;
    } else {
      fillColor = "00FFCC";
      nightMode = false;
    }
  });

  
  //New Issue functionality
  $("#new-issue-form").submit(function (e) { 
    e.preventDefault();
    console.log("Issue created");
    
    const issue = {
      content: e.target.elements.content.value,
      location: issueLocation,
      createdAt: new Date().getTime()
    }
    
    issues.push(issue);
    
    localStorage.setItem("issues", JSON.stringify(issues));
    
    e.target.reset();
    displayIssues()
  });
  
  displayIssues();
});

//Display Issues functionality
function displayIssues() {
  const issueList = document.querySelector('.issue-list');

  issueList.innerHTML = "";

  issues.forEach(issue => {
    const issueItem = document.createElement('div');
    issueItem.classList.add('issue-item');

    const content = document.createElement('div');
    const actions =  document.createElement('div');
    const edit = document.createElement('button');
    const deleteBtn = document.createElement('button');

    content.classList.add('issue-content');
    actions.classList.add('actions');
    edit.classList.add('edit');
    deleteBtn.classList.add('delete');

    content.innerHTML = `<input type="text" value="${issue.content}" readonly>`;
    edit.innerHTML = 'edit';
    deleteBtn.innerHTML = 'delete';

    actions.appendChild(edit);
    actions.appendChild(deleteBtn);
    issueItem.appendChild(content);
    issueItem.appendChild(actions);

    issueList.appendChild(issueItem);

    edit.addEventListener('click', e => {
      const input = content.querySelector('input');
      input.removeAttribute('readonly');
      input.focus();
      input.addEventListener('blur', e => {
        input.setAttribute('readonly', true);
        issue.content = e.target.value;
        localStorage.setItem('issues', JSON.stringify(issues));
        displayIssues();
      })
    })

    deleteBtn.addEventListener('click', e =>{
      issues = issues.filter(i => i != issue);
      localStorage.setItem('issues', JSON.stringify(issues));
      displayIssues();
    })
  })
}