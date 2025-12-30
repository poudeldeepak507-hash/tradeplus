import React from "react";
import {
  Container,
  Grid,
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
  MenuItem,
} from "@mui/material";

const rows = [
  { date: "2025-12-30", symbol: "XAUUSD", type: "BUY", pnl: 78.5 },
  { date: "2025-12-29", symbol: "BTCUSD", type: "SELL", pnl: -42.2 },
  { date: "2025-12-28", symbol: "EURUSD", type: "BUY", pnl: 19.1 },
  { date: "2025-12-27", symbol: "XAUUSD", type: "SELL", pnl: 55.0 },
];

export default function ProfitLoss() {
  const [range, setRange] = React.useState("30d");

  const total = rows.reduce((a, r) => a + r.pnl, 0);
  const win = rows.filter((r) => r.pnl > 0).length;
  const loss = rows.filter((r) => r.pnl < 0).length;

  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <Stack spacing={0.5} mb={2}>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>
          Profit / Loss
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Performance summary and closed trades history.
        </Typography>
      </Stack>

      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Card variant="outlined" sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="overline" color="text.secondary">
                Net P/L ({range})
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 900, mt: 0.5 }}>
                {total >= 0 ? "+" : "-"}${Math.abs(total).toFixed(2)}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Stack direction="row" spacing={1}>
                <Chip label={`Wins: ${win}`} />
                <Chip label={`Losses: ${loss}`} variant="outlined" />
              </Stack>

              <Stack mt={2}>
                <TextField
                  select
                  label="Range"
                  value={range}
                  onChange={(e) => setRange(e.target.value)}
                  size="small"
                >
                  <MenuItem value="7d">Last 7 days</MenuItem>
                  <MenuItem value="30d">Last 30 days</MenuItem>
                  <MenuItem value="90d">Last 90 days</MenuItem>
                </TextField>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card variant="outlined" sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 800 }}>
                Closed Trades
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Recent history (sample data).
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Symbol</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell align="right">P/L</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((r, idx) => (
                    <TableRow key={idx} hover>
                      <TableCell>{r.date}</TableCell>
                      <TableCell>{r.symbol}</TableCell>
                      <TableCell>
                        <Chip size="small" label={r.type} variant="outlined" />
                      </TableCell>
                      <TableCell align="right">
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: 800 }}
                          color={r.pnl >= 0 ? "success.main" : "error.main"}
                        >
                          {r.pnl >= 0 ? "+" : "-"}${Math.abs(r.pnl).toFixed(2)}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 2 }}>
                Replace `rows` with your backend trade history API.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
