import { Button, FormControlLabel, Switch } from "@mui/material";
import { Box } from "@mui/system";

interface Props {
	deleteDemoChecked: boolean;
	handleSwitchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	handleConfirmDeleteDemo: () => void;
};

export default function AdminMaster({
	deleteDemoChecked,
	handleSwitchChange,
	handleConfirmDeleteDemo,
}: Props) {
	return (
		<>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					gap: 1,
					mb: 2,
					border: "1px solid #ccc",
					p: 2,
					borderRadius: 2,
					bgcolor: "#f5f7fa",
				}}
			>
				<FormControlLabel
					control={
						<Switch
							checked={deleteDemoChecked}
							onChange={handleSwitchChange}
							color='warning'
						/>
					}
					label='Smazat Demo Data'
				/>
				<Button
					variant='contained'
					color='error'
					disabled={!deleteDemoChecked}
					onClick={handleConfirmDeleteDemo}
				>
					Potvrdit smazání
				</Button>
			</Box>
		</>
	);
}
