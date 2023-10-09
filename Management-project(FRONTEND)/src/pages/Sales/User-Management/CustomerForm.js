import React, { useState, useEffect, useRef } from 'react'
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import { InputText } from "primereact/inputtext";
import { useFormik } from 'formik';
import Axios from 'axios';
import * as Yup from "yup";
import { Button } from 'primereact/button';
import classNames from "classnames";


export default function CustomerForm({ geteditdata, editable, onHide, getAllCustomers }) {

    //console.log("editable", editable)
    // states 
    // Radio Buttons

    const [hide, sethide] = useState(false);
    const myRef = useRef(null)


    const validationSchema = Yup.object().shape({

        name: Yup.string().required("This field is required."),
        email: Yup.string().required("This field is required."),
        address: Yup.string().required("This field is required."),
        password: editable === true ? null : Yup.string().required("This field is required."),
    });
    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error mt-1 ml-2">{formik.errors[name]}</small>;
    };

    console.log("geteditdata", geteditdata)

    useEffect(() => {
        if (editable === true) {
            formik.setFieldValue("name", geteditdata?.username)
            formik.setFieldValue("address", geteditdata?.address)
            formik.setFieldValue("email", geteditdata?.email)
        }
    }, [editable]);



    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: {

            name: "",
            address: "",
            email: "",
            password: "",


        },

        validate: (data) => {

        },

        onSubmit: async (values) => {
            console.log(values);
            if (editable === true) {
                const obj = {
                    username: formik.values.name,
                    email: formik.values.email,
                    address: formik.values.address,
                }
                console.log("obj", obj)
                try {
                    const res = await Axios.put(`http://192.168.12.96:3005/api/user/${geteditdata?._id}`, obj)

                    await getAllCustomers();

                    console.log("Response success", res.data)
                } catch {
                    console.log("error")
                }
                onHide();
                getAllCustomers();
            }
            else {

                const obj = {

                    username: formik.values.name,
                    email: formik.values.email,
                    password: formik.values.password,
                    address: formik.values.address,

                }
                console.log("obj", obj)
                try {
                    const res = await Axios.post('http://192.168.12.96:3005/api/user', obj)
                    await getAllCustomers();
                    onHide();

                    console.log("Response success", res.data)
                } catch {
                    console.log("error")
                }
                onHide();
                getAllCustomers();

            }

        },
    });


    return (
        <div className='card' >
            <div className='p-fluid p-formgrid p-grid grid row' >

                <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12 icons'>
                    <div className='m-2'>
                        <i className="pi pi-book"></i>
                    </div>
                    <div className='m-2'>
                        <i className="pi pi-map-marker"></i>
                    </div>
                    <div className='m-2'>
                        <i className="pi pi-user-edit"></i>
                    </div>
                    <div className='m-2'>
                        <i className="pi pi-credit-card"></i>
                    </div>
                    <div className='m-2'>
                        <i className="pi pi-save"></i>
                    </div>
                </div>
            </div>
            <form onSubmit={formik.handleSubmit} >
                <div className="p-fluid p-form grid p-grid grid row" style={{ overflow: 'hidden' }}>
                    <div className="p-field col-xs-12 col-sm-12 col-md-12  col-lg-12">
                        <label
                            className={classNames({ "p-error": isFormFieldValid("name") })}>User Name
                        </label>

                        <InputText
                            id="name"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            className={classNames({ "p-invalid": isFormFieldValid("name") }, "")}
                        />
                        {getFormErrorMessage("name")}
                    </div>
                </div>
                <div className="p-fluid p-formgrid p-grid grid row">

                    {
                        editable === true ? null :
                            <div className="p-field col-xs-12 col-sm-12 col-md-12  col-lg-12">
                                <label
                                    className={classNames({ "p-error": isFormFieldValid("password") })}>
                                    Password </label>
                                <InputText
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    className={classNames({ "p-invalid": isFormFieldValid("password") }, "")}

                                />
                                {getFormErrorMessage("password")}
                            </div>
                    }
                </div>

                <div className="p-fluid p-formgrid p-grid grid row">
                    <div className="p-field col-xs-12 col-sm-12 col-md-12  col-lg-12">
                        <label
                            className={classNames({ "p-error": isFormFieldValid("email") })}>
                            Email </label>
                        <InputText
                            id="email"
                            type="email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            className={classNames({ "p-invalid": isFormFieldValid("email") }, "")}

                        />
                        {getFormErrorMessage("email")}
                    </div>
                </div>

                <div className="p-fluid p-formgrid p-grid grid row">
                    <div className="p-field col-xs-12 col-sm-12 col-md-12  col-lg-12">
                        <label
                            className={classNames({ "p-error": isFormFieldValid("address") })}>
                            Address </label>
                        <InputText
                            id="address"
                            type="address"
                            name="address"
                            value={formik.values.address}
                            onChange={formik.handleChange}
                            className={classNames({ "p-invalid": isFormFieldValid("address") }, "")}

                        />
                        {getFormErrorMessage("address")}
                    </div>
                </div>

                <div className='flex cus-buton'>
                    <Button label="Success" className="p-button-rounded p-button-success" type='submit'
                    />
                </div>

            </form>
        </div>
    )
}