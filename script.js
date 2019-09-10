const req = new XMLHttpRequest();
var imageFolder; // "C:\\Users\\Admin\\Documents\\Individual Project\\Chess openings\\Slav Defense\\";

var listOfRatings;

let name = "Slav Defense"
let slavDefenseRating;
let slavDefenseComment;

makeGetRequest("http://localhost:9000/ratings", "ratings")

function setRatingAndComments() {
    for (let row in listOfRatings) {
        if (listOfRatings[row].name == name) {
            slavDefenseRating = listOfRatings[row].rating;
            starRating(slavDefenseRating);
            slavDefenseComment = listOfRatings[row].comment;
            setComments(slavDefenseComment);
        }
    }
}

var counter = 0;
function clickResponse(a) {
    if (a==0) {
        document.getElementById("board").src = imageFolder + "\\0.png";
        counter=0;
    } else {
        if (counter + a < 5 && counter + a >= 0) {
            counter += a;
            document.getElementById("board").src = imageFolder + "\\" + counter + ".png";
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






function makeGetRequest(link, imagesOrRatings){
    req.open("GET", link);
    //req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    req.send();
    getOnLoad(imagesOrRatings);
}

function getOnLoad(imagesOrRatings) {
    req.onload = () => {
        if (req.status == 200 || req.status == 201) {
            console.log("GET Request successful");
        } 
        else {
            reject("GET Request failed");
        }
        //console.log(req.response);
        data = JSON.parse(req.response);

        if (imagesOrRatings == "images") {
            console.log("imagesOrRatings was 'images'")
            imageFolder = data[10].imageLocation;
        } else if (imagesOrRatings == "ratings") {
            console.log("imagesOrRatings was 'ratings'")
            listOfRatings = data;
            console.log(listOfRatings)
            setRatingAndComments();
            //imports images table from API
            makeGetRequest("http://localhost:9000/images", "images"); // http://localhost:9000/images
        } else {
            console.log("makeGetRequest(a) should only take arguments of 'images' or 'ratings'");
        }

    }
}

//remove these after testing
let testObj = {
        "name": "Test",
        "imageLocation": "Test2link//yada"
    }
let formTestString = JSON.stringify(testObj);
//end of remove

function makePostRequest(link, obj) {
    req.open("POST", link);
    req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    req.send(obj);
    postOnLoad();
}

function postOnLoad() {
    req.onload = () => {
        if (req.status == 201 || req.status == 200) {
            console.log("req.status was: " + req.status);
            console.log("POST Request successful");
        } 
        else {
            console.log("req.status was: " + req.status);
            console.log("POST Request failed");
        }
    }
}