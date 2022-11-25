
document.getElementById('btnChangeName').addEventListener('click', changeName)
document.getElementById('resetName').addEventListener('click', resetName)
document.getElementById("newTabName").addEventListener("keypress",function(event) {
  if (event.key === "Enter") changeName();
});
document.getElementById("newTabName").addEventListener("click",selectAll);

function selectAll(){
  document.getElementById("newTabName").select();
}

chrome.tabs.query({ active: true, currentWindow: true }, function (tab) {
  document.getElementById("newTabName").value= tab[0].title;
  
});


function resetName()
{
  chrome.tabs.query({ active: true, currentWindow: true }, function (tab) {
    chrome.tabs.reload(tab[0].id);
  });
}
function changeName()
{
  
  chrome.tabs.query({ active: true, currentWindow: true }, function (tab) {
    var newName=document.getElementById("newTabName").value;
     function addIframe(newName) {
      document.title=newName;
      console.log(newName);
    }
    chrome.scripting.executeScript(
        {
          target: {tabId: tab[0].id, allFrames: true},
          func: addIframe,
          args: [newName]
        });
    
  });
  
  
}