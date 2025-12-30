import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  Box,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import Deposit from "./pages/Deposit";
import Balance from "./pages/Balance";
import Trade from "./pages/Trade";
import ProfitLoss from "./pages/ProfitLoss";
import Transactions from "./pages/Transactions";
import Withdraw from "./pages/Withdraw";
import News from "./pages/News";

import logoA from "./pages/logoA.png";

const navItems = [
  { label: "Balance", path: "/" },
  { label: "Trade", path: "/trade" },
  { label: "Profit/Loss", path: "/profit-loss" },
  { label: "Transactions", path: "/transactions" },
  { label: "Withdraw", path: "/withdraw" },
  { label: "Top News", path: "/news" },
];

function Navigation() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const location = useLocation();
  const currentTab = navItems.findIndex(
    (item) => item.path === location.pathname
  );

  const [drawerOpen, setDrawerOpen] = React.useState(false);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          {/* Logo */}
          <Box
            component={Link}
            to="/"
            sx={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              color: "inherit",
              mr: 3,
            }}
          >
            <Box component="img" src={logoA} alt="Logo" sx={{ height: 36, mr: 1 }} />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 500,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              Trading+
            </Typography>
          </Box>

          {/* Mobile Menu */}
          {isMobile ? (
            <>
              <Box sx={{ flexGrow: 1 }} />
              <IconButton color="inherit" onClick={() => setDrawerOpen(true)}>
                <MenuIcon />
              </IconButton>
            </>
          ) : (
            <Tabs
              value={currentTab === -1 ? false : currentTab}
              textColor="inherit"
              indicatorColor="secondary"
            >
              {navItems.map((item) => (
                <Tab
                  key={item.path}
                  label={item.label}
                  component={Link}
                  to={item.path}
                />
              ))}
            </Tabs>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 250 }}>
          <List>
            {navItems.map((item) => (
              <ListItemButton
                key={item.path}
                component={Link}
                to={item.path}
                onClick={() => setDrawerOpen(false)}
              >
                <ListItemText primary={item.label} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <Navigation />

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
  );
}
