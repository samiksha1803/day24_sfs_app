import { useState, useEffect } from "react";
import axios from "axios";

function Home() {
	const [info, setInfo] = useState([]);

	useEffect(() => {
		let url = "https://jsmern-p24.onrender.com/gs";
		axios.get(url)
			.then(res => {
				setInfo(res.data);
			})
			.catch(err => {
				console.log("issue " + err);
			});
	}, []);

	const delStu = (r) => {
		let url = "https://jsmern-p24.onrender.com/ds";
		let d = { data: { rno: r } };
		axios.delete(url, d)
			.then(res => {
				alert("Record deleted");
				window.location.reload();
			})
			.catch(err => {
				console.log("error " + err);
			});
	};

	return (
		<>
			<h1>Home page</h1>
			<br />
			<table border={5}>
				<thead>
					<tr>
						<th>Roll no</th>
						<th>Name</th>
						<th>Phone</th>
						<th>Email</th>
						<th>Gender</th>
						<th>Date of Birth</th>
						<th>Image</th>
						<th>Delete</th>
						<th>Download</th>
					</tr>
				</thead>
				<tbody>
					{info.map((e) => (
						<tr key={e.rno}>
							<td>{e.rno}</td>
							<td>{e.name}</td>
							<td>{e.phone}</td>
							<td>{e.email}</td>
							<td>{e.gender}</td>
							<td>{e.dob?.slice(0, 10)}</td>
							<td>
								<img src={"data:" + e.mime + ";base64," + e.file} alt="profile" width="100" />
							</td>
							<td>
								<button
									onClick={() => {
										if (window.confirm("Are you sure you want to delete?")) delStu(e.rno);
									}}
								>
									Delete
								</button>
							</td>
							<td>
								<a
									href={"data:" + e.mime + ";base64," + e.file}
									download={"student_" + e.rno + ".jpg"}
								>
									Download
								</a>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
}
export default Home;
