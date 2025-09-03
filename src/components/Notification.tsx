import React, { useEffect } from "react";

export default function Notification({ message, onClose }: { message: string, onClose: ()=>void }) {
  useEffect(() => {
    const t = setTimeout(onClose, 5000);
    return () => clearTimeout(t);
  }, [onClose]);
  return (
    <div className="fixed bottom-6 right-6 bg-green-600 text-white px-4 py-2 rounded shadow">
      {message}
    </div>
  );
}
