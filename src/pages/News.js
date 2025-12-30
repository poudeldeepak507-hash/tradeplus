import React from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Stack,
  Divider,
  TextField,
  Grid,
  Chip,
  Button,
} from "@mui/material";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";

const sampleNews = [
  { title: "Gold holds steady ahead of key macro data", tag: "XAUUSD", source: "Market Desk", time: "2h ago" },
  { title: "Bitcoin volatility rises as liquidity thins", tag: "BTCUSD", source: "Crypto Wire", time: "6h ago" },
  { title: "EURUSD reacts to central bank commentary", tag: "EURUSD", source: "FX Brief", time: "1d ago" },
];

export default function News() {
  const [q, setQ] = React.useState("");

  const filtered = sampleNews.filter((n) =>
    (n.title + n.tag + n.source).toLowerCase().includes(q.toLowerCase())
  );

  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <Stack spacing={0.5} mb={2}>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>
          Top News
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Headlines relevant to your trading watchlist (demo content).
        </Typography>
      </Stack>

      <Card variant="outlined" sx={{ borderRadius: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                label="Search headlines"
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Button fullWidth variant="contained">
                Refresh
              </Button>
            </Grid>
          </Grid>

          <Divider sx={{ my: 2 }} />

          <Stack spacing={2}>
            {filtered.map((n, idx) => (
              <Card key={idx} variant="outlined" sx={{ borderRadius: 3 }}>
                <CardContent>
                  <Stack direction="row" alignItems="flex-start" justifyContent="space-between" spacing={2}>
                    <Stack spacing={0.5}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 900 }}>
                        {n.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {n.source} • {n.time}
                      </Typography>
                      <Chip size="small" label={n.tag} sx={{ width: "fit-content", mt: 1 }} />
                    </Stack>
                    <Button variant="text" endIcon={<OpenInNewRoundedIcon />}>
                      Open
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Stack>

          <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 2 }}>
            Replace sample list with your real news API (ForexFactory, TradingView, NewsAPI, etc.).
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}
