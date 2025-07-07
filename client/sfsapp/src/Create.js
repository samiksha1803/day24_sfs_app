import { useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

function Create() {
	const rRno = useRef();
	const rName = useRef();
	const rEmail = useRef();
	const rGender = useRef();
	const rDob = useRef();
	const rFile = useRef();

	const [rno, setRno] = useState("");
	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");
	const [gender, setGender] = useState("");
	const [dob, setDob] = useState("");
	const [file, setFile] = useState("");
	const [msg, setMsg] = useState("");

	const hRno = (e) => setRno(e.target.value);
	const hName = (e) => setName(e.target.value);
	const hPhone = (e) => setPhone(e.target.value);
	const hEmail = (e) => setEmail(e.target.value);
	const hGender = (e) => setGender(e.target.value);
	const hDob = (e) => setDob(e.target.value);

	const hFile = (e) => {
		const selectedFile = e.target.files[0];
		if (selectedFile) {
			const maxSize = 500 * 1024;
			if (selectedFile.size > maxSize) {
				toast.error("File too large! Max size is 500 KB", { autoClose: 1000 });
				e.target.value = "";
				return;
			}
			if (!selectedFile.type.startsWith("image/")) {
				toast.error("Only image files are allowed!", { autoClose: 1000 });
				e.target.value = "";
				return;
			}
			setFile(selectedFile);
		}
	};

	const validateFields = () => {
		if (!rno.trim()) {
			toast.error("Roll number is required", { autoClose: 1000 });
			rRno.current.focus();
			return false;
		}
		if (!name.trim()) {
			toast.error("Name is required", { autoClose: 1000 });
			rName.current.focus();
			return false;
		}
		if (!phone.trim()) {
			toast.error("Phone number is required", { autoClose: 1000 });
			return false;
		}
		if (!/^\d{10}$/.test(phone)) {
			toast.error("Phone number must be 10 digits", { autoClose: 1000 });
			return false;
		}
		if (!email.trim()) {
			toast.error("Email is required", { autoClose: 1000 });
			rEmail.current.focus();
			return false;
		}
		if (!/\S+@\S+\.\S+/.test(email)) {
			toast.error("Enter a valid email", { autoClose: 1000 });
			rEmail.current.focus();
			return false;
		}
		if (!gender) {
			toast.error("Please select gender", { autoClose: 1000 });
			rGender.current.focus();
			return false;
		}
		if (!dob) {
			toast.error("Date of birth is required", { autoClose: 1000 });
			rDob.current.focus();
			return false;
		}
		if (!file) {
			toast.error("Please select a file", { autoClose: 1000 });
			rFile.current.focus();
			return false;
		}
		return true;
	};

	const save = (e) => {
		e.preventDefault();
		if (!validateFields()) return;

		const fdata = new FormData();
		fdata.append("rno", rno);
		fdata.append("name", name);
		fdata.append("phone", phone);
		fdata.append("email", email);
		fdata.append("gender", gender);
		fdata.append("dob", dob);
		fdata.append("file", file);

		axios.post("https://jsmern-p24.onrender.com/ss", fdata, {
			headers: { "Content-Type": "multipart/form-data" },
		})
			.then((res) => {
				if (res.data.affectedRows === 1) {
					setMsg("Record created");
					setRno(""); setName(""); setPhone(""); setEmail(""); setGender(""); setDob(""); setFile(null);
					if (rFile.current) rFile.current.value = "";
					rRno.current.focus();
				} else if (res.data.errno === 1062) {
					toast.error(`Roll no ${rno} already exists!`, { autoClose: 1000 });
					setRno("");
					rRno.current.focus();
				}
			})
			.catch((err) => setMsg("Issue: " + err));
	};

	return (
		<>
			<h1>Create Page</h1>
			<ToastContainer />
			<form onSubmit={save}>
				<label>Roll Number:</label><br />
				<input type="number" placeholder="Enter Roll no" ref={rRno} onChange={hRno} value={rno} /><br /><br />

				<label>Name:</label><br />
				<input type="text" placeholder="Enter Name" ref={rName} onChange={hName} value={name} /><br /><br />

				<label>Phone:</label><br />
				<input type="text" placeholder="Enter Phone Number" onChange={hPhone} value={phone} /><br /><br />

				<label>Email:</label><br />
				<input type="email" placeholder="Enter Email" ref={rEmail} onChange={hEmail} value={email} /><br /><br />

				<label>Gender:</label><br />
				<select ref={rGender} onChange={hGender} value={gender}>
					<option value="">Select Gender</option>
					<option>Male</option>
					<option>Female</option>
				</select><br /><br />

				<label>Date of Birth:</label><br />
				<input type="date" ref={rDob} onChange={hDob} value={dob} /><br /><br />

				<label>Profile Photo:</label><br />
				<input type="file" accept="image/*" ref={rFile} onChange={hFile} /><br /><br />

				<input type="submit" />
			</form>
			<h2>{msg}</h2>
		</>
	);
}
export default Create;
