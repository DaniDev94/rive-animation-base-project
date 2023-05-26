import {
    ArrowMachine,
    ArrowMorphStates,
    EmojiMachine,
    EmojiBasicosStates,
    BallMachine,
    BallButtonMachine,
    BallButtonStates
} from "../../states.constants.js";

function riveObjects() {
    const $loadingContainer = document.getElementById("loading-container");
    const $allContent = document.getElementById("view");
    const $btnArrowBack = document.getElementById("arrow-back");
    const $btnYellow = document.getElementById("btn-yellow");
    const $btnViolet = document.getElementById("btn-violet");
    const $btnLeft = document.getElementById("ball-button-left");
    const $btnRight = document.getElementById("ball-button-right");

    const loading = new rive.Rive({
        src: "/animations/loading.riv",
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

    const arrowBack = new rive.Rive({
        src: "/animations/arrow-back.riv",
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
            $btnArrowBack.onmouseout = () => toMenuTrigger.fire();
        },
        onStateChange: (event) => {
            if (event.data[0].includes(ArrowMorphStates.ASARROW)) {
                $btnArrowBack.classList.remove("idle");
                $btnArrowBack.classList.add("active");
                if ($btnArrowBack.classList.value == "active") {
                    $btnArrowBack.addEventListener("click", function (event) {
                        event.preventDefault();
                        window.location.assign(location.origin + "/");
                    });
                }
            } else if (event.data[0].includes(ArrowMorphStates.TOMENU)) {
                $btnArrowBack.classList.remove("active");
                $btnArrowBack.classList.add("idle");
            }
        },
    });

    const emoji = new rive.Rive({
        src: "/animations/emoji.riv",
        canvas: document.getElementById("emoji"),
        autoplay: true,
        stateMachines: EmojiMachine.BASIC,
        layout: new rive.Layout({ fit: rive.Fit.Fill }),
        onLoad: () => {
            emoji.resizeDrawingSurfaceToCanvas();
            const inputs = emoji.stateMachineInputs(EmojiMachine.BASIC);
            const indifferentTrigger = inputs.find(
                (i) => i.name === EmojiBasicosStates.INDIFFERENT
            );
            const colorBoolean = inputs.find(
                (i) => i.name === EmojiBasicosStates.ISYELLOW
            );
            colorBoolean.count = 0;
            if (colorBoolean.count === 0) {
                $btnYellow.classList.add("disabled-button-yellow");
            }
            $btnYellow.onclick = () => {
                $btnViolet.classList.remove("disabled-button-violet");
                colorBoolean.value = true;
                colorBoolean.count++;
                if (colorBoolean.count > 1) {
                    indifferentTrigger.fire();
                    $btnYellow.classList.add("disabled-button-yellow");
                    colorBoolean.count = 0;
                }
            };
            $btnViolet.onclick = () => {
                $btnYellow.classList.remove("disabled-button-yellow");
                colorBoolean.value = false;
                colorBoolean.count++;
                if (colorBoolean.count > 1) {
                    indifferentTrigger.fire(),
                        $btnViolet.classList.add("disabled-button-violet");
                    colorBoolean.count = 0;
                }
            };
        },
    });

    const ball = new rive.Rive({
        src: "/animations/ball-state-machine.riv",
        canvas: document.getElementById("ball"),
        autoplay: true,
        layout: new rive.Layout({ fit: rive.Fit.Fill }),
        stateMachines: BallMachine.DEFAULT,
        onLoad: () => {
            ball.resizeDrawingSurfaceToCanvas();
            initializeBallButtons();
        },
    });

    const initializeBallButtons = () => {
        const ballButtonLeft = new rive.Rive({
            src: "/animations/btn-ball.riv",
            canvas: document.getElementById("btn-left"),
            autoplay: false,
            layout: new rive.Layout({ fit: rive.Fit.Fill }),
            animations: BallButtonStates.NORMAL,
            onLoad: () => {
                const inputs = ball.stateMachineInputs(BallButtonMachine.DEFAULT);
                const nivelNumber = inputs.find((i) => {
                    return i.name === BallButtonStates.LEVEL;
                });
                if (nivelNumber.value === 0) {
                    $btnLeft.classList.add("disalble-btn");
                }
                $btnLeft.classList.add("animate__animated", "animate__pulse");
                ballButtonLeft.resizeDrawingSurfaceToCanvas();
                $btnLeft.onmouseenter = () => {
                    $btnLeft.classList.remove("animate__animated", "animate__pulse");
                    ballButtonLeft.pause(BallButtonStates.NORMAL);
                    ballButtonLeft.play(BallButtonStates.HOVER);
                };
                $btnLeft.onmouseout = () => {
                    $btnLeft.classList.add("animate__animated", "animate__pulse");
                    ballButtonLeft.stop(BallButtonStates.HOVER);
                    ballButtonLeft.play(BallButtonStates.NORMAL);
                };
                $btnLeft.onclick = () => {
                    ballButtonLeft.pause(BallButtonStates.HOVER);
                    ballButtonLeft.play(BallButtonStates.PRESSED);
                    // Ball animation controller ------------------>
                    nivelNumber.value--;
                    if (nivelNumber.value === 0) {
                        $btnLeft.classList.remove("enable-btn");
                        $btnLeft.classList.add("disalble-btn");
                        $btnRight.classList.remove("disalble-btn");
                        $btnRight.classList.add("enable-btn");
                    }
                    if (nivelNumber.value < 3) {
                        $btnRight.classList.remove("disalble-btn");
                        $btnRight.classList.add("enable-btn");
                        ballButtonRight.play(BallButtonStates.NORMAL);
                    }
                };
            },
            onPlay: (e) => {
                if (e.data[0] === BallButtonStates.PRESSED) {
                    setTimeout(() => {
                        ballButtonLeft.pause(BallButtonStates.PRESSED);
                    }, 200);
                }
            },
            onPause: (e) => {
                if (e.data.includes(BallButtonStates.PRESSED)) {
                    ballButtonLeft.play(BallButtonStates.HOVER);
                }
            },
        });

        const ballButtonRight = new rive.Rive({
            src: "/animations/btn-ball.riv",
            canvas: document.getElementById("btn-right"),
            autoplay: false,
            layout: new rive.Layout({ fit: rive.Fit.Fill }),
            animations: BallButtonStates.NORMAL,
            onLoad: () => {
                const inputs = ball.stateMachineInputs("StateMachine");
                const nivelNumber = inputs.find((i) => {
                    return i.name === BallButtonStates.LEVEL;
                });
                $btnRight.classList.add("animate__animated", "animate__pulse");
                ballButtonRight.resizeDrawingSurfaceToCanvas();
                $btnRight.onmouseenter = () => {
                    $btnRight.classList.remove("animate__animated", "animate__pulse");
                    ballButtonRight.pause(BallButtonStates.NORMAL);
                    ballButtonRight.play(BallButtonStates.HOVER);
                };
                $btnRight.onmouseout = () => {
                    $btnRight.classList.add("animate__animated", "animate__pulse");
                    ballButtonRight.stop(BallButtonStates.HOVER);
                    ballButtonRight.play(BallButtonStates.NORMAL);
                };
                $btnRight.onclick = () => {
                    ballButtonRight.pause(BallButtonStates.HOVER);
                    ballButtonRight.play(BallButtonStates.PRESSED);
                    // Ball animation controller ------------------>
                    nivelNumber.value++;
                    if (nivelNumber.value > 0) {
                        $btnLeft.classList.remove("disalble-btn");
                        $btnLeft.classList.add("enable-btn");
                        ballButtonLeft.play(BallButtonStates.NORMAL);
                    }
                    if (nivelNumber.value === 3) {
                        $btnRight.classList.remove("enable-btn");
                        $btnRight.classList.add("disalble-btn");
                        $btnLeft.classList.remove("disalble-btn");
                        $btnLeft.classList.add("enable-btn");
                    }
                };
            },
            onPlay: (e) => {
                if (e.data[0] === BallButtonStates.PRESSED) {
                    setTimeout(() => {
                        ballButtonRight.pause(BallButtonStates.PRESSED);
                    }, 200);
                }
            },
            onPause: (e) => {
                if (e.data.includes(BallButtonStates.PRESSED)) {
                    ballButtonRight.play(BallButtonStates.HOVER);
                }
            },
        });
    };
}

function disableExternalButtons() {
    const $btnForDisable = document.querySelectorAll(".btn-for-disable");
    const $popUp = document.getElementById("pop-up");
    const $ballBtns = document.getElementById("ball-btns");
    for (let i = 0; i <= 1; i++) {
        $btnForDisable[i].onclick = () => {
            $popUp.classList.remove("disabled");
            $ballBtns.classList.add("disabled");
            if ($ballBtns.className.includes("disabled")) {
                $btnForDisable[i].classList.add("disabled");
            }
        };
    }
}

function init() {
    riveObjects();
    disableExternalButtons();
}

document.addEventListener("DOMContentLoaded", function (event) {
    init();
});
