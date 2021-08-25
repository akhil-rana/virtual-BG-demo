import './style.scss';
import { start } from 'virtual-bg';

const videoElement: HTMLVideoElement = document.querySelector('#videoElement')!;
const toggleButton: any = document.querySelector('#toggleButton')!;

let canvasElement: HTMLCanvasElement =
  document.querySelector('.output_canvas')!;

let isSegmentationOn = false;

toggleButton.onclick = async () => {
  isSegmentationOn ? null : start(videoElement, onResults);
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
