const req = new XMLHttpRequest();
var imageFolder; // "C:\\Users\\Admin\\Documents\\Individual Project\\Chess openings\\Slav Defense\\";

makeGetRequest("http://localhost:9000/images");

let slavDefenseRating;

var counter = 0;
function clickResponse(a) {
    if (a==0) {
        document.getElementById("board").src = imageFolder + "\\0.png";
        counter=0;
    } else {
        if (counter + a < 5 && counter + a >= 0) {
            counter += a;
            document.getElementById("board").src = imageFolder +"\\"+ counter +".png";
        } else if (counter + a >= 5) {
            //make forward button greyed out
        } else {
            //make backward button greyed out
        }
    }
}

function starRating(a) {
    for (let i=1; i<=5; i++) {
        if (i<=a) {
            document.getElementById("star"+i).className = "fa fa-star checked";
        } else {
            document.getElementById("star"+i).className = "fa fa-star";
        }
    }
}

function showWarning(warningParagraph, parent) {
    hideWarning();
    if (warningParagraph=="delete warning text") {
        document.getElementById(warningParagraph).innerHTML="Warning: This will remove the currently displayed comments. Do you want to proceed?";
    } else {
        document.getElementById(warningParagraph).innerHTML="Warning: This will replace the currently displayed comments. Do you want to proceed?";
    }
    var yesButton = document.createElement("button");
    var noButton = document.createElement("button");
    yesButton.appendChild(document.createTextNode("Yes"));
    if (parent=="comment warning") {
        console.log("Giving it replace with textbox capability");
        yesButton.setAttribute("onclick","hideWarning(); removeComments(); handleCommentSubmit()");
    } else {
        yesButton.setAttribute("onclick","hideWarning(); removeComments()");
    }
    yesButton.setAttribute("id","yesButton");
    noButton.appendChild(document.createTextNode("No"));
    noButton.setAttribute("onclick","hideWarning()");
    noButton.setAttribute("id","noButton");
    
    document.getElementById(parent).appendChild(yesButton);
    document.getElementById(parent).appendChild(noButton);
}

function hideWarning() {
    try {
        document.getElementById("delete warning").removeChild(document.getElementById("yesButton"));
        document.getElementById("delete warning").removeChild(document.getElementById("noButton"));
    } catch { 
        console.log("There were no buttons in delete warning");
    }
    try {
        document.getElementById("comment warning").removeChild(document.getElementById("yesButton"));
        document.getElementById("comment warning").removeChild(document.getElementById("noButton"));
    } catch {
        console.log("There were no buttons in comment warning");
    }
    document.getElementById("comment warning text").innerHTML="";
    document.getElementById("delete warning text").innerHTML="";
}

function removeComments() {
    document.getElementById("comments paragraph").innerHTML="There are currently no comments for this opening.&emsp;&emsp;";
}

function setComments(comment) {
    document.getElementById("comments paragraph").innerHTML=comment;
}

function handleCommentSubmit() {
    var comment = document.getElementById("commentBox").value;
    setComments(comment);
    if (comment=="") {
        setComments("There are currently no comments for this opening.&emsp;&emsp;");
    }
    document.getElementById("commentBox").value="";
}






function makeGetRequest(link){
    req.open("GET", link);
    req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    req.send();
    getOnLoad();
}

function getOnLoad() {
    req.onload = () => {
        if (req.status ==200) {
            console.log("200");
        } 
        else {
            reject("Request Failed");
        }
        console.log(req.response);
        data = JSON.parse(req.response);
        console.log(data[10].imageLocation)
        imageFolder = data[10].imageLocation
        console.log("HERE" + imageFolder)
    }
}