import { useEffect, useRef } from 'react';

import SignatureCanvas from 'react-signature-canvas';

interface SignatureProps {
  onChange?: (data: string) => void;
}

const Signature = ({ onChange }: SignatureProps) => {
  const signCanvas = useRef() as React.MutableRefObject<any>;

  const handleEnd = () => {
    const data = signCanvas.current.getTrimmedCanvas().toDataURL('image/png');
    onChange?.(data);
  };

  useEffect(() => {
    if (signCanvas.current) {
      signCanvas.current.getCanvas().width = signCanvas.current.getCanvas().offsetWidth;
      signCanvas.current.getCanvas().height = signCanvas.current.getCanvas().offsetWidth;
    }
  }, []);

  return (
    <SignatureCanvas
      velocityFilterWeight={0}
      onEnd={handleEnd}
      ref={signCanvas}
      canvasProps={{ className: 'mx-6 rounded-lg bg-surface-accent' }}
    />
  );
};

export default Signature;
