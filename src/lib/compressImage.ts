import imageCompression, { Options } from 'browser-image-compression';

export const compressImage = async (file: File, options?: Options) => {
  const defaultOptions = {
    maxSizeMB: 0.5,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };

  try {
    const compressedFile = await imageCompression(file, options ?? defaultOptions);
    return compressedFile;
  } catch (error) {
    console.error(error);
  }
};
