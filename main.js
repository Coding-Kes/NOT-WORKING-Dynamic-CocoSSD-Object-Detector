
video = "";
status = "";
objects = [];
alertSound = "";

function preload()
{
    alertSound = loadSound("Panic_Sound.mp3");
}


function setup()
{
    canvas = createCanvas(620, 480);
    canvas.center();

    video = createCapture(VIDEO);
    video.size(620, 480);
    video.hide();

    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function draw()
{
    image(video, 0, 0, 620, 480);

    if(status != "")
    {
        r = random(255);
        g = random(255);
        b = random(255);
        
        objectDetector.detect(video, gotResults);

        for(i = 0; i < objects.length; i++)
        {
            document.getElementById("baby_status").innerHTML = "Baby Status: Not Found";

            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label +" "+ percent+"%", objects[i].x +15, objects[i].y +15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            strokeWeight(2);

            if(objects[i].label == "person")
            {
                document.getElementById("baby_staus").innerHTML = "Baby Status: Found";

                alertSound.stop();
            }
            else
            {
                document.getElementById("baby_status").innerHTML = "Baby Status: Not Found";

                alertSound.play();
            }
        }
        if(objects[i].length = 0)
        {
            document.getElementById("baby_status").innerHTML = "Baby Status: Not Found";

            alertSound.play();
        }
    }
}

function modelLoaded()
{
    console.log("Model Loaded");
    status = true;
}

function gotResults(error, results)
{
    if(error)
    {
        console.error();
    }
    else
    {
        console.log(results);
        objects = results;
    }
}











