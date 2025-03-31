import React from "react";
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
declare const Note: React.FC<NoteProps>;
export default Note;
