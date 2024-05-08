export const getBlobFromCanvas = async (canvas: HTMLCanvasElement) => {
  const promise = new Promise<Blob>((resolve) =>
    canvas.toBlob((blob) => resolve(blob!)),
  );

  return await promise;
};
