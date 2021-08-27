import './style.scss';
import { segmentBackground, applyBlur } from 'virtual-bg';

const inputVideoElement: HTMLVideoElement =
  document.querySelector('#inputVideoElement')!;

const toggleButton: any = document.querySelector('#toggleButton')!;

const outputCanvasElement: HTMLCanvasElement | any =
  document.querySelector('.output_canvas')!;

const canvasContainerElement: HTMLDivElement | any =
  document.querySelector('#canvas-container')!;

const blurIntensitySlider: HTMLInputElement | any = document.querySelector(
  '#blurIntensitySlider'
)!;

toggleButton.onclick = async () => {
  let myStream = await navigator.mediaDevices.getUserMedia({
    video: { width: { ideal: 1920 }, height: { ideal: 1080 } },
  });

  const width =
    window.innerHeight > window.innerWidth
      ? myStream.getVideoTracks()[0].getSettings().height
      : myStream.getVideoTracks()[0].getSettings().width;
  const height =
    window.innerHeight > window.innerWidth
      ? myStream.getVideoTracks()[0].getSettings().width
      : myStream.getVideoTracks()[0].getSettings().height;

  inputVideoElement.srcObject = myStream;

  canvasContainerElement.style.display = 'unset';
  outputCanvasElement.style.width = width;
  outputCanvasElement.style.height = height;

  outputCanvasElement.style.aspectRatio = `${width}/${height}`;
  toggleButton.style.display = 'none';

  segmentBackground(inputVideoElement, outputCanvasElement);
  applyBlur(7);
};

blurIntensitySlider.onchange = (e: any) => {
  const blurIntensity = e?.target?.value;
  applyBlur(blurIntensity);
};
