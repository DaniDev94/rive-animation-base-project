import {
    ArrowMachine,
    ArrowMorphStates
} from "../../scripts/states.constants.js";

let isButtonAnimationClicked = false;

function globalRiveObjects() {
    const $loadingContainer = document.getElementById("loading-container");
    const $allContent = document.getElementById("view");
    const $btnArrowBack = document.getElementById("arrow-back");

    const loading = new rive.Rive({
        src: "/rive-animation-base-project/animations/loading.riv",
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

    const arrowBack = new rive.Rive({
        src: "/rive-animation-base-project/animations/arrow-back.riv",
        canvas: $btnArrowBack,
        autoplay: true,
        stateMachines: ArrowMachine.MORPH,
        layout: new rive.Layout({fit: rive.Fit.Fill}),
        onLoad: () => {
            arrowBack.resizeDrawingSurfaceToCanvas();
            const inputs = arrowBack.stateMachineInputs(ArrowMachine.MORPH);
            const toArrowTrigger = inputs.find(
                (input) => input.name === ArrowMorphStates.TOARROW
            );
            const toMenuTrigger = inputs.find(
                (input) => input.name === ArrowMorphStates.TOMENU
            );
            $btnArrowBack.onmouseenter = () => toArrowTrigger.fire();
            $btnArrowBack.onmouseleave = () => toMenuTrigger.fire();
        },
        onStateChange: (event) => {
            if (event.data[0].includes(ArrowMorphStates.ASARROW)) {
                $btnArrowBack.classList.remove("idle");
                $btnArrowBack.classList.add("active");
                if ($btnArrowBack.classList.value == "active") {
                    $btnArrowBack.addEventListener("click", function (event) {
                        event.preventDefault();
                        window.location.assign(location.origin + "/rive-animation-base-project/");
                    });
                }
            } else if (event.data[0].includes(ArrowMorphStates.TOMENU)) {
                $btnArrowBack.classList.remove("active");
                $btnArrowBack.classList.add("idle");
            }
        },
    });
}


function mainRiveObject() {
    const $streakSaver = document.getElementById("streak-saver-front-db");

    const streakSaver = new rive.Rive({
        src: "/rive-animation-base-project/animations/gamificacion_salvarachas_front_db.riv",
        canvas: $streakSaver,
        autoplay: true,
        autoBind: true,
        artboard: "GamificacionFlotadorMain",
        stateMachines: "StateMachine",
        onLoad: () => {
            streakSaver.resizeDrawingSurfaceToCanvas();
        },
    });
}

function startRiveCountAnimation() {
    const $buttonAnimation = document.getElementsByClassName("button-animation-start")[0];
    const countdownSound = new Audio('/sounds/countdown.mp3');
    const whooshSound = new Audio('/sounds/whoosh.mp3');
    let count = 5;

    $buttonAnimation.classList.add("button-animation-clicked");
    mainRiveObject();

    const countInterval = setInterval(() => {
        $buttonAnimation.classList.add("font-4");
        $buttonAnimation.innerHTML = `${count}`;
        countdownSound.play();
        count--;

        if (count < 0) {
            clearInterval(countInterval);
            $buttonAnimation.classList.add("scale-out-center");
            countdownSound.pause();
            whooshSound.play();
        }
    }, 1000)
}


function handleStreakSaverAnimation() {
    const $buttonAnimation = document.getElementsByClassName("button-animation-start")[0];
    $buttonAnimation.addEventListener("click", () => {
        if (!isButtonAnimationClicked) {
            console.log('esto')
            startRiveCountAnimation();
        }
        isButtonAnimationClicked = true;
    });
}

function init() {
    globalRiveObjects();
    handleStreakSaverAnimation();

}

document.addEventListener("DOMContentLoaded", function (event) {
    init();
});
