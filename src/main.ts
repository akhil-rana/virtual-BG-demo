import './style.scss';
import { segmentBackground, applyBlur, applyImageBackground } from 'virtual-bg';

const inputVideoElement: HTMLVideoElement =
  document.querySelector('#inputVideoElement')!;

const toggleButtonElement: any = document.querySelector('#toggleButton')!;

const outputCanvasElement: HTMLCanvasElement | any =
  document.querySelector('.output_canvas')!;

const containerElement: HTMLDivElement | any =
  document.querySelector('#container')!;

const effectTypeSelectorElement: HTMLSelectElement | any =
  document.querySelector('#effectTypeSelector')!;

const blurIntensitySliderElement: HTMLInputElement | any =
  document.querySelector('#blurIntensitySlider')!;

const imageBrowserInputElement: HTMLInputElement | any =
  document.querySelector('#imageBrowserInput')!;

toggleButtonElement.onclick = async () => {
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

  containerElement.style.display = 'unset';
  outputCanvasElement.style.width = width;
  outputCanvasElement.style.height = height;
  outputCanvasElement.style.aspectRatio = `${width}/${height}`;
  toggleButtonElement.style.display = 'none';

  segmentBackground(inputVideoElement, outputCanvasElement);
  applyBlur(7);
};

blurIntensitySliderElement.onchange = (e: any) => {
  const blurIntensity = e?.target?.value;
  applyBlur(blurIntensity);
};

effectTypeSelectorElement.onchange = (e: any) => {
  const type = e?.target?.value;

  if (type === 'blur') {
    (<HTMLDivElement>(
      document.querySelector('#blurIntensityContainer')
    )).style.display = 'unset';
    (<HTMLDivElement>(
      document.querySelector('#imageBrowserContainer')
    )).style.display = 'none';
    applyBlur(7);
  } else if (type === 'image') {
    (<HTMLDivElement>(
      document.querySelector('#blurIntensityContainer')
    )).style.display = 'none';
    (<HTMLDivElement>(
      document.querySelector('#imageBrowserContainer')
    )).style.display = 'unset';
    if (imageBrowserInputElement?.files[0]) {
      setBackgroundImage(imageBrowserInputElement?.files[0]);
    } else
      imageBrowserInputElement.onchange = (e: any) => {
        applyBlur(0);
        setBackgroundImage(e?.target?.files[0]);
      };
  }
};

function setBackgroundImage(imageFile: File) {
  const reader = new FileReader();
  reader.readAsDataURL(imageFile);
  reader.onload = (e: any) => {
    const imageUrl = e?.target?.result;
    const image = new Image();
    image.src = imageUrl;
    applyImageBackground(image);
  };
}
