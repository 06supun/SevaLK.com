import React, { useState , useEffect } from "react"
import "../App.css"
import { Grid , Card, CardContent, Typography } from '@material-ui/core'
import { useHistory } from "react-router-dom"
import axios from "axios"

function UserServices() {

  const [serviceData, setServiceData] = useState([]);
  let history = useHistory();
  
  useEffect(async() => {
    onReload()
    if(localStorage.getItem('loginAccess')){
      
    }else{
      history.push("/login")
    }
  }, []);

  const onReload = () => {
    const url = "http://localhost:3500/service";
    axios
      .get(url)
      .then((response) => {
        console.log(response["data"])
        setServiceData(response["data"])
      });
  }

  const logout = () => {
    
  }

  return (
    <div className="App">
      <br/>
      <Typography gutterBottom variant="h3" align="center">
        All Services
      </Typography>
      <Grid>
        <Card style={{ maxWidth: 80+'%', padding: "20px 5px", margin: "0 auto" }}>
          <CardContent>
            <Typography gutterBottom variant="h5">
              All Services
            </Typography>
            <br />
              <hr/>
                  <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                  {
                    serviceData.map((res) =>
                    <Grid item xs={2} sm={4} md={4} >
                        <div class="card">
                            <img class="card-img-top" src={ "http://localhost:3500/" + res.photo } alt=""/>
                            <div class="card-body">
                                <h5 class="card-title">{ res.title }</h5>
                                <p class="card-text">Location : { res.location }</p>
                                <h3 class="card-title">Price { "Rs. "+(res.price) }</h3>
                                <a href={"selected_service/" + res.service_id } class="btn btn-primary">Select</a>
                            </div>
                        </div>
                    </Grid>)
                  }
              </Grid>
          </CardContent>
        </Card>
      </Grid>
      <br/>
    </div>
  );
}

export default UserServices;