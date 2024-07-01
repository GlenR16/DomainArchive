import React from "react";
import { NavLink } from "react-router-dom";

export default function Documentation() {
	return (
		<div className="grow flex flex-col items-center p-4 py-6 gap-4">
			<div className="flex flex-col md:flex-row gap-4 w-full max-w-screen-xl">
				<div className="w-full md:w-96">
					<div className="card w-full bg-base-300 h-[85vh] overflow-y-scroll">
						<div className="card-body">
							<div className="join join-vertical w-full">
								<div className="collapse collapse-arrow join-item border border-base-300">
									<input type="radio" name="my-accordion-4" defaultChecked />
									<div className="collapse-title text-xl font-medium">Domain</div>
									<div className="collapse-content text-sm">
                                        <div className="flex flex-col gap-1">
                                            <button onClick={() => document.getElementById("1").scrollIntoView()} className="link text-start">What is a domain ?</button>
                                            <button onClick={() => document.getElementById("2").scrollIntoView()} className="link text-start">What is a domain token ?</button>
                                            <button onClick={() => document.getElementById("3").scrollIntoView()} className="link text-start">How to temporarily disable a domain ?</button>
                                            <button onClick={() => document.getElementById("4").scrollIntoView()} className="link text-start">How to delete a domain ?</button>
                                            <button onClick={() => document.getElementById("5").scrollIntoView()} className="link text-start">How to reset a domain token ?</button>
                                            <button onClick={() => document.getElementById("6").scrollIntoView()} className="link text-start">What happens if someone has access to a domain token ?</button>
                                        </div>
									</div>
								</div>
								<div className="collapse collapse-arrow join-item border border-base-300">
									<input type="radio" name="my-accordion-4" />
									<div className="collapse-title text-xl font-medium">Instances</div>
									<div className="collapse-content text-sm">
                                        <div className="flex flex-col gap-1">
                                            <button onClick={() => document.getElementById("7").scrollIntoView()} className="link text-start">What is an instance ?</button>
                                            <button onClick={() => document.getElementById("8").scrollIntoView()} className="link text-start">What is an application ?</button>
                                        </div>
									</div>
								</div>
								<div className="collapse collapse-arrow join-item border border-base-300">
									<input type="radio" name="my-accordion-4" />
									<div className="collapse-title text-xl font-medium">Eureka</div>
									<div className="collapse-content text-sm">
                                    <div className="flex flex-col gap-1">
                                            <button onClick={() => document.getElementById("9").scrollIntoView()} className="link text-start">What is Eureka ?</button>
                                            <button onClick={() => document.getElementById("10").scrollIntoView()} className="link text-start">Integration with eureka</button>
                                        </div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="w-full p-4 flex flex-col gap-4 h-[85vh] overflow-y-scroll">
					<div id="domain">
                        <div className="divider divider-start">
						    <h1 className="text-4xl font-semibold mb-2">Domain</h1>
                        </div>
                        <div id="1" className="text-lg font-medium">What is a domain ?</div>
						<div>
                            A domain is a collection of services that are grouped together. Each domain has a unique key that is used to authenticate services that are part of the domain.
                            Do not mistake a domain for the domain name of a website. A domain in this context is a collection of microservices.
                            One domain can have multiple services but a service can only belong to one domain. Each domain represents your applications as a whole.
                        </div>
                        <div className="divider"></div>
                        <div id="2" className="text-lg font-medium">What is a domain token ?</div>
						<div>
                            A domain token is a secret API key that is used to authenticate services that are part of the domain. Do not share this key with anyone or expose it in client side code.
                            If you suspect that someone has access to your domain token, you can reset it to invalidate the old token.
                        </div>
                        <div className="divider"></div>
                        <div id="3" className="text-lg font-medium">How to temporarily disable a domain ?</div>
                        <div>
                            To temporarily disable a domain, you can goto the domain page and enable edit mode by clicking on the edit toggle. 
                            You can then change the status of the domain to Inactive and save the changes. This will prevent any services from accessing the domain.
                            Once a domain is disabled, all services that are part of the domain will be unable to access the API.
                            No information regarding the services that were part of the domain will be accessible. Enabling the domain will restore access to the services. No data will be lost when a domain is disabled.
                            This may cause duplicate data to be sent to the API if the services are down and the domain is enabled.
                        </div>
                        <div className="divider"></div>
                        <div id="4" className="text-lg font-medium">How to delete a domain ? </div>
                        <div>
                            To delete a domain, you can goto the domain page and enable edit mode by clicking on the edit toggle. The delete button will be enabled once you are in edit mode.
                            Deleting a domain will remove all services that are part of the domain. It will reset all versioning information and remove all statistical data about the domain.
                            Once a domain is deleted, it cannot be recovered. All data will be lost permanently.
                            All API calls made by the services that were part of the domain will return a 404 error and may cause issues in the services.
                        </div>
                        <div className="divider"></div>
                        <div id="5" className="text-lg font-medium">How to reset a domain token ?</div>
                        <div>
                            To reset a domain token, you can goto the domain page and enable edit mode by clicking on the edit toggle. The reset token button will be enabled once you are in edit mode.
                            You can then click on the reset token button to reset the domain token. This will invalidate the old token and generate a new one.
                            You will need to update the domain token in all services that are part of the domain. If you suspect that someone has access to your domain token, you should reset it immediately.
                        </div>
                        <div className="divider"></div>
                        <div id="6" className="text-lg font-medium">What happens if someone has access to a domain token ?</div>
                        <div>
                            If someone has access to your domain token, they can access the API as if they were a service that is part of the domain.
                            This means that they can send requests to the API and access the data that is associated with the domain.
                            The can obtain the URI of the services that are part of the domain and also register a malicious service as part of the domain.
                            They can also make changes to the data that is associated with the other services on the domain.
                            If you suspect that someone has access to your domain token, you should reset it immediately to invalidate the old token.
                        </div>
                        
					</div>
                    <div id="instance">
                        <div className="divider divider-start">
						    <h1 className="text-4xl font-semibold mb-2">Instance</h1>
                        </div>
                        <div id="7" className="text-lg font-medium">What is an instance ?</div>
						<div>
                            An instance is a single server that is running a service. Each service that is part of a domain can have multiple instances.
                            An instance is identified by its hostname and IP address. An instance is responsible for sending heartbeat messages to the API to indicate that it is alive.
                            If an instance is shutting down it must send a deregister message to the API to indicate that it is no longer available.
                        </div>
                        <div className="divider"></div>
                        <div id="8" className="text-lg font-medium">What is an application ?</div>
                        <div>
                            An application is a collection of servers that are running the same service. Each server in the application is an instance of the service.
                            An application is identified by its name. An application can have multiple instances that are running the service.
                            Load balancing is done at your server at the application level. The API does not provide load balancing for the instances.
                        </div>
					</div>
                    <div id="eureka">
                        <div className="divider divider-start">
						    <h1 className="text-4xl font-semibold mb-2">Eureka</h1>
                        </div>
                        <div id="9" className="text-lg font-medium">What is Eureka ?</div>
						<div>
                            Eureka is a service discovery tool that is used to locate services that are running in the cloud. It is used to locate services that are running in the cloud.
                            Eureka is a REST based service that is primarily used in the AWS cloud for locating services for the purpose of load balancing and failover of middle-tier servers.
                            Eureka is also used in the Netflix OSS stack for service discovery and load balancing.
                        </div>
                        <div className="divider"></div>
                        <div id="10" className="text-lg font-medium">Integration with eureka</div>
                        <div>
                            Integration with eureka is made simple due to the stucture of the service. <br />
                            The property <b>eureka.client.serviceUrl.defaultZone</b> should be passed the url of our service. <br />
                            The url will be in the format <i>https://username:domain_token@api_url/eureka/</i>
                        </div>
					</div>
				</div>
			</div>
		</div>
	);
}
