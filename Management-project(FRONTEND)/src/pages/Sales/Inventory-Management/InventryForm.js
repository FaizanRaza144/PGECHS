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

      
        plotID: Yup.string().required("Plot ID is required."),
        dimensions: Yup.string().required("Dimensions are required."),
        plotType: Yup.string().required("Plot Type is required is required."),
        sqFeet: Yup.string().required("Square Feet of plot is required."),
        location: Yup.string().required("Location of plot is required."),
        street: Yup.string().required("Street of plot is required."), 
        block: Yup.string().required("Block of plot is required."),

    });
    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error mt-1 ml-2">{formik.errors[name]}</small>;
    };

   // console.log("geteditdata", geteditdata)

    useEffect(() => {
        if (editable === true) {
            formik.setFieldValue("plotID", geteditdata?.plotID)
            formik.setFieldValue("dimensions", geteditdata?.dimensions)
            formik.setFieldValue("plotType", geteditdata?.plotType)
            formik.setFieldValue("sqFeet", geteditdata?.sqFeet)
            formik.setFieldValue("location", geteditdata?.location)
            formik.setFieldValue("street", geteditdata?.street)
            formik.setFieldValue("block", geteditdata?.block)
    
        }

    }, [editable]);

    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: {

            plotID: "",
            dimensions: "",
            plotType: "",
            sqFeet: "",
            location: "",
            street: "",
            block: "",
        },
        validate: (data) => {
        },
        onSubmit: async (values) => {
            console.log(values);
            if (editable === true) {
                const obj = {
                    plotID: formik.values.plotID,
                    dimensions: formik.values.dimensions,
                    plotType: formik.values.plotType,
                    sqFeet: formik.values.sqFeet,
                    location: formik.values.location,
                    street: formik.values.street,
                    block: formik.values.block,
                }

                console.log("obj", obj)
                try {
                    const res = await Axios.put(`http://localhost:3001/plots/updateStatus/${geteditdata?._id}`, obj)
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
                    plotID: formik.values.plotID,
                    plotType: formik.values.plotType,
                    dimensions: formik.values.dimensions,
                    sqFeet: formik.values.sqFeet,
                    location: formik.values.location,
                    street: formik.values.street,
                    block: formik.values.block,
                }

                console.log("obj", obj)
                try {
                    const res = await Axios.post(`http://localhost:3001/plots/add/${memberID}`, obj,{
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
                            className={classNames({ "p-error": isFormFieldValid("plotID") })}>Plot ID
                        </label>

                        <InputText
                            id="plotID"
                            name="plotID"
                            value={formik.values.plotID}
                            onChange={formik.handleChange}
                            className={classNames({ "p-invalid": isFormFieldValid("plotID") }, "")}
                        />
                        {getFormErrorMessage("plotID")}
                    </div>

                    <div className="p-field col-xs-12 col-sm-12 col-md-6 col-lg-6">
                        <label
                            className={classNames({ "p-error": isFormFieldValid("dimensions") })}>
                            Dimensions </label>
                        <InputText
                            id="dimensions"
                            name="dimensions"
                            value={formik.values.dimensions}
                            onChange={formik.handleChange}
                            className={classNames({ "p-invalid": isFormFieldValid("dimensions") }, "")}

                        />
                        {getFormErrorMessage("dimensions")}
                    </div>

                </div>
                <div className="p-fluid p-formgrid p-grid grid row">
                    <div className="p-field col-xs-12 col-sm-12 col-md-6 col-lg-6">
                        <label htmlFor="chemical_formulation"
                            className={classNames({ "p-error": isFormFieldValid("plotType") })}>Plot Type</label>
                        <InputText
                            id="plotType"
                            type="text"
                            name="plotType"
                            value={formik.values.plotType}
                            onChange={formik.handleChange}
                            className={classNames({ "p-invalid": isFormFieldValid("plotType") }, "")}

                        />
                        {getFormErrorMessage("plotType")}

                    </div>
                    <div className="p-field col-xs-12 col-sm-12 col-md-6 col-lg-6">
                        <label
                            className={classNames({ "p-error": isFormFieldValid("sqFeet") })}>Square Feet: </label>
                        <InputText
                            id="sqFeet"
                            type="text"
                            name="sqFeet"
                            value={formik.values.sqFeet}
                            onChange={formik.handleChange}
                            className={classNames({ "p-invalid": isFormFieldValid("sqFeet") }, "")}

                        />
                        {getFormErrorMessage("sqFeet")}
                    </div>

                </div>
                <div className="p-fluid p-formgrid p-grid grid row">
                    <div className="p-field col-xs-12 col-sm-12 col-md-6 col-lg-6">
                        <label
                            className={classNames({ "p-error": isFormFieldValid("location") })}> Location</label>
                       <InputText
                            id="location"
                            type="text"
                            name="location"
                            value={formik.values.location}
                            onChange={formik.handleChange}
                            className={classNames({ "p-invalid": isFormFieldValid("location") }, "")}

                        />
                        {getFormErrorMessage("location")}

                    </div>
                    <div className="p-field col-xs-12 col-sm-12 col-md-6 col-lg-6">
                        <label
                            className={classNames({ "p-error": isFormFieldValid("street") })}>Street </label>
                        <InputText
                            id="street"
                            type="text"
                            name="street"
                            value={formik.values.street}
                            onChange={formik.handleChange}
                            className={classNames({ "p-invalid": isFormFieldValid("street") }, "")}

                        />
                        {getFormErrorMessage("street")}
                    </div>

                </div>
                <div className="p-fluid p-formgrid p-grid grid row">

                    <div className="p-field col-xs-12 col-sm-12 col-md-6 col-lg-6">
                        <label
                            className={classNames({ "p-error": isFormFieldValid("block") })}> BLock</label>
                        <InputText
                            id="block"
                            type="text"
                            name="block"
                            value={formik.values.block}
                            onChange={formik.handleChange}
                            className={classNames({ "p-invalid": isFormFieldValid("block") }, "")}

                        />
                        {getFormErrorMessage("block")}

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