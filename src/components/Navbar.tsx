import { FunctionComponent } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { successMsg } from "../services/feedbacks";

interface NavbarProps {}

const Navbar: FunctionComponent<NavbarProps> = () => {
let navigate = useNavigate();
return (
    <>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
        <NavLink className="navbar-brand" to="/home">
            Bizz
        </NavLink>
        <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
                <NavLink
                className="nav-link"
                aria-current="page"
                to="/products"
                >
                Cards
                </NavLink>
            </li>
            </ul>
            <form className="d-flex" role="search">
            <button
                className="btn btn-outline-info"
                onClick={() => {
                navigate("/");
                sessionStorage.removeItem("userData");
                successMsg("Bye Bye :)");
                }}
            >
                Logout
            </button>
            </form>
        </div>
        </div>
    </nav>
    </>
);
};

export default Navbar;
