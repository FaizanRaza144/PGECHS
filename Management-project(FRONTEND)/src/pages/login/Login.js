// Login.js
import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import Axios from "axios";

const Login = ({ onLoginSuccess }) => {
  const [saveBtnLoading, setSaveBtnLoading] = useState(false);
  const history = useHistory();

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("This username is required."),
    password: Yup.string().required("This field is required."),
  });

  const formik = useFormik({
    validationSchema: validationSchema,
    initialValues: {
      username: "",
      password: "",
    },
  });

  const handleLogin = async () => {
    setSaveBtnLoading(true);

    const obj = {
      username: formik.values.username,
      password: formik.values.password,
    };

    try {
      const response = await Axios.post(
        "http://localhost:3001/admin",
        obj,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {

        const token = response.data.token;

        // Store the token in local storage
        localStorage.setItem("authToken", token);

        
        console.log("User Successfully Logged In");
        toast.success("User Successfully Logged In");
        onLoginSuccess(); // Call the parent component's callback to set authentication state
        history.push("/dashboard"); // Redirect to the dashboard or another route
      } else {
        console.log("Invalid Credentials");
      }
    } catch (error) {
      console.log("Error in Login: " + error);
    }

    setSaveBtnLoading(false);
  };
 

    return (

        <>
            <form>
                <div className="flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
                    <div className="flex flex-column align-items-center justify-content-center">
                        <div style={{ borderRadius: '56px', padding: '0.3rem', background: 'linear-gradient(180deg, #407772 10%, rgba(33, 150, 243, 0) 30%)' }}>
                            <div className="w-full surface-card py-8 px-5 sm:px-8" style={{ borderRadius: '53px' }}>
                                <div className="text-center mb-5">
                                    {/* <img src="assets/layout/images/Zindigi.png" alt="Image" height="50" className="mb-3" /> */}
                                    <div className=" text-3xl font-medium mb-3">Sign in</div>
                                    <span className="text-600 font-medium">Sign in to continue</span>
                                </div>

                                <div className="login-div">
                                    <label htmlFor="email1" className="block  text-xl font-medium mb-2">
                                        Username
                                    </label>
                                    <InputText id="username" name="username" value={formik.values.username} onChange={formik.handleChange} type="text" autoComplete="off" className="w-full mb-3" />
                                   

                                    <label htmlFor="password1" className="block  font-medium text-xl mb-2">
                                        Password
                                    </label>
                                    <Password id='password' name="password" value={formik.values.password} onChange={formik.handleChange} toggleMask autoComplete="off" feedback={false} className="w-full mb-3" />
                                   

                                  
                                    <Button label="Sign in" onClick={handleLogin} loading={saveBtnLoading} type="success" className="w-full mt-3 p-3 text-xl" />
                                  
                                       
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </form >
        </>

    );
};

export default Login;
