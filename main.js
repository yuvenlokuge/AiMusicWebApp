song1 = "";
song2 = "";
rightwristx = 0;
rightwristy = 0;
leftwristx = 0;
leftwristy = 0;
score_leftwrist = 0
score_rightwrist = 0;
song1_status = "";
song2_status = "";



function preload() {
    song1 = loadSound("Lil.mp3")
    song2 = loadSound("spinnin.mp3")

}

function setup() {
    canvas = createCanvas(600, 500)
    canvas.center()
    video = createCapture(VIDEO)
    video.hide()
    poseNet = ml5.poseNet(video, modelLoaded)
    poseNet.on("pose", gotPoses)
}


function modelLoaded() {
    console.log("poseNet started working")
}

function gotPoses(result) {
    if (result.length > 0) {
        leftwristx = result[0].pose.leftWrist.x
        leftwristy = result[0].pose.leftWrist.y
        rightwristx = result[0].pose.rightWrist.x
        rightwristy = result[0].pose.rightWrist.y
        score_leftwrist = result[0].pose.keypoints[9].score
        score_rightwrist = result[0].pose.keypoints[10].score

    }
}
function draw() {

    image(video, 0, 0, 600, 500)
    song1_status = song1.isPlaying()
    song2_status = song2.isPlaying()
    fill("blueviolet")
    stroke("blueviolet")
    if (score_rightwrist > 0.2) {
        circle(rightwristx, rightwristy, 20)
        song2.stop()
        if (song1_status == false) {
            song1.play()
            document.getElementById("song").innerHTML = "playing Lil uzi 20 min"

        }
    }
        if(score_leftwrist>0.2){
            circle(leftwristx,leftwristy,20)
            song1.stop()
            if(song2_status == false){
                song2.play()
                document.getElementById("song").innerHTML = "playing conner price spinnin"
            }
        }
}