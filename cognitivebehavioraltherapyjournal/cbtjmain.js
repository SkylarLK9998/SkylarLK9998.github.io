function newEntry(){
  var div1 = document.getElementById("oldEntries");
  div1.hidden = true;
  var div = document.getElementById("newEntry");
  div.hidden = false;
}

function addJournalEntry(){
  var CDS;
  var CDSn = document.getElementById("CDSelection").selectedIndex
  switch(CDSn) {
  case 0:
    CDS = "Mind Reading";
    break;
  case 1:
    CDS = "Labeling";
    break;
  case 2:
    CDS = "Predicting the Future";
    break;
  case 3:
    CDS = "Shoulds";
    break;
  case 4:
    CDS = "Catastrophic Thinking";
    break; 
  case 5:
    CDS = "Black and White Thinking";
    break;   
  case 6:
    CDS = "Emotional Reasoning";
    break;
  case 7:
    CDS = "Personalization";
    break;
  default:
    CDS = "Overgeneralization";
  }
  var JournalEntry = {
    Date: new Date(),
    AutomaticNegativeThoughts: document.getElementById("txt1").value,
    CognitiveDistorion: CDS,
    Response: document.getElementById("txt2").value
  };
  var entries  = JSON.parse(localStorage.getItem(entries));
  entries += JSON.stringify(JournalEntry);
  localStorage.setItem("entries", JSON.stringify(entries));
}

function viewOldEntries(){
  var div1 = document.getElementById("newEntry");
  div1.hidden = true;
  var txtarea = document.getElementById("oes");
  txtarea.value = parseOldEntries();
  var div = document.getElementById("oldEntries");
  div.hidden = false;
}

// function exportOldEntries(){
//   var preHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
//   var postHtml = "</body></html>";
//   var html = preHtml+document.getElementById(element).innerHTML+postHtml;

//   var blob = new Blob(['\ufeff', html], {
//       type: 'application/msword'
//   });
    
//   // Specify link url
//   var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html);
    
//   // Specify file name
//   filename = filename?filename+'.doc':'document.doc';
    
//   // Create download link element
//   var downloadLink = document.createElement("a");

//   document.body.appendChild(downloadLink);
    
//   if(navigator.msSaveOrOpenBlob ){
//       navigator.msSaveOrOpenBlob(blob, filename);
//   }else{
//       // Create a link to the file
//       downloadLink.href = url;
      
//       // Setting the file name
//       downloadLink.download = filename;
        
//       //triggering the function
//       downloadLink.click();
//   }
    
//     document.body.removeChild(downloadLink);
// }

function parseOldEntries(){
  var txt = "";
  var entries  = JSON.parse(localStorage.getItem("entries"));
  //console.log(entries);
  var markerA = 0;
  var markerB = 0;
  var markerC = 0;
  //start at i=5 to skip over the "null{" at the start of entries, end at length-2 to skip "}" at the end
  for (var i = 5; i <= entries.length - 2; i++) {
    if(entries[i]=='\"'){
      if(entries[i-1]!='\\'){
        if(markerA==0){
          markerA=i+1; //to get rid of the '"'
        }else{
          markerB=i;
          if(markerC%2==1){
            var str = entries.substring(markerA, markerB);
            if(markerC%8==1){
              str = str.substring(0, 10);
            }
            txt += str
          }else if(markerC%8==0){
            txt += "\n\n\nOn "
          }else if(markerC%8==2){
            txt += " you had the following Automatic Negative Thoughts: \n"
          }else if(markerC%8==4){
            txt += "\nYou felt "
          }else{ 
            txt += ", here is the Realistic Alternative you came up with for those Automatic Negative Thoughts: \n"
          }
          markerA=0;
          markerB=0;
          markerC++;
        }
      }
    }
  }
  return txt;
}

// addEntryBtn.addEventListener("click", addJournalEntry);
// addJournalEntry = function(){
//   var JournalEntry = {
//     Date: new Date(),
//     AutomaticNegativeThoughts: document.getElementById("ANTData").value,
//     CognitiveDistorion: document.getElementById("CDSelection").selectedIndex,
//     Response: document.getElementById("ResponseData").value
//   };

//   localStorage.setItem(id, simpleStringify(JournalEntry));
// }
