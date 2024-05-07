import {
  ArrowMachine,
  ArrowMorphStates,
  TextMachine,
  FaceMachine,
  SkullyMachine,
} from "../../states.constants.js";


function riveObjects() {
  const $loadingContainer = document.getElementById("loading-container");
  const $allContent = document.getElementById("view");
  const $btnArrowBack = document.getElementById("arrow-back");
  const $textAnimatedHosted = document.getElementById("text-animated-hosted");
  const $textAnimatedEmbedded = document.getElementById(
    "text-animated-embedded"
  );
  const $textAnimatedReferenced = document.getElementById(
    "text-animated-referenced"
  );
  const $faceController0 = document.getElementById("face-controller-0");
  const $faceController1 = document.getElementById("face-controller-1");
  const $faceController2 = document.getElementById("face-controller-2");

  const loading = new rive.Rive({
    src: "/rive-animation-base-project/animations/loading.riv",
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
        textAnimatedHosted;
      }, 1800);
    },
    onPause: (e) => {
      if (e.type === "pause") {
        textAnimatedEmbedded.play();
        textAnimatedHosted.play();
        textAnimatedReferenced.play();
      }
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
            window.location.assign(
              location.origin + "/rive-animation-base-project/"
            );
          });
        }
      } else if (event.data[0].includes(ArrowMorphStates.TOMENU)) {
        $btnArrowBack.classList.remove("active");
        $btnArrowBack.classList.add("idle");
      }
    },
  });

  const face0 = new rive.Rive({
    src: "/rive-animation-base-project/animations/face-0.riv",
    canvas: $faceController0,
    autoplay: true,
    stateMachines: FaceMachine.DEFAULT,
    layout: new rive.Layout({ fit: rive.Fit.Fill }),
    onLoad: () => {
      face0.resizeDrawingSurfaceToCanvas();
    },
  });

  const face1 = new rive.Rive({
    src: "/rive-animation-base-project/animations/face-1.riv",
    canvas: $faceController1,
    autoplay: true,
    stateMachines: FaceMachine.DEFAULT,
    layout: new rive.Layout({ fit: rive.Fit.Fill }),
    onLoad: () => {
      face1.resizeDrawingSurfaceToCanvas();
    },
  });

  const face2 = new rive.Rive({
    src: "/rive-animation-base-project/animations/face-2.riv",
    canvas: $faceController2,
    autoplay: true,
    stateMachines: SkullyMachine.DEFAULT,
    layout: new rive.Layout({ fit: rive.Fit.Fill }),
    onLoad: () => {
      face2.resizeDrawingSurfaceToCanvas();
    },
  });

  const textAnimatedEmbedded = new rive.Rive({
    src: "/rive-animation-base-project/animations/text-animated-embedded.riv",
    artboard: "Prueba texto",
    canvas: $textAnimatedEmbedded,
    autoplay: false,
    stateMachines: TextMachine.DEFAULT,
    layout: new rive.Layout({ fit: rive.Fit.Fill }),
    onLoad: () => {
      textAnimatedEmbedded.resizeDrawingSurfaceToCanvas();
      const textNameSpace = "MyText";
      // Getter for de text value ---------------->
      const myDefaultText = textAnimatedEmbedded.getTextRunValue(textNameSpace);
      // Setter for the text value ---------------->
      const newTextValue = "All in one heavy";
      return textAnimatedEmbedded.setTextRunValue(textNameSpace, newTextValue);
    },
  });

  const textAnimatedHosted = new rive.Rive({
    src: "/rive-animation-base-project/animations/text-animated-hosted.riv",
    artboard: "Prueba texto",
    canvas: $textAnimatedHosted,
    autoplay: false,
    stateMachines: TextMachine.DEFAULT,
    layout: new rive.Layout({ fit: rive.Fit.Fill }),
    onLoad: () => {
      textAnimatedHosted.resizeDrawingSurfaceToCanvas();
      const textNameSpace = "MyText";
      // Getter for de text value ---------------->
      const myDefaultText = textAnimatedHosted.getTextRunValue(textNameSpace);
      // Setter for the text value ---------------->
      const newTextValue = "All in one light";
      return textAnimatedHosted.setTextRunValue(textNameSpace, newTextValue);
    },
  });

  const textAnimatedReferenced = new rive.Rive({
    src: "/rive-animation-base-project/animations/text-animated-referenced.riv",
    artboard: "Prueba texto",
    canvas: $textAnimatedReferenced,
    autoplay: false,
    stateMachines: TextMachine.DEFAULT,
    layout: new rive.Layout({ fit: rive.Fit.Fill }),
    // assetLoader: (asset, bytes) => {
    //   console.log(asset)
    // },
    onLoad: () => {
      textAnimatedReferenced.resizeDrawingSurfaceToCanvas();
      const textNameSpace = "MyText";
      // Getter for de text value ---------------->
      const myDefaultText =
        textAnimatedReferenced.getTextRunValue(textNameSpace);
      // Setter for the text value ---------------->
      const newTextValue = "Font code modifier";
      return textAnimatedReferenced.setTextRunValue(
        textNameSpace,
        newTextValue
      );
    },
  });
}

function init() {
  riveObjects();
}

document.addEventListener("DOMContentLoaded", function (event) {
  init();
});
