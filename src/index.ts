import "./styles.css";
import { Fit, Rive, Layout } from "@rive-app/webgl2";

const layout = new Layout({
  fit: Fit.Contain,
});

const riveCanvas = document.getElementById("rive-canvas") as HTMLCanvasElement;
const button1 = document.getElementById("button") as HTMLButtonElement;
const button2 = document.getElementById("button2") as HTMLButtonElement;
const button3 = document.getElementById("button3") as HTMLButtonElement;
const riveSrc = new URL(
  "./kanguru.riv",
  import.meta.url
).href;

const r = new Rive({
  src: riveSrc,
  canvas: riveCanvas,
  artboard: "Artboard",
  stateMachines: "State Machine 1",
  layout,
  autoplay: true,
  autoBind: true,
 
  onLoad: (): void => {
    r.resizeDrawingSurfaceToCanvas();

    const vmi = r.viewModelInstance as ViewModelInstance | null;
    if (!vmi) {
      console.error("ViewModel instance not available");
      return;
    }

    button1.addEventListener("click", triggerbtm);
    function triggerbtm(): void {
    vmi.trigger("waving").trigger();
    console.log("button1 clicked")
    }
    button2.addEventListener("click", triggerbtm2);
    function triggerbtm2(): void {
    vmi.trigger("pointing").trigger();
    console.log("button2 clicked");
    }
    button3.addEventListener("click", triggerbtm3);
    function triggerbtm3(): void {
    vmi.trigger("thumbsup").trigger();
    console.log("button3 clicked");
    }
  },
  onLoadError: (error: Error): void => {
    console.error("Failed to load cute_bee.riv:", error);
  },
});

window.addEventListener("resize", () => {
  r.resizeDrawingSurfaceToCanvas();
});
