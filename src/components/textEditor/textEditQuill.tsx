"use client";
import "react-quill/dist/quill.snow.css";
import ReactQuill from 'react-quill-new';
import { useMemo } from "react";
import ClientOnly from "./ClientOnly";


type Props = {
	value: string;
	onChange: (val: string) => void;
};

const QuillEditor = ({ value, onChange }: Props) => {
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
		<ClientOnly>
			<div className='border rounded p-2'>
				<ReactQuill
					value={value}
					onChange={onChange}
					modules={modules}
					theme='snow'
				/>
			</div>
		</ClientOnly>
	);
};

export default QuillEditor;
