"use client"
import { Box} from '@mui/material';
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

type MuiTextEditProps = {
    value: string;
    onChange:(vlaue:string)=> void;
};


const TextEditor = ({value, onChange}: MuiTextEditProps) => {
    const editor = useEditor({
        extensions: [StarterKit],
        content: value,
        onUpdate: ({ editor }) => {
          onChange(editor.getHTML());
        },
      });

  return (
    <Box sx={{ p: 2 }}>
      <Box
        sx={{
          border: '1px solid #ccc',
          borderRadius: '4px',
          '& .ql-container': {
            minHeight: '150px',
            fontSize: '16px',
          },
        }}
      >
        <EditorContent editor={editor} />
      </Box>
    </Box>
  );
};

export default TextEditor;
