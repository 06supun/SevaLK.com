import React, { useState, useEffect } from "react";
import "../App.css";
import axios from "axios";
import { Grid , TextField , Button ,Card , Select , MenuItem , CardContent , Typography , InputLabel , FormControl} from "@material-ui/core";
import ButterToast, { Cinnamon } from "butter-toast";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import { useHistory } from "react-router-dom";

function Services() {
  const [title, setTitle] = useState("");
  const [titleError,setTitleError] = useState(false);
  const [titleErrorText,setTitleErrorText] = useState("");
  const [price, setPrice] = useState("");
  const [priceError,setPriceError] = useState(false);
  const [priceErrorText,setPriceErrorText] = useState("");
  const [location, setLocation] = useState("");
  const [locationError,setLocationError] = useState(false);
  const [locationErrorText,setLocationErrorText] = useState("");
  const [photo, setPhoto] = useState('');
  const [photoError,setPhotoError] = useState(false);
  const [photoErrorText,setPhotoErrorText] = useState("");
  const inputRef = React.useRef();
  let history = useHistory();

  useEffect(async () => {
    if (localStorage.getItem("loginAccess")) {
      if (localStorage.getItem("type") === "service_provider") {
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

  const setTitleForm = (e) => {
    setTitle(e.target.value);
  };

  const setPriceForm = (e) => {
    setPrice(e.target.value);
  };

  const setLocationForm = (e) => {
    setLocation(e.target.value);
  };

  const setPhotoForm = (e) => {
    var selectedFile=e.target.files[0]
    const data = new FormData() 
    data.append('file', selectedFile)
    axios.post("http://localhost:3500/service/upload", data, { 
    }).then(res => { 
        console.log(res.data.filename)
        setPhoto(res.data.filename)
    })
  }

  const onClear = () => {
    setTitle("");
    setPrice("");
    setPhoto("");
    setLocation("");
    inputRef.current.focus();
  };

  const validation = () => {
    var Error = false;

    if (title === "") {
      setTitleError(true)
      setTitleErrorText("Title Required!")
      Error = true;
    }else{
      setTitleError(false)
      setTitleErrorText('')
    }

    if (price === "") {
      setPriceError(true)
      setPriceErrorText("Price Required!")
      Error = true;
    }else{
      setPriceError(false)
      setPriceErrorText('')
    }
    
    if (location === "") {
      setLocationError(true)
      setLocationErrorText("Emergency Contact Name Required!")
      Error = true
    }else{
      setLocationError(false)
      setLocationErrorText('')
    }

    if (photo === "") {
      setPhotoError(true)
      setPhotoErrorText("Legal Documents Required!")
      Error = true;
    }else{
      setPhotoError(false)
      setPhotoErrorText('')
    }

    if (Error) {
      return false;
    }

    return true;
  };

  const SubmitForm = async (e) => {
    e.preventDefault();

    if (validation()) {
      const url = "http://localhost:3500/service";
      const data = JSON.stringify({
        title: title,
        price: price,
        location: location,
        photo: photo,
        user_id: localStorage.getItem("id"),
      });
      console.log(data);
      await axios
        .post(url, data, {
          headers: { "Content-Type": "application/json" },
        })
        .then(async (res) => {
          console.log(res);
          if (res.data.err !== "connection") {
            if (res.data.err !== "already") {
              onClear();
              ButterToast.raise({
                content: (
                  <Cinnamon.Crisp
                    title="Success!"
                    content="Insert Successful!"
                    scheme={Cinnamon.Crisp.SCHEME_GREEN}
                    icon={<CheckCircleOutlineIcon />}
                  />
                ),
              });
            } else {
              ButterToast.raise({
                content: (
                  <Cinnamon.Crisp
                    title="Validation Error!"
                    content="Already Exists This Title!"
                    scheme={Cinnamon.Crisp.SCHEME_RED}
                    icon={<ErrorOutlineIcon />}
                  />
                ),
              });
            }
          } else {
            ButterToast.raise({
              content: (
                <Cinnamon.Crisp
                  title="Validation Error!"
                  content="Connection Error!"
                  scheme={Cinnamon.Crisp.SCHEME_RED}
                  icon={<ErrorOutlineIcon />}
                />
              ),
            });
          }
        });
    }
  };

  return (
    <div className="App">
      <br />
      <Grid>
        <Card
          style={{
            maxWidth: 50 + "%",
            padding: "20px 5px",
            margin: "0 auto",
            backgroundColor: "#f5f5f5",
            boxShadow: "0 10px 6px rgba(0, 0, 0, 0.16)",
          }}
        >
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              style={{ fontFamily: "Arial", fontSize: "34px" }}
            >
              Add Service
            </Typography>
            <br />
            <form autoComplete="off" onSubmit={SubmitForm}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    type="text"
                    placeholder="Service Title"
                    inputRef={inputRef}
                    autoFocus
                    variant="outlined"
                    name="title"
                    value={title}
                    error ={titleError}
                    helperText= {titleErrorText}
                    onChange={setTitleForm}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="number"
                    placeholder="Price"
                    variant="outlined"
                    name="price"
                    value={price}
                    error ={priceError}
                    helperText= {priceErrorText}
                    onChange={setPriceForm}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel>Location</InputLabel>
                    <Select
                      name="location"
                      value={location}
                      inputRef={inputRef}
                      autoFocus
                      error ={locationError}
                      helperText= {locationErrorText}
                      style={{ textAlign: "left" }}
                      onChange={setLocationForm}
                    >
                      <MenuItem value={'Colombo'}><p>Colombo</p></MenuItem>
                      <MenuItem value={'Galle'}><p>Galle</p></MenuItem>
                      <MenuItem value={'Matara'}><p>Matara</p></MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField type="file"
                    accept="image/*"
                    placeholder="Legal Document"
                    label="Legal Document"
                    variant="outlined"
                    name="photo"
                    error ={photoError}
                    helperText= {photoErrorText}
                    onChange={setPhotoForm}
                    fullWidth />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Submit
                  </Button>
                </Grid>

                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => onClear()}
                    fullWidth
                  >
                    Clear
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
      <br />
    </div>
  );
}

export default Services;
