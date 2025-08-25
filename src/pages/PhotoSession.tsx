import { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Webcam from "react-webcam";

const PhotoSession: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);
  const [numPhotos, setNumPhotos] = useState(1);
  const [takes, setTakes] = useState<string[]>([]);
  const [current, setCurrent] = useState<string | null>(null);
  const [sessionActive, setSessionActive] = useState(false);
  const [mode, setMode] = useState<"portrait" | "landscape">("portrait");

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryMode =
      (new URLSearchParams(location.search).get("mode") as
        | "portrait"
        | "landscape") || "portrait";
    setMode(queryMode);
    setNumPhotos(queryMode === "landscape" ? 2 : 1);
  }, [location]);

  const toggleSession = () => {
    setSessionActive((s) => !s);
    setTakes([]);
    setCurrent(null);
  };

  const capture = () => {
    const shot = webcamRef.current?.getScreenshot();
    if (shot) setCurrent(shot);
  };

  const save = () => {
    if (current) {
      const updated = [...takes, current];
      setTakes(updated);
      setCurrent(null);

      if (updated.length === numPhotos) {
        navigate("/preview", { state: { photos: updated, mode } });
      }
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen space-y-6">
      <div className="bg-white w-full max-w-4xl rounded-lg shadow p-4">
        <h1 className="text-3xl font-bold text-blue-600 mb-4 text-center">
          📸 Photo Session
        </h1>

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-medium">
              Status:{" "}
              <span className={sessionActive ? "text-green-600" : "text-red-500"}>
                {sessionActive ? "Taking Photo" : "Ready"}
              </span>
            </span>
            <span className="text-gray-700 font-medium">
              Saved Photo: {takes.length} of {numPhotos}
            </span>
          </div>
          <button
            onClick={toggleSession}
            className={`px-4 py-2 rounded-lg text-white font-semibold ${
              sessionActive ? "bg-red-500" : "bg-green-500"
            }`}
          >
            {sessionActive ? "End Session" : "Start Session"}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-2 gap-6 w-full max-w-4xl">
        {/* Camera */}
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <h2 className="font-semibold mb-3">Camera ({mode})</h2>
          {current ? (
            <>
              <img src={current} className="rounded mb-4 w-full h-[600px] object-cover" />
              <div className="flex gap-2 justify-center">
                <button
                  onClick={save}
                  className="px-3 py-1 bg-green-600 text-white rounded"
                >
                  Save
                </button>
                <button
                  onClick={() => setCurrent(null)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded"
                >
                  Retake
                </button>
              </div>
            </>
          ) : sessionActive ? (
            <>
              <Webcam
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className="rounded mb-4 w-full h-[600px] object-cover"
              />
              <button
                onClick={capture}
                disabled={takes.length >= numPhotos}
                className="px-3 py-1 bg-blue-600 text-white rounded disabled:opacity-50"
              >
                Capture
              </button>
            </>
          ) : (
            <div className="h-64 flex items-center justify-center bg-gray-100 rounded">
              <p className="text-gray-500">Start session to enable camera</p>
            </div>
          )}
        </div>

        {/* Gallery */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="font-semibold mb-3">Gallery</h2>
          {takes.length ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {takes.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  className="rounded shadow w-full h-48 object-cover"
                  alt={`Photo ${i + 1}`}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No photos yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PhotoSession;
