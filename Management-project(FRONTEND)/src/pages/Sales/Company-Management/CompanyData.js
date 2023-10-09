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
import CompanyForm from "./CompanyForm";

function CompanyData() {
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
    return (
      <div>
        <button className="pi pi-eye ml-2 p-ml-2 view-icon-background" onClick={() => viewMemberDetails(rowData._id)}></button>
        <button className="pi pi-plus-circle ml-2 p-ml-2 add-icon-background" onClick={() => addMemberDetails(rowData._id)}></button>
        <button className="pi pi-pencil ml-2 p-mr-2 edit-icon-background" onClick={() => editfunc(rowData)}></button>
        <button className="pi pi-trash ml-2 p-ml-2 delete-icon-background" onClick={() => deleteUserData(rowData._id)}></button>
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
    const response = await Axios.get("http://localhost:3001/admin/getAllRegisterdMembers");
    if (response.status === 200) {
      const { data } = response;
      setCusData(data.data);
    } else {
      console.log("No data found from API");
    }
  };

  const confirmDelete = async () => {
    if (getMemberIDforDeletion) {
      console.log("MEMBER ID: "+getMemberIDforDeletion)    
      try {
        const dataResponse = await Axios.get(`http://localhost:3001/members/getbyid/${getMemberIDforDeletion}`);

        if (dataResponse.status === 200) {
          const { data } = dataResponse;
          if (data.data != null) {
            console.log("subID: "+data.data._id);
            console.log(data);
              const response = await Axios.delete(`http://localhost:3001/members/delete/${data.data._id}`);
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

  


  const [getMemberIDforDeletion,setMemberIDforDeletion]=useState(null);
  const deleteUserData = (rowData) => {
    setMemberIDforDeletion(rowData);
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

  
  const [getAllotmentCertificatePath,setAllotmentCertificatePath] = useState(null);
  const [getMemberShipTransfer,setMemberShipTransfer] = useState(null);
  const [getApplicationForm,setApplicationForm] = useState(null);
  const [getUnderTaking,setUnderTaking] = useState(null);
  const [getAffidavit,setAffidavit] = useState(null);
  const [getTransferImage,setTransferImage] = useState(null);
  const [getMergedPDF,setMergedPDF] = useState(null);
  useEffect(() => {
    if (selectedMemberID) {
      const fetchMemberData = async () => {
        try {
          const response = await Axios.get(`http://localhost:3001/members/getbyid/${selectedMemberID}`);
          if (response.status === 200) {
            const { data } = response;
            if (data.data != null) {
              // Use the MemberID as the key to store member details
              console.log(data);
              setAllotmentCertificatePath(data.data.allotmentCertificate.filename);
              setMemberShipTransfer(data.data.membershipTransfer.filename);
              setApplicationForm(data.data.applicationForm.filename);
              setUnderTaking(data.data.underTaking.filename);
              setAffidavit(data.data.affidavit.filename);
              setTransferImage(data.data.transferImage.filename);
              setMergedPDF(data.data.mergedPDF.filename);
              setMemberDetails({ ...memberDetails, [selectedMemberID]: data.data });
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

  const [fileToView, setFileToView] = useState(null);


  const viewFile = (fileUrl) => {
    if (fileUrl) {
      window.open(`http://localhost:3001/get-file/${fileUrl}`);
    }
  };



  const renderDeleteConfirmationFooter = () => (
    <div>
      <Button label="Cancel" className="p-button-secondary" onClick={() => setDeleteConfirmationVisible(false)} />
      <Button label="Delete" className="p-button-danger" onClick={()=>confirmDelete()} />
    </div>
  );

  const columns = [
    { field: 'MemberId', header: 'Member ID' },
    { field: 'email', header: 'Email' },
    {
      field: 'ApplicationStatus',
      header: 'Status',
      body: (rowData) => {
        return rowData.ApplicationStatus ? 'Completed' : 'In-Complete';
      }
    }
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
              <h3 className="mt-2">Member Management</h3>
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
            <CompanyForm
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
            <div>
              {selectedMemberID && memberDetails[selectedMemberID] ? (
                <>
                  <p>Name: {memberDetails[selectedMemberID].name}</p>
                  <p>Email: {memberDetails[selectedMemberID]?.member_id?.email ?? 'N/A'}</p>
                  <p>Address: {memberDetails[selectedMemberID].address}</p>
                  <p>Phone Number: {memberDetails[selectedMemberID].phoneNumber}</p>
                  <p>CNIC: {memberDetails[selectedMemberID].cnic}</p>
                  <p>Approval Status: {memberDetails[selectedMemberID].approvalStatus ? 'Approved' : 'Pending'}</p>
                  {/* Provide clickable links to view uploaded files */}
                  {/* Conditionally render file buttons if a file URL is available */}
                  <div>
                <p>Allotment Certificate:</p>
                <button onClick={() =>viewFile(getAllotmentCertificatePath)}>View</button>
               
              </div>
              <div>
                <p>Membership Transfer:</p>
                <button onClick={() => viewFile(getMemberShipTransfer)}>View</button>
               
              </div>
              <div>
                <p>Application Form:</p>
                <button onClick={() =>viewFile(getApplicationForm)}>View</button>
               
              </div>
              <div>
                <p>Under-taking:</p>
                <button onClick={() => viewFile(getUnderTaking)}>View</button>
               
              </div>
              <div>
                <p>Affidavit:</p>
                <button onClick={() =>viewFile(getAffidavit)}>View</button>
               
              </div>
              <div>
                <p>Transfer Image:</p>
                <button onClick={() => viewFile(getTransferImage)}>View</button>
               
              </div>
              <div>
                <p>All Merged Documents:</p>
                <button onClick={() => viewFile(getMergedPDF)}>View</button>
               
              </div>

                

                </>
              ) : (
                <p>No data available for this member.</p>
              )}
            </div>
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
            <Column key={col.field} field={col.field} header={col.header} body={col.body} />
          ))}
          <Column header="Action" body={icon} />
        </DataTable>
      </div>
    </>
  );
}

export default CompanyData;
