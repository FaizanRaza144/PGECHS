import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import { InputText } from 'primereact/inputtext';
import Axios from 'axios';

export default function Dashboard() {
    const [memberInfo, setMemberInfo] = useState({
       email: '',
        password: '',
        memberId: '',
    });
     const [deoInfo, setDeoInfo] = useState({
        username: '',
        password: '',
        role:getDeoRoleID,
    });

     const handleDEOInfoChange = (e) => {
        const { name, value } = e.target;
        setDeoInfo({ ...deoInfo, [name]: value });
    };

    const handleMemberInfoChange = (e) => {
        const { name, value } = e.target;
        setMemberInfo({ ...memberInfo, [name]: value });
    };


const[getConflictError1,setConflictError1] = useState(null);
const [getSuccessMessage1,setSuccessMessage1] = useState(null);
    const handleMemberRegistration = async() => {

        setConflictError1(null);
        setSuccessMessage1(null);

        console.log("Members ROLE ID: " + getMemberRoleID);
        console.log("DEO ROLE ID: " + getDeoRoleID);

    
        const formData = {
            // Assuming you want to send the email, password, and memberId
            email: memberInfo.email,
            password: memberInfo.password,
            memberId: memberInfo.memberId,
            
            role: getMemberRoleID, // Use the correct role ID
        };

        
    try {
        const response = await Axios.post("http://localhost:3001/members/membersRegister", formData, {
            headers: {
                'Content-Type': 'application/json',
            },
            validateStatus: function (status) {
                console.log("HERE")
                return status === 200 || status === 409; // Axios will throw an error for other status codes
            },
        });

        console.log("Full Response:", response); // Log the entire response object

        if (response.status === 409) {
            console.log("HERE 1")
            const { data } = response;
            console.log('Error: '+data.message)
            setConflictError1(data.message);
        } else if (response.status === 200) {
            console.log('DEO Info:', response.data);
            setSuccessMessage1(response.data.msg)
        } else {
            console.log("Unexpected response status:", response.status);
        }
    } catch (error) {
        console.log("Error: " + error);
       
    }
    };

//DEO REGISTRATION********************************************************************************************************************
const[getConflictError,setConflictError] = useState(null);
const [getSuccessMessage,setSuccessMessage] = useState(null);
const handleDEORegistration = async () => {

        setConflictError(null);
        setSuccessMessage(null);

    console.log("DEO ROLE ID: " + getDeoRoleID);

    const formData = {
        username: deoInfo.username,
        password: deoInfo.password,
        role: getDeoRoleID,
    };



    try {
        const response = await Axios.post("http://localhost:3001/admin/Register", formData, {
            headers: {
                'Content-Type': 'application/json',
            },
            validateStatus: function (status) {
                return status === 200 || status === 409; // Axios will throw an error for other status codes
            },
        });
        console.log("RESPONSE: "+response.status)

        console.log("Full Response:", response); // Log the entire response object

        if (response.status === 409) {
            const { data } = response;
            console.log('Error: '+data.message)
            setConflictError(data.message);
        } else if (response.status === 200) {
            console.log('DEO Info:', response.data);
            setSuccessMessage(response.data.msg)
            // You can redirect or perform other actions on successful registration
        } else {
            console.log("Unexpected response status:", response.status);
        }
    } catch (error) {
        console.log("Error: " + error);
        alert("An error occurred during registration.");
    }
};





    const [rolesObject, setRolesObject] = useState({});

    const [getMemberRoleID,setMemberRoleID] = useState();
    const [getDeoRoleID,setDeoRoleID] = useState();
    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await Axios.get("http://localhost:3001/admin/role/getAllRoles");
                if (response.status === 200) {
                    const { data } = response;
                    const responseData = response.data.data; // Access the 'data' array

                    // Create an object where role names are keys and role objects are values
                    const rolesObj = {};
                    responseData.forEach(role => {
                        rolesObj[role.role] = role;
                    });
                    setRolesObject(rolesObj);

                    // Now that the state has been updated, you can access the role IDs
                    const memberRoleID = rolesObj.Members._id;
                    const deoRoleID = rolesObj.DEO._id;
                    
                    // Log the role IDs after the state updates
                  
                    
                    // Set the member and DEO role IDs in their respective state variables
                    setMemberRoleID(memberRoleID);
                    setDeoRoleID(deoRoleID);

                   
                }

            } catch (error) {
                console.log("Error in fetching Roles " + error);
            }
        };

        fetchRoles();
       

    }, []);



    return (
        <div>
            <div className="row doughnut martop ml-1 mr-1">
                <div className="row lg:col-4 md:col-4 xs:col-4 sm:col-4">
                    <div className="card item-center flex align-items-center">
                        <h4>Total Members</h4>
                        <p>12234</p>
                    </div>
                </div>
                <div className="row lg:col-4 md:col-4 xs:col-4 sm:col-4">
                    <div className="card doughnut flex align-items-center">
                        <h4>Total Plots</h4>
                        <p>12234</p>
                    </div>
                </div>
                <div className="row lg:col-4 md:col-4 xs:col-4 sm:col-4">
                    <div className="card doughnut flex align-items-center">
                        <h4>Data Entry Operators</h4>
                        <p>12234</p>
                    </div>
                </div>
            </div>

            <div className="row lg:col-12 md:col-12 xs:col-12 sm:col-12">
                <div className="card doughnut flex align-items-center pt-10">
                    <h1>Register Data Entry Operator</h1>

                    <div className="p-inputgroup flex-1">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-user"></i>
                        </span>
                        <InputText
                            name="username"
                            placeholder="Username"
                            value={deoInfo.username}
                            onChange={handleDEOInfoChange}
                        />
                    </div>

                    <div className="p-inputgroup flex-1">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-lock"></i>
                        </span>
                        <InputText
                            name="password"
                            placeholder="Password"
                            type="password"
                            value={deoInfo.password}
                            onChange={handleDEOInfoChange}
                        />
                    </div>
                           <button
                        className="p-button p-button-success p-mt-2"
                        onClick={handleDEORegistration}
                    >
                        Register
                    </button>
                    
                    <div style={{backgroundColor:"red", color:"white", marginTop:10}}>
                        {getConflictError}
                       
                    </div>
                    <div style={{backgroundColor:"lightGreen", color:"white",marginTop:10}}>
                    {getSuccessMessage}                       
                    </div>
                  
                </div>
            </div>




            <div className="row lg:col-12 md:col-12 xs:col-12 sm:col-12">
                <div className="card doughnut flex align-items-center">
                    <h1>Register Member</h1>

                    <div className="p-inputgroup flex-1">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-user"></i>
                        </span>
                        <InputText
                            name="email"
                            placeholder="email"
                            value={memberInfo.email}
                            onChange={handleMemberInfoChange}
                        />
                    </div>

                    <div className="p-inputgroup flex-1">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-lock"></i>
                        </span>
                        <InputText
                            name="password"
                            placeholder="Password"
                            type="password"
                            value={memberInfo.password}
                            onChange={handleMemberInfoChange}
                        />
                    </div>

                    <div className="p-inputgroup flex-1">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-angle-double-right"></i>
                        </span>
                        <InputText
                            name="memberId"
                            placeholder="Member ID"
                            type="text"
                            value={memberInfo.memberId}
                            onChange={handleMemberInfoChange}
                        />
                    </div>

                    <button
                        className="p-button p-button-success p-mt-2"
                        onClick={handleMemberRegistration}
                    >
                        Register
                    </button>
                    <div style={{backgroundColor:"red", color:"white", marginTop:10}}>
                        {getConflictError1}
                       
                    </div>
                    <div style={{backgroundColor:"lightGreen", color:"white",marginTop:10}}>
                    {getSuccessMessage1}                       
                    </div>
                </div>
                
            </div>
        </div>
    );
}
