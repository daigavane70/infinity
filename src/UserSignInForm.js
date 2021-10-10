import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import Controls from "./components/controls/Controls";
import { useForm, Form } from "./components/useForm";
// import * as employeeService from "./services/employeeService";

const genderItems = [
    { id: "male", title: "Male" },
    { id: "female", title: "Female" },
    { id: "other", title: "Other" }
]

const initialValues = {
    id: 0,
    fullName: "",
    email: "",
    password:"",
    mobile: "",
    city: ""
}

const EmployeeFrom = () => {

    const validate = (fieldValues = values) => {
        
        let temp = { ...errors }

        if ("fullName" in fieldValues)
        {
            temp.fullName = fieldValues.fullName ? "" : "This field is required"
        }
        if ("email" in fieldValues)
        {
            temp.email = (/$^|^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+$/).test(fieldValues.email) ? "" : "Email is not valid."
        }
        if ("mobile" in fieldValues)
        {
            // temp.mobile = fieldValues.mobile.length > 9 ? "" : "Mobile number should have atleast 10 digits"
            temp.mobile = (/^(\+\d{1,3}[- ]?)?\d{10}$/).test(fieldValues.mobile) ?"" : "Mobile number should have atleast 10 digits"
        }
        if ("password" in fieldValues)
        {
            temp.password = (/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/).test(fieldValues.password) ? "Password should contain atleast 8 characters with atleast one letter and one number" : ""
        }

        setErrors({
            ...temp
        })

        if (fieldValues === values)
        {
            return Object.values(temp).every(x => x === "");
        }
    }

    const {
        values, setValues, errors, setErrors, handleInputChange, resetForm
    } = useForm(initialValues, true, validate);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            window.alert("testing");
        }
    }

    return (
        <>
            <h1>User Registration Form</h1>
            <Form onSubmit={handleSubmit}>
                <Grid container>
                    <Grid item md={6} xs={12}>

                        <Controls.Input
                            label="Full Name"
                            name="fullName"
                            value={values.fullName}
                            onChange={handleInputChange}
                            error={errors.fullName}
                        />
                        <Controls.Input
                            label="Email"
                            name="email"
                            value={values.email}
                            onChange={handleInputChange}
                            error={errors.email}
                        />
                        <Controls.Input
                            label="Password"
                            name="password"
                            value={values.password}
                            onChange={handleInputChange}
                            error={errors.password}
                        />
                        <Controls.Input
                            label="Mobile"
                            name="mobile"
                            value={values.mobile}
                            onChange={handleInputChange}
                            error={errors.mobile}
                        />
                        <Controls.Input
                            label="City"
                            name="city"
                            value={values.city}
                            onChange={handleInputChange}
                        />
                        <div>
                            <Controls.Button
                                type="submit"
                                text="Sign In" 
                            />
                            {/* <Controls.Button
                                text="Reset"
                                color="default"
                                onClick={resetForm} /> */}
                        </div>

                    </Grid>
                    {/* <Grid item md={6} xs={12}> */}
                        {/* <Controls.RadioGroup
                            name="gender"
                            value={values.gender}
                            label="Gender"
                            onChange={handleInputChange}
                            items={genderItems}
                        /> */}

                        {/* <Controls.Select
                            name="departmentId"
                            label="Department"
                            value={values.departmentId}
                            onChange={handleInputChange}
                            options={employeeService.getDepartmentCollection()}
                            error={errors.departmentId}
                        /> */}

                        {/* <Controls.DatePicker
                            name="hireDate"
                            label="Hire Date"
                            value={values.hireDate}
                            onChange={handleInputChange}
                        /> */}

                        {/* <Controls.Checkbox
                            name="isPermanent"
                            label="Permanent Employee"
                            value={values.isPermanent}
                            onChange={handleInputChange}
                        /> */}

                        {/* <div>
                            <Controls.Button
                                type="submit"
                                text="Submit" />
                            { <Controls.Button
                                text="Reset"
                                color="default"
                                onClick={resetForm} /> }
                        </div> */}


                    </Grid>
                {/* </Grid> */}
            </Form>
        </>
    );

}

export default EmployeeFrom;