import React, { useState , useEffect } from "react"
import "../App.css"
import { Grid, Button, Card, CardContent, Typography } from '@material-ui/core'
import { useHistory } from "react-router-dom";

function ServiceProvider() {
  let history = useHistory();

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  }

  const Change = () => {
    localStorage.setItem("type", localStorage.getItem("old_type"));
    localStorage.removeItem("old_type");
    localStorage.setItem("id", localStorage.getItem("old_id"));
    localStorage.removeItem("old_id");
    history.push("/patient");
  }

  return (
    <div className="App">
      <br/>
      <Typography gutterBottom variant="h3" align="center">
        Service Provider Dashboard
      </Typography>
      <Grid>
        <Card style={{ maxWidth: 50+'%', padding: "20px 5px", margin: "0 auto" }}>
          <CardContent>
            <Typography gutterBottom variant="h5">
              Service Provider
            </Typography>
            <br />
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Button href="/servicers" type="submit" variant="contained" color="primary" fullWidth>Add Service</Button>
                </Grid>
                <Grid item xs={12}>
                  <Button href="/allservices" type="submit" variant="contained" color="primary" fullWidth>My Services</Button>
                </Grid>
                <Grid item xs={12}>
                  <Button href="/chat_list" type="submit" variant="contained" color="primary" fullWidth>Chat</Button>
                </Grid>

                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => logout()}
                    fullWidth
                  >Logout</Button>
                </Grid>

              </Grid>
          </CardContent>
        </Card>
      </Grid>
      <br/>
    </div>
  );
}

export default ServiceProvider;