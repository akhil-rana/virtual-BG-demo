export function calculateFPS() {
  const fpsShowingElement: HTMLElement = document.getElementById('fpsCounter')!;
  const decimalPlaces = 2;
  const updateEachSecond = 1;

  // Cache values
  const decimalPlacesRatio = Math.pow(10, decimalPlaces);
  let timeMeasurements: DOMHighResTimeStamp[] = [];

  // Final output
  let fps = 0;

  const tick = function () {
    timeMeasurements.push(performance.now());

    const msPassed =
      timeMeasurements[timeMeasurements.length - 1] - timeMeasurements[0];

    if (msPassed >= updateEachSecond * 1000) {
      fps =
        Math.round(
          (timeMeasurements.length / msPassed) * 1000 * decimalPlacesRatio
        ) / decimalPlacesRatio;
      timeMeasurements = [];
    }

    fpsShowingElement.innerText = `FPS: ${fps}`;

    requestAnimationFrame(() => {
      tick();
    });
  };
  tick();
}
