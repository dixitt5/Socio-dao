import React from "react";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const history = useNavigate();
  return (
    <div className="Banner">
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid xs={6}>
          <Typography variant="h3" className="typo">
            The Society DAOs..
          </Typography>
          <Typography variant="subtitle1" className="newtext">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate
            repellendus esse consequuntur incidunt ipsam omnis eius, beatae
            illum aliquid delectus cupiditate dolor amet architecto
          </Typography>

          <ButtonGroup
            disableElevation
            variant="contained"
            aria-label="Disabled elevation buttons"
            className="new-btn"
          >
            <Button onClick={() => history("/owner")}>Owner DashBoard</Button>
            <Button
              onClick={() => {
                history("/main");
              }}
            >
              Get started
            </Button>
          </ButtonGroup>
        </Grid>
        <Grid xs={6}>
          <img
            src="https://d33wubrfki0l68.cloudfront.net/eeb1c4eb81864cd215bdcbebb63679534af42773/e7824/static/d17b5ecb3655c50d6540e590a93d65e7/87c97/dao-2.png"
            className="img-1"
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Banner;
