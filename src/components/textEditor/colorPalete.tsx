import { useState } from "react";

const BtnColorPicker = () => {
	const [color, setColor] = useState("#000000");

	const applyColor = (color: string) => {
		document.execCommand("foreColor", false, color);
	};

	return (
		<>
			<input
				type='color'
				value={color}
				onChange={(e) => {
					setColor(e.target.value);
					applyColor(e.target.value);
				}}
				title='Text color'
				style={{
					width: "32px",
					height: "32px",
					border: "none",
					background: "none",
					cursor: "pointer",
				}}
			/>
		</>
	);
};
export default BtnColorPicker;
