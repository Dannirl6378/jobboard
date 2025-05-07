// components/PageContainer.tsx
import { Container, ContainerProps } from "@mui/material";

const PageContainer = ({ children, ...props }: ContainerProps) => {
	return (
		<>
			<Container maxWidth='lg' sx={{ mt: 4, mb: 4 }} {...props}>
				{children}
			</Container>
		</>
	);
};

export default PageContainer;
