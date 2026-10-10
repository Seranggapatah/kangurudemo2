import "./styles.css";
import { Fit, Rive, Layout } from "@rive-app/webgl2";

const layout = new Layout({
  fit: Fit.Contain,
});

const riveCanvas = document.getElementById("rive-canvas") as HTMLCanvasElement;
const button1 = document.getElementById("button") as HTMLButtonElement;
const button2 = document.getElementById("button2") as HTMLButtonElement;
const button3 = document.getElementById("button3") as HTMLButtonElement;

const numberInput = document.getElementById(
  "number-value"
) as HTMLInputElement;

const numberInput2 = document.getElementById(
  "number-value2"
) as HTMLInputElement;


const riveSrc = new URL(
  "./kanguruv2.riv",
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
    numberInput.addEventListener("input", () => {
      const value = numberInput.valueAsNumber;
      const numberProperty = vmi.number("state");
      const numberValue = numberProperty.value;
      numberProperty.value = value;
    
      if (Number.isNaN(value)) return;
    
      console.log("Number Value:", value);
    
      // Kirim value ke Number Input Rive di sini
    });
    
    numberInput2.addEventListener("input", () => {
      const value = numberInput2.valueAsNumber;
      const numberProperty2 = vmi.number("speed");
      const numberValue2 = numberProperty2.value;
      numberProperty2.value = value;
    
      if (Number.isNaN(value)) return;
    
      console.log("Speed Value:", value);
    
      // Kirim value ke Number Input Rive di sini
    });



    button1.addEventListener("click", triggerbtm);
    function triggerbtm(): void {
    vmi.trigger("triggerWaving").trigger();
    console.log("button1 clicked")
    }
    button2.addEventListener("click", triggerbtm2);
    function triggerbtm2(): void {
    vmi.trigger("triggerPointing").trigger();
    console.log("button2 clicked");
    }
    button3.addEventListener("click", triggerbtm3);
    function triggerbtm3(): void {
    vmi.trigger("triggerThumbup").trigger();
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
