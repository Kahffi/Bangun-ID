import { useEffect, useState } from "react";

function useGet(url, body, header = { "Content-Type": "application/json" }) {
	const [data, setData] = useState(null);
	const [isPending, setIsPending] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		// wrap fetching function inside async
		async function fetchData() {
			try {
				const res = await fetch(url, {
					method: "GET",
					body: JSON.stringify(body),
					headers: { ...header },
				});
				if (!res.ok) throw res.status;
				const resData = await res.json();

				setData({ ...resData });
			} catch (err) {
				console.error(err);
				setError({ ...err });
			} finally {
				setIsPending(false);
			}
		}
		// then run it
		fetchData();
	}, [url, body, header]);

	return { data, isPending, error };
}

export default useGet;
