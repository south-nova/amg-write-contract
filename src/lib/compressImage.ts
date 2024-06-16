import imageCompression, { Options } from 'browser-image-compression';

export const compressImage = async (file: File, options?: Options) => {
  const defaultOptions = {
    maxSizeMB: 0.5,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };

  try {
    const compressedFile = await imageCompression(file, options ?? defaultOptions);
    console.log('OK');
    return compressedFile;
  } catch (error) {
    console.error(error);
    return file;
  }
};

export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};
