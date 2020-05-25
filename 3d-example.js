let modelObj; // setup initializes this to a p5.js 3D model
let sensorData;

function preload() {
    modelObj = loadModel('models/bat.obj', true);
}

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    imuConnection.onSensorData((device) => {
        sensorData = device.data;
    });
}

function draw() {
    background(200, 200, 212);
    noStroke();
    lights();
    orbitControl();

    if (!sensorData) {
        return;
    }

    applyMatrix.apply(null, sensorData.orientationMatrix);

    // Fade the model out, if the sensor data is stale
    let currentTime = new Date();
    let age = max(0, currentTime - sensorData.receivedAt - 250);
    let alpha = max(5, 255 - age / 10);
    fill(255, 255, 255, alpha);

    // Render the model
    noStroke();
    model(modelObj);
}

let ballX, ballY;
let ballAlpha = 255;
let ballDia = 30

function setup() {
  createCanvas(400, 400);
  background(220);

  ballX = random(width);
  ballY = random(height);
}

function draw() {
  background(0);

  // fade out
  if (ballAlpha > 0) {
    ballAlpha = ballAlpha - 2; // feel free to change "2"
  } else {
    ballAlpha = 0;
  }

  // increase the ball size
  ballDia += 0.2;

  // display the ball
  noStroke();
  fill(255, ballAlpha);
  ellipse(ballX, ballY, ballDia, ballDia);

  // the ball reappears after 5 sec
  if (frameCount % (60*5) == 0) {
    ballX = random(width);
    ballY = random(height);
    ballAlpha = 255;
    ballDia = 1;
  }
}
