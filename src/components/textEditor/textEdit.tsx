"use client";
import { EditorContent, useEditor } from "@tiptap/react";
import { Box } from "@mui/material";
import MenuBar from "./ToolBar";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Heading from "@tiptap/extension-heading";

type TipTapEditorProps = {
	value: string;
	onChange: (value: string) => void;
};

const TiptapEditor = ({ value, onChange }: TipTapEditorProps) => {
	const editor = useEditor({
		extensions: [
			StarterKit,
			Underline,
			TextStyle,
			Color,
			Heading.configure({ levels: [1, 2] }),
		],
		content: value,
		onUpdate({ editor }) {
			onChange(editor.getHTML());
		},
	},[value]);

	return (
		<Box sx={{ border: "1px solid #ccc", borderRadius: "4px", padding: "10px",fontStyle: "italic", fontSize: "14px", fontFamily: "Arial, sans-serif",color: "black" }}>
			<MenuBar editor={editor} />
			<EditorContent
				editor={editor}
				className='min-h-[150px] focus:outline-none'
			/>
		</Box>
	);
};
export default TiptapEditor;
