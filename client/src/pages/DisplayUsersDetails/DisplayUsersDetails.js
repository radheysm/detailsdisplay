import React, {useState,useEffect} from 'react';
import * as bs from 'bootstrap/dist/css/bootstrap.css';
import {Form, Table,Button, InputGroup} from 'react-bootstrap';
import swal from 'sweetalert';
import Moment from 'react-moment';
import './DisplayUsersDetails.css'
import UserService from '../../services/UserService';
import CustomSpinner from '../../components/CustomSpinner/CustomSpinner';

const DisplayUsersDetails = () => {

    const [usersDetails, setUsersDetails] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [editUserData, setEditUserData] = useState({});
    const [isLoading, setIsLoding] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(true);
    useEffect(()=>{
        getUsersFROMDB();
       },[isEdit])

  const getUsersFROMDB = async () =>{
      setIsLoding(true);
        const resData = await UserService.getUsersFromMB();
        setUsersDetails(resData.data)
        setIsLoding(false);
  }
  const handleEdit = (data) =>{
     setEditUserData(data);
     setIsEdit(true);
  }
  const handleInputChange = (e) =>{
     const controlName = e.target.name;
     const controlValue = e.target.value;
     if(controlName === 'email'){
         setIsEmailValid(true);
     }
     let tempData = editUserData;
     tempData[controlName] = controlValue;
     setEditUserData({...tempData});
  }
  const submit = () =>{
      if(
          !editUserData.email ||
          !editUserData.name ||
          !editUserData.gender ||
          !editUserData.status
          ){
              return;
          }
     
    if(editUserData.email){
        const value = editUserData.email;
        let lastAtPos = value.lastIndexOf('@');
        let lastDotPos = value.lastIndexOf('.');
        if (!(lastAtPos < lastDotPos && lastAtPos > 0 && value.indexOf('@@') === -1 && lastDotPos > 2 && (value.length - lastDotPos) > 2)){
            setIsEmailValid(false);
            return;
        }
    }

    const obj = {
        id:editUserData._id,
        email:editUserData.email,
        name:editUserData.name,
        gender:editUserData.gender,
        status:editUserData.status,
        created_at:editUserData.created_at,
        updated_at:Date.now()
    }
    setIsLoding(true);
    UserService.updateUsers(obj)
      .then((res)=>{
        setIsLoding(false)
        if(res){
            swal({
                title: "",
                text: "User detail Update successfully",
                icon: "success",
                type: "success",
              }).then((isConfirm) => {
                 setIsEdit(false);
              });
        }; 
    })
      .catch((err)=>{
          setIsLoding(false);
          console.log(err.name, err.message);
          swal({
            title: "",
            text: "Something went wrong try again",
            icon: "success",
            type: "success",
          }).then((isConfirm) => {
            //  setIsEdit(false);
          });
      })
  }
  const downloadReport = async() =>{
      setIsLoding(true);
      await UserService.downloadReport();
      var node = document.getElementById('download');
      node.click();
      setIsLoding(false);
    //   window.open(
    //     "../../../../data.csv", "_blank");
  }
    return (
        <>
        {isLoading && <CustomSpinner/>}
        <div id = "display">
            <div className="users-content">
                <div className="header-title" 
                // style={isEdit && {display:'flex',justifyContent:'space-around'}}
                >
                    <div>
                        {isEdit ? `Edit ${editUserData.name}'s Details` : "User's Details"}
                    </div>
                    <div>
                    {!isEdit ? <>
                    <Button variant="primary" onClick = {downloadReport}>
                    Download Report
                    </Button>
                    <a href="data.csv" id = "download" download="data.csv" style={{color:'#ADD8E6'}}>
                        a
                    </a>
                    </> :  <Button variant="primary" onClick = {()=>{
                        setIsEdit(false);
                    }}>
                    Back
                    </Button>
                    }
                    </div>
                </div>
                {isEdit ? <>
                  <div className="edit-user-detail">
                  <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control onChange={handleInputChange} value = {editUserData.email} required name = "email" type="email" placeholder="Enter email" />
                    </Form.Group>
                    {!editUserData.email ? <Form.Text className="text-muted error">
                        Please enter an email address
                        </Form.Text> : !isEmailValid ? <Form.Text className="text-muted error">
                        Please enter an valid email address
                        </Form.Text> : <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text> }
                    <Form.Group controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control style={{textTransform:'capitalize'}} onChange={handleInputChange} value = {editUserData.name} required name="name" type="text" placeholder="Enter your name" />
                    </Form.Group>
                    {!editUserData.name &&<Form.Text className="text-muted error">
                        Please enter your name
                        </Form.Text> }
                    <Form.Group controlId="formBasicGender">
                        <Form.Label>Gender</Form.Label>
                        <Form.Control style={{textTransform:'capitalize'}} onChange={handleInputChange} value = {editUserData.gender} required name = "gender" type="text" placeholder="Enter your gender" />
                    </Form.Group>
                    {!editUserData.gender &&<Form.Text className="text-muted error">
                        Please enter your gender
                        </Form.Text> }
                    <Form.Group controlId="formBasicName">
                        <Form.Label>Status</Form.Label>
                        <Form.Control style={{textTransform:'capitalize'}} onChange={handleInputChange} value = {editUserData.status} required name="status" type="text" placeholder="Enter your status" />
                    </Form.Group>
                    {!editUserData.status &&<Form.Text className="text-muted error">
                        Please enter your status
                        </Form.Text> }
                    <Button variant="primary" onClick = {submit}>
                        Submit
                    </Button>
                    </Form>
                  </div>
                </>:<><div className="user-details-table">
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                        <th>SR.No</th>
                        <th>Email</th>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>Status</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                        <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usersDetails.map((user,index)=>{
                            return <tr>
                            <td>{index+1}</td>
                            <td>{user.email}</td>
                            <td>{user.name}</td>
                            <td>{user.gender}</td>
                            <td>{user.status}</td>
                            <td style={{whiteSpace:'nowrap'}}>
                            <Moment format="YYYY-MM-DD">
                               {user.created_at}
                            </Moment>
                            </td>
                            <td>
                            <Moment toNow>
                               {user.updated_at}
                            </Moment>
                            </td>
                            <td style={{cursor:'pointer', textAlign:'center'}}
                            onClick={()=>{
                                handleEdit(user);
                            }}
                            >
                                <img src="edit.png" alt="" width="20px" height="20px" />
                            </td>
                            </tr>
                        })}
                    </tbody>
                    </Table>
                </div></>}
            </div>
        </div>
        </>
    )
}

export default DisplayUsersDetails
