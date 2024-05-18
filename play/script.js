var ball = document.getElementById("ball");
var fuelBar = document.getElementById("fuelBar");
var killbrick = document.querySelector(".killbrick");
var screenWidth = window.innerWidth;
var screenHeight = window.innerHeight;
var startPosX = 0;
var startPosY = 0;
var posX = 0;
var posY = 0;
var velocityX = 0;
var velocityY = 0;
var isJumping = false;
var isFlying = false;
var fuel = 100;
var maxFuel = 100;
var fuelConsumptionRate = 1;
var teleportCooldown = 10000; // 10 seconds cooldown
var lastTeleportTime = 0;

var moveSpeed = 5;
var gravity = -0.5;
var jumpForce = 5;

function update() {
    if (!isFlying) {
        velocityY += gravity;
    }

    posX += velocityX;
    posY += velocityY;

    ball.style.left = posX + "px";
    ball.style.bottom = posY + "px";

    if (posY <= 0) {
        isJumping = false;
        velocityY = 0;
        posY = 0;
    } else if (posY <= 100 && posX + 25 >= killbrick.offsetLeft && posX <= killbrick.offsetLeft + 200) {
        respawn();
    }

    if (posX < 0) {
        posX = 0;
    } else if (posX > screenWidth - 50) {
        posX = screenWidth - 50;
    }

    fuelBar.style.width = fuel + "%";

    if (!isFlying && fuel < maxFuel) {
        fuel += 0.1;
        if (fuel > maxFuel) {
            fuel = maxFuel;
        }
    }

    requestAnimationFrame(update);
}

update();

document.addEventListener("keydown", function (event) {
    if (event.key === "w" && !isJumping && fuel > 0) {
        if (!isFlying) {
            velocityY = jumpForce;
            isJumping = true;
        }
        isFlying = true;
    } else if (event.key === "a") {
        velocityX = -moveSpeed;
    } else if (event.key === "d") {
        velocityX = moveSpeed;
    }
});

document.addEventListener("keyup", function (event) {
    if (event.key === "w") {
        isFlying = false;
    } else if (event.key === "a" || event.key === "d") {
        velocityX = 0;
    }
});

function consumeFuel() {
    if (isFlying && fuel > 0) {
        fuel -= fuelConsumptionRate;
        if (fuel < 0) {
            fuel = 0;
        }
    }
    setTimeout(consumeFuel, 100);
}
consumeFuel();

function respawn() {
    posX = startPosX;
    posY = startPosY;
    fuel = maxFuel;
}

startPosX = posX;
startPosY = posY;

// Handle teleportation on left mouse click
document.addEventListener("click", function (event) {
    var currentTime = new Date().getTime();
    if (event.button === 0 && currentTime - lastTeleportTime >= teleportCooldown) { // Left mouse button clicked and cooldown elapsed
        lastTeleportTime = currentTime;
        // Teleport forward
        posX += 500; // Change the value as needed
        ball.style.left = posX + "px";
    }
});
