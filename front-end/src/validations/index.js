import * as Yup from "yup";

export const registerSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot be more than 50 characters"),
  phone: Yup.string()
    .required("Phone number is required")
    .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(4, "Password must be at least 4 characters")
    .max(20, "Password cannot be more than 20 characters"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(4, "Password must be at least 4 characters")
    .max(20, "Password cannot be more than 20 characters"),
});


export const productShema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(4, "Name must be at least 4 characters")
    .max(20, "Name cannot be more than 20 characters"),
  description: Yup.string()
    .min(20, "Name must be at least 20 characters")
    .max(200, "Name cannot be more than 200 characters")
    .required("description is required"),
  price: Yup.string()
    .required("price is required"),
  uploadfile: Yup.string()
    .required("uploadfile is required"),
  quantity: Yup.string()
    .required("quantity is required")
});
