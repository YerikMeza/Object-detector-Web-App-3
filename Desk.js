img = "";
status = "";
objects = [];

function preload() {
   img = loadImage("Desk.jpg");
}

function setup() {
    canvas = createCanvas(650, 500);
    canvas.center();

    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects"
}

function modelLoaded() {
    console.log("Model Loaded");
    status = true;
    objectDetector.detect(img, gotResult)
}

function gotResult(error, results) {
    if (error) 
    {
      console.error(error);
    }
    else 
    {
        console.log(results);
        objects = results;
    }
}

function draw() {
    image(img, 0, 0, 650, 500);

    if (status != "") 
    {
        for (i = 0; i < objects.length; i++) 
        {
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            fill("red");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("red");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}