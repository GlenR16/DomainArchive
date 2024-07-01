import { lazy, Suspense } from "react";
import "./App.css";

import Loading from "./pages/Loading.jsx";
import Root from "./pages/Root.jsx";
import Error from "./pages/Error.jsx";
import Home from "./pages/Home.jsx";

import { RouterProvider, createHashRouter } from "react-router-dom";

const Documentation = lazy(() => import("./pages/Documentation.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const Signup = lazy(() => import("./pages/Signup.jsx"));
const Profile = lazy(() => import("./pages/Profile.jsx"));
const Domain = lazy(() => import("./pages/Domain.jsx"));
const DomainDetails = lazy(() => import("./pages/DomainDetails.jsx"));

const router = createHashRouter([
	{
		path: "/",
		element: <Root />,
		errorElement: <Error />,
		children: [
			{
				path: "",
				element: <Home />,
			},
            {
                path: "documentation",
                element: (
                    <Suspense fallback={<Loading />}>
                        <Documentation />
                    </Suspense>
                ),
            },
            {
                path: "login",
                element: (
                    <Suspense fallback={<Loading />}>
                        <Login />
                    </Suspense>
                ),
            },
            {
                path: "signup",
                element: (
                    <Suspense fallback={<Loading />}>
                        <Signup />
                    </Suspense>
                ),
            },
            {
                path: "profile",
                element: (
                    <Suspense fallback={<Loading />}>
                        <Profile />
                    </Suspense>
                ),
            },
            {
                path: "domain",
                children:[
                    {
                        path: "",
                        element: (
                            <Suspense fallback={<Loading />}>
                                <Domain />
                            </Suspense>
                        ),
                    },
                    {
                        path: ":id",
                        element: (
                            <Suspense fallback={<Loading />}>
                                <DomainDetails />
                            </Suspense>
                        ),
                    }
                ]
            },
            {
                path: "loading",
                element: <Loading />,
            }
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
