// components/PageContainer.tsx
import { Container, ContainerProps } from "@mui/material";

type PageContainerProps = ContainerProps & {
  children: React.ReactNode;
};


const PageContainer = ({ children, ...props }: PageContainerProps) => {
	return (
		<>
			<Container maxWidth='lg' sx={{ mt: 4, mb: 4 }} {...props}>
				{children}
			</Container>
		</>
	);
};

export default PageContainer;
