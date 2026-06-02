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
                $loadingContainer.className = "d-none";
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
    const $buttonFloat = document.getElementsByClassName("button-animation-float")[0];
    const $buttonReload = document.getElementsByClassName("button-page-reload")[0];
    const flyingFloat = new Audio('/sounds/flying_float.mp3');

    const streakSaver = new rive.Rive({
        src: "/rive-animation-base-project/animations/gamificacion_salvarachas_front_db.riv",
        canvas: $streakSaver,
        autoplay: true,
        autoBind: true,
        artboard: "GamificacionFlotadorMain",
        stateMachines: "StateMachine",
        onLoad: () => {
            streakSaver.resizeDrawingSurfaceToCanvas();

            /*
             * Obtiene la referencia del view model por defecto
             * const defaultViewModel = streakSaver.defaultViewModel();
             * Accedemos a la instancia del view moder (se trabaja con viewModelInstance)
             * console.log(defaultViewModel.defaultInstance());
            */

            // Accedemos a la instancia del view model a través de la propiedad viewModelInstance.
            const vmInstance = streakSaver.viewModelInstance;
            /*
             * Accedemos a las prpiedades de la instancia, las que se usaban para los eventos y usaremos para el binding.
             * console.log(vmInstance.properties);
            */


            // Triggers
            const triggerProperty = vmInstance.trigger("triggerVuelo");
            $buttonFloat.addEventListener("click", () => {
                $buttonFloat.classList.add("btn-clicked");
                triggerProperty.trigger();
            });


            /* Observacion de eventos con Data Binding */

            // Accedemos a las propiedades que queremos observar, en este caso el número "track" y el booleano "isAnimCompletedFront".
            const numberProperty = vmInstance.number("track");
            const booleanProperty = vmInstance.boolean("isAnimCompletedFront");

            // Creamos un evento por cada propiedad para escuchar los cambios específicos.
            numberProperty.on(async (event) => {
                console.log("track", event);
                if (event === 6) {
                    await flyingFloat.play();
                }
            })

            booleanProperty.on((event) => {
                console.log("isAnimCompletedFront", event);
                if (event) {
                    // Eliminamos los listener cuando ya no lo necesitamos, para evitar fugas de memoria. (Cuendo termina la animación).
                    numberProperty.off();
                    booleanProperty.off();
                    $buttonFloat.classList.add("disabled");
                    $buttonReload.classList.remove("opacity-0");
                }
            })
        },
    });
}

function startRiveCountAnimation() {
    const $buttonStart = document.getElementsByClassName("button-animation-start")[0];
    const $buttonFloat = document.getElementsByClassName("button-animation-float")[0];
    const countdownSound = new Audio('/sounds/countdown.mp3');
    const whooshSound = new Audio('/sounds/whoosh.mp3');
    let count = 5;

    $buttonStart.classList.add("btn-clicked");
    mainRiveObject();

    const countInterval = setInterval(async () => {
        $buttonStart.classList.add("font-4");
        $buttonStart.innerHTML = `${count}`;
        await countdownSound.play();
        count--;

        if (count < 0) {
            $buttonFloat.classList.remove("opacity-0");
            clearInterval(countInterval);
            $buttonStart.classList.add("scale-out-center");
            countdownSound.pause();
            await whooshSound.play();
        }
    }, 1000)
}


function handleStreakSaverAnimation() {
    const $buttonAnimation = document.getElementsByClassName("button-animation-start")[0];
    $buttonAnimation.addEventListener("click", () => {
        if (!isButtonAnimationClicked) {
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
