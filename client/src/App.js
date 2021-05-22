import React, {Fragment, useEffect} from 'react';
import './App.css';
import DisplayUsersDetails from './pages/DisplayUsersDetails/DisplayUsersDetails';
import UserService from './services/UserService';
const App =()=> {
      useEffect(()=>{
            getUsersFROMDB();
           },[])

      const getUsersFROMDB = async () =>{
            const resData = await UserService.getUsersFromMB();
            if(Array.isArray(resData.data) && !resData.data.length){
                  getUsers();
            }
      }
      const getUsers = async()=>{
            const resData = await UserService.getUsers();
               if(resData.data.data){
                     const obj = {};
                     obj.data = resData.data.data;
                await UserService.addUsers(obj);
               }
           }
      return (
      <Fragment>
         <DisplayUsersDetails/>
      </Fragment>
      );
}

export default App;
