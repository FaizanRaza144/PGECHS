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

const GenerateOTP = () => {
    const [loading, setloading] = useState(false);
    const [loadingIcon, setloadingIcon] = useState("");
    const dispatch = useDispatch();
    const history = useHistory();

    const formik = useFormik({
        initialValues: {
            email: "",
            // username: "",
        },
        validate: (data) => {
            let errors = {};

            if (!data.email) {
                errors.email = "Email is required.";
            }
            
            return errors;
        },
        onSubmit: async (data) => {
            setloading(true);
            setloadingIcon("pi pi-spin pi-spinner")
            // /api/resetPasswordEmail
            const res = await dispatch(handlePostRequest(data, `/api/resetPasswordEmail`, true, true));
            if (res?.status === 200) {
    
                formik.resetForm();
            }
            setloading(false);
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
                    {/* <div className="flex justify-content-center  w-11 md:w-7 ">
                    <label htmlFor="">FORGOT PASSWORD</label>
                    </div> */}
                   
                    <form action="#" onSubmit={formik.handleSubmit}>
                        <div className="input-login-forms">
                        {/* <div className="input-lable flex flex-column w-11 md:w-7 ">
                        <div className="lable-email">
                            <label className="mb-3 text-2xl" htmlFor="username">
                                Username
                            </label>
                        </div>
                        <div className="m-auto w-full mt-2">
                            <span className="p-float-label p-input-icon-right w-full ">
                                <InputText
                                    id="username"
                                    type="username"
                                    className={classNames({ "p-invalid": isFormFieldValid("username") }, "p-inputtext p-component p-filled w-full input-logins text-2xl")}
                                    name="username"
                                    value={formik.values.username}
                                    placeholder="**********"
                                    onChange={formik.handleChange}
                                />
                                {getFormErrorMessage("username")}
                            </span>
                        </div>
                        </div> */}
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
                      

                       
                        </div>
                        <div align="center" className="mt-5">
                            <Button className="p-button-rounded p-button-warning w-4 text-2xl" label="Submit" icon={loadingIcon || ""} iconPos="right" disabled={loading} />
                        </div>
                    </form>
                    <div align="center" className="mt-5">
                            <Button className="p-button-rounded p-button-warning w-4 text-2xl" onClick={()=>history.push("/")} label="Login" iconPos="right" disabled={loading} />
                        </div>
                </div>

                <div align="center" className="col-12 md:col-6  flex flex-column justify-content-center align-item-center mt-8 md:mb-8">
                    <img className="w-10 ml-5 md:ml-2" src={SideImage} alt="" />
                </div>
            </div>
        </div>
    );
};

export default GenerateOTP;
