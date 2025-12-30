import React from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Stack,
  Divider,
  TextField,
  MenuItem,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Snackbar,
} from "@mui/material";

export default function Withdraw() {
  const [method, setMethod] = React.useState("USDT");
  const [amount, setAmount] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [snack, setSnack] = React.useState({ open: false, msg: "", sev: "success" });

  const fee = method === "USDT" ? 2.5 : 1.0; // demo
  const numericAmount = Number(amount || 0);
  const receive = Math.max(0, numericAmount - fee);

  const submit = () => {
    setOpen(false);
    setSnack({ open: true, msg: "Withdrawal request submitted successfully.", sev: "success" });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <Stack spacing={0.5} mb={2}>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>
          Withdraw
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Request payouts securely. Add 2FA + KYC rules later in backend.
        </Typography>
      </Stack>

      <Grid container spacing={2}>
        <Grid item xs={12} md={7}>
          <Card variant="outlined" sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 800 }}>
                Withdrawal Form
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Choose payout method and enter amount.
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    select
                    fullWidth
                    label="Method"
                    value={method}
                    onChange={(e) => setMethod(e.target.value)}
                  >
                    <MenuItem value="USDT">USDT (TRC20)</MenuItem>
                    <MenuItem value="Bank">Bank Transfer</MenuItem>
                  </TextField>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Amount (USD)"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    inputProps={{ min: 0 }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label={method === "USDT" ? "USDT Wallet Address" : "Bank Account Details"}
                    placeholder={method === "USDT" ? "Txxxxxxxxxxxxxxxxxxxx" : "Account name, IBAN/Account No, Bank name"}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    multiline
                    minRows={3}
                  />
                </Grid>
              </Grid>

              <Divider sx={{ my: 2 }} />

              <Stack spacing={0.75}>
                <Typography variant="body2" color="text.secondary">
                  Fee (demo): ${fee.toFixed(2)}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 900 }}>
                  You will receive: ${receive.toFixed(2)}
                </Typography>
              </Stack>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={1} mt={2}>
                <Button
                  variant="contained"
                  size="large"
                  disabled={!amount || !address}
                  onClick={() => setOpen(true)}
                >
                  Review & Confirm
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => {
                    setAmount("");
                    setAddress("");
                  }}
                >
                  Clear
                </Button>
              </Stack>

              <Alert sx={{ mt: 2 }} severity="info" variant="outlined">
                For production: validate wallet format, add OTP/2FA, and enforce min/max withdrawal rules.
              </Alert>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={5}>
          <Card variant="outlined" sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 800 }}>
                Processing Times
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Typical payout timeline (sample).
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Stack spacing={1}>
                <Alert severity="success" variant="outlined">
                  USDT: 10–30 minutes
                </Alert>
                <Alert severity="warning" variant="outlined">
                  Bank: 1–3 business days
                </Alert>
                <Alert severity="info" variant="outlined">
                  Delays possible during weekends/holidays
                </Alert>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Confirm Withdrawal</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={1}>
            <Typography variant="body2" color="text.secondary">
              Method
            </Typography>
            <Typography sx={{ fontWeight: 800 }}>{method}</Typography>

            <Typography variant="body2" color="text.secondary" mt={1}>
              Amount
            </Typography>
            <Typography sx={{ fontWeight: 800 }}>${numericAmount.toFixed(2)}</Typography>

            <Typography variant="body2" color="text.secondary" mt={1}>
              Estimated fee
            </Typography>
            <Typography sx={{ fontWeight: 800 }}>${fee.toFixed(2)}</Typography>

            <Typography variant="body2" color="text.secondary" mt={1}>
              Receive
            </Typography>
            <Typography sx={{ fontWeight: 900 }}>${receive.toFixed(2)}</Typography>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={submit}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

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
