import './style.scss';
import { blurBackground } from 'virtual-bg';

const inputVideoElement: HTMLVideoElement =
  document.querySelector('#inputVideoElement')!;

const toggleButton: any = document.querySelector('#toggleButton')!;

const outputCanvasElement: HTMLCanvasElement | any =
  document.querySelector('.output_canvas')!;

toggleButton.onclick = async () => {
  blurBackground(inputVideoElement, outputCanvasElement, 7);
};
