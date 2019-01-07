/*10 sample memes for demo purposes*/
var meme1 = {id: 1, tag1:"toothpaste", tag2:"vegetarian", tag3:"meat", img:"demoMemes/1.jpg"};
var meme2 = {id: 2, tag1:"traffic", tag2:"driving", tag3:"sunglasses", img:"demoMemes/2.jpg"};
var meme3 = {id: 3, tag1:"sex", tag2:"bug", tag3:"death", img:"demoMemes/3.jpg"};
var meme4 = {id: 4, tag1:"Trump", tag2:"bullying", tag3:"twitter", img:"demoMemes/4.png"};
var meme5 = {id: 5, tag1:"wizard", tag2:"swearing", tag3:"playstation", img:"demoMemes/5.jpg"};
var meme6 = {id: 6, tag1:"Computer Science", tag2:"Christmas", tag3:"single forever", img:"demoMemes/6.jpg"};
var meme7 = {id: 7, tag1:"wizard", tag2:"cursive", tag3:"demon", img:"demoMemes/7.jpg"};
var meme8 = {id: 8, tag1:"wizard", tag2:"Voldemort", tag3:"scar", img:"demoMemes/8.jpg"};
var meme9 = {id: 9, tag1:"stove", tag2:"food", tag3:"twitter", img:"demoMemes/9.jpg"};
var meme10 = {id: 10, tag1:"Trump", tag2:"twitter", tag3:"death", img:"demoMemes/10.jpg"};

//memes is an array of unfiltered meme objects
var memes = [meme1, meme2, meme3, meme4, meme5, meme6, meme7, meme8, meme9, meme10];

//triggers is an array of trigger strings
var triggers = [];

//showThese is an array of filtered meme objects
var showThese = [];

//for loading purposes
var loaded = false;

//index of meme currently being shown
var curMeme;

function getMemes(){
    if(triggers.length===0){
        showThese=memes;
    }else{
        for (i = 0; i<memes.length; i++) { 
            for(j=0; j<triggers.length; j++)
            {
                if(triggers[j]===memes[i].tag1){
                    j=triggers.length;
                }else if(triggers[j]===memes[i].tag2){
                    j=triggers.length;
                }else if(triggers[j]===memes[i].tag3){
                    j=triggers.length;
                }else{
                    if(j===(triggers.length-1)){
                        showThese.push(memes[i]);
                    }
                }
            }
        }
    }
}

function rightClick(){
    if(curMeme===((showThese.length)-1)){
        curMeme=0;
    }else{
        curMeme++;
    }
    displaymemes();
}

function leftClick(){
    if(curMeme===0){
        curMeme=((showThese.length)-1);
    }else{
        curMeme--;
    }
    displaymemes();
}

function displaymemes(){
    if(loaded===false){
        getMemes();
        loaded=true;
        curMeme=0;
    }
    closeViewTriggers();
    var showThis = showThese[curMeme];
    var cmeme = document.getElementById("currmeme")
    cmeme.src = showThis.img;
}

function openAddTriggers(){
    document.getElementById("addTrigs").hidden = false;
}

function openDelTriggers(){
    document.getElementById("delTrigs").hidden = false;
}

function openViewTriggers(){
    document.getElementById("vTrigs").hidden = false;
}

function closeAddTriggers(){
    document.getElementById("addTrigs").hidden = true;
}

function closeDelTriggers(){
    document.getElementById("delTrigs").hidden = true;
}

function closeViewTriggers(){
    document.getElementById("vTrigs").hidden = true;
}

function addTrigger(){
    var trig = document.getElementById("newTrig").value;
    trig.replace(/\s/g, "");
    trig = trig.toLowerCase();
    var trgLst = trig.split(",")
    for(var i=0; i<trgLst.length; i++){
        triggers.push(trgLst[i]);
    }
    if(triggers.includes("green")){
            document.body.style.backgroundColor = "#f9f9f9";
    }
    fillTriggerList();
    document.getElementById("newTrig").value = "";
}

function removeTrigger(){
    var trig = document.getElementById("oldTrig").value;
    trig.replace(/\s/g, "");
    trig = trig.toLowerCase();
    var rmvLst = trig.split(",")
    for(i=0;i<triggers.length; i++){
        for(j=0; j<rmvLst.length; j++){
            if(triggers[i]===rmvLst[j]){
                triggers.splice(i,1);
            }
        }
    }
    if(rmvLst.includes("green")){
            document.body.style.backgroundColor = "#e2ffe9";
    }
    fillTriggerList();
    document.getElementById("oldTrig").value = "";
}

function openImgTriggers(){
    var tags = [showThis.tag1, showThis.tag2, showThis.tag3];
    var tagspot = document.getElementById("tags")
    tagspot.value = tags.toString();
    document.getElementById("tagspopup").hidden = false;
}

function closeImgTriggers(){
    document.getElementById("tagspopup").hidden = true;
}

//updates trigger list text area box on triggers.html
function fillTriggerList(){
    var tl = triggers.toString();
    document.getElementById("triggerList").value=tl;
}

document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;
    if (e.keyCode == '37') {
       leftClick();
    }
    else if (e.keyCode == '39') {
       rightClick();
    }

}

window.onload = function() {
    if(localStorage.getItem("Triggers")!==null){
        triggers = JSON.parse(localStorage.getItem("Triggers"));
        if(triggers.includes("green")){
            document.body.style.backgroundColor = "#f9f9f9";
        }
    }else{
        triggers = [];
    }
    displaymemes();
    fillTriggerList();
};

window.onunload = function() {
    localStorage.setItem("Triggers", JSON.stringify(triggers));
};
