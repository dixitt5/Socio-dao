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
import Dialoge from "./Dialoge";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Contract from "../utils/contract";
import { setGlobalState, getGlobalState, useGlobalState } from "../store";
const Voting = () => {
  const history = useNavigate();
  const [open, setopen] = useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const [numProposals] = useGlobalState("numProposals");
  setGlobalState('numProposals','1');
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const numproposals = async () => {
    try {
      const proposals = await Contract.getNumProposalsInDAO();
      setGlobalState("numProposals", proposals.toString());
      const prop = getGlobalState('numProposals');
      console.log(prop);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <BottomNavigation showLabels>
        <BottomNavigationAction
          label="Proposals"
          icon={<RestoreIcon />}
          onClick={numproposals}
        />
        <BottomNavigationAction label="Holders" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Voters" icon={<LocationOnIcon />} />
      </BottomNavigation>
      <Dialoge
        open={open}
        close={() => {
          setopen(false);
        }}
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
            <Typography variant="h3">Socio-DAO</Typography>
            <Typography variant="subtitle2" className="newtextmain">
              You can create a proposal for any needs for the betterment of
              society. You can also create a proposal that transfers certain
              amount of funds to a specific service man.
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
            </ButtonGroup>
          </Grid>
        </Grid>

        <Box mt={10}></Box>
      </div>
      <Typography
        variant="h4"
        color="white"
        sx={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "10px",
          color: "black",
        }}
      >
        Delegate Vote
      </Typography>
      <div>
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
          sx={{ mx: 2 }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              General settings
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              I am an accordion
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
              feugiat. Aliquam eget maximus est, id dignissim quam.
            </Typography>
            <Button variant="contained" sx={{ m: 2 }}>
              UpVote
            </Button>
            <Button
              variant="contained"
              sx={{ m: 2 }}
              style={{ background: "red" }}
            >
              DownVote
            </Button>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
          sx={{ mx: 2 }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>Users</Typography>
            <Typography sx={{ color: "text.secondary" }}>
              You are currently not an owner
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Donec placerat, lectus sed mattis semper, neque lectus feugiat
              lectus, varius pulvinar diam eros in elit. Pellentesque convallis
              laoreet laoreet.
            </Typography>
            <Button variant="contained" sx={{ m: 2 }}>
              UpVote
            </Button>
            <Button
              variant="contained"
              sx={{ m: 2 }}
              style={{ background: "red" }}
            >
              DownVote
            </Button>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};

export default Voting;
