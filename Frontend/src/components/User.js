import React, { useState , useEffect } from "react"
import "../App.css"
import { Grid, Button, Card, CardContent, Typography } from '@material-ui/core'
import { useHistory } from "react-router-dom";

function User() {
  let history = useHistory();

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  }

  useEffect(async () => {
    if (localStorage.getItem("loginAccess")) {
      if (localStorage.getItem("type") === "user") {
      } else {
        if (localStorage.getItem("type") === "admin") {
          history.push("/admin");
        } else if (localStorage.getItem("type") === "user") {
          history.push("/user");
        } else if (localStorage.getItem("type") === "service_provider") {
          history.push("/service_provider");
        }
      }
    }
  }, []);

  return (
    <div className="App">
      <br/>
      <Typography gutterBottom variant="h3" align="center">
        User Dashboard
      </Typography>
      <Grid>
        <Card style={{ maxWidth: 50+'%', padding: "20px 5px", margin: "0 auto" }}>
          <CardContent>
            <Typography gutterBottom variant="h5">
              User
            </Typography>
            <br />
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Button href="/userservices" type="submit" variant="contained" color="primary" fullWidth>All Services</Button>
                </Grid>
                <Grid item xs={12}>
                  <Button href="/chat" type="submit" variant="contained" color="primary" fullWidth>Chat</Button>
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

export default User;