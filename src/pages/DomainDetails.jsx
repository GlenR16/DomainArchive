import { NavLink, useNavigate, useParams } from "react-router-dom";
import useAxiosAuth from "../lib/ApiProvider";
import { useEffect, useState } from "react";
import SubmitButton from "../components/SubmitButton";
import InputField from "../components/InputField";
import SelectField from "../components/SelectField";
import KeyField from "../components/KeyField";

export default function DomainDetails() {
	const domainId = useParams().id;
	const navigate = useNavigate();
	const axios = useAxiosAuth();
	const [domain, setDomain] = useState({
		name: "",
		isActive: true,
		key: "",
	});
	const [domainErrors, setDomainErrors] = useState({});
	const [editMode, setEditMode] = useState(false);

	const [serviceList, setServiceList] = useState([]);
	const [filteredList, setFilteredList] = useState([]);

	const [filters, setFilters] = useState({
		instanceId: "",
		app: "",
	});

    const [listPollingInterval, setListPollingInterval] = useState(null);

	function fetchDomainDetails() {
		axios
			.get(`/domain/${domainId}`)
			.then((response) => {
				setDomain(response.data);
                setServiceList(response.data.eureka);
                setFilteredList(response.data.eureka);
			})
			.catch((error) => {
				console.error("Error fetching domain details");
			});
	}

	function handleDomainChange(event) {
		setDomain({
			...domain,
			[event.target.name]: event.target.value,
		});
	}

	function handleFilterChange(event) {
		setFilters({
			...filters,
			[event.target.name]: event.target.value,
		});
	}

	function updateDomainDetails() {
		axios
			.put(`/domain/${domainId}`, domain)
			.then((response) => {
				fetchDomainDetails();
				setEditMode(false);
			})
			.catch((error) => {
				setDomainErrors(error.response.data);
			});
	}

	function deleteDomain() {
		axios
			.delete(`/domain/${domainId}`)
			.then((response) => {
				navigate("/domain");
			})
			.catch((error) => {
				setDomainErrors(error.response.data);
			});
	}

    useEffect(() => {
        setListPollingInterval(setInterval(fetchDomainDetails, 30000));
        return () => clearInterval(listPollingInterval);
    }, []);

	useEffect(() => {
		fetchDomainDetails();
		setDomainErrors({});
	}, [editMode]);

	useEffect(() => {
		let filteredList = serviceList.filter((service) => {
			let instanceId = filters.instanceId.toLowerCase();
			let app = filters.app;
			if (app === "" && instanceId === "") return true;
			return service.instanceId.toLowerCase().includes(instanceId) && (app === "" || service.app === app);
		});
		setFilteredList(filteredList);
	}, [filters, serviceList]);

	return (
		<div className="grow flex flex-col items-center p-4 gap-4">
			<div className="card w-full max-w-screen-xl bg-base-300 shadow-xl">
				<div className="card-body gap-4">
					<h2 className="card-title justify-between">
						<span>Domain Details</span>
						<div className="form-control">
							<label className="label cursor-pointer gap-2">
								<span className="label-text">Edit</span>
								<input type="checkbox" className="toggle toggle-primary" checked={editMode} onChange={() => setEditMode((editMode) => !editMode)} />
							</label>
						</div>
					</h2>
					<div className="flex flex-col md:flex-row gap-4">
						<InputField name="name" label="Domain Name" type="text" placeholder="" value={domain.name} onChange={handleDomainChange} disabled={!editMode} error={domainErrors.name} />
						<SelectField name="isActive" label="Status" value={domain.isActive} onChange={handleDomainChange} disabled={!editMode} error={domainErrors.isActive}>
							<option value="true">Active</option>
							<option value="false">Inactive</option>
						</SelectField>
					</div>
					{domainErrors?.detail && <p className="text-error text-sm text-center">{domainErrors.detail}</p>}
					{editMode && (
						<div className="flex flex-col items-center gap-4">
							<SubmitButton label="Update" onClick={updateDomainDetails} />
							<SubmitButton label="Delete" style="btn-error" onClick={() => document.getElementById("deleteDomainModal").showModal()} />
							<dialog id="deleteDomainModal" className="modal">
								<div className="modal-box bg-base-200">
									<div className="sm:flex sm:items-start">
										<div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center bg-error rounded-full sm:mx-0 sm:h-10 sm:w-10">
											<svg className="h-6 w-6 text-error-content" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
												<path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
											</svg>
										</div>
										<div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
											<h3 className="text-xl font-semibold leading-6" id="modal-title">
												Delete domain data
											</h3>
											<div className="mt-2">
												<p className="">
													Are you sure you want to
													<span className="font-semibold text-error"> delete </span>
													this domain? This action cannot be undone. All services associated with this domain will also be deleted.
												</p>
											</div>
										</div>
									</div>
									<div className="modal-action">
										<form method="dialog" className="w-1/2">
											<button className="btn btn-neutral min-h-10 h-10 btn-block">Cancel</button>
										</form>
										<div className="w-1/2">
											<SubmitButton label="Delete" style="btn-error" onClick={deleteDomain} />
										</div>
									</div>
								</div>
								<form method="dialog" className="modal-backdrop">
									<button>close</button>
								</form>
							</dialog>
						</div>
					)}
					<KeyField secretKey={domain.key} editMode={editMode} fetchDomainDetails={fetchDomainDetails} />
				</div>
			</div>
			<div className="flex flex-col-reverse md:flex-row w-full max-w-screen-xl gap-4">
				<div className="card grow bg-base-300 shadow-xl">
					<div className="card-body max-h-[60vh]">
						<h2 className="card-title text-base-content text-3xl">Your Services</h2>
						<div className="text-sm mt-2">Here are all the services that are currently created within this domain.</div>
						<div className="overflow-x-auto overflow-y-scroll p-4">
							<table className="table text-base text-center text-base-content">
								{/* head */}
								<thead className="text-base text-base-content">
									<tr>
										<th>Instance ID</th>
										<th>App Name</th>
										<th>Status</th>
										<th>Health Check</th>
									</tr>
								</thead>
								<tbody>
									{filteredList.length > 0 ? (
										filteredList.map((service) => (
											<tr className="" key={service.instanceId}>
												<td>{service.instanceId}</td>
												<td>{service.app}</td>
												<td>
													{service.status === "UP" ? (
                                                        <div className="badge badge-success badge-xs p-1 h-2">
                                                            <span className="loading loading-ring loading-lg text-success absolute"></span>
                                                        </div>
													) : (
														<div className="badge badge-error badge-xs p-1 h-2">
                                                            <span className="loading loading-ring loading-lg text-error absolute"></span>
                                                        </div>
													)}
												</td>
												<td>
													<div className="w-full h-full inline-flex justify-center">
														<NavLink target="_blank" to={service.healthCheckUrl} className="text-center">
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
										<tr className="">
											<td colSpan={4} className="text-center">
												No services found
											</td>
										</tr>
									)}
								</tbody>
							</table>
						</div>
					</div>
				</div>
				<div className="w-full md:w-96">
					<div className="card w-full bg-base-300 shadow-xl">
						<div className="card-body">
							<h2 className="card-title text-base-content text-3xl justify-between items-center">
								<span>Filters</span>
								<button
									type="button"
									className="btn btn-ghost min-h-10 h-10"
									onClick={() => {
										setFilters({ instanceId: "", app: "" });
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
								<InputField name="instanceId" label="Search for service" placeholder="Search by instance ID" value={filters.instanceId} onChange={handleFilterChange} type="text" />
								<SelectField name="app" label="Filter by app name" value={filters.app} onChange={handleFilterChange}>
									<option value="">No app selected</option>
									{serviceList
										.map((service) => service.app)
										.filter((value, index, self) => self.indexOf(value) === index)
										.map((app) => (
											<option key={app} value={app}>
												{app}
											</option>
										))}
								</SelectField>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
