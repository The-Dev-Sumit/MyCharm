import React, { useEffect } from "react";

const Board: React.FC = () => {

  const noteVisible: boolean = true;
  const text = "PlayGround for coders"; 

  const dropZones = [
    {
      id: "drop-zone-1",
      top: "3%",
      left: "5%",
      mdTop: "5%",
      mdLeft: "35%",
      lgTop: "5%",
      lgLeft: "20%",
      xlTop: "3%",
      xlLeft: "15%",
    },
    {
      id: "drop-zone-2",
      top: "3%",
      left: "66%",
      mdTop: "3%",
      mdLeft: "75%",
      lgTop: "2%",
      lgLeft: "70%",
      xlTop: "2%",
      xlLeft: "70%",
    },
    {
      id: "drop-zone-3",
      top: "30%",
      left: "33%",
      mdTop: "30%",
      mdLeft: "45%",
      lgTop: "20%",
      lgLeft: "45%",
      xlTop: "20%",
      xlLeft: "45%",
    },
    {
      id: "drop-zone-4",
      top: "60%",
      left: "5%",
      mdTop: "55%",
      mdLeft: "15%",
      lgTop: "50%",
      lgLeft: "80%",
      xlTop: "50%",
      xlLeft: "80%",
    },
    {
      id: "drop-zone-5",
      top: "60%",
      left: "66%",
      mdTop: "55%",
      mdLeft: "75%",
      lgTop: "55%",
      lgLeft: "70%",
      xlTop: "55%",
      xlLeft: "70%",
    },
  ];

  useEffect(() => {
    // CSS variables set karo
    dropZones.forEach((zone, index) => {
      const element = document.querySelector(
        `[data-zone-index="${index}"]`
      ) as HTMLElement;
      if (element) {
        element.style.setProperty("--md-top", zone.mdTop);
        element.style.setProperty("--md-left", zone.mdLeft);
        element.style.setProperty("--lg-top", zone.lgTop);
        element.style.setProperty("--lg-left", zone.lgLeft);
        element.style.setProperty("--xl-top", zone.xlTop);
        element.style.setProperty("--xl-left", zone.xlLeft);
      }
    });
  }, []);

  return (
    <div className="flex flex-col items-center px-3 w-full h-[86vh] md:h-[98vh] lg:h-[110vh] py-5 z-40">
      <h2 className="text-[1.4rem] md:text-[1.8rem] font-bold text-center poppins-medium-italic py-6 text-amber-100">
        <span className="text-indigo-400">Pinned Ideas</span>: Projects I'm
        Working On
      </h2>
      <div className="relative w-[96vw] h-[50vh] md:h-[65vh] lg:h-[70vh] lg:w-[70vw] xl:h-[80vh] md:w-[80vw] xl:w-[70vw] rounded-lg shadow-lg border-4 border-amber-50/70 bg-green-500/20">
        {dropZones.map((zone, index) => (
          <div
            key={zone.id}
            data-zone-index={index}
            className={`absolute flex items-center justify-center w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32
              ${
                index === 0
                  ? "top-[3%] left-[8%] md:top-[5%] md:left-[13%] lg:top-[5%] lg:left-[13%] xl:top-[7%] xl:left-[15%]"
                  : ""
              }
              ${
                index === 1
                  ? "top-[3%] left-[66%] md:top-[5%] md:left-[70%] lg:top-[5%] lg:left-[70%] xl:top-[7%] xl:left-[70%]"
                  : ""
              }
              ${
                index === 2
                  ? "top-[25%] left-[36%] md:top-[27%] md:left-[40%] lg:top-[25%] lg:left-[40%] xl:top-[25%] xl:left-[43%]"
                  : ""
              }
              ${
                index === 3
                  ? "top-[63%] left-[8%] md:top-[65%] md:left-[13%] lg:top-[63%] lg:left-[13%] xl:top-[65%] xl:left-[15%]"
                  : ""
              }
              ${
                index === 4
                  ? "top-[63%] left-[66%] md:top-[65%] md:left-[70%] lg:top-[63%] lg:left-[70%] xl:top-[65%] xl:left-[70%]"
                  : ""
              }`}>
            {/* Nail Design */}
            <div className="relative w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8">
              <div className="absolute w-2 h-2 md:w-2.5 md:h-2.5 lg:w-3 lg:h-3 bg-gray-600 rounded-full top-0 left-1/2 transform -translate-x-1/2 z-10" />
              <div className="absolute w-1 h-4 md:w-1.5 md:h-5 lg:w-2 lg:h-6 bg-gray-500 rounded-t-sm top-2 md:top-2.5 lg:top-3 left-1/2 transform -translate-x-1/2" />
            </div>

            {index === 2 && noteVisible && (
              <div className="absolute top-14 md:top-16 lg:top-20 h-[6rem] w-[9rem] md:w-[12rem] md:h-[7rem] lg:h-[7rem] lg:w-[12.5rem] xl:w-[13rem] xl:h-[7.5rem] bg-yellow-200 p-2 rounded-sm flex items-center justify-center">
                <span className="font-bold text-center text-[0.8rem] md:text-[0.9rem] lg:text-[1rem] xl:text-[1.1rem] italic">
                  {text}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;