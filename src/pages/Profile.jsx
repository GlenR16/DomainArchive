import { useEffect, useState } from "react";
import useAxiosAuth from "../lib/ApiProvider";
import InputField from "../components/InputField";
import SubmitButton from "../components/SubmitButton";
import { useNavigate } from "react-router-dom";
import { useUsername } from "../contexts/UsernameProvider";

export default function Profile() {
	const axios = useAxiosAuth();
	const navigate = useNavigate();

	const [user, setUser] = useState({
		username: "",
	});
	const [userErrors, setUserErrors] = useState({});
	const [editMode, setEditMode] = useState(false);

	const [passwordChangeForm, setPasswordChangeForm] = useState({
		current_password: "",
		new_password: "",
		confirm_password: "",
	});
	const [passwordChangeErrors, setPasswordChangeErrors] = useState({});
	const [passwordChangeStatus, setPasswordChangeStatus] = useState(null);
	const { updateUsername, clearUsername } = useUsername();

	useEffect(() => {
		fetchUserDetails();
		setUserErrors({});
	}, [editMode]);

	function fetchUserDetails() {
		axios
			.get(`/user`)
			.then((response) => {
				setUser(response.data);
				updateUsername(response.data.username);
			})
			.catch((error) => {
				console.error("Error fetching user details");
			});
	}

	function handleUserFormChange(event) {
		setUser({
			...user,
			[event.target.name]: event.target.value,
		});
	}

	function handlePasswordFormChange(event) {
		setPasswordChangeForm({
			...passwordChangeForm,
			[event.target.name]: event.target.value,
		});
	}

	function submitUpdateUser() {
		axios
			.put(`/user`, user)
			.then((response) => {
				fetchUserDetails();
				setEditMode(false);
			})
			.catch((error) => {
				setUserErrors(error.response.data);
			});
	}

	function deleteUser() {
		axios
			.delete(`/user`)
			.then((response) => {
				localStorage.removeItem("accessToken");
				localStorage.removeItem("refreshToken");
				clearUsername();
				navigate("/");
			})
			.catch((error) => {
				setUserErrors(error.response.data);
			});
	}

	function changePassword() {
		axios
			.post(`/user/password`, passwordChangeForm)
			.then((response) => {
				setPasswordChangeForm({
					current_password: "",
					new_password: "",
					confirm_password: "",
				});
				setPasswordChangeStatus("Password changed successfully");
				setPasswordChangeErrors({});
			})
			.catch((error) => {
                setPasswordChangeStatus(null);
				setPasswordChangeErrors(error.response.data);
			});
	}

	function logoutUser() {
		localStorage.removeItem("accessToken");
		localStorage.removeItem("refreshToken");
		clearUsername();
		navigate("/");
	}

	return (
		<div className="grow flex flex-col items-center p-4 gap-4">
			<div className="w-full max-w-screen-xl flex flex-col md:flex-row gap-4">
				<div className="w-full max-w-screen-xl flex flex-col gap-4">
					<div className="card w-full max-w-screen-xl bg-base-300 shadow-xl">
						<div className="card-body gap-4">
							<SubmitButton label="Logout from this device" style="btn-warning" onClick={logoutUser} />
							<br />
							<div className="flex items-center divide-x-2 divide-primary justify-between">
								<div className="pr-3 text-lg font-medium w-full">Account created at</div>
								<div className="pl-3 font-light w-full">{new Date(user.createdAt).toLocaleString()}</div>
							</div>
						</div>
					</div>
					<div className="card w-full max-w-screen-xl bg-base-300 shadow-xl">
						<div className="card-body gap-4">
							<h2 className="card-title justify-between">
								<span>Profile Details</span>
								<div className="form-control">
									<label className="label cursor-pointer gap-2">
										<span className="label-text">Edit</span>
										<input type="checkbox" className="toggle toggle-primary" checked={editMode} onChange={() => setEditMode((editMode) => !editMode)} />
									</label>
								</div>
							</h2>
							<div className="flex flex-col gap-4">
								<InputField name="username" label="Username" type="text" value={user.username} onChange={handleUserFormChange} placeholder="" error={userErrors.username} disabled={!editMode} />
								{editMode && userErrors?.detail && <p className="text-error text-sm text-center">{userErrors.detail}</p>}
								{editMode && (
									<>
										<SubmitButton label="Update" onClick={submitUpdateUser} />
										<SubmitButton label="Delete" style="btn-error" onClick={() => document.getElementById("deleteUserModal").showModal()} />
										<dialog id="deleteUserModal" className="modal">
											<div className="modal-box bg-base-200">
												<div className="sm:flex sm:items-start">
													<div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center bg-error rounded-full sm:mx-0 sm:h-10 sm:w-10">
														<svg className="h-6 w-6 text-error-content" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
															<path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
														</svg>
													</div>
													<div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
														<h3 className="text-xl font-semibold leading-6" id="modal-title">
															Delete user profile
														</h3>
														<div className="mt-2">
															<p className="">
																Are you sure you want to
																<span className="font-semibold text-error"> delete </span>
																your account? This action cannot be undone. All domains and services associated with this domain will also be deleted and cannot be recovered.
															</p>
														</div>
													</div>
												</div>
												<div className="modal-action">
													<form method="dialog" className="w-1/2">
														<button className="btn btn-neutral min-h-10 h-10 btn-block">Cancel</button>
													</form>
													<div className="w-1/2">
														<SubmitButton label="Delete" style="btn-error" onClick={deleteUser} />
													</div>
												</div>
											</div>
											<form method="dialog" className="modal-backdrop">
												<button>close</button>
											</form>
										</dialog>
									</>
								)}
							</div>
						</div>
					</div>
				</div>
				<div className="w-full max-w-screen-xl flex flex-col gap-4">
					<div className="card w-full max-w-screen-xl bg-base-300 shadow-xl">
						<div className="card-body gap-4">
							<h2 className="card-title justify-between">
								<span>Update Password Details</span>
							</h2>
							<div className="flex flex-col gap-4">
								<InputField name="current_password" label="Current Password" type="password" value={passwordChangeForm.current_password} onChange={handlePasswordFormChange} placeholder="" error={passwordChangeErrors.current_password} />
								<InputField name="new_password" label="New Password" type="password" value={passwordChangeForm.new_password} onChange={handlePasswordFormChange} placeholder="" error={passwordChangeErrors.new_password} />
								<InputField name="confirm_password" label="Confirm Password" type="password" value={passwordChangeForm.confirm_password} onChange={handlePasswordFormChange} placeholder="" error={passwordChangeErrors.confirm_password} />
								{passwordChangeErrors?.detail && <p className="text-error text-sm text-center">{passwordChangeErrors.detail}</p>}
								{passwordChangeStatus && <p className="text-success text-sm text-center">{passwordChangeStatus}</p>}
								<SubmitButton label="Change Password" onClick={changePassword} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
