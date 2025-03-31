import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
const Note = ({ id, initialText = "", onTextChange, onDelete, draggable = true, editable = false, onTypingStart, onTypingEnd, }) => {
    const [text, setText] = useState(initialText);
    const [isHovered, setIsHovered] = useState(false);
    const handleChange = (e) => {
        const newText = e.target.value;
        setText(newText);
        if (onTextChange)
            onTextChange(id, newText);
        if (onTypingStart && !text)
            onTypingStart();
    };
    const handleDragStart = (e) => {
        e.dataTransfer.setData("noteId", id);
    };
    const handleDelete = () => {
        if (onDelete)
            onDelete(id);
    };
    const handleBlur = () => {
        if (onTypingEnd) {
            onTypingEnd();
            setTimeout(() => {
                if (onTypingEnd)
                    onTypingEnd();
            }, 500);
        }
    };
    return (_jsxs("div", { draggable: draggable, onDragStart: handleDragStart, onMouseEnter: () => setIsHovered(true), onMouseLeave: () => setIsHovered(false), onTouchStart: () => setIsHovered(true), onTouchEnd: () => setIsHovered(false), className: `relative w-28 md:w-40 h-18 md:h-24 xl:w-48 xl:h-28 bg-yellow-200 cursor-pointer p-2 shadow-md rounded-sm flex items-center justify-center transition-transform duration-200 ${isHovered ? "rotate-4 scale-115" : ""}`, children: [editable ? (_jsx("textarea", { value: text, onChange: handleChange, onBlur: handleBlur, placeholder: "Type your Suggestions...", className: "w-full h-20 py-6 px-2 text-center bg-transparent border-none outline-none resize-none font-bold tracking-wide leading-4 text-[.7rem] xl:text-[.8rem]" })) : (_jsx("span", { className: "font-bold xl:text-lg italic", children: text || "Drag me!" })), !draggable && (_jsx("button", { onClick: handleDelete, className: "absolute top-0 cursor-pointer right-0 w-6 h-6 text-red-800 font-bold flex items-center justify-center text-md", children: "\u00D7" }))] }));
};
export default Note;
