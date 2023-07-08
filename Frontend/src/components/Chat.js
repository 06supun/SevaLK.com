import React from 'react';
import '../App.css';
import swal from 'sweetalert';
import moment from "moment";
import axios from 'axios';
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import ButterToast, { Cinnamon } from "butter-toast";

const initialState = {
    id: "",
    msg_text:"",
    msg_textError:"",
    data:'',
}
class Chat extends React.Component {

    constructor(props) {
        super(props);
        this.state = initialState;
    }

    handleChange = e => {
        const isCheckbox = e.target.type === "checkbox";
        this.setState({
            [e.target.name]: isCheckbox
                ? e.target.checked
                : e.target.value
        });
    }

    componentDidMount = async() => {
        var url = "";
        if(localStorage.getItem("type")==="user"){
            url = "http://localhost:3500/chat/"+this.props.match.params.id+"/"+localStorage.getItem("id");
        }else{
            url = "http://localhost:3500/chat/"+localStorage.getItem("id")+"/"+this.props.match.params.id;
        }
        await axios
                .get(url, {
                headers: { "Content-Type": "application/json" },
                })
                .then(async (res) => {
                    console.log(res.data)
                    var data=""
                    for (let i = 0; i < res.data.length; i++) {
                        if(localStorage.getItem("id")*1===res.data[i].send){
                            data=data+'<div class="chat-container darker"><img src="/user.png" alt="My Avatar" class="right" /><p class="p-right">'+res.data[i].msg+'<br><span class="time-right">'+res.data[i].date_time+'</span></p></div>'
                            await this.setState({data:data,msg_textError:"",msg_text:""})
                        }else{
                            data=data+'<div class="chat-container"><img src="/bot.png" alt="Avatar" /><span><p class="p-left">'+res.data[i].msg+'<br><span class="time-left">'+res.data[i].date_time+'</span></p></div>'
                            await this.setState({data:data,msg_textError:"",msg_text:""})
                        }
                    }
                });
    }

    sendMsg=async(e)=>{
        if(this.state.msg_text!==""){
            var text = this.state.msg_text
            const url = "http://localhost:3500/chat";
            var data=""
            if(localStorage.getItem("type")==="user"){
                data = JSON.stringify({
                    date_time: moment().format("DD-MM-YYYY hh:mm:ss"),
                    msg: text,
                    sp_id: this.props.match.params.id,
                    user_id: localStorage.getItem("id"),
                    send: localStorage.getItem("id"),
                  });
            }else{
                data = JSON.stringify({
                    date_time: moment().format("DD-MM-YYYY hh:mm:ss"),
                    msg: text,
                    user_id: this.props.match.params.id,
                    sp_id: localStorage.getItem("id"),
                    send: localStorage.getItem("id"),
                  });
            }
            console.log(data);
            await axios
                .post(url, data, {
                headers: { "Content-Type": "application/json" },
                })
                .then(async (res) => {
                    console.log(res);
                    this.setState({msg_text:""})
                    this.componentDidMount()
                });
        }else{
            this.setState({msg_textError:"Text Required!"})
        }
    }

    render (){
        return (
            <div class="container">
            <div className="col-lg-12">
            <br/><br/>
            <div class="justify-content-center">
                    <h1>Chat With Service Provider</h1>
                    <div class="x_scroll">
                    <hr/>
                    <div class="row justify-content-center">
                        <div class="col-md-8">
                            <div class="card">
                                <div class="card-header">Chat</div>
                                <div class="card-body">
                                    <h2>Messages</h2>
                                    <div class="chat_msg_1">
                                        <div id="chat_data">
                                            <div dangerouslySetInnerHTML={{ __html: this.state.data }} />
                                        </div>
                                    </div>
                                    
                                    
                                    <div class="form-group row">
                            <label class="col-md-4 col-form-label text-md-right">Message</label>
                            <div class="col-md-6">
                                <textarea type="text" class="form-control" name="msg_text" step="0.0001" value={this.state.msg_text} onChange={this.handleChange} />
                                <div style={{color : "red"}}>{this.state.msg_textError}</div>
                            </div>
                        </div>
                        <br/>
                                    <button id="click_start" type='submit' class="btn btn-primary" onClick={()=>this.sendMsg()} >Send</button>
                                    
                                    <hr/>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            <br/>
            </div>
        );
    }
}

export default Chat;
