import './style.scss';
import { SelfieSegmentation } from '@mediapipe/selfie_segmentation';

const videoElement: HTMLVideoElement = document.querySelector('#videoElement')!;
const toggleButton: any = document.querySelector('#toggleButton')!;
// const containerElement: HTMLElement = document.getElementById('container')!;

let canvasElement: HTMLCanvasElement =
  document.querySelector('.output_canvas')!;

let isSegmentationOn = false;
let myStream: MediaStream;
let selfieSegmentation: SelfieSegmentation;

async function start() {
  selfieSegmentation = new SelfieSegmentation({
    locateFile: (file) => {
      return `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/${file}`;
    },
  });
  selfieSegmentation.setOptions({
    modelSelection: 1,
  });
  selfieSegmentation.onResults(onResults);

  myStream = await navigator.mediaDevices.getUserMedia({
    video: { width: { ideal: 1024 }, height: { ideal: 720 } },
  });

  videoElement.srcObject = myStream;
  videoElement.addEventListener('play', () => {
    async function step() {
      await selfieSegmentation.send({ image: videoElement });
      requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  });
  videoElement.addEventListener('pause', async () => {});
}

toggleButton.onclick = async () => {
  isSegmentationOn ? null : start();
  // isSegmentationOn = !isSegmentationOn;
};

// async function stop() {
//   await selfieSegmentation.close();
//   myStream.getTracks().forEach((track: any) => {
//     if (track.kind === 'video') {
//       track.enabled = false;
//       setTimeout(() => {
//         track.stop();
//       }, 200);
//     }
//   });
// }

function onResults(results: any) {
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

  // Only overwrite existing pixels.
  canvasCtx.globalCompositeOperation = 'source-in';
  canvasCtx.fillStyle = '#00FF00';
  canvasCtx.fillRect(0, 0, canvasElement.width, canvasElement.height);

  // Only overwrite missing pixels.
  canvasCtx.globalCompositeOperation = 'destination-atop';
  canvasCtx.drawImage(
    results.image,
    0,
    0,
    canvasElement.width,
    canvasElement.height
  );

  canvasCtx.restore();
}
