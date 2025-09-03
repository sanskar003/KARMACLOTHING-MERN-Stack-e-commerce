import React from "react";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { registerSuccess, registerFailure } from "../../slices/authSlice";
import { registerUser } from "../../api/authApi";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    email: "",
    password: "",
    avatar: null
  };

  const validationSchema = Yup.object({
    username: Yup.string().min(3, "At least 3 characters").required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().min(6, "Min 6 characters").required("Required")
  });

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("username", values.username);
      formData.append("email", values.email);
      formData.append("password", values.password);
      if (values.avatar) formData.append("avatar", values.avatar);

      const data = await registerUser(formData);
      dispatch(registerSuccess(data));
      navigate("/clothing");
    } catch (error) {
      dispatch(registerFailure(error));
    }
  };

  return (
    <div className="pageStructure py-5" data-scroll-container>
      <div className="h-screen w-full flex justify-center items-center">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form
              className="w-[50%] font-[title] rounded-4xl p-5 bg-no-repeat bg-center bg-cover"
              style={{
                backgroundImage:
                  `url("https://img.freepik.com/free-photo/vintage-grungy-textured-paper-background_53876-103932.jpg?w=740")`
              }}
            >
              <h1 className="font-extrabold text-5xl">REGISTER</h1>

              <div className="py-10 flex flex-col gap-10">
                {/* Username */}
                <div className="items-center text-2xl font-bold">
                  <h1>USERNAME :</h1>
                  <div className="flex">
                    <Field
                      type="text"
                      name="username"
                      className="bg-transparent p-2 w-full border-b-3 border-dotted border-zinc-600"
                    />
                    <img className="h-8 w-8" src="https://img.icons8.com/?id=YRJN4lBDhzh8&format=png" alt="" />
                  </div>
                  <ErrorMessage name="username" component="p" className="text-red-600 text-sm" />
                </div>

                {/* Email */}
                <div className="items-center text-2xl font-bold">
                  <h1>EMAIL :</h1>
                  <div className="flex">
                    <Field
                      type="email"
                      name="email"
                      className="bg-transparent p-2 w-full border-b-3 border-dotted border-zinc-600"
                    />
                    <img className="h-8 w-8" src="https://img.icons8.com/?id=75oWWA9s6IIl&format=png" alt="" />
                  </div>
                  <ErrorMessage name="email" component="p" className="text-red-600 text-sm" />
                </div>

                {/* Password */}
                <div className="items-center text-2xl font-bold">
                  <h1>PASSWORD :</h1>
                  <div className="flex">
                    <Field
                      type="password"
                      name="password"
                      className="bg-transparent p-2 w-full border-b-3 border-dotted border-zinc-600"
                    />
                    <img className="h-8 w-8" src="https://img.icons8.com/?id=f8FICE0Hemqy&format=png" alt="" />
                  </div>
                  <ErrorMessage name="password" component="p" className="text-red-600 text-sm" />
                </div>

                {/* Avatar */}
                <div className="items-center text-2xl font-bold">
                  <h1>AVATAR :</h1>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFieldValue("avatar", e.target.files[0])}
                    className="bg-transparent p-2 w-full border-b-3 border-dotted border-zinc-600"
                  />
                </div>

                {/* Buttons */}
                <div className="flex justify-between">
                  <button
                    type="submit"
                    className="w-fit font-bold text-xl border py-1 px-2 rounded-md hover:shadow-md shadow-black flex items-center gap-2"
                  >
                    Register
                    <img className="h-8 w-8" src="https://img.icons8.com/?id=2I11IckX98hP&format=png" alt="" />
                  </button>
                  <Link to="/login">
                    <button className="w-fit font-bold text-xl border py-1 px-2 rounded-md hover:shadow-md shadow-black flex items-center gap-2">
                      <img className="h-8 w-8 rotate-180" src="https://img.icons8.com/?id=2I11IckX98hP&format=png" alt="" />
                      Login
                    </button>
                  </Link>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;