import { NavLink } from "react-router-dom";
import InputField from "../components/InputField";
import SelectField from "../components/SelectField";
import { Names } from "../lib/Generators";
import SubmitButton from "../components/SubmitButton";
import { useEffect, useState } from "react";
import useAxiosAuth from "../lib/ApiProvider";

export default function Domain() {
	const axios = useAxiosAuth();
	const [domainList, setDomainList] = useState([]);
	const [filteredList, setFilteredList] = useState([]);
	const [domainForm, setDomainForm] = useState({
		name: "",
	});
	const [domainFormErrors, setDomainFormErrors] = useState({});

	const [filters, setFilters] = useState({
		search: "",
		status: "",
	});

	function refreshDomainList() {
		axios
			.get("/domain")
			.then((response) => {
				setDomainList(response.data);
				setFilteredList(response.data);
			})
			.catch((error) => {
				console.error("Error fetching domain list");
			});
	}

	function handleDomainFormChange(e) {
		setDomainForm({
			...domainForm,
			[e.target.name]: e.target.value,
		});
	}

	function handleFilterChange(e) {
		setFilters({
			...filters,
			[e.target.name]: e.target.value,
		});
	}

	function handleDomainFormSubmit() {
		axios
			.post("/domain", domainForm)
			.then((response) => {
				refreshDomainList();
				domainForm.name = "";
				document.getElementById("createDomainModal").close();
			})
			.catch((error) => {
				setDomainFormErrors(error.response.data);
			});
	}

	useEffect(() => {
		refreshDomainList();
	}, []);

	useEffect(() => {
		if (filters.search || filters.status) {
			const filtered = domainList.filter((domain) => {
				let match = true;
				if (filters.search) {
					match = match && domain.name.toLowerCase().includes(filters.search.toLowerCase());
				}
				if (filters.status) {
					if (filters.status === "") {
						match = match && true;
					} else if (filters.status === "true") {
						match = match && domain.isActive === true;
					} else {
						match = match && domain.isActive === false;
					}
				}
				return match;
			});
			setFilteredList(filtered);
		} else {
			setFilteredList(domainList);
		}
	}, [filters, domainList]);

	return (
		<div className="grow flex flex-col items-center p-4 gap-4">
			<div className="stats stats-vertical lg:stats-horizontal shadow bg-base-300 w-full max-w-screen-xl">
				<div className="stat">
					<div className="stat-figure text-primary">
						<svg version={1.0} className="inline-block w-16 h-16" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64" enableBackground="new 0 0 64 64" xmlSpace="preserve" fill="#000000">
							<g id="SVGRepo_bgCarrier" strokeWidth={0} />
							<g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
							<g id="SVGRepo_iconCarrier">
								{" "}
								<g>
									{" "}
									<circle fill="currentColor" cx={40} cy={55} r={1} /> <circle fill="currentColor" cx={24} cy={55} r={1} /> <circle fill="currentColor" cx={32} cy={55} r={1} /> <path fill="currentColor" d="M12,60c0,2.211,1.789,4,4,4h32c2.211,0,4-1.789,4-4V38H12V60z M40,52c1.657,0,3,1.344,3,3s-1.343,3-3,3 s-3-1.344-3-3S38.343,52,40,52z M32,52c1.657,0,3,1.344,3,3s-1.343,3-3,3s-3-1.344-3-3S30.343,52,32,52z M24,52 c1.657,0,3,1.344,3,3s-1.343,3-3,3s-3-1.344-3-3S22.343,52,24,52z" /> <path fill="currentColor" d="M12,24h40V14H12V24z M21,18h22c0.553,0,1,0.447,1,1s-0.447,1-1,1H21c-0.553,0-1-0.447-1-1S20.447,18,21,18z " /> <path fill="currentColor" d="M12,36h40V26H12V36z M21,30h22c0.553,0,1,0.447,1,1s-0.447,1-1,1H21c-0.553,0-1-0.447-1-1S20.447,30,21,30z " /> <path fill="currentColor" d="M48,0H16c-2.211,0-4,1.789-4,4v8h40V4C52,1.789,50.211,0,48,0z M43,8H21c-0.553,0-1-0.447-1-1s0.447-1,1-1 h22c0.553,0,1,0.447,1,1S43.553,8,43,8z" />{" "}
								</g>{" "}
							</g>
						</svg>
					</div>
					<div className="stat-title text-base-content font-semibold">Total Services</div>
					<div className="stat-value text-primary">{domainList.reduce((acc, domain) => acc + domain.services, 0)}</div>
					<div className="stat-desc text-base-content"></div>
				</div>
				<div className="stat">
					<div className="stat-figure text-secondary">
						<svg viewBox="0 0 24 24" className="h-16 w-16 inline-block" fill="none" xmlns="http://www.w3.org/2000/svg">
							<g id="SVGRepo_bgCarrier" strokeWidth={0} />
							<g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
							<g id="SVGRepo_iconCarrier">
								{" "}
								<path d="M3 14V10C3 6.22876 3 4.34315 4.17157 3.17157C5.34315 2 7.22876 2 11 2H13C16.7712 2 18.6569 2 19.8284 3.17157C20.4816 3.82475 20.7706 4.69989 20.8985 6M21 10V14C21 17.7712 21 19.6569 19.8284 20.8284C18.6569 22 16.7712 22 13 22H11C7.22876 22 5.34315 22 4.17157 20.8284C3.51839 20.1752 3.22937 19.3001 3.10149 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /> <path d="M9.5 15.5V15.375C9.5 14.8918 9.89175 14.5 10.375 14.5H13.625C14.1082 14.5 14.5 14.8918 14.5 15.375V15.5C14.5 16.8807 13.3807 18 12 18C10.6193 18 9.5 16.8807 9.5 15.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /> <path d="M9.5 3C9.5 2.5286 9.5 2.29289 9.64645 2.14645C9.79289 2 10.0286 2 10.5 2H11C11.4714 2 11.7071 2 11.8536 2.14645C12 2.29289 12 2.5286 12 3V3.5C12 3.9714 12 4.20711 11.8536 4.35355C11.7071 4.5 11.4714 4.5 11 4.5H10.5C10.0286 4.5 9.79289 4.5 9.64645 4.35355C9.5 4.20711 9.5 3.9714 9.5 3.5V3Z" stroke="currentColor" strokeWidth="1.5" /> <path d="M9.5 8C9.5 7.5286 9.5 7.29289 9.64645 7.14645C9.79289 7 10.0286 7 10.5 7H11C11.4714 7 11.7071 7 11.8536 7.14645C12 7.29289 12 7.5286 12 8V8.5C12 8.9714 12 9.20711 11.8536 9.35355C11.7071 9.5 11.4714 9.5 11 9.5H10.5C10.0286 9.5 9.79289 9.5 9.64645 9.35355C9.5 9.20711 9.5 8.9714 9.5 8.5V8Z" stroke="currentColor" strokeWidth="1.5" /> <path d="M12 5.5C12 5.0286 12 4.79289 12.1464 4.64645C12.2929 4.5 12.5286 4.5 13 4.5H13.5C13.9714 4.5 14.2071 4.5 14.3536 4.64645C14.5 4.79289 14.5 5.0286 14.5 5.5V6C14.5 6.4714 14.5 6.70711 14.3536 6.85355C14.2071 7 13.9714 7 13.5 7H13C12.5286 7 12.2929 7 12.1464 6.85355C12 6.70711 12 6.4714 12 6V5.5Z" stroke="currentColor" strokeWidth="1.5" /> <path d="M12 10.5C12 10.0286 12 9.79289 12.1464 9.64645C12.2929 9.5 12.5286 9.5 13 9.5H13.5C13.9714 9.5 14.2071 9.5 14.3536 9.64645C14.5 9.79289 14.5 10.0286 14.5 10.5V11C14.5 11.4714 14.5 11.7071 14.3536 11.8536C14.2071 12 13.9714 12 13.5 12H13C12.5286 12 12.2929 12 12.1464 11.8536C12 11.7071 12 11.4714 12 11V10.5Z" stroke="currentColor" strokeWidth="1.5" />{" "}
							</g>
						</svg>
					</div>
					<div className="stat-title text-base-content font-semibold">Total Applications</div>
					<div className="stat-value text-secondary">{domainList.reduce((acc, domain) => acc + domain.applications, 0)}</div>
					<div className="stat-desc text-base-content"></div>
				</div>
				<div className="stat">
					<div className="stat-figure text-accent">
						<svg fill="currentColor" className="h-16 w-16 inline-block" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 256 256" xmlSpace="preserve">
							<g id="SVGRepo_bgCarrier" strokeWidth={0} />
							<g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
							<g id="SVGRepo_iconCarrier">
								{" "}
								<g>
									{" "}
									<path d="M132.1,14.7c-63,0-114.2,51.2-114.2,114.2c0,29.8,11.4,56.9,30.2,77.2c-1.9,3.8-3,8-3,12.5c0,15.2,12.4,27.6,27.6,27.6 c8.4,0,16-3.8,21.1-9.8c12,4.3,24.9,6.6,38.4,6.6c63,0,114.2-51.2,114.2-114.2C246.3,65.9,195.1,14.7,132.1,14.7z M132.1,232.9 c-11.6,0-22.8-1.9-33.3-5.5c0.9-2.8,1.5-5.7,1.5-8.8c0-15.2-12.4-27.6-27.6-27.6c-7,0-13.4,2.6-18.3,6.9 c-16.3-18.4-26.3-42.6-26.3-69c0-57.4,46.7-104,104-104s104,46.7,104,104S189.5,232.9,132.1,232.9z" /> <path d="M132.1,72.6c-19.7,0-37.1,10.4-46.9,25.9c3.1,2.2,5.1,5.7,5.1,9.8c0,6.6-5.4,12-12,12c-0.4,0-0.7,0-1.1-0.1 c-0.4,2.6-0.6,5.2-0.6,7.8c0,30.6,24.9,55.4,55.4,55.4c30.6,0,55.4-24.9,55.4-55.4C187.6,97.4,162.7,72.6,132.1,72.6z M132.1,151.5 c-13,0-23.5-10.5-23.5-23.5c0-13,10.5-23.5,23.5-23.5c13,0,23.5,10.5,23.5,23.5C155.6,141,145.1,151.5,132.1,151.5z" /> <path d="M132.1,49.2c-43.5,0-78.8,35.4-78.8,78.8s35.4,78.8,78.8,78.8s78.8-35.4,78.8-78.8S175.6,49.2,132.1,49.2z M132.1,188.8 c-33.5,0-60.8-27.3-60.8-60.8c0-3.2,0.3-6.4,0.8-9.5c-3.4-2.1-5.7-5.9-5.7-10.2c0-6.6,5.4-12,12-12c0.6,0,1.2,0.1,1.8,0.2 c10.7-17.5,30-29.3,52-29.3c33.5,0,60.8,27.3,60.8,60.8C193,161.5,165.7,188.8,132.1,188.8z" />{" "}
								</g>{" "}
							</g>
						</svg>
					</div>
					<div className="stat-title text-base-content font-semibold">Total Domains</div>
					<div className="stat-value text-accent">{domainList.length}</div>
					<div className="stat-desc text-base-content"></div>
				</div>
			</div>

			<div className="flex flex-col-reverse md:flex-row gap-4 w-full max-w-screen-xl">
				<div className="grow">
					<div className="card w-full max-w-screen-xl bg-base-300 shadow-xl">
						<div className="card-body max-h-[60vh]">
							<h2 className="card-title text-base-content text-3xl">Your Domains</h2>
							<div className="text-sm mt-2">Domains are used to seperate your data into different categories. You can create a domain for each project you are working on.</div>
							<div className="overflow-x-auto overflow-y-scroll p-4">
								<table className="table text-base text-center text-base-content">
									<thead className="text-base text-base-content">
										<tr>
											<th>Name</th>
											<th>Status</th>
											<th>Services</th>
											<th>Applications</th>
											<th>View</th>
										</tr>
									</thead>
									<tbody>
										{filteredList.length > 0 ? (
											filteredList.map((domain) => (
												<tr className="hover" key={domain.id}>
													<td>{domain.name}</td>
													<td>{domain.isActive ? <div className="badge badge-success badge-sm">Active</div> : <div className="badge badge-error badge-sm">Inactive</div>}</td>
													<td>{domain.services}</td>
													<td>{domain.applications}</td>
													<td>
														<div className="w-full h-full inline-flex justify-center items-center">
															<NavLink to={`/domain/${domain.id}`} className="text-center">
																<svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
																	<g id="SVGRepo_bgCarrier" strokeWidth={0} />
																	<g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
																	<g id="SVGRepo_iconCarrier">
																		{" "}
																		<path d="M10.6666 13.3333L10.0808 12.7475C9.29978 11.9664 9.29978 10.7001 10.0808 9.91905L14.5857 5.41416C15.3668 4.63311 16.6331 4.63311 17.4142 5.41415L18.5857 6.58572C19.3668 7.36677 19.3668 8.6331 18.5857 9.41415L16.9999 10.9999M13.3333 10.6666L13.919 11.2524C14.7001 12.0335 14.7001 13.2998 13.919 14.0808L9.41415 18.5857C8.6331 19.3668 7.36677 19.3668 6.58572 18.5857L5.41416 17.4142C4.63311 16.6331 4.63311 15.3668 5.41416 14.5857L6.99994 12.9999" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />{" "}
																	</g>
																</svg>
															</NavLink>
														</div>
													</td>
												</tr>
											))
										) : (
											<tr className="hover">
												<td colSpan={4} className="text-center">
													No domains found
												</td>
											</tr>
										)}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
				<div className="flex flex-col gap-4">
					<div className="card w-full md:w-96 bg-base-300 shadow-xl">
						<div className="card-body">
							<h2 className="card-title text-base-content text-3xl">Domain Controls</h2>
							<div className="flex flex-col gap-2 mt-2">
								<button className="btn btn-block btn-primary min-h-10 h-10" onClick={() => document.getElementById("createDomainModal").showModal()}>
									Create a new domain
								</button>
								<dialog id="createDomainModal" className="modal modal-bottom sm:modal-middle">
									<div className="modal-box bg-base-200">
										<div className="flex justify-between items-center pb-2 rounded-t text-base-content">
											<h3 className="text-lg font-semibold">Add Domain</h3>
											<form method="dialog">
												<button type="submit" className="btn btn-ghost min-h-8 h-8">
													<svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
														<path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
													</svg>
													<span className="sr-only">Close modal</span>
												</button>
											</form>
										</div>
										<div className="divider mt-0"></div>
										<div>
											<div className="grid gap-2 mb-4">
												<InputField name="name" type="text" label="Domain Name" value={domainForm.name} onChange={handleDomainFormChange} error={domainFormErrors?.name} placeholder={Names()} />
												<button type="button" className="btn btn-outline btn-secondary min-h-10 h-10" onClick={() => setDomainForm({ name: Names() })}>
													Random Name
													<svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" xmlns="http://www.w3.org/2000/svg">
														<g id="SVGRepo_bgCarrier" strokeWidth={0} />
														<g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
														<g id="SVGRepo_iconCarrier">
															{" "}
															<path d="M2 16.25C1.58579 16.25 1.25 16.5858 1.25 17C1.25 17.4142 1.58579 17.75 2 17.75V16.25ZM10.7478 14.087L10.1047 13.7011L10.7478 14.087ZM13.2522 9.91303L13.8953 10.2989L13.2522 9.91303ZM22 7L22.5303 7.53033C22.8232 7.23744 22.8232 6.76256 22.5303 6.46967L22 7ZM19.4697 8.46967C19.1768 8.76256 19.1768 9.23744 19.4697 9.53033C19.7626 9.82322 20.2374 9.82322 20.5303 9.53033L19.4697 8.46967ZM20.5303 4.46967C20.2374 4.17678 19.7626 4.17678 19.4697 4.46967C19.1768 4.76256 19.1768 5.23744 19.4697 5.53033L20.5303 4.46967ZM15.2205 7.3894L14.851 6.73675V6.73675L15.2205 7.3894ZM2 17.75H5.60286V16.25H2V17.75ZM11.3909 14.4728L13.8953 10.2989L12.6091 9.52716L10.1047 13.7011L11.3909 14.4728ZM18.3971 7.75H22V6.25H18.3971V7.75ZM21.4697 6.46967L19.4697 8.46967L20.5303 9.53033L22.5303 7.53033L21.4697 6.46967ZM22.5303 6.46967L20.5303 4.46967L19.4697 5.53033L21.4697 7.53033L22.5303 6.46967ZM13.8953 10.2989C14.3295 9.57518 14.6286 9.07834 14.9013 8.70996C15.1644 8.35464 15.3692 8.16707 15.59 8.04205L14.851 6.73675C14.384 7.00113 14.0315 7.36397 13.6958 7.8174C13.3697 8.25778 13.0285 8.82806 12.6091 9.52716L13.8953 10.2989ZM18.3971 6.25C17.5819 6.25 16.9173 6.24918 16.3719 6.30219C15.8104 6.35677 15.3179 6.47237 14.851 6.73675L15.59 8.04205C15.8108 7.91703 16.077 7.83793 16.517 7.79516C16.9733 7.75082 17.5531 7.75 18.3971 7.75V6.25ZM5.60286 17.75C6.41814 17.75 7.0827 17.7508 7.62807 17.6978C8.18961 17.6432 8.6821 17.5276 9.14905 17.2632L8.41 15.9579C8.18919 16.083 7.92299 16.1621 7.48296 16.2048C7.02675 16.2492 6.44685 16.25 5.60286 16.25V17.75ZM10.1047 13.7011C9.67046 14.4248 9.37141 14.9217 9.09867 15.29C8.8356 15.6454 8.63081 15.8329 8.41 15.9579L9.14905 17.2632C9.616 16.9989 9.96851 16.636 10.3042 16.1826C10.6303 15.7422 10.9715 15.1719 11.3909 14.4728L10.1047 13.7011Z" fill="currentColor" /> <path d="M2 6.25C1.58579 6.25 1.25 6.58579 1.25 7C1.25 7.41421 1.58579 7.75 2 7.75V6.25ZM22 17L22.5303 17.5303C22.8232 17.2374 22.8232 16.7626 22.5303 16.4697L22 17ZM20.5303 14.4697C20.2374 14.1768 19.7626 14.1768 19.4697 14.4697C19.1768 14.7626 19.1768 15.2374 19.4697 15.5303L20.5303 14.4697ZM19.4697 18.4697C19.1768 18.7626 19.1768 19.2374 19.4697 19.5303C19.7626 19.8232 20.2374 19.8232 20.5303 19.5303L19.4697 18.4697ZM16.1254 16.9447L16.2687 16.2086H16.2687L16.1254 16.9447ZM14.4431 14.6141C14.23 14.2589 13.7693 14.1438 13.4141 14.3569C13.0589 14.57 12.9438 15.0307 13.1569 15.3859L14.4431 14.6141ZM14.4684 16.0065L15.0259 15.5049V15.5049L14.4684 16.0065ZM7.8746 7.05526L8.01789 6.31908L7.8746 7.05526ZM9.55688 9.38587C9.76999 9.74106 10.2307 9.85623 10.5859 9.64312C10.9411 9.43001 11.0562 8.96931 10.8431 8.61413L9.55688 9.38587ZM9.53163 7.99346L8.97408 8.49509L8.97408 8.49509L9.53163 7.99346ZM2 7.75H6.66762V6.25H2V7.75ZM17.3324 17.75H22V16.25H17.3324V17.75ZM22.5303 16.4697L20.5303 14.4697L19.4697 15.5303L21.4697 17.5303L22.5303 16.4697ZM21.4697 16.4697L19.4697 18.4697L20.5303 19.5303L22.5303 17.5303L21.4697 16.4697ZM17.3324 16.25C16.6867 16.25 16.4648 16.2467 16.2687 16.2086L15.9821 17.6809C16.3538 17.7533 16.7473 17.75 17.3324 17.75V16.25ZM13.1569 15.3859C13.4579 15.8875 13.6575 16.2267 13.9108 16.5082L15.0259 15.5049C14.8923 15.3564 14.7753 15.1678 14.4431 14.6141L13.1569 15.3859ZM16.2687 16.2086C15.789 16.1152 15.3528 15.8682 15.0259 15.5049L13.9108 16.5082C14.4556 17.1137 15.1826 17.5253 15.9821 17.6809L16.2687 16.2086ZM6.66762 7.75C7.31332 7.75 7.53519 7.75328 7.73131 7.79145L8.01789 6.31908C7.64616 6.24672 7.25267 6.25 6.66762 6.25V7.75ZM10.8431 8.61413C10.5421 8.11245 10.3425 7.77335 10.0892 7.49182L8.97408 8.49509C9.10771 8.64362 9.22467 8.83219 9.55688 9.38587L10.8431 8.61413ZM7.73131 7.79145C8.21098 7.88481 8.64722 8.13181 8.97408 8.49509L10.0892 7.49182C9.54442 6.88635 8.81735 6.47469 8.01789 6.31908L7.73131 7.79145Z" fill="currentColor" />{" "}
														</g>
													</svg>
												</button>
											</div>
											{domainFormErrors?.detail && <div className="text-xs text-error text-center w-full mb-4">{domainFormErrors.detail}</div>}
											<SubmitButton label="Create" onClick={handleDomainFormSubmit} />
										</div>
									</div>
									<form method="dialog" className="modal-backdrop">
										<button>close</button>
									</form>
								</dialog>
							</div>
						</div>
					</div>
					<div className="card w-full md:w-96 bg-base-300 shadow-xl">
						<div className="card-body">
							<h2 className="card-title text-base-content text-3xl justify-between items-center">
								<span>Filters</span>
								<button
									type="button"
									className="btn btn-ghost min-h-10 h-10"
									onClick={() => {
										setFilters({ search: "", status: "" });
									}}>
									<svg fill="currentColor" className="h-6 w-6" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
										<g id="SVGRepo_bgCarrier" strokeWidth={0} />
										<g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
										<g id="SVGRepo_iconCarrier">
											{" "}
											<path d="M960 0v213.333c411.627 0 746.667 334.934 746.667 746.667S1371.627 1706.667 960 1706.667 213.333 1371.733 213.333 960c0-197.013 78.4-382.507 213.334-520.747v254.08H640V106.667H53.333V320h191.04C88.64 494.08 0 720.96 0 960c0 529.28 430.613 960 960 960s960-430.72 960-960S1489.387 0 960 0" fillRule="evenodd" />{" "}
										</g>
									</svg>
								</button>
							</h2>
							<div className="flex flex-col gap-2">
								<InputField name="search" label="Search by name" placeholder="Domain Search" value={filters.search} onChange={handleFilterChange} type="text" />
								<SelectField label="Filter by status" name="status" value={filters.status} onChange={handleFilterChange}>
									<option value="">No status selected</option>
									<option value={true}>Active</option>
									<option value={false}>Inactive</option>
								</SelectField>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
