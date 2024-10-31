import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';

function AuditLogTable({ logs }) {
  const auditLogs = Array.isArray(logs) ? logs : [];

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Event Type</TableCell>
            <TableCell>Event Group</TableCell>
            <TableCell>Event Detail</TableCell>
            <TableCell>Timestamp</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {auditLogs.map((log, index) => (
            <TableRow key={log.AuditEventUid || index}>
              <TableCell>{log.EventType}</TableCell>
              <TableCell>{log.AuditEventGroup}</TableCell>
              <TableCell>{log.AuditEventDetail}</TableCell>
              <TableCell>
                {log.AuditEventTimeStamp ? 
                  new Date(log.AuditEventTimeStamp).toLocaleString() 
                  : ''}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default AuditLogTable; 