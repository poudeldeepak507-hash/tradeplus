import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Tabs, Tab, Box, Typography } from "@mui/material";

import Deposit from "./pages/Deposit";
import Balance from "./pages/Balance";
import Trade from "./pages/Trade";
import ProfitLoss from "./pages/ProfitLoss";
import Transactions from "./pages/Transactions";
import Withdraw from "./pages/Withdraw";
import News from "./pages/News";

import logoA from "./pages/logoA.png";

export default function App() {
  const [value, setValue] = React.useState(0);
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Box
            component={Link}
            to="/"
            sx={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              color: "inherit",
              mr: 4
            }}
          >
            <Box
              component="img"
              src={logoA}
              alt="TradePlus Logo"
              sx={{ height: 36, mr: 1 }}
            />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 400,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                fontFamily: "'Inter', 'Roboto', sans-serif",
              }}
            >
              Trading Plus
            </Typography>


          </Box>

          <Tabs
            value={value}
            onChange={(e, val) => setValue(val)}
            textColor="inherit"
            indicatorColor="secondary"
          >
            <Tab label="Balance" component={Link} to="/" />
            <Tab label="Trade" component={Link} to="/trade" />
            <Tab label="Profit/Loss" component={Link} to="/profit-loss" />
            <Tab label="Transactions" component={Link} to="/transactions" />
            <Tab label="Withdraw" component={Link} to="/withdraw" />
            <Tab label="Top News" component={Link} to="/news" />

          </Tabs>
        </Toolbar>
      </AppBar>
      <Box p={2}>
        <Routes>
          <Route path="/" element={<Balance />} />
          <Route path="/trade" element={<Trade />} />
          <Route path="/profit-loss" element={<ProfitLoss />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/withdraw" element={<Withdraw />} />
          <Route path="/news" element={<News />} />

        </Routes>
      </Box>
    </Router>
  )
}
