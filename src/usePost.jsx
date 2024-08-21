import { useState } from "react";

function usePost() {
	const [isPending, setIsPending] = useState(false);
	const [error, setError] = useState(null);
	const [data, setData] = useState(null);

	async function fetchData(
		url,
		options = {
			body: "",
			headers: { "Content-Type": "application/json" },
			method: "POST",
		}
	) {
		setIsPending(true);
		try {
			setError(false);
			const res = await fetch(url, {
				method: options.method,
				body: JSON.stringify(options.body),
				headers: options.headers,
			});
			const resData = await res.json();

			// check if the retrieved data ok to use
			// if (resData.status !== 200)
			// 	throw new Error(`${resData.status}, ${resData.message}`);
			setData(resData);
			console.log(resData, "GET Response data");
		} catch (err) {
			console.error(err);
			setError(err);
		} finally {
			setIsPending(false);
		}
	}

	return { isPending, error, data, fetchData };
}

export default usePost;
