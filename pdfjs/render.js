// Chrome's built-in PDF viewer paints black over Flutter's canvas, including
// an iframe attached to document.body. Draw pages ourselves instead.
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdf.worker.min.js',
  document.currentScript.src,
).href;

window.renderReceiptPdf = async function (bytes) {
  const data = new Uint8Array(bytes);
  const doc = await pdfjsLib
    .getDocument({ data: data, useSystemFonts: true })
    .promise;
  const urls = [];
  const count = Math.min(doc.numPages, 8);
  for (let i = 1; i <= count; i++) {
    const page = await doc.getPage(i);
    const viewport = page.getViewport({ scale: 1.5 });
    const canvas = document.createElement('canvas');
    canvas.width = Math.floor(viewport.width);
    canvas.height = Math.floor(viewport.height);
    await page.render({
      canvasContext: canvas.getContext('2d'),
      viewport: viewport,
    }).promise;
    urls.push(canvas.toDataURL('image/jpeg', 0.92));
  }
  return urls;
};
