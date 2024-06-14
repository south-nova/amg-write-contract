import React, { useEffect, useState } from 'react';

import { createPortal } from 'react-dom';

import { cn } from '@/lib/cn';

// Assuming this utility is available for classNames

interface CustomDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const CustomDrawer = ({ isOpen, onClose, children }: CustomDrawerProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const drawerContent = (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-end justify-center bg-black/50 transition-opacity duration-200',
        isOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
      )}
      onClick={handleOverlayClick}
    >
      <div
        className={cn(
          'transform rounded-t-lg bg-white shadow-lg transition-transform duration-300',
          isOpen ? 'translate-y-0' : 'translate-y-full',
        )}
        style={{ width: '100%', maxWidth: '500px' }}
      >
        <div className="p-4">
          <button className="text-gray-700 mb-4" onClick={onClose}>
            Close
          </button>
          {children}
        </div>
      </div>
    </div>
  );

  return mounted ? createPortal(drawerContent, document.body) : null;
};

export default CustomDrawer;
