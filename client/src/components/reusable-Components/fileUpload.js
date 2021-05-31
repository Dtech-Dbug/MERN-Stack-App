import React from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { Avatar, Badge } from "antd";

//upload is a protected route so we nned to access the user token too
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export const FileUpload = ({ values, setValues, setLoading }) => {
	const { user } = useSelector((state) => ({ ...state }));

	function fileUploadAndResize(e) {
		let filesUploaded = values.images;
		//console.log(e.target.files);

		//resize: use resize react file npm : npm i react-image-file-resizer
		//for a single file : e.target.files[0]
		//buty for multiple uploads , we need to loop through the arrys of file lists
		let files = e.target.files;
		if (files) {
			setLoading(true);
			for (let i = 0; i < files.length; i++) {
				Resizer.imageFileResizer(
					files[i],
					200,
					200,
					"JPEG",
					100,
					0,
					(uri) => {
						//the calback dunction : most important
						console.log("uri ===> ", uri);
						axios
							.post(
								"http://localhost:8000/api/imagesupload",
								{
									image: uri,
								},
								{
									headers: {
										authtoken: user ? user.token : "",
									},
								}
							)
							.then((res) => {
								console.log("res from images ==>", res);
								setLoading(false);
								filesUploaded.push(res.data);
								setValues({ ...values, images: filesUploaded });
							})
							.catch((err) => {
								toast.error(err.message);
								console.log(err.message);
								setLoading(false);
							});

						//make request to backend with images
					},
					"base64"
				);
			}
		}
		//send to srevr to upload to cloudianry

		//get response , and set images URL in the images array in the values object
	}

	const handleImageRemove = (public_id) => {
		setLoading(true);
		console.log("remove image", public_id);
		axios
			.post(
				`http://localhost:8000/api/imageremove`,
				{ public_id },
				{
					headers: {
						authtoken: user ? user.token : "",
					},
				}
			)
			.then((res) => {
				setLoading(false);
				const { images } = values;
				let filteredImages = images.filter((item) => {
					return item.public_id !== public_id;
				});
				setValues({ ...values, images: filteredImages });
			})
			.catch((err) => {
				console.log(err);
				toast.error(err.message);
				setLoading(false);
			});
	};

	return (
		<>
			{values.images &&
				values.images.map((image) => {
					return (
						<Badge
							key={image.public_id}
							count="❌"
							title="Delete"
							style={{ cursor: "pointer" }}
							onClick={() => handleImageRemove(image.public_id)}
						>
							<Avatar
								src={image.url}
								size={100}
								shape="square"
								className="ml-3 mb-2"
							/>
						</Badge>
					);
				})}
			<div className="row">
				<label className="btn btn-primary btn-raised">
					Choose File
					<input
						type="file"
						multiple
						accept="/images/*"
						hidden
						onChange={fileUploadAndResize}
					/>
				</label>
			</div>
		</>
	);
};

//resize the filw
//send to server
//server will uplaod to cloudonary
//get url from cludinary
//serber then returns the url to the client
