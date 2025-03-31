import React, { useState, useEffect } from "react";
import Note from "../components/Note";

interface NoteData {
  id: string;
  text: string;
}

interface BoardProps {
  setIsTyping: (typing: boolean) => void; // यह नया प्रॉप जोड़ें
}

const Board: React.FC<BoardProps> = ({ setIsTyping }) => {
  const [bucketNotes, setBucketNotes] = useState<NoteData[]>([
    { id: "note-1", text: "" },
  ]);

  const [boardNotes, setBoardNotes] = useState<(NoteData | null)[]>(() => {
    const saved = localStorage.getItem("boardNotes");
    return saved ? JSON.parse(saved) : Array(5).fill(null);
  });

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
    localStorage.setItem("boardNotes", JSON.stringify(boardNotes));
  }, [boardNotes]);

  useEffect(() => {
    // Set CSS variables for responsive positioning
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

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    zoneIndex: number
  ) => {
    e.preventDefault();
    const noteId = e.dataTransfer.getData("noteId");
    const draggedNote = bucketNotes.find((note) => note.id === noteId);

    if (draggedNote && !boardNotes[zoneIndex]) {
      const dropZone = e.currentTarget.getBoundingClientRect();
      const noteHeight = 80; // Note ki height (h-20 = 80px assuming 1rem = 16px)
      const noteTop = e.clientY - noteHeight / 2; // Assume note ka center mouse ke paas hai

      // Check if note's top overlaps with drop zone
      const dropZoneTop = dropZone.top;
      const dropZoneBottom = dropZone.bottom;

      if (noteTop <= dropZoneBottom && noteTop + noteHeight >= dropZoneTop) {
        const newBucketNotes = bucketNotes.filter((note) => note.id !== noteId);
        const newBoardNotes = [...boardNotes];
        newBoardNotes[zoneIndex] = draggedNote;

        setBucketNotes(
          newBucketNotes.length === 0
            ? [{ id: `note-${Date.now()}`, text: "" }]
            : newBucketNotes
        );
        setBoardNotes(newBoardNotes);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleTextChange = (id: string, text: string) => {
    setBoardNotes((prev) =>
      prev.map((note) => (note && note.id === id ? { ...note, text } : note))
    );
  };

  const handleDelete = (id: string) => {
    setBoardNotes((prev) =>
      prev.map((note) => (note && note.id === id ? null : note))
    );
  };

  return (
    <div className="flex flex-col items-center px-3 w-full h-[86vh] md:h-[98vh] lg:h-[110vh] py-5">
      <h2 className="text-[1.4rem] md:text-[1.8rem] font-bold text-center poppins-medium-italic py-6 text-amber-100">
        <span className="text-indigo-400">Pinned Ideas</span>: Projects I'm
        Working On
      </h2>
      <div className="relative w-[96vw] h-[57vh] md:h-[75vh] lg:h-[85vh] xl:h-[95vh] md:w-[85vw] xl:w-[75vw] rounded-lg shadow-lg border-4 border-amber-50/70 bg-green-500/20">
        {dropZones.map((zone, index) => (
          <div
            key={zone.id}
            onDrop={(e) => handleDrop(e, index)}
            onDragOver={handleDragOver}
            className={`absolute flex items-center justify-center w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32
              ${
                index === 0
                  ? "top-[3%] left-[5%] md:top-[5%] md:left-[13%] lg:top-[5%] lg:left-[13%] xl:top-[7%] xl:left-[15%]"
                  : ""
              }
              ${
                index === 1
                  ? "top-[3%] left-[66%] md:top-[5%] md:left-[70%] lg:top-[5%] lg:left-[70%] xl:top-[7%] xl:left-[70%]"
                  : ""
              }
              ${
                index === 2
                  ? "top-[30%] left-[33%] md:top-[30%] md:left-[40%] lg:top-[25%] lg:left-[40%] xl:top-[25%] xl:left-[43%]"
                  : ""
              }
              ${
                index === 3
                  ? "top-[60%] left-[5%] md:top-[55%] md:left-[13%] lg:top-[53%] lg:left-[13%] xl:top-[53%] xl:left-[15%]"
                  : ""
              }
              ${
                index === 4
                  ? "top-[60%] left-[66%] md:top-[55%] md:left-[70%] lg:top-[53%] lg:left-[70%] xl:top-[53%] xl:left-[70%]"
                  : ""
              }`}>
            {/* Nail Design */}
            <div className="relative w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8">
              <div className="absolute w-2 h-2 md:w-2.5 md:h-2.5 lg:w-3 lg:h-3 bg-gray-600 rounded-full top-0 left-1/2 transform -translate-x-1/2 z-10" />
              <div className="absolute w-1 h-4 md:w-1.5 md:h-5 lg:w-2 lg:h-6 bg-gray-500 rounded-t-sm top-2 md:top-2.5 lg:top-3 left-1/2 transform -translate-x-1/2" />
            </div>
            {/* Note (positioned below the nail) */}
            {boardNotes[index] && (
              <div className="absolute top-14 md:top-16 lg:top-20">
                <Note
                  id={boardNotes[index]!.id}
                  initialText={boardNotes[index]!.text}
                  onTextChange={handleTextChange}
                  onDelete={handleDelete}
                  draggable={false}
                  editable={true}
                  onTypingStart={() => setIsTyping(true)}
                  onTypingEnd={() => setIsTyping(false)}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-12 w-[92vw] h-20 rounded-lg flex items-center justify-center p-4 space-x-2">
        {bucketNotes.map((note) => (
          <Note
            key={note.id}
            id={note.id}
            initialText={note.text}
            draggable={true}
            editable={false}
          />
        ))}
      </div>
    </div>
  );
};

export default Board;
