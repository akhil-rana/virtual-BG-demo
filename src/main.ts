import './style.scss';
import { start } from 'virtual-bg';

const inputVideoElement: HTMLVideoElement =
  document.querySelector('#inputVideoElement')!;
const toggleButton: any = document.querySelector('#toggleButton')!;

let isSegmentationOn = false;

toggleButton.onclick = async () => {
  isSegmentationOn ? null : start(inputVideoElement, onResults, 0);
  // isSegmentationOn = !isSegmentationOn;
};

function onResults(results: any) {
  let foregroundCanvasElement: HTMLCanvasElement = document.querySelector(
    '.foreground_output_canvas'
  )!;
  let backgroundCanvasElement: HTMLCanvasElement = document.querySelector(
    '.background_output_canvas'
  )!;
  showCanvas(results, foregroundCanvasElement, 'foreground');
  showCanvas(results, backgroundCanvasElement, 'background');
}

function showCanvas(
  results: any,
  canvasElement: HTMLCanvasElement,
  type: 'foreground' | 'background'
) {
  const canvasCtx: any = canvasElement.getContext('2d');

  canvasCtx.save();
  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  canvasCtx.drawImage(
    results.segmentationMask,
    0,
    0,
    canvasElement.width,
    canvasElement.height
  );

  canvasCtx.globalCompositeOperation =
    type === 'background'
      ? 'source-out'
      : type === 'foreground'
      ? 'source-in'
      : 'source-in';

  canvasCtx.drawImage(
    results.image,
    0,
    0,
    canvasElement.width,
    canvasElement.height
  );

  canvasCtx.restore();
}
