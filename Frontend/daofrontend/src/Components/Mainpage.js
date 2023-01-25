import Appbar from "./Appbar";
import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import TwitterIcon from "@mui/icons-material/Twitter";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Dialog1 from "./Dialog";

const Mainpage = () => {
  const history = useNavigate();
  const { open, setopen } = useState(false);
  return (
    <div>
      <Appbar />
      <Dialog1
        setoff={() => {
          setopen(false);
        }}
        do={open}
      />
      <div className="main">
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            underline="hover"
            color="inherit"
            onClick={() => {
              history("/");
            }}
            className="bread"
          >
            Home
          </Link>
          <Typography color="text.primary">Vote for DAO</Typography>
        </Breadcrumbs>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          className="inside-main"
        >
          <Grid item xs={8}>
            <Typography variant="h3">Write a name here</Typography>
            <Typography variant="subtitle2" className="newtextmain">
              write the detail about the current plan of society. Lorem ipsum
              dolor sit amet consectetur, adipisicing elit. Corporis, assumenda?
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto,
              quod culpa eaque facere autem dolore, explicabo architecto
              reiciendis commodi eum dicta, id quaerat laboriosam vitae atque
              non pariatur deserunt.
            </Typography>
            <div className="top">
              <TwitterIcon />
              <Typography variant="h7" className="inside">
                @society
              </Typography>
              <Chip label="Ethereum" className="inside" />
            </div>
          </Grid>
          <Grid item xs={4}>
            <ButtonGroup
              disableElevation
              variant="outlined"
              aria-label="Disabled elevation buttons"
              className="main-btns"
            >
              <Button
                onClick={() => {
                  setopen(true);
                }}
              >
                Create a new proposal
              </Button>
              <Button>Delegate vote</Button>
            </ButtonGroup>
          </Grid>
        </Grid>
        <Box mt={10}>
          <BottomNavigation showLabels>
            <BottomNavigationAction label="Proposals" icon={<RestoreIcon />} />
            <BottomNavigationAction label="Holders" icon={<FavoriteIcon />} />
            <BottomNavigationAction label="Voters" icon={<LocationOnIcon />} />
          </BottomNavigation>
        </Box>
      </div>
    </div>
  );
};

export default Mainpage;
