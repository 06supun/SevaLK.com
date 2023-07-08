import React, { useState, useEffect } from "react";
import "../App.css";
import axios from "axios";
import MaterialTable from "material-table";
import ButterToast, { Cinnamon } from "butter-toast";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import { Button, Box } from '@material-ui/core'

function AllAdminServices() {
  const [user, setUser] = useState([]);

  useEffect(() => onReload(), []);

  const onReload = () => {
    const url = "http://localhost:3500/service/"
    axios.get(url).then((response) => {
      console.log(response["data"])
      setUser(response["data"])
    });
  };

  const validation = (title, price, location, photo) => {
    console.log("bb");
    var Error = false;

    if (title === "") {
      ButterToast.raise({
        content: (
          <Cinnamon.Crisp
            title="Validation Error!"
            content="Title Required!"
            scheme={Cinnamon.Crisp.SCHEME_RED}
            icon={<ErrorOutlineIcon />}
          />
        ),
      })
      Error = true;
    }

    if (price === "") {
      ButterToast.raise({
        content: (
          <Cinnamon.Crisp
            title="Validation Error!"
            content="Price Required!"
            scheme={Cinnamon.Crisp.SCHEME_RED}
            icon={<ErrorOutlineIcon />}
          />
        ),
      })
      Error = true;
    }
    
    if (location === "") {
      ButterToast.raise({
        content: (
          <Cinnamon.Crisp
            title="Validation Error!"
            content="Location Required!"
            scheme={Cinnamon.Crisp.SCHEME_RED}
            icon={<ErrorOutlineIcon />}
          />
        ),
      })
      Error = true
    }

    if (photo === "") {
      ButterToast.raise({
        content: (
          <Cinnamon.Crisp
            title="Validation Error!"
            content="Photo Required!"
            scheme={Cinnamon.Crisp.SCHEME_RED}
            icon={<ErrorOutlineIcon />}
          />
        ),
      })
      Error = true;
    }

    if (Error) {
      return false;
    }

    return true;
  };

  const onDelete = (id) => {
    const url = "http://localhost:3500/service/";
    axios.delete(url + id).then((res) => {
      ButterToast.raise({
        content: (
          <Cinnamon.Crisp
            title="Success!"
            content="Delete Successful!"
            scheme={Cinnamon.Crisp.SCHEME_GREEN}
            icon={<CheckCircleOutlineIcon />}
          />
        ),
      });
      onReload();
    });
  };

  const SubmitForm = async (newRow, oldRow) => {
    if (
      validation(
        newRow["title"],
        newRow["price"],
        newRow["location"],
        newRow["photo"]
      )
    ) {
      const url = "http://localhost:3500/service/" + oldRow["service_id"];
      const data = JSON.stringify({
        title: newRow["title"],
        price: newRow["price"],
        location: newRow["location"],
        photo: newRow["photo"],
      });
      console.log(data);
      await axios
        .put(url, data, {
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          console.log(res.data);
          onReload();
          ButterToast.raise({
            content: (
              <Cinnamon.Crisp
                title="Success!"
                content="Update Successful!"
                scheme={Cinnamon.Crisp.SCHEME_GREEN}
                icon={<CheckCircleOutlineIcon />}
              />
            ),
          });
        });
    }
  };

  const columns = [
    { title: "S.P Name", field: "name", editable: 'never'},
    { title: "S.P NIC", field: "nic", editable: 'never'},
    { title: "S.P Phone", field: "phone", editable: 'never'},
    { title: "S.P Email", field: "email", editable: 'never'},
    { title: "S.P Address", field: "address", editable: 'never'},
    { title: "Title", field: "title"},
    { title: "Price", field: "price" , type: "numeric"},
    {
      title: "Location",
      field: "location",
      lookup: { "Colombo":"Colombo", "Galle":"Galle", "Matara":"Matara" }
    },
    { title: 'Photo', field: 'photo' , width: 50, editable: 'never',
      render: rowData =>
      (rowData.photo)!=null ? (
        (rowData.photo).split(".").pop().toLowerCase()=="jpg"||(rowData.photo).split(".").pop().toLowerCase()=="png" ?
          (
            <Button
            variant="contained"
            color="primary"
            href={"http://localhost:3500/"+rowData.photo}
            download
          >
            <Box
              component="img"
              sx={{
                height: 50,
                width: 50,
                maxHeight: { xs: 25, md: 50 },
                maxWidth: { xs: 25, md: 50 },
              }}
              alt="Image or Docs"
              src={"http://localhost:3500/"+rowData.photo}
            />
            </Button>
          ):(
            <Button
              variant="contained"
              color="primary"
              href={"http://localhost:3500/"+rowData.photo}
              download
            >
            <Box
              component="img"
              sx={{
                height: 50,
                width: 50,
                maxHeight: { xs: 25, md: 50 },
                maxWidth: { xs: 25, md: 50 },
              }}
              alt="Image or Docs"
              src={"http://localhost:3500/doc.png"}
            />
            </Button>
          )
      ) : ("")
        }
  ];
  return (
    <div>
      <br />
      <MaterialTable
        title="Services Table"
        columns={columns}
        data={user}
        style={{
          maxWidth: "80%",
          padding: "20px 5px",
          margin: "0 auto",
          fontFamily: "Arial, sans-serif",
        }}
        options={{
          filtering: true,
          sorting: true,
          actionsColumnIndex: -1,
        }}
        editable={{
          onRowUpdate: (newRow, oldRow) =>
            new Promise(async (resolve, reject) => {
              SubmitForm(newRow, oldRow);
              console.log(oldRow.id);
              setTimeout(() => resolve(), 300);
            }),
          onRowDelete: (selectedRow) =>
            new Promise((resolve, reject) => {
              console.log(selectedRow);
              onDelete(selectedRow.service_id);
              setTimeout(() => resolve(), 300);
            }),
        }}
      />
      <br />
    </div>
  );
}

export default AllAdminServices;
