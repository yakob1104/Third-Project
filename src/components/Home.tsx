import { FunctionComponent } from "react";
import Navbar from "./Navbar";

interface HomeProps {}

const Home: FunctionComponent<HomeProps> =() => {
    return (
        <>
        <Navbar/>
        <h3 className="dispaly-3">Home</h3>
        <h4>Welcome This is the home page</h4>
        <p>Here you can see all of our companys bizz cards!</p>
        </>
    );
};
export default Home;