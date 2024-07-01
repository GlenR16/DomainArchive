import { useEffect, useState } from "react";
import SubmitButton from "./SubmitButton";
import useAxiosAuth from "../lib/ApiProvider";
import { useParams } from "react-router-dom";

export default function KeyField({ secretKey, editMode, fetchDomainDetails }) {
	const [show, setShow] = useState(false);
	const [copied, setCopied] = useState(false);
	const [apikey, setApikey] = useState(secretKey);
	const domainId = useParams().id;
	const axios = useAxiosAuth();

	function copyToClipboard() {
		navigator.clipboard.writeText(secretKey);
		setCopied(true);
		setTimeout(() => {
			setCopied(false);
		}, 2000);
	}

	function resetDomainKey() {
		axios
			.post(`/domain/${domainId}/reset`)
			.then((response) => {
                fetchDomainDetails();
                setApikey(response.data.key);
			})
			.catch((error) => {
				console.error("Error resetting domain key");
			});
		document.getElementById("resetKeyModal").close();
	}

	useEffect(() => {
		if (show) {
			setApikey(secretKey);
		} else {
			setApikey("●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●");
		}
	}, [show]);

	return (
		<div className="flex flex-col md:flex-row gap-4 w-full items-end">
			<dialog id="resetKeyModal" className="modal">
				<div className="modal-box bg-base-200">
					<div className="sm:flex sm:items-start">
						<div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center bg-error rounded-full sm:mx-0 sm:h-10 sm:w-10">
							<svg className="h-6 w-6 text-error-content" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
								<path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
							</svg>
						</div>
						<div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
							<h3 className="text-xl font-semibold leading-6" id="modal-title">
								Reset domain API key
							</h3>
							<div className="mt-2">
								<p className="">
									Are you sure you want to
									<span className="font-semibold text-error"> reset </span>
									domain API key ? This action cannot be undone. All services that are using the old key will stop working. Active instances will be available again once you update the key in the service configuration.
								</p>
							</div>
						</div>
					</div>
					<div className="modal-action">
						<form method="dialog" className="w-1/2">
							<button className="btn btn-neutral min-h-10 h-10 btn-block">Cancel</button>
						</form>
						<div className="w-1/2">
							<SubmitButton label={"Reset"} style="btn-error" onClick={resetDomainKey} />
						</div>
					</div>
				</div>
				<form method="dialog" className="modal-backdrop">
					<button>close</button>
				</form>
			</dialog>
			<div className="w-full">
				<div className="label pt-0">
					<span className="label-text-alt">Domain Secret Key</span>
				</div>
				<label className="input input-bordered focus:outline-none focus-within:outline-none flex items-center gap-2 px-2">
					<span className="btn btn-primary btn-outline btn-sm" onClick={() => setShow((show) => !show)}>
						{show ? (
							<svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<g id="SVGRepo_bgCarrier" strokeWidth={0} />
								<g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
								<g id="SVGRepo_iconCarrier">
									{" "}
									<rect width={24} height={24} fill="none" /> <path fillRule="evenodd" clipRule="evenodd" d="M8.58579 4.71633C11.5332 3.37594 15.1293 3.91627 17.5561 6.3431L20.5579 9.34489C20.5881 9.37504 20.6179 9.40485 20.6475 9.43436C21.0546 9.84043 21.4062 10.1912 21.6188 10.5908C22.0875 11.4718 22.0875 12.5282 21.6188 13.4091C21.4062 13.8087 21.0546 14.1595 20.6475 14.5655C20.6179 14.5951 20.5881 14.6249 20.5579 14.655L20.5059 14.7071C20.1154 15.0976 19.4822 15.0976 19.0917 14.7071C18.7011 14.3165 18.7011 13.6834 19.0917 13.2929L19.1437 13.2408C19.6921 12.6924 19.8007 12.5683 19.8532 12.4697C20.0094 12.176 20.0094 11.8239 19.8532 11.5302C19.8007 11.4316 19.6921 11.3075 19.1437 10.7591L16.1419 7.75732C14.3237 5.93914 11.627 5.53041 9.41372 6.53692C8.91098 6.76554 8.31809 6.54333 8.08946 6.04059C7.86084 5.53785 8.08305 4.94496 8.58579 4.71633Z" fill="currentColor" /> <path fillRule="evenodd" clipRule="evenodd" d="M2.38203 4.51599C2.7211 4.08004 3.34938 4.00151 3.78533 4.34058L21.7853 18.3406C22.2213 18.6796 22.2998 19.3079 21.9607 19.7439C21.6217 20.1798 20.9934 20.2584 20.5574 19.9193L17.5965 17.6164L17.556 17.6569C14.4319 20.7811 9.36653 20.7811 6.24234 17.6569L4.07447 15.489C3.4476 14.8622 2.90746 14.3221 2.5331 13.8315C2.1319 13.3056 1.82812 12.7208 1.82812 12C1.82812 11.2792 2.1319 10.6944 2.5331 10.1686C2.90746 9.6779 3.44759 9.13783 4.07447 8.51102L4.86863 7.71687L2.55745 5.91928C2.1215 5.58021 2.04296 4.95194 2.38203 4.51599ZM12.7566 13.852L14.4455 15.1656C13.7694 15.6887 12.921 16 12 16C9.79086 16 8 14.2092 8 12C8 11.4344 8.11741 10.8962 8.32918 10.4084L10.0191 11.7228C10.0065 11.8134 10 11.906 10 12C10 13.1046 10.8954 14 12 14C12.2678 14 12.5232 13.9474 12.7566 13.852Z" fill="currentColor" />{" "}
								</g>
							</svg>
						) : (
							<svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<g id="SVGRepo_bgCarrier" strokeWidth={0} />
								<g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
								<g id="SVGRepo_iconCarrier">
									{" "}
									<rect width={24} height={24} fill="none" /> <path fillRule="evenodd" clipRule="evenodd" d="M8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12ZM6.24234 6.34315C9.36653 3.21895 14.4319 3.21895 17.556 6.34315L19.7239 8.511C20.3508 9.13781 20.8909 9.67788 21.2653 10.1685C21.6665 10.6944 21.9703 11.2792 21.9703 12C21.9703 12.7208 21.6665 13.3056 21.2653 13.8315C20.8909 14.3221 20.3508 14.8622 19.7239 15.489L17.556 17.6569C14.4319 20.781 9.36653 20.781 6.24234 17.6569L4.07447 15.489C3.44759 14.8622 2.90746 14.3221 2.5331 13.8315C2.1319 13.3056 1.82812 12.7208 1.82812 12C1.82812 11.2792 2.1319 10.6944 2.5331 10.1685C2.90746 9.67788 3.44759 9.13781 4.07447 8.51101C4.08994 8.49555 4.10545 8.48003 4.12102 8.46447L6.24234 6.34315Z" fill="currentColor" /> <path fillRule="evenodd" clipRule="evenodd" d="M12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10Z" fill="currentColor" />{" "}
								</g>
							</svg>
						)}
					</span>
					<input type="text" name="api_key" autoComplete="off" className="grow overflow-hidden w-5 text-center" value={apikey} readOnly />
					<span className="btn btn-primary btn-outline btn-sm" onClick={copyToClipboard}>
						{copied ? (
							<svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<g id="SVGRepo_bgCarrier" strokeWidth={0} />
								<g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
								<g id="SVGRepo_iconCarrier">
									{" "}
									<path d="M17.0998 2H12.8998C9.81668 2 8.37074 3.09409 8.06951 5.73901C8.00649 6.29235 8.46476 6.75 9.02167 6.75H11.0998C15.2998 6.75 17.2498 8.7 17.2498 12.9V14.9781C17.2498 15.535 17.7074 15.9933 18.2608 15.9303C20.9057 15.629 21.9998 14.1831 21.9998 11.1V6.9C21.9998 3.4 20.5998 2 17.0998 2Z" fill="currentColor" /> <path d="M11.1 8H6.9C3.4 8 2 9.4 2 12.9V17.1C2 20.6 3.4 22 6.9 22H11.1C14.6 22 16 20.6 16 17.1V12.9C16 9.4 14.6 8 11.1 8ZM12.29 13.65L8.58 17.36C8.44 17.5 8.26 17.57 8.07 17.57C7.88 17.57 7.7 17.5 7.56 17.36L5.7 15.5C5.42 15.22 5.42 14.77 5.7 14.49C5.98 14.21 6.43 14.21 6.71 14.49L8.06 15.84L11.27 12.63C11.55 12.35 12 12.35 12.28 12.63C12.56 12.91 12.57 13.37 12.29 13.65Z" fill="currentColor" />{" "}
								</g>
							</svg>
						) : (
							<svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<g id="SVGRepo_bgCarrier" strokeWidth={0} />
								<g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
								<g id="SVGRepo_iconCarrier">
									{" "}
									<path d="M16 12.9V17.1C16 20.6 14.6 22 11.1 22H6.9C3.4 22 2 20.6 2 17.1V12.9C2 9.4 3.4 8 6.9 8H11.1C14.6 8 16 9.4 16 12.9Z" fill="currentColor" /> <path d="M17.0998 2H12.8998C9.81668 2 8.37074 3.09409 8.06951 5.73901C8.00649 6.29235 8.46476 6.75 9.02167 6.75H11.0998C15.2998 6.75 17.2498 8.7 17.2498 12.9V14.9781C17.2498 15.535 17.7074 15.9933 18.2608 15.9303C20.9057 15.629 21.9998 14.1831 21.9998 11.1V6.9C21.9998 3.4 20.5998 2 17.0998 2Z" fill="currentColor" />{" "}
								</g>
							</svg>
						)}
					</span>
				</label>
			</div>
			{editMode && (
				<button type="button" className="btn btn-warning btn-outline btn-block md:w-auto" onClick={() => document.getElementById("resetKeyModal").showModal()}>
					Reset
					<svg fill="currentColor" className="h-6 w-6" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
						<g id="SVGRepo_bgCarrier" strokeWidth={0} />
						<g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
						<g id="SVGRepo_iconCarrier">
							{" "}
							<g id="Change_password">
								{" "}
								<path d="M464.4326,147.54a9.8985,9.8985,0,0,0-17.56,9.1406,214.2638,214.2638,0,0,1-38.7686,251.42c-83.8564,83.8476-220.3154,83.874-304.207-.0088a9.8957,9.8957,0,0,0-16.8926,7.0049v56.9a9.8965,9.8965,0,0,0,19.793,0v-34.55A234.9509,234.9509,0,0,0,464.4326,147.54Z" /> <path d="M103.8965,103.9022c83.8828-83.874,220.3418-83.8652,304.207-.0088a9.8906,9.8906,0,0,0,16.8926-6.9961v-56.9a9.8965,9.8965,0,0,0-19.793,0v34.55C313.0234-1.3556,176.0547,3.7509,89.9043,89.9012A233.9561,233.9561,0,0,0,47.5674,364.454a9.8985,9.8985,0,0,0,17.56-9.1406A214.2485,214.2485,0,0,1,103.8965,103.9022Z" /> <path d="M126.4009,254.5555v109.44a27.08,27.08,0,0,0,27,27H358.5991a27.077,27.077,0,0,0,27-27v-109.44a27.0777,27.0777,0,0,0-27-27H153.4009A27.0805,27.0805,0,0,0,126.4009,254.5555ZM328,288.13a21.1465,21.1465,0,1,1-21.1465,21.1464A21.1667,21.1667,0,0,1,328,288.13Zm-72,0a21.1465,21.1465,0,1,1-21.1465,21.1464A21.1667,21.1667,0,0,1,256,288.13Zm-72,0a21.1465,21.1465,0,1,1-21.1465,21.1464A21.1667,21.1667,0,0,1,184,288.13Z" /> <path d="M343.6533,207.756V171.7538a87.6533,87.6533,0,0,0-175.3066,0V207.756H188.14V171.7538a67.86,67.86,0,0,1,135.7208,0V207.756Z" />{" "}
							</g>{" "}
						</g>
					</svg>
				</button>
			)}
		</div>
	);
}
