import React, { useState , useEffect } from "react";
import "../App.css";
import axios from "axios";
import { Button, Card, Typography, Box} from '@material-ui/core'
import { useHistory } from "react-router-dom"

function ViewServices(props){

  const [service_data, setServiceData] = useState([]);
  let history = useHistory();
  
  useEffect(async() => {
    await onReload()
    if(localStorage.getItem('loginAccess')){
      
    }else{
      history.push("/login")
    }
  }, []);

  const onReload = async() => {
    console.log(props.match.params.id)
    const url = "http://localhost:3500/service/get/"+props.match.params.id;
    await axios
      .get(url)
      .then((response) => {
        console.log(response["data"][0])
        setServiceData(response["data"])
      })
  }

  return (
    <div>
      <Typography gutterBottom variant="h3" align="center">
          Service
      </Typography>
        <Card style={{ maxWidth: 80+'%', padding: "20px 20px", margin: "0 auto" }}>
            <div class="container">
            <br/><br/>
            <div class="justify-content-center">
                    <h2>Service</h2>
                    <hr/>{
                    service_data.map((res) =>
                        <div class="card">
                            <img class="card-img-top" src={ "http://localhost:3500/" + res.photo } alt=""/>
                            <br/>
                            <h5 class="card-title">{ res.title }</h5>
                            <p class="card-text">S.P Name : { res.name }</p>
                            <p class="card-text">S.P Phone : { res.phone }</p>
                            <p class="card-text">S.P Email : { res.email }</p>
                            <p class="card-text">S.P Address : { res.address }</p>
                            <p class="card-text">Location : { res.location }</p>
                            <h3 class="card-title">Price { "Rs. "+(res.price) }</h3>
                            <a href={"/chat/" + res.id } class="btn btn-primary">Chat</a>
                            
                            <br/>
                        </div>)
                  }
                </div>
            </div>
            </Card>
        <br/>
    </div>
  );

}

export default ViewServices;

