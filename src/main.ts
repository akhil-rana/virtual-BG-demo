import './style.scss';
import { blurBackground } from 'virtual-bg';

const inputVideoElement: HTMLVideoElement =
  document.querySelector('#inputVideoElement')!;

const toggleButton: any = document.querySelector('#toggleButton')!;

const outputCanvasElement: HTMLCanvasElement | any =
  document.querySelector('.output_canvas')!;

toggleButton.onclick = async () => {
  let myStream = await navigator.mediaDevices.getUserMedia({
    video: { width: { ideal: 1024 }, height: { ideal: 720 } },
  });

  inputVideoElement.srcObject = myStream;

  blurBackground(inputVideoElement, outputCanvasElement, 7);
};
