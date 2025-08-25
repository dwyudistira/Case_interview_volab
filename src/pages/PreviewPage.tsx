import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PreviewPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { photos, mode } =
    (location.state as { photos: string[]; mode: "portrait" | "landscape" }) ?? {
      photos: [],
      mode: "portrait",
    };

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const frameSrc =
    mode === "landscape"
      ? "/img/Frame-Landscape.png"
      : "/img/Frame-Portrait.png";

  const drawImageFit = (
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    x: number,
    y: number,
    w: number,
    h: number
  ) => {
    const imgRatio = img.width / img.height;
    const boxRatio = w / h;

    let sx = 0,
      sy = 0,
      sWidth = img.width,
      sHeight = img.height;

    if (imgRatio > boxRatio) {
      sWidth = img.height * boxRatio;
      sx = (img.width - sWidth) / 2;
    } else {
      sHeight = img.width / boxRatio;
      sy = (img.height - sHeight) / 2;
    }

    ctx.drawImage(img, sx, sy, sWidth, sHeight, x, y, w, h);
  };

  useEffect(() => {
    if (!photos.length || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = mode === "landscape" ? 1000 : 600;
    const height = mode === "landscape" ? 600 : 800;
    canvas.width = width;
    canvas.height = height;

    const frame = new Image();
    frame.src = frameSrc;

    frame.onload = () => {
      if (mode === "portrait") {
        const img = new Image();
        img.src = photos[0];
        img.onload = () => {
          drawImageFit(ctx, img, 0, 0, width, height);
          ctx.drawImage(frame, 0, 0, width, height);
        };
      } else {
        const img1 = new Image();
        const img2 = new Image();
        img1.src = photos[0];
        img2.src = photos[1] || photos[0];

        img1.onload = () => {
          drawImageFit(ctx, img1, 0, 0, width / 2, height);

          img2.onload = () => {
            const marginTop = 50;
            const marginRight = 60;
            const marginBottom = 80;
            const marginLeft = 80;

            const rightX = width / 2 + marginLeft;
            const rightY = marginTop;
            const rightW = width / 2 - marginLeft - marginRight;
            const rightH = height - marginTop - marginBottom;

            drawImageFit(ctx, img2, rightX, rightY, rightW, rightH);

            ctx.drawImage(frame, 0, 0, width, height);
          };
        };
      }
    };
  }, [photos, mode, frameSrc]);

  const downloadImage = () => {
    if (!canvasRef.current) return;
    const link = document.createElement("a");
    link.download = "photo_preview.png";
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
  };

  const handleRetake = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <h1 className="text-xl font-bold text-blue-600 mb-4">
        Preview Mode: {mode === "landscape" ? "Landscape" : "Portrait"}
      </h1>

      {photos.length ? (
        <>
          <canvas ref={canvasRef} className="rounded-lg shadow-lg mb-4" />
          <div className="flex gap-4">
            <button
              onClick={downloadImage}
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              Download Image
            </button>
            <button
              onClick={handleRetake}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              Retake
            </button>
          </div>
        </>
      ) : (
        <p className="text-gray-500">No photo available</p>
      )}
    </div>
  );
};

export default PreviewPage;
