import React, { useEffect, useState } from "react";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import axios from "axios";

import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";

function CustomerData() {
  // You can manage your form state using state variables
  const [oldPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [getSucccessMessage,setSuccessMessage] = useState(null);
  const [getErrorMessage,setErrorMessage] = useState(null);
  
  // Handle form submission
  const handleChangePassword = async() => {
    setSuccessMessage(null);
    setErrorMessage(null)
   const ID =  localStorage.getItem("id")
   try {
    if (newPassword === confirmPassword) {
      // Send an HTTP request to your backend to change the password
      // You can use Axios or any other HTTP library for this
      // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint
     const response = await axios.put(`http://localhost:3001/admin/passwordReset/${ID}`, { oldPassword, newPassword })
        if(response.status===200){
          setSuccessMessage("Password Successfully Changed")
        }
        else if(response.status === 404){
            setErrorMessage("Current Password Doesn't Match")
        }
    } else {
      setErrorMessage("New Password and Confirm Password Doesn't match");
    }
   } catch (error) {
    console.log("Error in API: "+error)
    setErrorMessage("Password Doesn't Match")
   }
  };

  return (
    <div className="martop dialog-demo">
      <div className="card">
        <div className="p-grid p-dir-col">
          <div className="p-col addnewbutton">
            <h3 className="mt-2">Reset Password</h3>
          </div>
        </div>
      </div>
      <div className="row lg:col-12 md:col-12 xs:col-12 sm:col-12">
        <div className="card doughnut flex align-items-center pt-10">
          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon">
              <i className="pi pi-lock"></i>
            </span>
            <InputText
              placeholder="Enter Current Password"
              type="password"
              value={oldPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
          <div className="p-inputgroup flex-1 mt-2">
            <span className="p-inputgroup-addon">
              <i className="pi pi-lock"></i>
            </span>
            <InputText
              placeholder="Enter New Password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="p-inputgroup flex-1 mt-2">
            <span className="p-inputgroup-addon">
              <i className="pi pi-lock"></i>
            </span>
            <InputText
              placeholder="Confirm New Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <Button
            label="Change Password"
            className="p-button p-button-success p-mt-2"
            onClick={handleChangePassword}
          />
          <div style={{ backgroundColor: "red", color: "white", marginTop: 10 }}>
            {getErrorMessage}
          </div>
          <div style={{ backgroundColor: "lightGreen", color: "white", marginTop: 10 }}>
            {getSucccessMessage}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerData;
