import { FunctionComponent } from "react";
import Navbar from "./Navbar";

interface HomeProps {}

const Home: FunctionComponent<HomeProps> =() => {
    return (
        <>
        <Navbar/>
        <h3 className="dispaly-3">Home</h3>
        </>
    );
};
export default Home;