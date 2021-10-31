objects = [];
status = "";

function setup() {
    canvas = createCanvas(370, 370);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    
  
   
  
  }

function START() {
    objectDetector = ml5.objectDetector("cocossd",modelloaded);
    userInput = document.getElementById("nameofobject").value; 

}
  
  function draw() {
    image(video,0,0,370,370);
    if(status != "") {
      objectDetector.detect(video,gotresult);
      r = random(255);
      g = random(255);
      b = random(255);
      for(i = 0; i < objects.length; i++) {
            document.getElementById("showstatus").innerHTML = "Status : Object Detected";
            fill("red");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%" , objects[i].x + 15 , objects[i].y + 15 );
            noFill();
            stroke("red");
            rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);
            if(userInput == objects[i].label) {
              console.log(userInput);
              document.getElementById("sohwnumberofobjects").innerHTML = "Object Found";
              var Synth = window.speechSynthesis;
              var utterThis = new SpeechSynthesisUtterance(userInput + " Found");
              Synth.speak(utterThis);
            }
            
        }
    }
    
  }
  
  function modelloaded() {
    console.log("Model is loaded!@#$%^&*()");
    status = true;


  }
  
  function gotresult(error,results) {
    if(error) {
      console.error(error);
    }
  
    else{
      console.log(results);
      objects = results;
    }
}