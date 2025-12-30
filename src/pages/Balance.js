import React from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Stack,
  Chip,
  Divider,
  Button,
  LinearProgress,
  Tooltip,
  TextField,
  MenuItem,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";

import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import SavingsRoundedIcon from "@mui/icons-material/SavingsRounded";
import PieChartRoundedIcon from "@mui/icons-material/PieChartRounded";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";

function StatCard({ title, value, subtitle, icon, chipLabel }) {
  return (
    <Card variant="outlined" sx={{ borderRadius: 3 }}>
      <CardContent>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack spacing={0.5}>
            <Typography variant="overline" color="text.secondary">
              {title}
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              {value}
            </Typography>
            {subtitle ? (
              <Typography variant="body2" color="text.secondary">
                {subtitle}
              </Typography>
            ) : null}
          </Stack>

          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: 2,
              display: "grid",
              placeItems: "center",
              bgcolor: "action.hover",
            }}
          >
            {icon}
          </Box>
        </Stack>

        {chipLabel ? (
          <Box mt={2}>
            <Chip size="small" label={chipLabel} />
          </Box>
        ) : null}
      </CardContent>
    </Card>
  );
}

/* --------------------- TOP: Trust Wallet Deposit --------------------- */

function TrustWalletDeposit() {
  const [token, setToken] = React.useState("USDT");
  const [network, setNetwork] = React.useState("BEP20");
  const [amount, setAmount] = React.useState("");
  const [snack, setSnack] = React.useState({ open: false, msg: "", sev: "success" });

  // Demo addresses (replace with your backend-generated address per user)
  const addressByNetwork = React.useMemo(
    () => ({
      BEP20: "0x2C6f7d0A2b0e7B1A3D9dF2b5c7A1bE0a2A2B3C4D",
      ERC20: "0x7E9a4B1c3D2eF0A1b2C3d4E5f6A7B8c9D0E1F2A3",
      TRC20: "TQ7x6n7mZp2xA7f4yQxkVxw8PqjXrVqk9B",
    }),
    []
  );

  const address = addressByNetwork[network];

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setSnack({ open: true, msg: "Deposit address copied.", sev: "success" });
    } catch {
      setSnack({ open: true, msg: "Copy failed. Please copy manually.", sev: "error" });
    }
  };

  // Best-effort: open Trust Wallet app (mobile). Desktop will just open a blank/new tab.
  const openTrustWallet = () => window.open("trust://", "_blank");

  return (
    <Card variant="outlined" sx={{ borderRadius: 3 }}>
      <CardContent>
        <Stack direction={{ xs: "column", md: "row" }} spacing={2} alignItems={{ md: "center" }} justifyContent="space-between">
          <Stack spacing={0.5}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: 2,
                  display: "grid",
                  placeItems: "center",
                  bgcolor: "action.hover",
                }}
              >
                <AccountBalanceWalletRoundedIcon />
              </Box>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 900, lineHeight: 1.1 }}>
                  Deposit (Trust Wallet)
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Select token + network, copy address, and send from Trust Wallet.
                </Typography>
              </Box>
            </Stack>

            <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mt: 1 }}>
              <Chip size="small" icon={<VerifiedRoundedIcon />} label="Wallet deposit enabled" variant="outlined" />
              <Chip size="small" icon={<WarningAmberRoundedIcon />} label="Send only on selected network" color="warning" variant="outlined" />
            </Stack>
          </Stack>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={1} alignItems={{ sm: "center" }}>
            <Button variant="contained" onClick={openTrustWallet} endIcon={<OpenInNewRoundedIcon />}>
              Open Trust Wallet
            </Button>
            <Button variant="outlined" onClick={copyAddress} startIcon={<ContentCopyRoundedIcon />}>
              Copy Address
            </Button>
          </Stack>
        </Stack>

        <Divider sx={{ my: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <TextField select fullWidth size="small" label="Deposit Token" value={token} onChange={(e) => setToken(e.target.value)}>
              <MenuItem value="USDT">USDT</MenuItem>
              <MenuItem value="USDC">USDC</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField select fullWidth size="small" label="Network" value={network} onChange={(e) => setNetwork(e.target.value)}>
              <MenuItem value="BEP20">BEP20 (BSC)</MenuItem>
              <MenuItem value="ERC20">ERC20 (ETH)</MenuItem>
              <MenuItem value="TRC20">TRC20 (TRON)</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              size="small"
              label="Amount (optional)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="e.g. 100"
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <Chip
              sx={{ height: 40, width: "100%", justifyContent: "flex-start", pl: 1.2 }}
              variant="outlined"
              label={`Expected: ${amount ? `${amount} ${token}` : `Any ${token}`}`}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.75 }}>
              Deposit Address
            </Typography>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={1} alignItems={{ sm: "center" }}>
              <TextField fullWidth size="small" value={address} InputProps={{ readOnly: true }} />
              <Tooltip title="Copy address">
                <IconButton onClick={copyAddress}>
                  <ContentCopyRoundedIcon />
                </IconButton>
              </Tooltip>
            </Stack>

            <Alert severity="warning" variant="outlined" sx={{ mt: 1.5 }}>
              If you send <b>{token}</b> on the wrong network, funds may be lost. Always confirm network inside Trust Wallet.
            </Alert>

            <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 1 }}>
              Production tip: generate unique address per user and verify confirmations server-side.
            </Typography>
          </Grid>
        </Grid>

        <Snackbar
          open={snack.open}
          autoHideDuration={2200}
          onClose={() => setSnack((s) => ({ ...s, open: false }))}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert severity={snack.sev} variant="filled" onClose={() => setSnack((s) => ({ ...s, open: false }))}>
            {snack.msg}
          </Alert>
        </Snackbar>
      </CardContent>
    </Card>
  );
}

