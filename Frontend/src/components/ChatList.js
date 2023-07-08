import React, { useState , useEffect } from "react"
import "../App.css"
import axios from "axios";
import { Grid, Button, Card, CardContent, Typography } from '@material-ui/core'
import { useHistory } from "react-router-dom";

function ChatList() {
  let history = useHistory();

  const [chatList, setChatList] = useState([]);

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  }

  useEffect(() => onReload(), []);

  const onReload = () => {
    const url = "http://localhost:3500/chat/sp_chat_list/"+localStorage.getItem("id");
    axios.get(url).then((response) =>{ 
      console.log(response)
      setChatList(response["data"])
    });
  };

  return (
    <div className="App">
      <br/>
      <Typography gutterBottom variant="h3" align="center">
        Chat List
      </Typography>
      <Grid>
        <Card style={{ maxWidth: 50+'%', padding: "20px 5px", margin: "0 auto" }}>
          <CardContent>
            <Typography gutterBottom variant="h5">
              Chat List
            </Typography>
            <br />
              <Grid container spacing={2}>
                {chatList.map((res) =>
                        <Grid item xs={12}>
                          <Button href={"/chat/" + res.user_id } type="submit" variant="contained" color="primary" fullWidth>{ res.name }</Button>
                        </Grid>
                        )
                }

              </Grid>
          </CardContent>
        </Card>
      </Grid>
      <br/>
    </div>
  );
}

export default ChatList;