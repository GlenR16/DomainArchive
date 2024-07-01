import { NavLink } from "react-router-dom";
import { useUsername } from "../contexts/UsernameProvider";

export default function Navbar({ children }) {
	const { username } = useUsername();
    
    return (
		<div className="drawer">
			<input id="mobileDrawer" type="checkbox" className="drawer-toggle" />
			<div className="drawer-content flex flex-col min-h-screen">
				<div className="w-full navbar bg-base-300 min-h-14 h-14">
					<a href="/" className="flex-1 px-2 mx-2 text-xl font-semibold link no-underline gap-2 text-primary">
						<svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<g id="SVGRepo_bgCarrier" strokeWidth={0} />
							<g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
							<g id="SVGRepo_iconCarrier">
								{" "}
								<path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> <path d="M18 7.75V14.5C18 13.4 17.1 12.5 16 12.5H8C6.9 12.5 6 13.4 6 14.5V7.75C6 6.65 6.9 5.75 8 5.75H16C17.1 5.75 18 6.65 18 7.75Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> <path d="M19 15.75H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> <path d="M6 15.75H5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> <path d="M18 14V11C18 9.9 17.1 9 16 9H8C6.9 9 6 9.9 6 11V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> <path d="M18 14.5V15.75H14.5C14.5 17.13 13.38 18.25 12 18.25C10.62 18.25 9.5 17.13 9.5 15.75H6V14.5C6 13.4 6.9 12.5 8 12.5H16C17.1 12.5 18 13.4 18 14.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />{" "}
							</g>
						</svg>
						Domain Archive
					</a>
					<div className="flex-none hidden lg:block">
						<ul className="menu menu-horizontal gap-2">
							<li>
								<NavLink to="/">Home</NavLink>
							</li>
							<li>
								<NavLink to="/documentation">Documentation</NavLink>
							</li>
							{username ? (
								<>
									<li>
										<NavLink to="/domain">Domains</NavLink>
									</li>
									<li>
										<NavLink to="/profile">Profile</NavLink>
									</li>
								</>
							) : (
								<>
									<li>
										<NavLink to="/login">Login</NavLink>
									</li>
									<li>
										<NavLink to="/signup">Signup</NavLink>
									</li>
								</>
							)}
						</ul>
					</div>
					<div className="flex-none lg:hidden">
						<label htmlFor="mobileDrawer" aria-label="open sidebar" className="btn btn-square btn-ghost min-h-10 h-10">
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
							</svg>
						</label>
					</div>
				</div>
				{children}
			</div>
			<div className="drawer-side">
				<label htmlFor="mobileDrawer" aria-label="close sidebar" className="drawer-overlay"></label>
				<ul className="menu p-4 w-80 min-h-full bg-base-200 gap-2">
					<h1 className="text-2xl font-bold my-2">Domain Archive</h1>
					<li>
						<NavLink to="/">Home</NavLink>
					</li>
					<li>
						<NavLink to="/documentation">Documentation</NavLink>
					</li>
					{username ? (
						<>
							<li>
								<NavLink to="/domain">Domains</NavLink>
							</li>
							<li>
								<NavLink to="/profile">Profile</NavLink>
							</li>
						</>
					) : (
						<>
							<li>
								<NavLink to="/login">Login</NavLink>
							</li>
							<li>
								<NavLink to="/signup">Signup</NavLink>
							</li>
						</>
					)}
				</ul>
			</div>
		</div>
	);
}
