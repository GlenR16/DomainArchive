import { useEffect, useState } from "react";
import InputField from "../components/InputField";
import { NavLink, useNavigate } from "react-router-dom";
import SubmitButton from "../components/SubmitButton";
import useAxiosAuth from "../lib/ApiProvider";
import { useUsername } from "../contexts/UsernameProvider";

export default function Login() {
	const navigate = useNavigate();
	const { username, updateUsername } = useUsername();

	useEffect(() => {
		if (username) {
			navigate("/domain");
		}
	}, []);

	const axios = useAxiosAuth();
	const [loginForm, setLoginForm] = useState({
		username: "",
		password: "",
		remember_me: false,
	});
	const [errors, setErrors] = useState({});

	function handleLoginFormChange(e) {
		setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
	}

	function submitLoginForm() {
		axios
			.post("/token", loginForm)
			.then((response) => {
				setErrors({});
				updateUsername(loginForm.username);
				localStorage.setItem("accessToken", response.data.access);
				if (loginForm.remember_me) {
					localStorage.setItem("refreshToken", response.data.refresh);
				}
				navigate("/domain");
			})
			.catch((error) => {
				if (error.response) {
					setErrors(error.response.data);
				}
			});
	}

	return (
		<div className="grow flex flex-row justify-evenly">
			<div className="hidden md:block w-full h-full bg-primary text-primary-content">
				<div className="text-start flex flex-col justify-evenly h-full p-6">
					<div>
						<h1 className="mb-4 text-2xl font-extrabold tracking-tight leading-none md:text-4xl xl:text-5xl">The best way to manage your microservices</h1>
						<p className="mb-6 font-semibold lg:mb-8 md:text-lg lg:text-xl">From service discovery to uptime monitoring, we have got you covered. Sign up now and get started in minutes. Works with Eureka out of the box.</p>
					</div>

					<svg viewBox="0 0 1024 1024" fill="currentColor" className="h-56" version="1.1" xmlns="http://www.w3.org/2000/svg">
						<g id="SVGRepo_bgCarrier" strokeWidth={0} />
						<g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
						<g id="SVGRepo_iconCarrier">
							<path d="M344.078 887.828H8.23c-4.42 0-7.996-3.576-7.996-7.996s3.576-7.996 7.996-7.996h335.846c4.418 0 7.996 3.576 7.996 7.996s-3.576 7.996-7.994 7.996zM344.078 935.806H8.23a7.992 7.992 0 0 1-7.996-7.998 7.992 7.992 0 0 1 7.996-7.996h335.846a7.994 7.994 0 0 1 7.996 7.996 7.99 7.99 0 0 1-7.994 7.998zM1015.77 935.806H679.924a7.994 7.994 0 0 1-7.998-7.998 7.994 7.994 0 0 1 7.998-7.996h335.846a7.992 7.992 0 0 1 7.996 7.996 7.992 7.992 0 0 1-7.996 7.998zM1015.77 887.828H679.924c-4.42 0-7.998-3.576-7.998-7.996s3.578-7.996 7.998-7.996h335.846c4.42 0 7.996 3.576 7.996 7.996s-3.576 7.996-7.996 7.996zM647.938 951.798H376.062a7.99 7.99 0 0 1-7.996-7.996V863.84a7.99 7.99 0 0 1 7.996-7.996h87.958v-103.954a7.992 7.992 0 0 1 7.998-7.996 7.992 7.992 0 0 1 7.996 7.996v111.95a7.994 7.994 0 0 1-7.996 7.996h-87.96v63.97H639.94v-63.97h-87.958a7.994 7.994 0 0 1-7.998-7.996v-111.95c0-4.42 3.578-7.996 7.998-7.996s7.996 3.576 7.996 7.996v103.954h87.958a7.99 7.99 0 0 1 7.996 7.996v79.962a7.988 7.988 0 0 1-7.994 7.996z" fill="" />
							<path d="M519.996 903.82a7.99 7.99 0 0 1-7.996-7.996v-143.934c0-4.42 3.576-7.996 7.996-7.996s7.996 3.576 7.996 7.996v143.934a7.99 7.99 0 0 1-7.996 7.996z" fill="" />
							<path d="M615.954 903.82h-95.958c-4.42 0-7.996-3.576-7.996-7.996s3.576-7.996 7.996-7.996h95.958c4.42 0 7.996 3.576 7.996 7.996s-3.576 7.996-7.996 7.996zM871.836 727.902H152.164c-4.418 0-7.996-3.578-7.996-7.998s3.578-7.996 7.996-7.996h719.672c4.42 0 7.996 3.576 7.996 7.996s-3.576 7.998-7.996 7.998z" fill="" />
							<path d="M152.156 727.902a8 8 0 0 1-7.95-7.202L96.23 240.92a7.992 7.992 0 0 1 7.162-8.746c4.538-0.484 8.316 2.764 8.754 7.154l47.978 479.782a7.994 7.994 0 0 1-7.162 8.746c-0.274 0.03-0.54 0.046-0.806 0.046zM871.836 727.902c-0.25 0-0.532-0.016-0.796-0.046a8.006 8.006 0 0 1-7.168-8.746l47.976-479.782c0.454-4.388 4.28-7.652 8.762-7.154a8.004 8.004 0 0 1 7.168 8.746L879.8 720.702a8.02 8.02 0 0 1-7.964 7.2z" fill="" />
							<path d="M919.812 248.122H104.186c-4.418 0-7.996-3.576-7.996-7.996s3.578-7.998 7.996-7.998h815.626c4.422 0 7.996 3.578 7.996 7.998s-3.574 7.996-7.996 7.996zM152.164 152.164a7.992 7.992 0 0 1-7.996-7.996v-15.992a7.992 7.992 0 0 1 7.996-7.996 7.992 7.992 0 0 1 7.998 7.996v15.992a7.992 7.992 0 0 1-7.998 7.996zM871.836 152.164a7.99 7.99 0 0 1-7.996-7.996v-15.992c0-4.42 3.576-7.996 7.996-7.996s7.996 3.576 7.996 7.996v15.992a7.99 7.99 0 0 1-7.996 7.996z" fill="" />
							<path d="M871.836 136.172H376.062a7.986 7.986 0 0 1-7.582-5.466l-14.182-42.512h-132.4l-14.174 42.512a7.986 7.986 0 0 1-7.582 5.466H152.164c-4.418 0-7.996-3.576-7.996-7.996s3.578-7.996 7.996-7.996H194.38l14.172-42.512a7.988 7.988 0 0 1 7.582-5.466h143.928a7.988 7.988 0 0 1 7.582 5.466l14.18 42.512h490.01c4.42 0 7.996 3.576 7.996 7.996s-3.574 7.996-7.994 7.996zM887.828 184.15H136.172c-4.42 0-7.996-3.576-7.996-7.996s3.576-7.998 7.996-7.998h751.656c4.42 0 7.996 3.578 7.996 7.998s-3.576 7.996-7.996 7.996zM903.82 216.134H120.18c-4.42 0-7.996-3.576-7.996-7.996s3.576-7.996 7.996-7.996h783.64c4.42 0 7.996 3.576 7.996 7.996s-3.576 7.996-7.996 7.996zM559.978 535.988a7.99 7.99 0 0 1-7.996-7.996v-79.962c0-4.42 3.576-7.996 7.996-7.996s7.996 3.576 7.996 7.996v79.962a7.99 7.99 0 0 1-7.996 7.996zM368.066 535.988h-23.99a7.992 7.992 0 0 1-7.998-7.996v-79.962a7.992 7.992 0 0 1 7.998-7.996h23.99c26.456 0 47.978 21.522 47.978 47.978s-21.522 47.976-47.978 47.976z m-15.992-15.992h15.994c17.64 0 31.984-14.352 31.984-31.984s-14.344-31.986-31.984-31.986h-15.994v63.97z" fill="" />
							<path d="M591.962 456.026h-63.97c-4.42 0-7.996-3.576-7.996-7.996s3.576-7.996 7.996-7.996h63.97c4.42 0 7.998 3.576 7.998 7.996s-3.578 7.996-7.998 7.996zM440.034 535.988c-0.992 0-2-0.188-2.968-0.578a7.99 7.99 0 0 1-4.458-10.384l31.984-79.962a8.002 8.002 0 0 1 10.394-4.452 7.99 7.99 0 0 1 4.458 10.384l-31.986 79.964a8 8 0 0 1-7.424 5.028z" fill="" />
							<path d="M504.004 535.988a8.002 8.002 0 0 1-7.426-5.028l-31.986-79.964a7.99 7.99 0 0 1 4.458-10.384c4.052-1.624 8.762 0.36 10.394 4.452l31.984 79.962a7.99 7.99 0 0 1-4.458 10.384 7.928 7.928 0 0 1-2.966 0.578z" fill="" />
							<path d="M494.414 512h-44.792c-4.42 0-7.998-3.576-7.998-7.996s3.578-7.996 7.998-7.996h44.792c4.42 0 7.996 3.576 7.996 7.996S498.834 512 494.414 512zM615.954 535.988a8.01 8.01 0 0 1-7.432-10.962l31.984-79.962a8 8 0 0 1 10.402-4.452 8.012 8.012 0 0 1 4.464 10.384l-31.984 79.964a8.016 8.016 0 0 1-7.434 5.028z" fill="" />
							<path d="M679.924 535.988a8.018 8.018 0 0 1-7.436-5.028l-31.984-79.964a8.014 8.014 0 0 1 4.466-10.384c4.06-1.624 8.746 0.36 10.4 4.452l31.986 79.962a8.014 8.014 0 0 1-7.432 10.962z" fill="" />
							<path d="M670.334 512h-44.792c-4.422 0-7.998-3.576-7.998-7.996s3.576-7.996 7.998-7.996h44.792c4.42 0 7.996 3.576 7.996 7.996S674.754 512 670.334 512z" fill="" />
						</g>
					</svg>
				</div>
			</div>
			<div className="w-full h-full">
				<div className="flex flex-col items-center justify-center h-full p-4 mx-auto">
					<div className="w-full bg-base-200 rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 border-primary">
						<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
							<h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-center">Welcome back!</h1>
							<form className="space-y-4" action="#">
								<InputField name="username" label="Username" type="text" placeholder="" error={errors?.username} value={loginForm.username} onChange={handleLoginFormChange} />
								<InputField name="password" label="Password" type="password" placeholder="" error={errors?.password} value={loginForm.password} onChange={handleLoginFormChange} />
								{errors?.detail && <p className="text-error text-sm text-center">{errors.detail}</p>}
								<div className="flex items-center justify-between">
									<div className="flex items-start">
										<div className="form-control">
											<label className="label cursor-pointer gap-2">
												<input type="checkbox" name="remember_me" checked={loginForm.remember_me} onChange={(e) => setLoginForm({ ...loginForm, [e.target.name]: e.target.checked })} className="checkbox" />
												<span className="label-text">Remember me for 1 day</span>
											</label>
										</div>
									</div>
									<a href="#" className="text-sm font-medium link">
										Forgot password?
									</a>
								</div>
								<SubmitButton label="Login" onClick={submitLoginForm} />
								<p className="text-sm">
									Don’t have an account yet ?{" "}
									<NavLink to="/signup" className="font-medium link">
										Sign up
									</NavLink>
								</p>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
