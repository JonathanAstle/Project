let name = "Queen's Gambit"
var imagesLink = "http://34.89.9.121:9000/images"; //localhost:9000/images
var ratingsLink = "http://34.89.9.121:9000/ratings"; //localhost:9000/ratings

const req = new XMLHttpRequest();

let ratingsId;
let ratingsIndex;
let imagesId;
let imagesIndex;
let DefenseRating; 
let DefenseComment;
let imagesArray;
let ratingsArray;
let imagesObject;
let list;

onStartUp();

function onStartUp() {
    req.open("GET", imagesLink);
    req.send();
    req.onload = () => {
        if (req.status == 200 || req.status == 201) {
            console.log("GET Request successful for images");
            imagesArray = JSON.parse(req.response);
            getImagesId();
            imagesObject = imagesArray[imagesIndex];
            document.getElementById("board").src = imagesObject["img1"];
        } 
        else {
            reject("GET Request failed for images");
        }

        req.open("GET", ratingsLink);
        req.send();
        req.onload = () => {
            if (req.status == 200 || req.status == 201) {
                console.log("GET Request successful for ratings");
                ratingsArray = JSON.parse(req.response);
                getRatingsId();
                setRatingAndComments();
            } 
            else {
                reject("GET Request failed for images");
            }
        }
    }
}

function getRatingsId() {
    for (let row in ratingsArray) {
        if (ratingsArray[row].name == name) {
            ratingsId = ratingsArray[row].id;
            ratingsIndex = parseInt(row); 
        }
    }
}

function getImagesId() {
    for (let row in imagesArray) {
        if (imagesArray[row].name == name) {
            imagesId = imagesArray[row].id;
            imagesIndex = parseInt(row);
        }
    }
}

function setRatingAndComments() {
    for (let row in ratingsArray) {
        if (ratingsArray[row].name == name) {
            DefenseRating = ratingsArray[row].rating;
            starRating(DefenseRating);
            DefenseComment = ratingsArray[row].comment;
            setComments(DefenseComment);
        }
    }
}

function checkIfExists(name) {
    for (let row in ratingsArray) {
        if (ratingsArray[row].name == name) {
            return true;
            break;
        } 
    }
    return false;
}

var counter = 1;
function clickResponse(a) {
    if (a==0) {
        document.getElementById("board").src = imagesObject.img1;
        counter=1;
    } else {
        if (imagesObject["img"+(counter+a)]) {
            counter += a;
            document.getElementById("board").src = imagesObject["img"+counter];
        } 
    }
}

function lengthOfObject(obj) {
    var L=0;
    $.each(obj, function(i, elem) {
        L++;
    });
    return L;
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

function clickStarRating(a) {
    DefenseRating = a;
    for (let i=1; i<=5; i++) {
        if (i<=a) {
            document.getElementById("star"+i).className = "fa fa-star checked";
        } else {
            document.getElementById("star"+i).className = "fa fa-star";
        }
    }

    //if it needs deleting
    if(a==0 && DefenseComment=="There are currently no comments for this opening.&emsp;&emsp;") {
        getRatingsId();
        makeDeleteRequest(ratingsLink + "/" + ratingsId)
    } else {
        let object;
        //if this opening isn't already in the table then make one and post it to API
        if (!checkIfExists(name)) {
            if (DefenseComment) {
                object = {
                    "name": name,
                    "rating": DefenseRating,
                    "comment": DefenseComment
                }
            } else { 
                object = {
                    "name": name,
                    "rating": DefenseRating,
                    "comment": "There are currently no comments for this opening.&emsp;&emsp;"
                }
            } 
            makePostRequest(ratingsLink, object);
        } else { 
            if (DefenseComment) {
                object = {
                    "name": name, 
                    "rating": DefenseRating,
                    "comment": DefenseComment
                }
            } else { 
                object = {
                    "name": name,
                    "rating": DefenseRating,
                    "comment": "There are currently no comments for this opening.&emsp;&emsp;"
                }
            }
            getRatingsId();
            console.log("Updating pre-existing entry...");
            makePutRequest(ratingsLink + "/" + ratingsId, object);
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
    DefenseComment = "There are currently no comments for this opening.&emsp;&emsp;";
    getRatingsId();
    if (DefenseRating == 0) {
        makeDeleteRequest(ratingsLink + "/" + ratingsId)
    } else {
        let object = {
            "name": name,
            "rating": DefenseRating,
            "comment": DefenseComment
        }
        console.log("Updating pre-existing entry...");
        makePutRequest(ratingsLink + "/" + ratingsId, object);
    }
}

function setComments(comment) {
    document.getElementById("comments paragraph").innerHTML=comment;
    DefenseComment = comment;
}

function handleCommentSubmit() {
    var comment = document.getElementById("commentBox").value;
    setComments(comment);
    if (comment=="") {
        setComments("There are currently no comments for this opening.&emsp;&emsp;");
    }
    if (!checkIfExists(name)) {
        let object = {
            "name": name,
            "rating": DefenseRating,
            "comment": DefenseComment
        }
        makePostRequest(ratingsLink, object)
    } else {
        let object = {
            "name": name,
            "rating": DefenseRating,
            "comment": DefenseComment            
        }
        getRatingsId();
        console.log("Updating pre-existing entry...");
        makePutRequest(ratingsLink + "/" + ratingsId, object);
    }
    document.getElementById("commentBox").value="";
}






function makeGetRequest(link, imagesOrRatings){
    req.open("GET", link);
    req.send();
    getOnLoad(imagesOrRatings);
}

function getOnLoad(imagesOrRatings) {
    req.onload = () => {
        if (req.status == 200 || req.status == 201) {
            console.log("GET Request successful for: " + imagesOrRatings);
        } 
        else {
            reject("GET Request failed for: " + imagesOrRatings);
        }
        data = JSON.parse(req.response);

        if (imagesOrRatings == "images") {
            imagesArray = data;
        } else if (imagesOrRatings == "ratings") {
            ratingsArray = data;
            setRatingAndComments();
            //makeGetRequest("http://localhost:9000/images", "images"); 
        } else {
            console.log("makeGetRequest(link, imagesOrRatings) should only take arguments of 'images' or 'ratings'");
        }
    }
}


function makePostRequest(link, obj) {
    req.open("POST", link);
    req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    req.send(JSON.stringify(obj));
    postOnLoad();
}

function postOnLoad() {
    req.onload = () => {
        if (req.status == 201 || req.status == 200) {
            console.log("req.status was: " + req.status);
            console.log("POST Request successful");
            makeGetRequest(ratingsLink, "ratings");
        } else {
            console.log("req.status was: " + req.status);
            console.log("POST Request failed");
        }
    }
}


function makeDeleteRequest(link) { 
    req.open("DELETE", link);
    req.send();
    deleteOnLoad()
}

function deleteOnLoad() {
    req.onload = () => {
        if (req.status == 201 || req.status == 200) {
            console.log("req.status was: " + req.status)
            console.log("DELETE Request successful")
            makeGetRequest(ratingsLink, "ratings");
        } else {
            console.log("req.status was: " + req.status);
            console.log("DELETE Request failed");
        }
    }
}


function makePutRequest(link, obj) {
    req.open("Put", link);
    req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    req.send(JSON.stringify(obj));
    putOnLoad();
}

function putOnLoad() {
    req.onload = () => {
        if (req.status == 201 || req.status == 200) {
            console.log("req.status was: " + req.status);
            console.log("PUT Request successful");
            makeGetRequest(ratingsLink, "ratings");
        } else {
            console.log("req.status was: " + req.status);
            console.log("PUT Request failed");
        }
    }
}