import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Axios from "axios";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import InventryForm from "./InventryForm";

function CompanyData() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchBy, setSearchBy] = useState('memberId'); // Default search criteria
  const [cusData, setCusData] = useState([]);
  const [displayPosition, setDisplayPosition] = useState(false);
  const [position, setPosition] = useState("center");

  const [MemberdisplayPosition, setMemberDisplayPosition] = useState(false);
  const [Memberposition, setMemberPosition] = useState("center");
  const [selectedMemberID, setMemberID] = useState(null);

  const [edittable, setedittable] = useState(false);
  const [editdata, seteditdata] = useState();

  const [deleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false);
  const [selectedRowToDelete, setSelectedRowToDelete] = useState('');

  // Create an object to store member details with MemberID as keys
  const [memberDetails, setMemberDetails] = useState({});

  useEffect(() => {
    getAllCustomers();
  }, []);
  const handleSearch = async () => {
    const response = await Axios.get("http://localhost:3001/members/all");
    if (response.status === 200) {
      const { data } = response;
      setCusData(data.data);
    } else {
      console.log("No data found from API");
    }
    if (searchBy === "cnic") {
      const results = cusData.filter(item => item.cnic === searchTerm);

      // Update the searchResults state with the filtered data
      setCusData(results);
    }
    if (searchBy === "memberId") {
      const results = cusData.filter(item => item.member_id.MemberId === searchTerm);

      // Update the searchResults state with the filtered data
      setCusData(results);
    }
    if (searchBy === "name") {
      const results = cusData.filter(item => item.name === searchTerm);

      // Update the searchResults state with the filtered data
      setCusData(results);
    }
   
    console.log(`Searching by ${searchBy}: ${searchTerm}`);
  };
  const dialogFuncMap = {
    displayPosition: setDisplayPosition,
  };

  const onClick = (name, position) => {
    dialogFuncMap[`${name}`](true);

    if (position) {
      setPosition(position);
    }
  };



  const icon = (rowData) => {
    const role = localStorage.getItem("role");
    return (
      
      <div>
        {role === "65108d7c54d406ae7e8c5142" ? (
        <>
        <button className="pi pi-pencil ml-2 p-mr-2 edit-icon-background" onClick={() => editfunc(rowData)}></button>
        <button className="pi pi-trash ml-2 p-ml-2 delete-icon-background" onClick={() => deleteUserData(rowData._id)}></button>
        </>
      ) : (
        <>
        </>
      )}
        </div>
    );
  };

  const icon2 = (rowData) => {
    return (
      <div>
        <button className="pi pi-eye ml-2 p-ml-2 view-icon-background" onClick={() => viewMemberDetails(rowData._id)}></button>
        <button className="pi pi-plus-circle ml-2 p-ml-2 add-icon-background" onClick={() => addMemberDetails(rowData._id)}></button>
      </div>
    );
  };

  const onHide = (name) => {
    setDisplayPosition(false);
    setPosition(false);
    setedittable(false);

    setMemberDisplayPosition(false);
    setMemberPosition(false);
  };

  const getAllCustomers = async () => {
   try {
    const response = await Axios.get("http://localhost:3001/members/all");
    if (response.status === 200) {
      const { data } = response;
      setCusData(data.data);
    } else {
      console.log("No data found from API");
    }
   } catch (error) {
    console.log("Error in Fetching API: "+error);
   }
  };

  const confirmDelete = async () => {
    if (getPlotIDforDeletion) {
      console.log("MEMBER ID: "+getPlotIDforDeletion)    
      try {
        const dataResponse = await Axios.get(`http://localhost:3001/plots/getById/${getPlotIDforDeletion}`);

        if (dataResponse.status === 200) {
          const { data } = dataResponse;
          if (data.data != null) {
            console.log("subID: "+data._id);
            console.log(data);
              const response = await Axios.delete(`http://localhost:3001/plots/delete/${getPlotIDforDeletion}`);
              if (response.status === 200) {
                getAllCustomers();
              }
          
          } else {
            console.log(data.msg);
          }
        } else {
          console.log("No data found from API");
        }
      } catch (error) {
        console.error("Error fetching data from API:", error);
      }
   
       
   
     
    }
    setDeleteConfirmationVisible(false);
    }

  


  const [getPlotIDforDeletion,setPlotIDforDeletion]=useState(null);


  const deleteUserData = (rowData) => {
    setPlotIDforDeletion(rowData);
    setDeleteConfirmationVisible(true);
  };

  const [membersData, setMembersData] = useState({});

  const addMemberDetails = (rowData) => {
    setMembersData(rowData);


    onClick("displayPosition", "right");
  };

  const editfunc = (rowData) => {
    setDisplayPosition(true);
    setPosition("right");
    setedittable(true);
    seteditdata(rowData);
  };

  const viewMemberDetails = async (rowData) => {
    setMemberID(rowData);
  };

  
  

