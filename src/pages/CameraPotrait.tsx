import { useRef, useState } from "react";
import Webcam from "react-webcam";

const CameraPortrait: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);
  const [image, setImage] = useState<string | null>(null);

  const capture = (): void => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setImage(imageSrc);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
      <h1 className="text-3xl font-bold tracking-wider mb-6 opacity-90">
        STYLE SNAP
      </h1>

      {/* Kamera / Hasil */}
      <div className="relative w-[360px] h-[640px] shadow-2xl rounded-2xl overflow-hidden border border-gray-700">
        {!image ? (
          <>
            <Webcam
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={{
                width: 360,
                height: 640,
                facingMode: "user",
              }}
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
            {/* Frame Overlay */}
            <img
              src="/src/img/Frame-Portrait.png"
              alt="Frame"
              className="absolute inset-0 w-full h-full pointer-events-none"
            />
          </>
        ) : (
          <>
            <img
              src={image}
              alt="Captured"
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
            <img
              src="/src/img/Frame-Portrait.png"
              alt="Frame"
              className="absolute inset-0 w-full h-full pointer-events-none"
            />
          </>
        )}
      </div>

      {/* Tombol aksi */}
      <div className="flex gap-4 mt-6">
        {!image ? (
          <button
            onClick={capture}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-full font-semibold shadow-lg transition flex items-center gap-2"
          >
            📸 Capture
          </button>
        ) : (
          <>
            <button
              onClick={() => setImage(null)}
              className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-full font-semibold shadow-lg transition flex items-center gap-2"
            >
              🔄 Retake
            </button>
            <a
              href={image}
              download="portrait-photo.jpg"
              className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-full font-semibold shadow-lg transition flex items-center gap-2"
            >
              ⬇️ Download
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export default CameraPortrait;
