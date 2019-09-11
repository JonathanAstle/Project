const req = new XMLHttpRequest();
var imageFolder; // "C:\\Users\\Admin\\Documents\\Individual Project\\Chess openings\\Slav Defense\\";

var listOfRatings;

let name = "Slav Defense"
let slavDefenseRating; //undefined if not 
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

//returns true if the name exists in listOfRatings
function checkIfExists(name) {
    for (let row in listOfRatings) {
        if (listOfRatings[row].name == name) {
            return true;
            break;
        } 
    }
    return false;
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

function clickStarRating(a) {
    slavDefenseRating = a;
    for (let i=1; i<=5; i++) {
        if (i<=a) {
            document.getElementById("star"+i).className = "fa fa-star checked";
        } else {
            document.getElementById("star"+i).className = "fa fa-star";
        }
    }

    let id;
    //if it needs deleting
    if(a==0 && slavDefenseComment=="There are currently no comments for this opening.&emsp;&emsp;") {
        //find the id of what needs deleting 
        for (let row in listOfRatings) {
            if (listOfRatings[row].name = name) {
                id = listOfRatings[row].id
            }
        }
        // ... and then delete it
        makeDeleteRequest("http://localhost:9000/ratings/" + id)
    } else {
        let object;
        //if this opening isn't already in the table then make one and post it to API
        if (!checkIfExists(name)) {
            if (slavDefenseComment) {
                object = {
                    "name": name,
                    "rating": slavDefenseRating,
                    "comment": slavDefenseComment
                }
            } else { // ie. If the opening is already in the table
                object = {
                    "name": name,
                    "rating": slavDefenseRating,
                    "comment": "There are currently no comments for this opening.&emsp;&emsp;"
                }
            }
        } else {
            //This is where I update the currently existing entry with name = name
            console.log("This entry already exists (temporary message)");
        }

        //if there is something in the object
        if (object.name) {
                makePostRequest("http://localhost:9000/ratings", object);
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
    slavDefenseComment = "There are currently no comments for this opening.&emsp;&emsp;";
    let id;
    for (let row in listOfRatings) {
        if (listOfRatings[row].name == name) {
            id = listOfRatings[row].id
        }
    }
    if (slavDefenseRating == 0) {
        makeDeleteRequest("http://localhost:9000/ratings/" + id)
    }
}

function setComments(comment) {
    document.getElementById("comments paragraph").innerHTML=comment;
    slavDefenseComment = comment;
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
            "rating": slavDefenseRating,
            "comment": slavDefenseComment
        }
        makePostRequest("http://localhost:9000/ratings", object)
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
            console.log("GET Request successful for: " + imagesOrRatings);
        } 
        else {
            reject("GET Request failed for: " + imagesOrRatings);
        }
        data = JSON.parse(req.response);

        if (imagesOrRatings == "images") {
            imageFolder = data[10].imageLocation;
        } else if (imagesOrRatings == "ratings") {
            listOfRatings = data;
            setRatingAndComments();
            //imports images table from API
            makeGetRequest("http://localhost:9000/images", "images"); // http://localhost:9000/images
        } else {
            console.log("makeGetRequest(a) should only take arguments of 'images' or 'ratings'");
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
            makeGetRequest("http://localhost:9000/ratings", "ratings");
        } else {
            console.log("req.status was: " + req.status);
            console.log("POST Request failed");
        }
    }
}


function makeDeleteRequest(link) { // http://localhost:9000/ratings/*number here*
    req.open("DELETE", link);
    //req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    req.send();
    deleteOnLoad()
}

function deleteOnLoad() {
    req.onload = () => {
        if (req.status == 201 || req.status == 200) {
            console.log("req.status was: " + req.status)
            console.log("DELETE Request successful")
            makeGetRequest("http://localhost:9000/ratings", "ratings");
        } else {
            console.log("req.status was: " + req.status);
            console.log("DELETE Request failed");
        }
    }
}