const [getIndividualPlotData,setIndividualPlotData]=useState(null);
  useEffect(() => {
    if (selectedMemberID) {
      const fetchMemberData = async () => {
        try {
          const response = await Axios.get(`http://localhost:3001/plots/all/${selectedMemberID}`);
          if (response.status === 200) {
            const { data } = response;
            if (data.data != null) {
              setIndividualPlotData(data.data)
              setMemberID(null)
              // Use the MemberID as the key to store member details
              console.log(data);
            } else {
              console.log(data.msg);
            }
          } else {
            console.log("No data found from API");
          }
        } catch (error) {
          console.error("Error fetching data from API:", error);
        } finally {
          // Open the member details dialog
          setMemberDisplayPosition(true);
          setMemberPosition("right");
        }
      };

      // Call the function to fetch member data
      fetchMemberData();
    }
  }, [selectedMemberID]);





  const renderDeleteConfirmationFooter = () => (
    <div>
      <Button label="Cancel" className="p-button-secondary" onClick={() => setDeleteConfirmationVisible(false)} />
      <Button label="Delete" className="p-button-danger" onClick={()=>confirmDelete()} />
    </div>
  );

  

  const columns = [

    {
      field: 'member_id.MemberId',
      header:'Member ID',
 
  },
    { field: 'name', header: 'Name' },
    { field: 'address', header: 'Address' },
    { field: 'phoneNumber', header: 'Phone Number' },
    { field: 'cnic', header: 'CNIC' },
  ];
  const columnsPlot = [
      { field: 'plotID', header:'Plot ID'},
      {field:'plotType', header:'Plot Type'},
      {field:'block', header:'Block'},
      {field:'street', header:'Street'},
      {field:'location', header:'Location'},
      {field:'sqFeet', header:'Sq. Feet'},      
      {field:'dimensions', header:'Dimensions'},
  ];

  return (
    <>
      <Dialog
        header="Confirm Delete"
        visible={deleteConfirmationVisible}
        onHide={() => setDeleteConfirmationVisible(false)}
        modal
        footer={renderDeleteConfirmationFooter()}
      >
        <p>Are you sure you want to delete this record?</p>
      </Dialog>

      <div className="martop dialog-demo">
        <div className="card">
          <div className="p-grid p-dir-col">
            <div className="p-col addnewbutton">
              <h3 className="mt-2">Plots Management</h3>
            </div>
            <div className="search-container">
              <input
                type="text"
                className="search-input"
                placeholder="Enter search term"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              <select
                value={searchBy}
                onChange={(e) => setSearchBy(e.target.value)}
                className="search-select"
              >
                <option value="cnic">CNIC</option>
                <option value="name">Name</option>
                <option value="memberId">Member ID</option>
              </select>

              <button onClick={handleSearch} className="search-button">
                Search
              </button>
            </div>
          </div>

          <Dialog
            header={edittable ? "Edit Member Details * " : "Add Member Details * "}
            visible={displayPosition}
            position={position}
            modal
            style={{ width: "65vw" }}
            onHide={() => onHide()}
            draggable={false}
            resizable={false}
          >
            <InventryForm
              geteditdata={editdata}
              editable={edittable}
              onHide={onHide}
              memberID={membersData}
              getAllCustomers={getAllCustomers}
            />
          </Dialog>

          <Dialog
            visible={MemberdisplayPosition}
            position={Memberposition}
            modal
            style={{ width: "65vw" }}
            onHide={() => onHide()}
            draggable={false}
            resizable={false}
          >
           <DataTable
          value={getIndividualPlotData}
          lazy
          responsiveLayout="scroll"
          dataKey="id"
          paginator
          rows={10}
        >
          {columnsPlot.map((col, i) => (
            <Column key={i} field={col.field} header={col.header} body={col.body} />
          ))}
          <Column header="Action" body={icon} />
        </DataTable>
          </Dialog>
        </div>
      </div>

      <div className="card">
        <DataTable
          value={cusData}
          lazy
          responsiveLayout="scroll"
          dataKey="id"
          paginator
          rows={10}
        >
          {columns.map((col, i) => (
            <Column key={i} field={col.field} header={col.header} body={col.body} />
          ))}
          <Column header="Action" body={icon2} />
        </DataTable>
      </div>
    </>
  );
}

export default CompanyData;
