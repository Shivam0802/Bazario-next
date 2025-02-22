"use client";

import { useEffect, useState } from "react";

export default function Modal({
  children,
  isOpen,
  onClose,
  footer,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  footer?: React.ReactNode; // Accept footer as a prop
}) {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    setShowModal(false);
    onClose();
  };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
            </div>

            <div
              className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="px-4 pt-5 pb-4 bg-white p-4 sm:pb-4">
                {children}
              </div>
              
              {/* Footer Section (for buttons) */}
              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 px-4 py-3 sm:px-6 flex justify-end gap-4">
                <button
                  type="button"
                  className="w-full px-6 py-2 bg-[#373737] text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  onClick={handleClose}
                  >
                  Close
                </button>
                {footer}
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
}

