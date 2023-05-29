import { BgNightStates } from "./states.constants";


function riveObjects() {
    const $loadingContainer = document.getElementById("loading-container");
    const $allContent = document.getElementById("view");

    const loading = new rive.Rive({
        src: "./animations/loading.riv",
        canvas: document.getElementById("loading"),
        autoplay: true,
        layout: new rive.Layout({ fit: "cover" }),
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

    const bgNight = new rive.Rive({
        src: "./animations/bg-night.riv",
        canvas: document.getElementById("bg-night"),
        autoplay: true,
        layout: new rive.Layout({ fit: "cover" }),
        onLoad: () => {
            bgNight.play(BgNightStates.MAIN);
            bgNight.resizeDrawingSurfaceToCanvas();
            setInterval(() => {
                bgNight.play(BgNightStates.SHOOTING);
            }, 10700);
        },
    });
}


function init() {
    riveObjects();
}

document.addEventListener("DOMContentLoaded", function (event) {
    init();
});
