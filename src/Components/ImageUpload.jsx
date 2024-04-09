import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ImageUpload.css";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import Modal from "./Modal"; // Import your Modal component
import { CloseOutlined, DeleteOutline, UploadFile } from "@mui/icons-material";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/getAll");
      setUploadedFiles(response.data.map((i) => "data:image/png;base64," + i));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDownload = (index) => {
    const imageUrl = uploadedFiles[index];
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `image_${index + 1}.png`;
    link.click();
  };

  const onFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result) {
        setPreviewImage(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const onFileUpload = async () => {
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post(
        "http://localhost:8080/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast(response.data, "info");
      setSelectedFile(null);
      setPreviewImage(null);
      fetchData();
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleClose = () => {
    setSelectedFile(null);
    setPreviewImage(null);
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImageUrl(imageUrl);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedImageUrl(null);
  };

  return (
    <>
      <div className="upload">
        <div className="row">
          <label htmlFor="file" className="label">
            Upload an Image
          </label>
        </div>
        <br />
        <div className="file-upload">
          {!previewImage && (
            <>
              <FileUploadOutlinedIcon />
              <h3>Click to Upload an Image</h3>
              <input
                type="file"
                onChange={onFileChange}
                id="file"
                accept="image/*"
              />
            </>
          )}
          {previewImage && (
            <>
              <img src={previewImage} alt="Preview" className="preview-img" />
              <CloseOutlined onClick={handleClose} className="close-btn" />
            </>
          )}
        </div>
        <Button
          onClick={onFileUpload}
          disabled={!selectedFile}
          variant="contained"
          sx={{
            cursor: "pointer",
            width: "30%",
            marginBottom: "20px",
          }}
        >
          Upload Image
        </Button>
        <br />
        <label htmlFor="file" className="label">
          Uploaded Images
        </label>
        <div className="uploaded-images">
          {uploadedFiles.map((imageUrl, index) => (
            <>
              <img
                key={index}
                src={imageUrl}
                alt={`Image ${index + 1}`}
                className="uploaded-img"
                onClick={() => handleImageClick(imageUrl)}
              />
              <hr />
            </>
          ))}
        </div>
      </div>

      {showModal && (
        <Modal onClose={handleModalClose}>
          <img
            src={selectedImageUrl}
            alt="Selected Image"
            className="modal-image"
          />
        </Modal>
      )}
    </>
  );
};

export default ImageUpload;
