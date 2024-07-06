import React from "react";

export default function About() {
	return (
		<div className="grow flex flex-col items-center p-4 py-6 gap-4">
			<div className="flex flex-col gap-4 w-full max-w-screen-xl">
				<h1 className="w-full text-2xl font-bold leading-tight tracking-tight md:text-4xl text-center">About</h1>
				<div className="flex flex-col md:flex-row gap-4 justify-center items-center text-lg">
					<svg fill="#000000" id="Uploaded to svgrepo.com" className="w-56" version="1.1" viewBox="0 0 32 32" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
						<g id="SVGRepo_bgCarrier" strokeWidth="0" />
						<g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
						<g id="SVGRepo_iconCarrier">
							{" "}
							<style
								dangerouslySetInnerHTML={{
									__html: " .avocado_een{fill:#231F20;} .avocado_twee{fill:#3D3935;} .avocado_negentien{fill:#E0A838;} .avocado_twintig{fill:#EAD13F;} .avocado_acht{fill:#A3AEB5;} .avocado_zeven{fill:#788287;} .avocado_tien{fill:#C3CC6A;} .st0{fill:#FFFAEE;} .st1{fill:#716558;} .st2{fill:#DBD2C1;} .st3{fill:#D1712A;} .st4{fill:#CC4121;} .st5{fill:#8D3E93;} .st6{fill:#248EBC;} .st7{fill:#6F9B45;} .st8{fill:#AF9480;} ",
								}}
								type="text/css"
							/>{" "}
							<g>
								{" "}
								<g>
									{" "}
									<rect className="avocado_twee" height="21" width="31" x="0.5" y="4.5" />{" "}
								</g>{" "}
								<g>
									{" "}
									<path className="avocado_acht" d="M0.5,4.5v21h13v4h6v-4h12v-21H0.5z M30,24H2V6h28V24z" />{" "}
								</g>{" "}
								<rect className="avocado_zeven" height="1.5" width="6" x="13.5" y="25.5" /> <path className="avocado_een" d="M32,26V4H0v22h13v3h-1v1h9v-1h-1v-3H32z M1,25V5h30v20H1z M19,29h-5v-3h5V29z" /> <path className="avocado_tien" d="M9,10H6V9h3V10z M7,11v1h3v-1H7z M7,18h3v-1H7V18z M6,20h3v-1H6V20z" />{" "}
								<g>
									{" "}
									<g>
										{" "}
										<path className="avocado_negentien" d="M22,13v1H8v-1H22z M8,16h14v-1H8V16z" />{" "}
									</g>{" "}
								</g>{" "}
								<g>
									{" "}
									<g>
										{" "}
										<path className="avocado_twintig" d="M17,12h-6v-1h6V12z M21,9H10v1h11V9z" />{" "}
									</g>{" "}
								</g>{" "}
							</g>{" "}
						</g>
					</svg>
					This is a hobby project. The project aims to replace the Eureka service registry with a custom-built service registry. The project is built using the Django REST framework for the backend and React for the frontend. This project can be integrated easily with eureka clients. The backend mimics the Eureka REST API and the frontend provides a UI to manage the services. The code for the frontend is opensource and can be found on my github page. The code for the backend is not opensource.
				</div>
				<div className="flex flex-col-reverse md:flex-row gap-4 justify-center items-center text-lg">
					<span>
						My name is Glen Rodrigues. I am a software engineer with a passion for building software. I am currently working as a software engineer at a company in India. I have a bachelor's degree in computer engineering. If you want to reach out to me you can contact me at <i>glenrogers1234@gmail.com</i>
					</span>
					<svg fill="#000000" className="w-40" version="1.1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
						<g id="SVGRepo_bgCarrier" strokeWidth="0" />
						<g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
						<g id="SVGRepo_iconCarrier">
							{" "}
							<g transform="translate(0 -1028.4)">
								{" "}
								<path d="m3 1033.4c-1.1046 0-2 0.9-2 2v10 1c0 1.1 0.8954 2 2 2h16 2c1.105 0 2-0.9 2-2v-1-9-1c0-1.1-0.895-2-2-2h-2-14-2z" fill="#95a5a6" /> <path d="m3 1032.4c-1.1046 0-2 0.9-2 2v10 1c0 1.1 0.8954 2 2 2h16 2c1.105 0 2-0.9 2-2v-1-9-1c0-1.1-0.895-2-2-2h-2-14-2z" fill="#bdc3c7" /> <path d="m13 1035.4v1h4v-1h-4zm0 2v1h7v-1h-7zm0 2v1h7v-1h-7z" fill="#7f8c8d" /> <path d="m4 6c-0.5523 0-1 0.4477-1 1v9c0 0.552 0.4477 1 1 1h6c0.552 0 1-0.448 1-1v-9c0-0.5523-0.448-1-1-1h-6z" fill="#ecf0f1" transform="translate(0 1028.4)" /> <path d="m7 1035.5c-0.6655 0-1.2798 0.4-1.7324 0.8-0.3868 0.5-0.6104 1-0.7546 1.6-0.4216 0.4-0.3708 1-0.0589 1.4 0.3297 0.4 0.3253 0.9 0.5757 1.4 0.1042 0.4 0.6974 0.7 0.6972 1.1 0.1491 0.7-0.7098 0.5-1.0969 0.7-0.5399 0.2-1.2466 0.4-1.6286 0.8 0.04 0.6-0.1095 1.2 0.125 1.7 0.2 0.4 0.7004 0.4 1.1035 0.4h6.208c0.459-0.2 0.621-0.8 0.562-1.2v-1c-0.705-0.3-1.3602-0.7-2.1396-0.9-0.4624 0-0.6621-0.3-0.6986-0.7 0.6429-0.5 0.9832-1.3 1.2132-2.1 0.3596-0.3 0.655-1.1 0.1842-1.5-0.2308-0.4-0.2642-0.9-0.5832-1.4-0.4221-0.6-1.1761-1.1-1.976-1.1z" fill="#34495e" />{" "}
							</g>{" "}
						</g>
					</svg>
				</div>
			</div>
		</div>
	);
}
