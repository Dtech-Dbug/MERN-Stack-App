import React from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";

//upload is a protected route so we nned to access the user token too
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export const FileUpload = ({ values, setValues }) => {
	const { user } = useSelector((state) => ({ ...state }));

	function fileUploadAndResize(e) {
		let filesUploaded = values.images;
		//console.log(e.target.files);

		//resize: use resize react file npm : npm i react-image-file-resizer
		//for a single file : e.target.files[0]
		//buty for multiple uploads , we need to loop through the arrys of file lists
		let files = e.target.files;
		if (files) {
			for (let i = 0; i < files.length; i++) {
				Resizer.imageFileResizer(
					files[i],
					720,
					720,
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
							})
							.catch((err) => {
								toast.error(err.message);
								console.log(err.message);
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
	return (
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
	);
};

//resize the filw
//send to server
//server will uplaod to cloudonary
//get url from cludinary
//serber then returns the url to the client
