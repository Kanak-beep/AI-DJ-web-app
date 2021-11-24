song = "";
scoreLeftWrist = 0;
LeftWristX = 0;
LeftWristY = 0;
RightWristX = 0;
RightWristY = 0;

function preload()
{
    song = loadSound("music.mp3");
}

function setup() {
    video = createCapture(VIDEO);
    video.size(600,500);

    canvas = creteCanvas(600, 500);
    canvas.position(560, 150);

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('PoseNet Is Initialized');
}
function draw() {
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("#FF0000");
    if(scoreRightWrist > 0.2)
    {


    circle(RightWristX, RightWristY, 20);

    if(RightWristY > 0 && RightWristY <= 100)
    {
        document.getElementById("speed").innerHTML = "Speed = 0.5x";
        song.createCanvas(0.5);
    }
    else if(RightWristY > 100 && RightWristY <= 200)
    {
        document.getElementById("speed").innerHTML = "Speed = 1x";
        song.rate(1);
    }
    else if(RightWristY > 100 && RightWristY <= 300)
    {
        document.getElementById("speed").innerHTML = "Speed = 1.5x";
        song.rate(1.5);
    }
    else if(RightWristY > 100 && RightWristY <= 400)
    {
        document.getElementById("speed").innerHTML = "Speed = 2x";
        song.rate(2);
    }
    else if(RightWristY > 100 && RightWristY <= 500)
    {
        document.getElementById("speed").innerHTML = "Speed = 2.5x";
        song.rate(2.5);
    }
    }
    if(scoreLeftWrist > 0.2)
    {
    circle(LeftWristX, LeftWristY, 20);
    InNumberleftWristY = Number(LeftWristY);
    remove_decimals = floor(InNumberleftWristY);
    volume = remove_decimals/500;
    document.getElementById("volume").innerHTML = "Volume = " + volume;
    song.setVolume(volume);

}
}

function play()
{
    song.play();
    song.setVolume(1);
    song.createCanvas(1);

}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist +"scoreRightWrist = "+ scoreRightWrist);

        LeftWristX = results[0].pose.LeftWrist.x;
        LeftWristY = results[0].pose.LeftWrist.y;
        console.log("leftWristX = " + LeftWristX + "leftWristY = " + LeftWristY);

        RightWristX = results[0].pose.LeftWrist.x;
        RightWristY = results[0].pose.LeftWrist.y;
        console.log("rightWristX = " + RightWristX + "rightWristY = " + RightWristY);
    }
}
