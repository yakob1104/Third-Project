import { useFormik } from "formik";
import { FunctionComponent } from "react";
import * as yup from "yup";
import User from "../interfaces/User";
import { checkUser } from "../services/userService";
import { Link, useNavigate } from "react-router-dom";
import { errorMsg, successMsg } from "../services/feedbacks";


interface LoginProps {}

const Login: FunctionComponent<LoginProps> = () => {
    let navigate = useNavigate();
    let formik = useFormik({
        initialValues: { email: "", password: ""},
        validationSchema: yup.object({
            email: yup.string().required().email().min(5),
            password: yup.string().required().min(8),
        }),
        onSubmit: (values: User) => {
            checkUser(values)
                .then((res) => {
                    if(res.data.length) {
                        navigate("/home");
                        sessionStorage.setItem(
                            "userData",
                            JSON.stringify({
                                isLoggedIn: true,
                                isAdmin: res.data[0].isAdmin,
                                userId: res.data[0].id,
                            })
                        );
                        successMsg("You logged in successfully!");
                    } else errorMsg("Wrong email or password");
                })
                .catch((err) => console.log(err));
        },
    });
    return (
        <div className="container mt-3 col-md-4 text-center">
            <h3 className="display-3">LOGIN</h3>
            <form onSubmit={formik.handleSubmit}>
                <div className="form-floating mb-3">
                    <input 
                    type="email"
                    className="form-control"
                    id="flotingInput"
                    placeholder="name@example.com"
                    name="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    />
                    <label htmlFor="floatingInput">Email address</label>
                    {formik.touched.email && formik.errors.email && (
                        <p className="text-danger">{formik.errors.email}</p>
                    )}
                </div>
                <div className="form-floating">
                    <input
                    type="password"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    name="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    onBlur={formik.handleBlur}
                    />
                    <label htmlFor="floatingPassword">Password</label>
                    {formik.touched.password && formik.errors.password &&(
                        <p className="text-danger">{formik.errors.password}</p>
                    )}
                </div>
                <button 
                type="submit"
                className="btn btn-sucess w-100 my-3"
                disabled={!formik.dirty || !formik.isValid}
                >
                    Login
                </button>
            </form>
            <Link to="/register">new user? register here!</Link> 
        </div>
    );
};
export default Login;