import React from "react";

export default function Loading() {
	const styles = {
        "animation": "color-change 4s infinite",
    }
    
    return (
		<div className="grow flex flex-col items-center justify-center tracking-tighter">
			<span className="loading loading-infinity w-52 h-28" style={styles}></span>
			<h1 className="font-bold text-5xl" >Loading</h1>
		</div>
	);
}
