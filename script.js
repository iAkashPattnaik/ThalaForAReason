function checkThala() {
    let snippet = document.getElementById('snippet').value.trim();
    let sum = 0;
    if (is_numeric(snippet)) {
        let digits = [];
        for (var i of String(snippet)) {
            digits.push(Number(i));
        }
        sum = digits.reduce(function(a, b) { return parseInt(a) + parseInt(b); }, 0);
    } else {
        sum = snippet.length;
    }
    if (sum == 7) {
        var sound = document.getElementsByTagName('audio')[0];
        sound.pause();
        sound.currentTime = 0;
        sound.play();
        confettiAnimation();
        Swal.fire({
            title: "Good job!",
            text: "Thala For A Reason!",
            html: '<video autoplay muted loop class="text-center"><source src="./assets/correct.mp4" type="video/mp4"></video>',
            showCloseButton: true,
            focusConfirm: true,
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

function is_numeric(str){
    return /^\d+$/.test(str);
}

function share() {
    let snippet = document.getElementById('snippet').value.trim();
    let shareUrl = window.location.origin;
    if (snippet != '') {
        shareUrl = window.location.origin + `?s=${btoa(snippet)}`
    }
    navigator.clipboard.writeText(shareUrl);
    Swal.fire({
        title: "Success!",
        text: "Share Url has been copied to your clipboard!",
        showCloseButton: true,
        focusConfirm: true,
        confirmButtonText: '<i class="fa fa-thumbs-up"></i> Great!',
        confirmButtonAriaLabel: 'OK',
    });
}

// Run on page load
const urlParams = new URLSearchParams(window.location.search);
const entries = urlParams.entries();
const params = {};
for (entry of entries) {
    params[entry[0]] = entry[1];
}
if (params['s'] != undefined && params['s'] != '') {
    try {
        document.getElementById('snippet').value = atob(params['s']).trim();
    } catch (_) {
        // pass
    }
}