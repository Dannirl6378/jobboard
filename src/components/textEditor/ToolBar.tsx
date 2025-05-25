"use client";
import { useState } from "react";

const colors = [
  "#000000", "#e60000", "#ff9900", "#ffff00", "#008a00",
  "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc",
  "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff",
];

type TipTapMenuProps = {
    editor: any;
}

const MenuBar = ({ editor }:TipTapMenuProps) => {
  const [textColor, setTextColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");

  if (!editor) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-2 border-b pb-2">
      {/* Standardní tlačítka */}
      <button onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive("bold") ? "font-bold text-blue-500" : ""}>Bold</button>
      <button onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive("italic") ? "italic text-blue-500" : ""}>Italic</button>
      <button onClick={() => editor.chain().focus().toggleUnderline().run()} className={editor.isActive("underline") ? "underline text-blue-500" : ""}>Underline</button>
      <button onClick={() => editor.chain().focus().setHeading({ level: 1 }).run()} className={editor.isActive("heading", { level: 1 }) ? "text-blue-500" : ""}>H1</button>
      <button onClick={() => editor.chain().focus().setHeading({ level: 2 }).run()} className={editor.isActive("heading", { level: 2 }) ? "text-blue-500" : ""}>H2</button>
      <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={editor.isActive("bulletList") ? "text-blue-500" : ""}>List</button>

      {/* Barva textu */}
      <select
        value={textColor}
        onChange={(e) => {
          const color = e.target.value;
          setTextColor(color);
          editor.chain().focus().setColor(color).run();
        }}
        className="border px-1"
      >
        {colors.map((color) => (
          <option key={color} value={color} style={{ backgroundColor: color }}>
            {color}
          </option>
        ))}
      </select>

      {/* Barva pozadí (highlight) */}
      <select
        value={bgColor}
        onChange={(e) => {
          const color = e.target.value;
          setBgColor(color);
          editor.chain().focus().setHighlight({ color }).run();
        }}
        className="border px-1"
      >
        {colors.map((color) => (
          <option key={color} value={color} style={{ backgroundColor: color }}>
            {color}
          </option>
        ))}
      </select>

      <button onClick={() => editor.chain().focus().undo().run()}>Undo</button>
      <button onClick={() => editor.chain().focus().redo().run()}>Redo</button>
    </div>
  );
};
export default MenuBar;

