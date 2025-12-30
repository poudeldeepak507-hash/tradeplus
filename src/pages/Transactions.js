import React from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Stack,
  Divider,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  TextField,
  Grid,
  Button,
} from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";

const data = [
  { id: "TX-10291", type: "Deposit", method: "Bank", amount: 500, status: "Completed", date: "2025-12-30" },
  { id: "TX-10288", type: "Withdraw", method: "USDT", amount: 200, status: "Pending", date: "2025-12-29" },
  { id: "TX-10270", type: "Deposit", method: "Card", amount: 300, status: "Completed", date: "2025-12-27" },
];

export default function Transactions() {
  const [q, setQ] = React.useState("");
  const [status, setStatus] = React.useState("All");

  const filtered = data.filter((t) => {
    const matchQ = (t.id + t.type + t.method).toLowerCase().includes(q.toLowerCase());
    const matchS = status === "All" ? true : t.status === status;
    return matchQ && matchS;
  });

  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <Stack spacing={0.5} mb={2}>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>
          Transactions
        </Typography>
        <Typography variant="body2" color="text.secondary">
          View deposits and withdrawals with filters and export option.
        </Typography>
      </Stack>

      <Card variant="outlined" sx={{ borderRadius: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                value={q}
                onChange={(e) => setQ(e.target.value)}
                label="Search by ID / type / method"
                InputProps={{ startAdornment: <SearchRoundedIcon sx={{ mr: 1 }} /> }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                select
                fullWidth
                label="Status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="All">All</option>
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
                <option value="Failed">Failed</option>
              </TextField>
            </Grid>
            <Grid item xs={12} md={3}>
              <Button fullWidth variant="outlined" startIcon={<DownloadRoundedIcon />}>
                Export CSV
              </Button>
            </Grid>
          </Grid>

          <Divider sx={{ my: 2 }} />

          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Transaction ID</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Method</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map((t) => (
                <TableRow key={t.id} hover>
                  <TableCell sx={{ fontWeight: 700 }}>{t.id}</TableCell>
                  <TableCell>{t.type}</TableCell>
                  <TableCell>{t.method}</TableCell>
                  <TableCell align="right">${t.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Chip
                      size="small"
                      label={t.status}
                      color={t.status === "Completed" ? "success" : t.status === "Pending" ? "warning" : "error"}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>{t.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 2 }}>
            Hook your export button to generate CSV from filtered results.
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}
