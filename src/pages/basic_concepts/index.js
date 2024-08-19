import {
    ArrowMachine,
    ArrowMorphStates,
    Ball0States,
    Ball1States,
    Ball2States,
    StarsMachine,
    StarsStates,
    NutStates,
} from "../../scripts/states.constants.js";


function riveObjects() {
    const $loadingContainer = document.getElementById("loading-container");
    const $allContent = document.getElementById("view");
    const $btnArrowBack = document.getElementById("arrow-back");
    const $btnGreen = document.getElementById("btn-green");
    const $btnPurple = document.getElementById("btn-purple");
    const $btnBlue = document.getElementById("btn-blue");
    const $popup = document.getElementById("popup");

    const loading = new rive.Rive({
        src: "/rive-animation-base-project/animations/loading.riv",
        canvas: document.getElementById("loading"),
        autoplay: true,
        layout: new rive.Layout({ fit: "cover" }),
        onLoad: () => {
            loading.play();
            loading.resizeDrawingSurfaceToCanvas();
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
        layout: new rive.Layout({ fit: rive.Fit.Fill }),
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

    const ball0Rive = new rive.Rive({
        src: "/rive-animation-base-project/animations/ball_0.riv",
        canvas: document.getElementById("ball-0-green"),
        autoplay: true,
        animations: Ball0States.SQUASH,
        layout: new rive.Layout({ fit: "cover", alignment: "center" }),
        onLoad: () => {
            $btnGreen.onclick = () => {
                if (ball0Rive.playingAnimationNames.includes(Ball0States.SQUASH)) {
                    ball0Rive.stop(Ball0States.SQUASH);
                    ball0Rive.play(Ball0States.FINAL);
                } else if (
                    ball0Rive.playingAnimationNames.includes(Ball0States.FINAL)
                ) {
                    ball0Rive.stop(Ball0States.FINAL);
                    ball0Rive.play(Ball0States.EASEINOUT);
                } else if (
                    ball0Rive.playingAnimationNames.includes(Ball0States.EASEINOUT)
                ) {
                    ball0Rive.stop(Ball0States.EASEINOUT);
                    ball0Rive.play(Ball0States.LINEAR);
                } else {
                    ball0Rive.stop(Ball0States.LINEAR);
                    ball0Rive.play(Ball0States.SQUASH);
                }
            };
        },
    });

    const ball1Rive = new rive.Rive({
        src: "/rive-animation-base-project/animations/ball_1.riv",
        canvas: document.getElementById("ball-1-purple"),
        autoplay: true,
        layout: new rive.Layout({ fit: "cover", alignment: "center" }),
        onLoad: () => {
            $btnPurple.onclick = () => {
                if (ball1Rive.playingAnimationNames.includes(Ball1States.SQUASH)) {
                    ball1Rive.stop(Ball1States.SQUASH);
                    ball1Rive.play(Ball1States.EASEINOUT);
                } else if (
                    ball1Rive.playingAnimationNames.includes(Ball1States.EASEINOUT)
                ) {
                    ball1Rive.stop(Ball1States.EASEINOUT);
                    ball1Rive.play(Ball1States.LINEAR);
                } else {
                    ball1Rive.stop(Ball1States.LINEAR);
                    ball1Rive.play(Ball1States.SQUASH);
                }
            };
        },
    });

    const ball2Rive = new rive.Rive({
        src: "/rive-animation-base-project/animations/ball_2.riv",
        canvas: document.getElementById("ball-2-blue"),
        autoplay: true,
        layout: new rive.Layout({ fit: "cover", alignment: "center" }),
        onLoad: () => {
            $btnBlue.onclick = () => {
                ball2Rive.isPlaying
                    ? ball2Rive.pause(Ball2States.SQUASH)
                    : ball2Rive.play(Ball2States.SQUASH);
            };
        },
        onPlay: () => {
            ball2Rive.isActive = true;
        },
        onPause: () => {
            ball2Rive.isActive = false;
        },
    });

    const stars = new rive.Rive({
        src: "/rive-animation-base-project/animations/stars.riv",
        canvas: document.getElementById("stars"),
        autoplay: true,
        layout: new rive.Layout({ fit: "cover" }),
        stateMachines: StarsMachine.DEFAULT,
        onStateChange: (event) => {
            if (event.data.includes(StarsStates.FIVESTARS)) {
                $popup.className += " show-popup-container";
                setTimeout(() => {
                    stars.pause();
                }, 500);
                setTimeout(() => {
                    $popup.className += " close-popup-container";
                }, 4000);
            }
        },
    });

    const nutGreen = new rive.Rive({
        src: "/rive-animation-base-project/animations/nut.riv",
        canvas: document.getElementById("nut-green"),
        autoplay: true,
        layout: new rive.Layout({ fit: "cover", alignment: "center" }),
        onLoad: () => {
            $btnGreen.onmouseenter = () => {
                nutGreen.play(NutStates.HOVER);
            };
            $btnGreen.onmouseleave = () => {
                nutGreen.pause(NutStates.HOVER);
                nutGreen.play(NutStates.IDLE);
            };
        },
    });

    const nutPurple = new rive.Rive({
        src: "/rive-animation-base-project/animations/nut.riv",
        canvas: document.getElementById("nut-purple"),
        autoplay: true,
        layout: new rive.Layout({ fit: "cover", alignment: "center" }),
        onLoad: () => {
            $btnPurple.onmouseenter = () => {
                nutPurple.play(NutStates.HOVER);
            };
            $btnPurple.onmouseleave = () => {
                nutPurple.pause(NutStates.HOVER);
                nutPurple.play(NutStates.IDLE);
            };
        },
    });

    const nutBlue = new rive.Rive({
        src: "/rive-animation-base-project/animations/nut.riv",
        canvas: document.getElementById("nut-blue"),
        autoplay: true,
        layout: new rive.Layout({ fit: "cover", alignment: "center" }),
        onLoad: () => {
            $btnBlue.onmouseenter = () => {
                nutBlue.play(NutStates.HOVER);
            };
            $btnBlue.onmouseleave = () => {
                nutBlue.pause(NutStates.HOVER);
                nutBlue.play(NutStates.IDLE);
            };
        },
    });
}


function init() {
    riveObjects();
}

document.addEventListener("DOMContentLoaded", function (event) {
    init();
});
