import React, { useState, useEffect } from 'react'
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import { InputText } from "primereact/inputtext";
import { useFormik } from 'formik';
import * as Yup from "yup";
import { Button } from 'primereact/button';
import classNames from "classnames";
import Axios from 'axios';
import { Tag } from 'primereact/tag';




export default function InventoryForm({ geteditdata, editable, getAllCustomers, onHide, memberID }) {

    //console.log("editable", editable)

   const [getErrorMessage,setErrorMessage] = useState(null);



    const validationSchema = Yup.object().shape({
    
       
        
      
        particulars: Yup.string().required("Particulars are required."),
        chequeOrDraft: Yup.string().required("Cheque/Draft are required."),
        Slip: Yup.string().required("Slip Number is required."),
        debit: Yup.number().required("Debit is required."),
        credit: Yup.number().required("Credit is required."),
        balance: Yup.number().required("Balance is required."), 
        date: Yup.date().required("Date is required."),

    });
    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error mt-1 ml-2">{formik.errors[name]}</small>;
    };

   // console.log("geteditdata", geteditdata)

    useEffect(() => {
        if (editable === true) {
           
            formik.setFieldValue("particulars", geteditdata?.particulars)
            formik.setFieldValue("chequeOrDraft", geteditdata?.chequeOrDraft)
            formik.setFieldValue("Slip", geteditdata?.Slip)
            formik.setFieldValue("debit", geteditdata?.debit)
            formik.setFieldValue("date", geteditdata?.date)
            formik.setFieldValue("credit", geteditdata?.credit)
            formik.setFieldValue("balance", geteditdata?.balance)
    
        }

    }, [editable]);

    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: {
            
            particulars: "",
            chequeOrDraft: "",
            Slip: "",           
            debit: "",
            credit: "",
            balance: "",
            date:""
        },
        validate: (data) => {
        },
        onSubmit: async (values) => {
            console.log(values);
            if (editable === true) {
                const obj = {
                    
                    particulars: formik.values.particulars,
                    chequeOrDraft: formik.values.chequeOrDraft,
                    Slip: formik.values.Slip,
                    debit: formik.values.debit,
                    credit: formik.values.credit,
                    balance: formik.values.balance,
                    date: formik.values.date,
                }

                console.log("obj", obj)
                try {
                    const res = await Axios.put(`http://localhost:3001/ledger/updateStatus/${geteditdata?._id}`, obj)
                    console.log("putresponse", res)

                    await getAllCustomers();
                    onHide()

                    console.log("Response success", res.data)
                } catch(error) {
                    console.log("Error in Updation"+error)
                }
                onHide();
                getAllCustomers();
            }
            else {

                const obj = {
                    particulars: formik.values.particulars,
                    chequeOrDraft: formik.values.chequeOrDraft,
                    Slip: formik.values.Slip,
                    debit: formik.values.debit,
                    credit: formik.values.credit,
                    balance: formik.values.balance,
                    date: formik.values.date,
                }

                console.log("obj", obj)
                try {
                    const res = await Axios.post(`http://localhost:3001/ledger/add/${memberID}`, obj,{
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        validateStatus: function (status) {
                            return status === 200 || status === 409; // Axios will throw an error for other status codes
                        },
                    });
                    if (res.status === 409) {
                        const { data } = res;
                        console.log('Error: '+data.message)
                        setErrorMessage(data.message);
                    } else if (res.status === 200) {
                        await getAllCustomers();
                      onHide();
                        // You can redirect or perform other actions on successful registration
                    } else {
                        console.log("Unexpected response status:", res.status);
                    }
                  

                   
                } catch (error) {
                    console.log("Catched error: "+error)
                }
             

            }

        },
    });
    useEffect(() => {
      
    }, []); // Empty dependency array ensures this effect runs only once



  //  console.log("formik.values.Date", formik.values.Date)
    return (
        <div className='card'>
            <form onSubmit={formik.handleSubmit} >
                <div className="p-fluid p-formgrid p-grid grid row">
                    <div className="p-field col-xs-12 col-sm-6 col-md-6  col-lg-6">
                        <label
                            className={classNames({ "p-error": isFormFieldValid("particulars") })}>Particulars
                        </label>

                        <InputText
                            id="particulars"
                            name="particulars"
                            value={formik.values.particulars}
                            onChange={formik.handleChange}
                            className={classNames({ "p-invalid": isFormFieldValid("particulars") }, "")}
                        />
                        {getFormErrorMessage("particulars")}
                    </div>

                    <div className="p-field col-xs-12 col-sm-12 col-md-6 col-lg-6">
                        <label
                            className={classNames({ "p-error": isFormFieldValid("chequeOrDraft") })}>
                            Cheque/Draft </label>
                        <InputText
                            id="chequeOrDraft"
                            name="chequeOrDraft"
                            value={formik.values.chequeOrDraft}
                            onChange={formik.handleChange}
                            className={classNames({ "p-invalid": isFormFieldValid("chequeOrDraft") }, "")}

                        />
                        {getFormErrorMessage("chequeOrDraft")}
                    </div>

                </div>
                <div className="p-fluid p-formgrid p-grid grid row">
                    <div className="p-field col-xs-12 col-sm-12 col-md-6 col-lg-6">
                        <label htmlFor="chemical_formulation"
                            className={classNames({ "p-error": isFormFieldValid("Slip") })}>Slip</label>
                        <InputText
                            id="Slip"
                            type="text"
                            name="Slip"
                            value={formik.values.Slip}
                            onChange={formik.handleChange}
                            className={classNames({ "p-invalid": isFormFieldValid("Slip") }, "")}

                        />
                        {getFormErrorMessage("Slip")}

                    </div>
                    <div className="p-field col-xs-12 col-sm-12 col-md-6 col-lg-6">
                        <label
                            className={classNames({ "p-error": isFormFieldValid("debit") })}>Debit: </label>
                        <InputText
                            id="debit"
                            type="text"
                            name="debit"
                            value={formik.values.debit}
                            onChange={formik.handleChange}
                            className={classNames({ "p-invalid": isFormFieldValid("debit") }, "")}

                        />
                        {getFormErrorMessage("debit")}
                    </div>

                </div>
                <div className="p-fluid p-formgrid p-grid grid row">
                    <div className="p-field col-xs-12 col-sm-12 col-md-6 col-lg-6">
                        <label
                            className={classNames({ "p-error": isFormFieldValid("credit") })}>Credit</label>
                       <InputText
                            id="credit"
                            type="text"
                            name="credit"
                            value={formik.values.credit}
                            onChange={formik.handleChange}
                            className={classNames({ "p-invalid": isFormFieldValid("credit") }, "")}

                        />
                        {getFormErrorMessage("credit")}

                    </div>
                    <div className="p-field col-xs-12 col-sm-12 col-md-6 col-lg-6">
                        <label
                            className={classNames({ "p-error": isFormFieldValid("balance") })}>Balance </label>
                        <InputText
                            id="balance"
                            type="text"
                            name="balance"
                            value={formik.values.balance}
                            onChange={formik.handleChange}
                            className={classNames({ "p-invalid": isFormFieldValid("balance") }, "")}

                        />
                        {getFormErrorMessage("balance")}
                    </div>

                </div>
                <div className="p-fluid p-formgrid p-grid grid row">

                    <div className="p-field col-xs-12 col-sm-12 col-md-6 col-lg-6">
                        <label
                            className={classNames({ "p-error": isFormFieldValid("date") })}> Date</label>
                        <InputText
                            id="date"
                            type="date"
                            name="date"
                            value={formik.values.date}
                            onChange={formik.handleChange}
                            className={classNames({ "p-invalid": isFormFieldValid("date") }, "")}

                        />
                        {getFormErrorMessage("date")}

                    </div>
                 
                    <div className="p-field col-xs-12 col-sm-12 col-md-6 col-lg-6 p-6">
                    <Tag value={getErrorMessage} severity="danger"></Tag>
                    </div>

                
                </div>



             


                <div className='flex cus-buton'>
                    <Button label="SUBMIT" className="p-button-rounded p-button-success" type='submit'
                        autoFocus />
                </div>
            </form>
        </div>
    )
}
