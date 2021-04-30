import React from "react";
import { ReactComponent as MultitudLogo } from "../../assets/multitud.svg";
import { ReactComponent as AudienceIcon } from "../../assets/icons/audience.svg";
import DashboardIcon from "@material-ui/icons/Dashboard";
import SettingsIcon from "@material-ui/icons/Settings";
import { Typography, makeStyles, List, ListItem } from "@material-ui/core";
import { Link } from "react-router-dom";

const createStyles = makeStyles((theme) => ({
  MuiSvgIcon: {
    width: 48,
    height: 48,
    display: "block",
  },
  svg: {
    fill: "#8B96C7",
    "&:hover": {
      fill: theme.palette.primary.main,
    },
  },
  logo: {
    "&:hover": {
      backgroundColor: "transparent",
    },
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: "transparent",
  },
  sidebarItem: {
    "&:hover": {
      backgroundColor: "transparent",
      color: theme.palette.primary.main,
    },
    color: "#8B96C7",
    flexDirection: "column",
    justifyContent: "center",
    marginTop: 15,
  },
}));

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

const Navbar = () => {
  const classes = createStyles();
  return (
    <aside className="sticky w-40 h-screen top-0 p-4 border-r border-gray-300">
      <List component="nav" aria-label="main mailbox folders">
        <ListItem
          button
          className={classes.logo}
          borderBottom={1}
          borderColor="grey.200"
          component={Link}
          to="/dashboard"
        >
          <MultitudLogo
            style={{ width: "50%", height: "auto", margin: "1rem" }}
          />
        </ListItem>

        <ListItem
          button
          className={classes.sidebarItem}
          component={Link}
          to="/dashboard"
        >
          <DashboardIcon className={classes.MuiSvgIcon} />
          <Typography variant="button">Dashboard</Typography>
        </ListItem>

        <ListItem
          button
          className={classes.sidebarItem}
          component={Link}
          to="/dashboard/campaigns"
        >
          <AudienceIcon
            className={classes.svg}
            style={{ width: "50%", height: "auto", margin: "0 1rem" }}
          />
          <Typography variant="button">Campaigns</Typography>
        </ListItem>

        <ListItem
          button
          className={classes.sidebarItem}
          component={Link}
          to="/dashboard/settings"
        >
          <SettingsIcon className={classes.MuiSvgIcon} />
          <Typography variant="button">Settings</Typography>
        </ListItem>
      </List>
    </aside>
  );
};

export default Navbar;
