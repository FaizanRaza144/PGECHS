import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { useFormik } from 'formik';
import Axios from 'axios';
import * as Yup from 'yup';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';

export default function MemberForm({ memberID }) {
   const [fileData, setFileData] = useState({});
  const [errorMEssage,setErrorMessage] = useState(null);
  const [successMEssage,setSuccessMessage] = useState(null);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('This field is required.'),
    address: Yup.string().required('This field is required.'),
    phoneNumber: Yup.string().required('This field is required.'),
    cnic: Yup.string().required('This field is required.'),
  });

  const formik = useFormik({
    validationSchema,
    initialValues: {
      name: '',
      address: '',
      phoneNumber: '',
      cnic: '',
    },
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('address', values.address);
        formData.append('phoneNumber', values.phoneNumber);
        formData.append('cnic', values.cnic);

        // Append file data to formData
        for (const field in fileData) {
          formData.append(field, fileData[field]);
        }

        // Make a POST request to the backend
        const response = await Axios.post(`http://localhost:3001/members/addDetails/${memberID}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          validateStatus: function (status) {
            return status === 200 || status === 409; // Axios will throw an error for other status codes
        },
    });
    if (response.status === 409) {
        const { data } = response;
        console.log('Error: '+data.message)
        setErrorMessage(data.message)
    } else if (response.status === 200) {
      const { data } = response;
        console.log('Error: '+data.message)
        setSuccessMessage(data.message)
        // You can redirect or perform other actions on successful registration
    } else {
        console.log("Unexpected response status:", response.status);
    }
  
      } catch (error) {
        // Handle errors (e.g., show an error message)
        console.error('API Error:', error);
      }
    },
  });

  const handleFileChange = (event) => {
    const fieldName = event.target.name;
    const file = event.target.files[0];

    setFileData((prevFileData) => ({
      ...prevFileData,
      [fieldName]: file,
    }));
  };

  return (
    <div className="card">
      <form onSubmit={formik.handleSubmit}>
        <div className="p-fluid p-formgrid p-grid grid row">
          <div className="p-field col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <label>Name</label>
            <InputText
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            {formik.touched.name && formik.errors.name && <small className="p-error mt-1 ml-2">{formik.errors.name}</small>}
          </div>
          <div className="p-field col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <label>Address</label>
            <InputText
              id="address"
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
            />
            {formik.touched.name && formik.errors.name && <small className="p-error mt-1 ml-2">{formik.errors.name}</small>}
          </div>
          <div className="p-field col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <label>Phone Number</label>
            <InputText
              id="phoneNumber"
              name="phoneNumber"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
            />
            {formik.touched.name && formik.errors.name && <small className="p-error mt-1 ml-2">{formik.errors.name}</small>}
          </div>
          <div className="p-field col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <label>CNIC</label>
            <InputText
              id="cnic"
              name="cnic"
              value={formik.values.cnic}
              onChange={formik.handleChange}
            />
            {formik.touched.name && formik.errors.name && <small className="p-error mt-1 ml-2">{formik.errors.name}</small>}
          </div>
          {/* Add other form fields as needed */}
          <div className="p-field col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <label>Upload Allotment Certificate</label>
            <input type="file" name="allotmentCertificate" onChange={handleFileChange} />
          </div>
          <div className="p-field col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <label>Upload Membership Transfer</label>
            <input type="file" name="membershipTransfer" onChange={handleFileChange} />
          </div>
          <div className="p-field col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <label>Upload Application Form</label>
            <input type="file" name="applicationForm" onChange={handleFileChange} />
          </div>
          <div className="p-field col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <label>Upload Undertaking</label>
            <input type="file" name="underTaking" onChange={handleFileChange} />
          </div>
          <div className="p-field col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <label>Upload Affidavit</label>
            <input type="file" name="affidavit" onChange={handleFileChange} />
          </div>
          <div className="p-field col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <label>Upload Transfer image</label>
            <input type="file" name="transferImage" onChange={handleFileChange} />
          </div>
          <div className="p-field col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <label>Upload Merged PDF Document</label>
            <input type="file" name="mergedPDF" onChange={handleFileChange} />
          </div>
          {/* Repeat the above block for other file uploads */}


          <div className="p-field col-xs-12 col-sm-12 col-md-6 col-lg-6 p-6">
                    <Tag value={errorMEssage} severity="danger"></Tag>
          </div>
          <div className="p-field col-xs-12 col-sm-12 col-md-6 col-lg-6 p-6">
                    <Tag value={errorMEssage} severity="success"></Tag>
          </div>
                

          <div className="flex cus-buton">
            <Button label="SUBMIT" className="p-button-rounded p-button-success" type="submit" />
          </div>
        </div>
      </form>
    </div>
  );
}
