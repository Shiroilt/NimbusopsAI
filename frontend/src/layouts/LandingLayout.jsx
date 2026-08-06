import LandingPage from "../pages/Landing/LandingPage";
import Navbar from "../components/navigation/Navbar";

export default function LandingLayout() {
    return (
        <>
            <Navbar mode="landing" />
            <LandingPage />
        </>
    );
}