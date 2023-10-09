import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { useFormik } from "formik";
import classNames from "classnames";
import { useHistory } from "react-router-dom";
import SideImage from "./login-assest/image.svg";
import logo from "./login-assest/logo.svg";
import emialIcon from "./login-assest/email.svg";
import { InputText } from "primereact/inputtext";
import { useDispatch } from "react-redux";
import { handlePostRequest } from "../../../services/PostTemplate";

const ForgetPassword = () => {
    const [loading, setloading] = useState(false);
    const [loadingIcon, setloadingIcon] = useState("");
    const dispatch = useDispatch();
    const history = useHistory();

    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validate: (data) => {
            let errors = {};

            if (!data.email) {
                errors.email = "Email is required.";
            }
            
            return errors;
        },
        onSubmit: async (data) => {
            // setloading(true);
            setloadingIcon("pi pi-spin pi-spinner")
            const res = await dispatch(handlePostRequest(data, `/api/resetPasswordEmail`, false, true));
            if (res?.status === 200) {
    
                formik.resetForm();
            }
            // setloading(false);
            setloadingIcon("");
            formik.resetForm();
        },
    });
    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };

    return (
        <div>
            <div className="grid h-100 w-full">
                <div className="col-12 md:col-6  flex flex-column  justify-content-center align-item-center">
                    <label align="center" className="mt-3 w-full mb-8" htmlFor="">
                        <img className="w-15rem" src={logo} alt="" />
                        
                    </label>
                   
                    <form action="#" onSubmit={formik.handleSubmit}>
                        <div className="input-login-forms">
                    
                            <div className="input-lable flex flex-column w-11 md:w-7 ">
                                <label htmlFor="Email" className="mb-3 text-2xl">
                                    Email
                                </label>
                                <div className="">
                                    <span className="p-float-label p-input-icon-left w-full">
                                        <img className="email-icon " src={emialIcon} alt="" />
                                        <InputText
                                            id="email"
                                            className={classNames({ "p-invalid": isFormFieldValid("email") }, "p-inputtext p-component p-filled w-full input-logins text-2xl")}
                                            name="email"
                                            value={formik.values.email}
                                            placeholder="abc@appinsnap.com"
                                            onChange={formik.handleChange}
                                            type="text"
                                        />
                                        {getFormErrorMessage("email")}
                                    </span>
                                </div>
                            </div>
                            <div className="flex justify-content-end flex-wrap w-10 md:w-6 mt-3">
                                
                                <label className="remember-forget  mt-1" style={{ cursor: "pointer" }} onClick={()=>history.push("/")} htmlFor="">
                                    Login
                                </label>
                            </div>
                        </div>
                        <div align="center" className="mt-7">
                            <Button className="p-button-rounded p-button-warning w-4 text-2xl" label="SUBMIT" icon={loadingIcon || ""} iconPos="right" disabled={loading} />
                        </div>
                    </form>
                    {/* <div align="center" className="mt-5">
                            <Button className="p-button-rounded p-button-warning w-2 text-2xl" onClick={()=>history.push("/")} label="Login" iconPos="right" disabled={loading} />
                    </div> */}
                </div>

                <div align="center" className="col-12 md:col-6  flex flex-column justify-content-center align-item-center mt-8 md:mb-8">
                    <img className="w-10 ml-5 md:ml-2" src={SideImage} alt="" />
                </div>
            </div>
        </div>
    );
};

export default ForgetPassword;
