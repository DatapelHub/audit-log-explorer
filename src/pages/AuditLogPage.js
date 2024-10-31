import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getAuditEvents } from '../api/auditLogApi';
import AuditLogTable from '../components/AuditLogTable';
import { 
  Container, 
  Button, 
  Box, 
  Typography, 
  CircularProgress,
  Pagination,
  FormControl,
  Select,
  MenuItem,
  InputLabel
} from '@mui/material';

function AuditLogPage() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const data = await getAuditEvents(token, page, pageSize);
      setLogs(data.results);
      setTotalCount(data.totalCount);
      setError('');
    } catch (error) {
      setError(error.message);
      if (error.message === 'Token expired') {
        logout();
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [page, pageSize]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setPage(1);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4">Audit Logs</Typography>
        <Box>
          <Button 
            variant="contained" 
            onClick={fetchLogs} 
            sx={{ mr: 2 }}
          >
            Refresh
          </Button>
          <Button 
            variant="outlined" 
            onClick={logout}
          >
            Logout
          </Button>
        </Box>
      </Box>

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <AuditLogTable logs={logs} />
          
          <Box display="flex" justifyContent="space-between" alignItems="center" mt={3}>
            <FormControl variant="outlined" size="small">
              <InputLabel>Rows per page</InputLabel>
              <Select
                value={pageSize}
                onChange={handlePageSizeChange}
                label="Rows per page"
                sx={{ minWidth: 120 }}
              >
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={50}>50</MenuItem>
              </Select>
            </FormControl>

            <Pagination
              count={Math.ceil(totalCount / pageSize)}
              page={page}
              onChange={handlePageChange}
              color="primary"
              showFirstButton
              showLastButton
            />
          </Box>
        </>
      )}
    </Container>
  );
}

export default AuditLogPage; 