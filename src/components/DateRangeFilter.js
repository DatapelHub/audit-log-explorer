import { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button,
  IconButton,
  Tooltip
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

function DateRangeFilter({ onFilter, onClear }) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleFilter = () => {
    if (startDate && endDate) {
      onFilter({
        startDate: new Date(startDate).toISOString(),
        endDate: new Date(endDate).toISOString()
      });
    }
  };

  const handleClear = () => {
    setStartDate('');
    setEndDate('');
    onClear();
  };

  return (
    <Box display="flex" gap={2} alignItems="center" mb={3}>
      <TextField
        label="Start Date"
        type="datetime-local"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        InputLabelProps={{ shrink: true }}
        size="small"
      />
      <TextField
        label="End Date"
        type="datetime-local"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        InputLabelProps={{ shrink: true }}
        size="small"
      />
      <Button 
        variant="contained" 
        onClick={handleFilter}
        disabled={!startDate || !endDate}
      >
        Apply Filter
      </Button>
      <Tooltip title="Clear filter">
        <IconButton onClick={handleClear} size="small">
          <ClearIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
}

export default DateRangeFilter; 