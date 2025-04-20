import {
    Box,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Grid,
    Typography
  } from '@mui/material';
import PageContainer from './PageContainer';

  const LeftCheckBoxs = () => {
    return(
        <PageContainer >
    {/* Levý panel s filtry */}
    <Grid size={{xs:12,md:11}} sx={{ml:-15}} >
      <Box sx={{ bgcolor: '#D5DEFF', p: 2, borderRadius: 2,color: 'black',maxWidth:'20vw' }}>
        <Typography variant="h6" gutterBottom>Filtry</Typography>

        {/* Checkboxy */}
        <FormGroup>
          <FormControlLabel control={<Checkbox />} label="Plný úvazek" />
          <FormControlLabel control={<Checkbox />} label="Částečný úvazek" />
          <FormControlLabel control={<Checkbox />} label="IČO" />
          <FormControlLabel control={<Checkbox />} label="Práce z domu" />
          <FormControlLabel control={<Checkbox />} label="Hybrid" />
        </FormGroup>
      </Box>
    </Grid>
</PageContainer>

    )
  }
  export default LeftCheckBoxs;