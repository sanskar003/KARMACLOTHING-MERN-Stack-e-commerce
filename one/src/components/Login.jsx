import React from "react";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { loginSuccess, loginFailure } from "../../slices/authSlice";
import { loginUser } from "../../api/authApi";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      const data = await loginUser(values);
      dispatch(loginSuccess(data));
      navigate("/clothing");
    } catch (error) {
      dispatch(loginFailure(error));
      setFieldError("api", "Login failed. Please check your credentials.");
    }
    setSubmitting(false);
  };

  return (
    <div className="pageStructure relative" data-scroll-container>
      <div className="h-screen w-full px-2 flex justify-center items-center">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors }) => (
            <Form
              className="w-full max-w-sm sm:max-w-md lg:max-w-lg font-[title] rounded-4xl 
             px-6 sm:px-10 py-6 sm:py-8 md:py-10 
             bg-no-repeat bg-center bg-cover"
              style={{
                backgroundImage: `url("https://img.freepik.com/free-photo/vintage-grungy-textured-paper-background_53876-103932.jpg?w=740")`,
              }}
            >
              <h1 className="font-extrabold text-3xl sm:text-4xl lg:text-5xl">
                LOGIN
              </h1>

              <div className="py-6 sm:py-8 md:py-10 flex flex-col gap-6 sm:gap-8 md:gap-10">
                {/* Email */}
                <div className="items-center text-lg sm:text-xl md:text-2xl font-bold">
                  <h1>EMAIL :</h1>
                  <div className="flex items-center space-x-2">
                    <Field
                      type="email"
                      name="email"
                      className="bg-transparent p-2 w-full border-b-2 sm:border-b-3 border-dotted border-zinc-600 focus:outline-none"
                      placeholder="Enter your email"
                    />
                    <img
                      className="h-6 w-6 sm:h-8 sm:w-8"
                      src="https://img.icons8.com/?id=75oWWA9s6IIl&format=png"
                      alt=""
                    />
                  </div>
                  <ErrorMessage
                    name="email"
                    component="p"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>

                {/* Password */}
                <div className="items-center text-lg sm:text-xl md:text-2xl font-bold">
                  <h1>PASSWORD :</h1>
                  <div className="flex items-center space-x-2">
                    <Field
                      type="password"
                      name="password"
                      className="bg-transparent p-2 w-full border-b-2 sm:border-b-3 border-dotted border-zinc-600 focus:outline-none"
                      placeholder="Enter your password"
                    />
                    <img
                      className="h-6 w-6 sm:h-8 sm:w-8"
                      src="https://img.icons8.com/?id=f8FICE0Hemqy&format=png"
                      alt=""
                    />
                  </div>
                  <ErrorMessage
                    name="password"
                    component="p"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>

                {/* API error */}
                {errors.api && (
                  <p className="text-red-600 text-center text-base sm:text-lg">
                    {errors.api}
                  </p>
                )}

                {/* Buttons in one row */}
                <div className="flex justify-between items-center gap-4">
                  <button
                    type="submit"
                    className="font-bold text-base sm:text-lg border py-1 px-4 rounded-md 
                    hover:shadow-md shadow-black transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
                  >
                    Login
                    <img
                      className="h-5 w-5 sm:h-6 sm:w-6"
                      src="https://img.icons8.com/?id=2I11IckX98hP&format=png"
                      alt=""
                    />
                  </button>

                  <Link to="/register">
                    <button
                      className="font-bold text-base sm:text-lg border py-1 px-4 rounded-md 
                      hover:shadow-md shadow-black flex items-center justify-center gap-2"
                    >
                      <img
                        className="h-5 w-5 sm:h-6 sm:w-6"
                        src="https://img.icons8.com/?id=WNKeANtJC67S&format=png"
                        alt=""
                      />
                      Register
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

export default Login;
