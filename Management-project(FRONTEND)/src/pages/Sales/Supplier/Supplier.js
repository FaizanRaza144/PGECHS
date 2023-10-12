import React, { useEffect, useState } from "react";
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import Axios from "axios";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import '../ManageSales.css';

const Supplier = () => {
  const [memberData, setMemberData] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationMessage1, setNotificationMessage1] = useState("");

  const [getErrorMessage,setErrorMessage] =useState(null);
  const [getSuccessMessage,setSuccessMessage] = useState(null);

  const [getErrorMessage1,setErrorMessage1] =useState(null);
  const [getSuccessMessage1,setSuccessMessage1] = useState(null);

  useEffect(() => {
    getAllMembers();
  }, []);

  const getAllMembers = async () => {
    try {
      const response = await Axios.get("http://localhost:3001/members/all");
      if (response.status === 200) {
        const { data } = response;
        setMemberData(data.data);
        console.log(data.data)
      } else {
        console.log("No data found from API");
      }
    } catch (error) {
      console.log("Error in Fetching API: " + error);
    }
  };

  const handleSendNotification = async() => {
    setErrorMessage(null);
    setSuccessMessage(null);
    if (selectedMember && notificationMessage) {
        
      console.log("Selected Member ID: ", selectedMember.field);
      console.log("Notification Message: ", notificationMessage);
      try {
        console.log("selected member ID" + selectedMember);
        const obj= {
            SingleNotificationMessage:notificationMessage
        }
        const response = await Axios.post(`http://localhost:3001/notification/addById/${selectedMember}`,obj,{
            headers: {
                'Content-Type': 'application/json',
            }});
        if (response.status === 200) {
          const { data } = response;
         console.log(data)
         setSuccessMessage(data.message);
        } else {
          console.log("No data found from API");
        }
      } catch (error) {
        console.log("Error in Fetching API: " + error);
      }
    } else {
        setErrorMessage("Please select a member and enter a notification message.")
      console.log("Please select a member and enter a notification message.");
    }
  };


  const handleSendNotificationForAll = async()=>{
    setErrorMessage1(null);
    setSuccessMessage1(null);
        if(notificationMessage1){
            try {
                console.log("selected member ID" + selectedMember);
                const obj= {
                    CollectiveNotificationMessage:notificationMessage1
                }
                const response = await Axios.post(`http://localhost:3001/notification/sendAll`,obj,{
                    headers: {
                        'Content-Type': 'application/json',
                    }});
                if (response.status === 200) {
                  const { data } = response;
                 console.log(data);
                 setSuccessMessage1(data.message);
                } else {
                  console.log("No data found from API");
                }
              } catch (error) {
                console.log("Error in Fetching API: " + error);
              }
        }else {
            setErrorMessage1("Enter A Notification Message")
      console.log("enter a notification message.");
    }
  }


  return (
    <>
      <div className="martop dialog-demo">
        <div className="card">
          <div className="p-grid p-dir-col">
            <div className="p-col addnewbutton">
              <h3 className="mt-2">Notifications</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="row lg:col-12 md:col-12 xs:col-12 sm:col-12">
        <div className="card doughnut flex align-items-center pt-10">
          <h1>Notification for Specific Member</h1>

          <div className="p-inputgroup flex-1">
            <Dropdown
              value={selectedMember}
              onChange={(e) => setSelectedMember(e.value)}
              options={memberData.map((item) => ({
                field: item.member_id._id,
                header: item.member_id.MemberId,
              }))}
              placeholder="Select a Member"
              className="w-full md:w-14rem"
              optionLabel="header"
              optionValue="field"
            />
          </div>

          <div className="p-inputgroup flex-1">
            <InputText
              placeholder="Notification Message"
              type="text"
              value={notificationMessage}
              onChange={(e) => setNotificationMessage(e.target.value)}
            />
          </div>

          <button className="p-button p-button-success" onClick={handleSendNotification}>
            SEND
          </button>
          <div style={{ backgroundColor: "red", color: "white", marginTop: 10 }}>{getErrorMessage}</div>
          <div style={{ backgroundColor: "lightGreen", color: "white", marginTop: 10 }}>{getSuccessMessage}</div>
        </div>
      </div>

      <div className="row lg:col-12 md:col-12 xs:col-12 sm:col-12">
        <div className="card doughnut flex align-items-center pt-10">
          <h1>Notification For All Members</h1>

          <div className="p-inputgroup flex-1">
            <InputText
              placeholder="Notification Message"
              type="text"
              value={notificationMessage1}
              onChange={(e) => setNotificationMessage1(e.target.value)}
            />
          </div>

          <button className="p-button p-button-success" onClick={handleSendNotificationForAll}>
            SEND
          </button>

          <div style={{ backgroundColor: "red", color: "white", marginTop: 10 }}>{getErrorMessage1}</div>
          <div style={{ backgroundColor: "lightGreen", color: "white", marginTop: 10 }}>{getSuccessMessage1}</div>
        </div>
      </div>
    </>
  );
};

export default Supplier;
