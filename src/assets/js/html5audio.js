function onError(error) {
    //console.log(error.message);
}

function onConfirmRetry(button) {
    if (button == 1) {
        html5audio.play();
    }
}

function pad2(number) {
    return (number < 10 ? '0' : '') + number
}

var myaudioURL = 'assets/audio/music-loop.mp3';
var myaudio = new Audio(myaudioURL);
var isPlaying = false;
var readyStateInterval = null;

var html5audio = {
    play: function () {
        isPlaying = true;
        myaudio.play();

        readyStateInterval = setInterval(function () {
            if (myaudio.readyState <= 2) {
                // loading
            }
        }, 1000);
        myaudio.addEventListener("timeupdate", function () {
            var s = parseInt(myaudio.currentTime % 60);
            var m = parseInt((myaudio.currentTime / 60) % 60);
            var h = parseInt(((myaudio.currentTime / 60) / 60) % 60);
            if (isPlaying && myaudio.currentTime > 0) {
                //textPosition.innerHTML = pad2(h) + ':' + pad2(m) + ':' + pad2(s);
            }
        }, false);
        myaudio.addEventListener("error", function () {
            //console.log('myaudio ERROR');
        }, false);
        myaudio.addEventListener("canplay", function () {
            //console.log('myaudio CAN PLAY');
        }, false);
        myaudio.addEventListener("waiting", function () {
            //console.log('myaudio WAITING');
            isPlaying = false;
        }, false);
        myaudio.addEventListener("playing", function () {
            isPlaying = true;
        }, false);
        myaudio.addEventListener("ended", function () {
            //console.log('myaudio ENDED');
            html5audio.currentTime = 0;
            html5audio.play();
            // navigator.notification.alert('Streaming failed. Possibly due to a network error.', null, 'Stream error', 'OK');
            // navigator.notification.confirm(
            //	'Streaming failed. Possibly due to a network error.', // message
            //	onConfirmRetry,	// callback to invoke with index of button pressed
            //	'Stream error',	// title
            //	'Retry,OK'		// buttonLabels
            // );
            /*if (window.confirm('Streaming failed. Possibly due to a network error. Retry?')) {
                onConfirmRetry();
            }*/
        }, false);
    },
    pause: function () {
        isPlaying = false;
        clearInterval(readyStateInterval);
        myaudio.pause();
    },
    stop: function () {
        isPlaying = false;
        clearInterval(readyStateInterval);
        myaudio.pause();
        myaudio = null;
        myaudio = new Audio(myaudioURL);
    }
};
