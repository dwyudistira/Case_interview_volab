import { useRef, useState } from "react";
import Webcam from "react-webcam";

const CameraLandscape: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);
  const [image, setImage] = useState<string | null>(null);

  const capture = (): void => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setImage(imageSrc);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-2 gap-0">
      {/* Left Section - Poster Style */}
      <div className="flex flex-col justify-center items-start px-16 w-full h-full 
                      bg-gradient-to-br from-purple-700 via-indigo-800 to-gray-900 text-white">
        <div>
          <h1 className="text-7xl font-black tracking-tight drop-shadow-lg">STYLE</h1>
          <h1 className="text-7xl font-black tracking-tight mb-4 drop-shadow-lg">SNAP</h1>
          <p className="text-lg max-w-sm opacity-90 leading-relaxed">
            Capture your coolest look.  
            Keep it simple. Keep it bold.  
            Make it timeless.
          </p>
        </div>

        <div className="mt-12 flex gap-4">
          {!image ? (
            <button
              onClick={capture}
              className="px-8 py-3 bg-white text-black rounded-full font-semibold 
                         hover:bg-gray-200 transition shadow-lg"
            >
              📸 Capture Now
            </button>
          ) : (
            <>
              <button
                onClick={() => setImage(null)}
                className="px-8 py-3 bg-gray-900 text-white rounded-full font-semibold 
                           hover:bg-gray-700 transition shadow-lg"
              >
                🔄 Retake
              </button>

              {/* Download button */}
              <a
                href={image}
                download="captured-photo.jpg"
                className="px-8 py-3 bg-green-600 text-white rounded-full font-semibold 
                           hover:bg-green-700 transition shadow-lg"
              >
                ⬇️ Download
              </a>
            </>
          )}
        </div>
      </div>

      {/* Right Section - Camera with gradient */}
      <div className="relative flex items-center justify-center w-full h-full 
                      bg-gradient-to-b from-gray-900 via-black to-gray-900">
        {!image ? (
          <>
            <Webcam
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={{
                width: 500,
                height: 700,
                facingMode: "user",
              }}
              mirrored={false}
              className="w-full h-full object-cover opacity-90"
            />
            {/* Overlay Frame */}
            <img
              src="/src/img/Frame-Landscape.png"
              alt="Frame Landscape"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            />
          </>
        ) : (
          <>
            <img
              src={image}
              alt="Captured"
              className="w-full h-full object-cover opacity-90"
            />
            <img
              src="/src/img/Frame-Landscape.png"
              alt="Frame Landscape"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default CameraLandscape;
