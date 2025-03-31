import React, { useState } from "react";

interface NoteProps {
  id: string;
  initialText?: string;
  onTextChange?: (id: string, text: string) => void;
  onDelete?: (id: string) => void;
  draggable?: boolean;
  editable?: boolean;
  onTypingStart?: () => void; 
  onTypingEnd?: () => void;
}

const Note: React.FC<NoteProps> = ({
  id,
  initialText = "",
  onTextChange,
  onDelete,
  draggable = true,
  editable = false,
  onTypingStart,
  onTypingEnd,
}) => {
  const [text, setText] = useState(initialText);
  const [isHovered, setIsHovered] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    if (onTextChange) onTextChange(id, newText);
    if (onTypingStart && !text) onTypingStart();
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("noteId", id);
  };

  const handleDelete = () => {
    if (onDelete) onDelete(id);
  };

   const handleBlur = () => {
     if (onTypingEnd) {
       onTypingEnd();
       setTimeout(() => {
         if (onTypingEnd) onTypingEnd();
       }, 500);
     } 
   };

  return (
    <div
      draggable={draggable}
      onDragStart={handleDragStart}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
      className={`relative w-28 md:w-40 h-18 md:h-24 xl:w-48 xl:h-28 bg-yellow-200 cursor-pointer p-2 shadow-md rounded-sm flex items-center justify-center transition-transform duration-200 ${
        isHovered ? "rotate-4 scale-115" : ""
      }`}>
      {editable ? (
        <textarea
          value={text}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Type your Suggestions..."
          className="w-full h-20 py-6 px-2 text-center bg-transparent border-none outline-none resize-none font-bold tracking-wide leading-4 text-[.7rem] xl:text-[.8rem]"
        />
      ) : (
        <span className="font-bold xl:text-lg italic">
          {text || "Drag me!"}
        </span>
      )}

      {!draggable && (
        <button
          onClick={handleDelete}
          className="absolute top-0 cursor-pointer right-0 w-6 h-6 text-red-800 font-bold flex items-center justify-center text-md">
          ×
        </button>
      )}
    </div>
  );
};

export default Note;