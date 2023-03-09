import { FunctionComponent } from "react";
import Navbar from "./Navbar";

interface HomeProps {}

const about: FunctionComponent<HomeProps> =() => {
    return (
        <>
        <Navbar/>
        <h3>About</h3>
        <h4>About the bizz company</h4>
        <p>The bizz company is found in 2023 its a site where companys can add there company info
        and all the ways to contact them!</p>
        </>
    );
};
export default about;




