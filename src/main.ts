import './style.scss';
import { start } from 'virtual-bg';
import { canvasRGBA } from 'stackblur-canvas';

const inputVideoElement: HTMLVideoElement =
  document.querySelector('#inputVideoElement')!;
const outputVideoElement: HTMLVideoElement = document.querySelector(
  '#outputVideoElement'
)!;
const toggleButton: any = document.querySelector('#toggleButton')!;
const foregroundCanvasElement: HTMLCanvasElement = document.querySelector(
  '.foreground_output_canvas'
)!;
const backgroundCanvasElement: HTMLCanvasElement = document.querySelector(
  '.background_output_canvas'
)!;
const outputCanvasElement: HTMLCanvasElement | any =
  document.querySelector('.output_canvas')!;
const outputCanvasCtx: any = outputCanvasElement.getContext('2d');
let myStream: MediaStream;
let isSegmentationOn = false;
let isCaptureStarted = false;

toggleButton.onclick = async () => {
  isSegmentationOn ? null : start(inputVideoElement, onResults, 0);
  // isSegmentationOn = !isSegmentationOn;
};

function startStreamCapture() {
  myStream = outputCanvasElement.captureStream();
  outputVideoElement.srcObject = myStream;
  isCaptureStarted = true;
}

function onResults(results: any) {
  showCanvas(results, foregroundCanvasElement, 'foreground');
  showCanvas(results, backgroundCanvasElement, 'background');
  outputCanvasCtx.drawImage(backgroundCanvasElement, 0, 0);
  outputCanvasCtx.drawImage(foregroundCanvasElement, 0, 0);
  if (!isCaptureStarted) {
    startStreamCapture();
  }
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
  if (type === 'foreground') {
    canvasCtx.globalCompositeOperation = 'source-in';
  }

  canvasCtx.drawImage(
    results.image,
    0,
    0,
    canvasElement.width,
    canvasElement.height
  );

  if (type === 'background') {
    canvasRGBA(
      canvasElement,
      0,
      0,
      canvasElement.width,
      canvasElement.height,
      20
    );
  }
  canvasCtx.restore();
}
