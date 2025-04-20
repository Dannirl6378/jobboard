// components/JobsList.tsx
'use client';

import { Box } from '@mui/system';
import JobPage from '../app/job/page';
import { Typography } from '@mui/material';

const JobsList = () => {
  return (
    <Box sx={{ bgcolor: '#D5DEFF', p: 2, borderRadius: 2, margin: 'center',height:'48vh' }}>
      <Typography variant="h6" sx={{ color: 'black' }}>Seznam nabídek</Typography>
      <JobPage />
    </Box>
  );
};

export default JobsList;
