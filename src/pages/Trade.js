import React from "react";
import {
  Container, Grid, Card, CardContent, Typography, Stack, Divider, TextField,
  MenuItem, Button, Chip, Box, Snackbar, Alert
} from "@mui/material";
import CandlestickChartRoundedIcon from "@mui/icons-material/CandlestickChartRounded";
import SwapHorizRoundedIcon from "@mui/icons-material/SwapHorizRounded";

const TV_SCRIPT = "https://s3.tradingview.com/tv.js";

function useTradingViewScript() {
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    if (window.TradingView) return setReady(true);

    const exist = document.querySelector(`script[src="${TV_SCRIPT}"]`);
    if (exist) {
      const onLoad = () => setReady(true);
      exist.addEventListener("load", onLoad);
      return () => exist.removeEventListener("load", onLoad);
    }

    const s = document.createElement("script");
    s.src = TV_SCRIPT;
    s.async = true;
    s.onload = () => setReady(true);
    document.body.appendChild(s);
  }, []);

  return ready;
}

function TradingViewWidget({ symbol, interval }) {
  const ready = useTradingViewScript();
  const id = React.useMemo(() => `tv_${Math.random().toString(16).slice(2)}`, []);

  React.useEffect(() => {
    if (!ready || !window.TradingView) return;

    const el = document.getElementById(id);
    if (el) el.innerHTML = "";

    new window.TradingView.widget({
      autosize: true,
      symbol,
      interval,            // "15","60","240","D"
      timezone: "Etc/UTC",
      theme: "light",
      style: "1",
      locale: "en",
      enable_publishing: false,
      hide_top_toolbar: false,
      hide_legend: false,
      withdateranges: true,
      allow_symbol_change: false,
      container_id: id,
    });
  }, [ready, symbol, interval, id]);

  return (
    <Box sx={{ height: 420, borderRadius: 2, overflow: "hidden", bgcolor: "background.paper" }}>
      <div id={id} style={{ height: "100%", width: "100%" }} />
    </Box>
  );
}

