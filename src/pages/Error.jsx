import Navbar from "../components/Navbar";
import { useRouteError } from "react-router-dom";
import { UsernameProvider } from "../contexts/UsernameProvider";

export default function Error() {
    const error = useRouteError();

	return (
        <UsernameProvider>
            <div className="h-screen overflow-hidden bg-base-300 flex flex-col">
                <Navbar>
                    <div className="bg-base-100 grow flex flex-col items-center justify-center p-8">
                        <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary">{error.status}</h1>
                        <p className="mb-4 text-3xl tracking-tight font-bold md:text-4xl">{error.statusText}</p>
                        <p className="mb-4 text-xl">Sorry, something went wrong. Our engineers are working on it.</p>
                    </div>
                </Navbar>
            </div>
        </UsernameProvider>
	);
}
