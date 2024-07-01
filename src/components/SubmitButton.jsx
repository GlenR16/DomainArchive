import { useState } from "react";

export default function SubmitButton({ label, onClick, style = "btn-primary" }) {
	const [loading, setLoading] = useState(false);

    function handleClick() {
        setLoading(true);
        onClick();
        setLoading(false);
    }

	return (
		<button type="button" onClick={handleClick} className={`btn btn-block min-h-10 h-10 ${style} `} disabled={loading}>
			{loading ? <span className="loading loading-dots loading-md"></span> : label}
		</button>
	);
}
