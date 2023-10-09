
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
import '../ManageSales.css'
import CustomerForm from "./SupplierForm";
const Supplier = () => {


    // use states 
    const [cusData, setCusData] = useState([]);
    const [displayPosition, setDisplayPosition] = useState(false);      //For form Position
    const [position, setPosition] = useState("");                 //For 
    const [edittable, setedittable] = useState(false);                  //For edit form opening
    const [editdata, seteditdata] = useState();

    const [deleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false);
    const [selectedRowToDelete, setSelectedRowToDelete] = useState(null);                      //For getting data in edit form
    // use effect 
    useEffect(() => {
        getAllCustomers();
    }, [])
    // use effect ended 

    // custom functions
    const dialogFuncMap = {
        displayPosition: setDisplayPosition
    };

    const onClick = (name, position) => {
        dialogFuncMap[`${name}`](true);

        if (position) {
            setPosition(position);
        }
    };

    console.log("eddds", edittable)
    const editfunc = (rowData) => {
        setDisplayPosition(true)
        setPosition("right")
        setedittable(true)
        seteditdata(rowData)
    }

    const icon = (rowData) => {
        return (

            <div>
                <button className="pi pi-pencil ml-2 p-mr-2 edit-icon-background" onClick={() => editfunc(rowData)}></button>
                <button className="pi pi-trash ml-2 p-ml-2 delete-icon-background" onClick={() => deleteUserData(rowData)}></button>
            </div>

        )
    }

    const onHide = (name) => {
        setDisplayPosition(false)
        setPosition(false)
        setedittable(false)
    };

    // Getting customer data 
    const getAllCustomers = async () => {
        const response = await Axios.get(`http://192.168.12.96:3005/api/supplier/getAll`)
        if (response.status === 200) {
            console.log("res", response)
            // const { data } = response;
            setCusData(response.data.data);
        }
        else {
            console.log("false")
        }

    };
    // Getting customer data  ends

    // deleting user data 
    // const deleteUserData = async (rowData) => {

    //   const response = await Axios.delete(`http://192.168.11.215:3005/api/user/${rowData?._id}`)

    //   console.log("delete res", response)
    //   if (response.status === 200) {
    //     getAllCustomers();
    //   }
    //   else {
    //     console.log("false")
    //   }
    // };

    const confirmDelete = async () => {
        if (selectedRowToDelete) {
            const response = await Axios.delete(`http://192.168.12.96:3005/api/supplier/${selectedRowToDelete._id}`);
            if (response.status === 200) {
                getAllCustomers();
            }
        }
        setDeleteConfirmationVisible(false);
    };

    const deleteUserData = (rowData) => {
        setSelectedRowToDelete(rowData);
        setDeleteConfirmationVisible(true);
    };
    const renderDeleteConfirmationFooter = () => (
        <div>
            <Button label="Cancel" className="p-button-secondary" onClick={() => setDeleteConfirmationVisible(false)} />
            <Button label="Delete" className="p-button-danger" onClick={confirmDelete} />
        </div>
    );

    const product = (rowData) => {
        console.log("rowdata", rowData)
        return (
            <>
                {rowData.products[0].productId?.products_name}
            </>
        )
    }
    // custom function ENDED 

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


            {/* code for add new customer button  */}
            <div className="martop dialog-demo">
                <div className="card">

                    <div className="p-grid p-dir-col">
                        <div className="p-col addnewbutton">
                            <h3 className="mt-2">Supplier Management </h3>
                            <Button
                                label="Add new "
                                // icon="pi pi-arrow-left"
                                onClick={() => onClick("displayPosition", "right")}
                                className="p-button-primary mr-3"
                            />
                        </div>
                    </div>

                    <Dialog
                        header={edittable ? "Edit Supplier Details " : "Supplier Details "}
                        visible={displayPosition}
                        position={position}
                        modal
                        style={{ width: "65vw" }}
                        onHide={() => onHide()}
                        draggable={false}
                        resizable={false}

                    >
                        <CustomerForm
                            geteditdata={editdata}
                            editable={edittable}
                            onHide={onHide}
                            getAllCustomers={getAllCustomers} />
                    </Dialog>
                </div>
            </div>
            {/* add new button ended  */}



            {/* table of customers  */}
            <div className="card">
                <DataTable
                    value={cusData}
                    lazy
                    // filterDisplay="row"
                    responsiveLayout="scroll"
                    dataKey="id"
                    paginator
                    rows={10}
                >

                    <Column field="supplierName" header="Supplier Name" />
                    <Column field="email" header="Email" />
                    <Column field="address" header="Address" />

                    <Column body={product} header="Product Name" />

                    <Column className="ml-4" header="Action" body={icon} />
                </DataTable>
            </div>
            {/* table of customer ended  */}

        </>
    );

}

export default Supplier
