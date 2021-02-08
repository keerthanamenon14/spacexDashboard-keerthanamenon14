import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
  },
  pagination: {
    marginBottom: "50px",
    marginTop: "30px",
  },
}));

 export default function FooterPagination({
  page,
  handleChange,
  rulesPerPage,
  totalRules
 }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container justify="flex-end">
        <Grid item className={classes.pagination}>
          <Pagination
            count={Math.ceil(totalRules / rulesPerPage)}
            variant="outlined"
            shape="rounded"
            color="primary"
            page={page}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
    </div>
  );
}
