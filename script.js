function checkThala() {
    let number = document.getElementById('number').value;
    let digits = [];
    for (var i of String(number)) {
        digits.push(Number(i));
    }
    let sum = digits.reduce(function(a, b) { return parseInt(a) + parseInt(b); }, 0);
    if (sum == 7) {
        var sound = document.getElementsByTagName('audio')[0];
        sound.pause();
        sound.currentTime = 0;
        sound.play();
        confettiAnimation();
        Swal.fire({
            title: "Good job!",
            text: "Thala For A Reason!",
            html: '<video autoplay muted class="text-center"><source src="./assets/correct.mp4" type="video/mp4"></video>',
            showCloseButton: true,
            focusConfirm: false,
            confirmButtonText: '<i class="fa fa-thumbs-up"></i> Great!',
            confirmButtonAriaLabel: 'OK',
        });
    } else {
        Swal.fire({
            title: "Wrong!",
            text: "Not Thala For A Reason!",
            imageUrl: "./assets/wrong.png",
            imageWidth: 400,
            imageHeight: 250,
            imageAlt: "Not Thala"
        });
    }
}

function confettiAnimation() {
    let duration = 5 * 1000;
    let animationEnd = Date.now() + duration;
    let defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
    }

    let interval = setInterval(function() {
        let timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        let particleCount = 50 * (timeLeft / duration);
        // since particles fall down, start a bit higher than random
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
}