/* --------------------- Page --------------------- */

export default function Balance() {
  const equity = 12850.75;
  const balance = 12000.0;
  const profitToday = 185.5;
  const marginUsedPct = 42; // demo %

  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <Stack spacing={0.5} mb={2}>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>
          Balance Overview
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Track your account status, equity, and risk metrics.
        </Typography>
      </Stack>

      {/* ✅ Deposit section at TOP */}
      <Box mb={2}>
        <TrustWalletDeposit />
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <StatCard
            title="Account Balance"
            value={`$${balance.toLocaleString(undefined, { maximumFractionDigits: 2 })}`}
            subtitle="Available for trading"
            chipLabel="Updated just now"
            icon={<AccountBalanceWalletRoundedIcon />}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard
            title="Equity"
            value={`$${equity.toLocaleString(undefined, { maximumFractionDigits: 2 })}`}
            subtitle="Balance + floating P/L"
            chipLabel={`Today +$${profitToday.toFixed(2)}`}
            icon={<TrendingUpRoundedIcon />}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard
            title="Free Margin"
            value={`$${(equity - 3200).toLocaleString(undefined, { maximumFractionDigits: 2 })}`}
            subtitle="Funds not tied in positions"
            chipLabel="Healthy"
            icon={<SavingsRoundedIcon />}
          />
        </Grid>

        <Grid item xs={12} md={7}>
          <Card variant="outlined" sx={{ borderRadius: 3, height: "100%" }}>
            <CardContent>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Stack spacing={0.5}>
                  <Typography variant="h6" sx={{ fontWeight: 800 }}>
                    Risk & Margin
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Keep margin usage under control to reduce liquidation risk.
                  </Typography>
                </Stack>
                <Tooltip title="Demo component">
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: 2,
                      display: "grid",
                      placeItems: "center",
                      bgcolor: "action.hover",
                    }}
                  >
                    <PieChartRoundedIcon />
                  </Box>
                </Tooltip>
              </Stack>

              <Divider sx={{ my: 2 }} />

              <Stack spacing={1.25}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Typography variant="body2" color="text.secondary">
                    Margin used
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>
                    {marginUsedPct}%
                  </Typography>
                </Stack>

                <LinearProgress variant="determinate" value={marginUsedPct} sx={{ height: 10, borderRadius: 999 }} />

                <Typography variant="caption" color="text.secondary">
                  Tip: Keep margin usage below 60% for safer trading.
                </Typography>
              </Stack>

              <Divider sx={{ my: 2 }} />

              <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
                <Button variant="contained" size="medium">
                  Deposit
                </Button>
                <Button variant="outlined" size="medium">
                  View Statements
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={5}>
          <Card variant="outlined" sx={{ borderRadius: 3, height: "100%" }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 800 }}>
                Quick Summary
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                Snapshot of account performance.
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Stack spacing={1.25}>
                <Row label="Open positions" value="3" />
                <Row label="Win rate (30d)" value="58%" />
                <Row label="Max drawdown (30d)" value="4.2%" />
                <Row label="Avg. trade duration" value="2h 18m" />
              </Stack>

              <Divider sx={{ my: 2 }} />

              <Typography variant="caption" color="text.secondary">
                *Numbers shown are sample data. Replace with live metrics from your backend.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

function Row({ label, value }) {
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body2" sx={{ fontWeight: 700 }}>
        {value}
      </Typography>
    </Stack>
  );
}
