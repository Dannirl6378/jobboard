"use client"
import { Box} from '@mui/material';
import Editor, {
  BtnBold,
  BtnItalic,
  BtnUnderline,
  BtnStrikeThrough,
  BtnLink,
  BtnUndo,
  BtnRedo,
  Toolbar,
  createButton,
  BtnStyles,
  ContentEditableEvent,
} from 'react-simple-wysiwyg';
import BtnColorPicker from './colorPalete';

type MuiTextEditProps =  {
    value: string;
    onChange:(vlaue:string)=> void;
};
// toto asi nebude ten zprávny editor 




const TextEditor = ({value, onChange}: MuiTextEditProps) => {

  const handleChange = (e: ContentEditableEvent) => {
    onChange(e.target.value);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Box
        sx={{
          border: '1px solid #ccc',
          borderRadius: '4px',
          '& .ql-container': {
            minHeight: '150px',
            minWidth:"25vw",
            fontSize: '16px',
          },
        }}
      >
         <Editor value={value} onChange={handleChange} containerProps={{ style: { resize: 'both', color:"black" } }}>
          <Toolbar>
            <BtnUndo />
            <BtnRedo />
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <BtnLink />
            <BtnStyles/>
            <BtnColorPicker/>
          </Toolbar>
        </Editor>
      </Box>
    </Box>
  );
};

export default TextEditor;
