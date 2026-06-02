import {BgNightStates} from "./scripts/states.constants.js";


let loading;
let bgNight;


function riveObjects() {
    const $loadingContainer = document.getElementById("loading-container");
    const $allContent = document.getElementById("view");

    loading = new rive.Rive({
        src: "./assets/animations/loading.riv",
        canvas: document.getElementById("loading"),
        autoplay: true,
        layout: new rive.Layout({fit: "cover"}),
        onLoad: () => {
            loading.resizeDrawingSurfaceToCanvas();
            loading.play();
            setTimeout(() => {
                $allContent.classList.remove("opacity-0");
                $loadingContainer.className = "disabled";
                loading.pause();
            }, 1800);
        },
    });

    bgNight = new rive.Rive({
        src: "./assets/animations/bg-night.riv",
        canvas: document.getElementById("bg-night"),
        autoplay: true,
        layout: new rive.Layout({fit: "cover"}),
        onLoad: () => {
            bgNight.play(BgNightStates.MAIN);
            bgNight.resizeDrawingSurfaceToCanvas();
            setInterval(() => {
                bgNight.play(BgNightStates.SHOOTING);
            }, 10700);
        },
    });

}


function resizeCanvas(element, riveInstance) {
    const canvas = document.getElementById(element);

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    window.addEventListener('resize', () => {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        riveInstance.resizeDrawingSurfaceToCanvas();
    });
}


function init() {
    riveObjects();
    resizeCanvas("bg-night", bgNight);
    resizeCanvas("loading", loading);
}

document.addEventListener("DOMContentLoaded", function (event) {
    init();
});
