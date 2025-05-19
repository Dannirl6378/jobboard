"use client";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";

import { useMemo } from "react";
import ClientOnly from "./ClientOnly";
import { Box } from "@mui/material";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
type Props = {
	value: string;
	onChange: (val: string) => void;
    edit: boolean;
};

const QuillEditor = ({ value, onChange,edit }: Props) => {
	const modules = useMemo(
		() => ({
			toolbar: [
				[{ header: [1, 2, 3, false] }],
				["bold", "italic", "underline", "strike"],
				[{ color: [] }, { background: [] }],
				[{ list: "ordered" }, { list: "bullet" }],
				[{ align: [] }],
				["blockquote", "code-block"],
				["link", "image"],
				["clean"],
			],
		}),
		[]
	);

	return (
		<>
			<Box sx={{ border: "1px solid #ccc", borderRadius: "4px", padding: "10px",fontStyle: "italic", fontSize: "14px", fontFamily: "Arial, sans-serif",color: "black",maxWidth:"100%" }}>
				<ReactQuill
					value={value}
					onChange={onChange}
					modules={modules}
					theme='snow'
                    readOnly={!edit}
				/>
			</Box>
		</>
	);
};

export default QuillEditor;