export default function Trade() {
  // chart controls
  const [tvSymbol, setTvSymbol] = React.useState("BINANCE:BTCUSDT");
  const [tf, setTf] = React.useState("60"); // 1H

  // ticket
  const [side, setSide] = React.useState("BUY");
  const [vol, setVol] = React.useState(0.1);
  const [entry, setEntry] = React.useState("");
  const [sl, setSl] = React.useState("");
  const [tp, setTp] = React.useState("");

  const [snack, setSnack] = React.useState({ open: false, msg: "", sev: "success" });

  const presets = [
    { v: "BINANCE:BTCUSDT", l: "BTCUSDT" },
    { v: "BINANCE:ETHUSDT", l: "ETHUSDT" },
    { v: "BINANCE:SOLUSDT", l: "SOLUSDT" },
    { v: "FX:EURUSD", l: "EURUSD" },
    { v: "OANDA:XAUUSD", l: "XAUUSD" },
  ];

  const ranges = [
    { v: "15", l: "15M" },
    { v: "60", l: "1H" },
    { v: "240", l: "4H" },
    { v: "D", l: "1D" },
  ];

  const placeOrder = () => {
    setSnack({
      open: true,
      sev: "success",
      msg: `Order: ${side} ${vol} lot(s) ${tvSymbol}${entry ? ` (Entry ${entry})` : " (Market)"}`,
    });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <Stack spacing={0.5} mb={2}>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>Trade</Typography>
        <Typography variant="body2" color="text.secondary">
          TradingView chart on top + symbol selector + order ticket.
        </Typography>
      </Stack>

      {/* TOP: CHART CARD */}
      <Card variant="outlined" sx={{ borderRadius: 3, mb: 2 }}>
        <CardContent>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack spacing={0.25}>
              <Typography variant="h6" sx={{ fontWeight: 800 }}>Chart</Typography>
              <Typography variant="body2" color="text.secondary">
                {tvSymbol} • timeframe {tf}
              </Typography>
            </Stack>
            <Box sx={{ width: 44, height: 44, borderRadius: 2, display: "grid", placeItems: "center", bgcolor: "action.hover" }}>
              <CandlestickChartRoundedIcon />
            </Box>
          </Stack>

          <Divider sx={{ my: 2 }} />

          {/* Selector + TF buttons */}
          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.2} alignItems={{ xs: "stretch", sm: "center" }} mb={2}>
            <TextField
              select
              label="Symbol"
              value={tvSymbol}
              onChange={(e) => setTvSymbol(e.target.value)}
              sx={{ minWidth: { sm: 240 } }}
              size="small"
            >
              {presets.map((p) => (
                <MenuItem key={p.v} value={p.v}>{p.l}</MenuItem>
              ))}
            </TextField>

            <Stack direction="row" spacing={1} flexWrap="wrap">
              {ranges.map((r) => (
                <Button
                  key={r.v}
                  size="small"
                  variant={tf === r.v ? "contained" : "outlined"}
                  onClick={() => setTf(r.v)}
                >
                  {r.l}
                </Button>
              ))}
              <Chip size="small" variant="outlined" label={tvSymbol} />
            </Stack>
          </Stack>

          <TradingViewWidget symbol={tvSymbol} interval={tf} />

          <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 1.5 }}>
            If chart is blank, try another symbol (some networks block TradingView resources).
          </Typography>
        </CardContent>
      </Card>

      {/* BELOW: ORDER TICKET */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card variant="outlined" sx={{ borderRadius: 3 }}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Stack spacing={0.25}>
                  <Typography variant="h6" sx={{ fontWeight: 800 }}>Order Ticket</Typography>
                  <Typography variant="body2" color="text.secondary">BUY/SELL + Entry/SL/TP</Typography>
                </Stack>
                <Box sx={{ width: 44, height: 44, borderRadius: 2, display: "grid", placeItems: "center", bgcolor: "action.hover" }}>
                  <SwapHorizRoundedIcon />
                </Box>
              </Stack>

              <Divider sx={{ my: 2 }} />

              <Stack spacing={2}>
                <Chip size="small" variant="outlined" label={`Selected: ${tvSymbol}`} />

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField select fullWidth label="Side" value={side} onChange={(e) => setSide(e.target.value)}>
                      <MenuItem value="BUY">BUY</MenuItem>
                      <MenuItem value="SELL">SELL</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      type="number"
                      label="Volume (lots)"
                      value={vol}
                      onChange={(e) => setVol(Number(e.target.value))}
                      inputProps={{ step: 0.01, min: 0.01 }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <TextField fullWidth label="Entry (optional)" value={entry} onChange={(e) => setEntry(e.target.value)} />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField fullWidth label="Stop Loss" value={sl} onChange={(e) => setSl(e.target.value)} />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField fullWidth label="Take Profit" value={tp} onChange={(e) => setTp(e.target.value)} />
                  </Grid>
                </Grid>

                <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
                  <Button variant="contained" size="large" onClick={placeOrder}>Place Order</Button>
                  <Button variant="outlined" size="large" onClick={() => { setEntry(""); setSl(""); setTp(""); }}>
                    Reset
                  </Button>
                </Stack>

                <Typography variant="caption" color="text.secondary">
                  Demo UI only. Real trades need broker/exchange API.
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Optional: quick info card */}
        <Grid item xs={12} md={6}>
          <Card variant="outlined" sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 800 }}>Quick Tips</Typography>
              <Divider sx={{ my: 2 }} />
              <Stack spacing={1}>
                <Alert severity="info" variant="outlined">
                  Use XAUUSD for gold, EURUSD for forex, BTCUSDT for crypto.
                </Alert>
                <Alert severity="warning" variant="outlined">
                  If TradingView is blocked on your network, you’ll need VPN or self-hosted datafeed.
                </Alert>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Snackbar
        open={snack.open}
        autoHideDuration={2500}
        onClose={() => setSnack((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={snack.sev} variant="filled" onClose={() => setSnack((s) => ({ ...s, open: false }))}>
          {snack.msg}
        </Alert>
      </Snackbar>
    </Container>
  );
}
