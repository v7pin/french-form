import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaPhone } from "react-icons/fa";
import { MdOutlineMale, MdOutlineFemale } from "react-icons/md";
import axios from "axios";

function RegistrationForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    currentCity: ""
  });

  const [showModal, setShowModal] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      errors.email = "Invalid email format";
    }
    if (!formData.phone.match(/^\d{10}$/)) {
      errors.phone = "Phone number must be exactly 10 digits";
    }
    if (!formData.gender) errors.gender = "Gender is required";
    if (!formData.currentCity.trim()) errors.currentCity = "Current city is required";
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      axios.post("http://localhost:5000/register", { ...formData, formType: "french" })
        .then(response => {
          setShowModal(true);
        })
        .catch(error => {
          console.error("Registration Failed", error.response ? error.response.data : "Server error");
          setFormErrors({ form: "Failed to submit registration." });
        });
    } else {
      setFormErrors(errors);
    }
  };

  function Modal({ message, onClose }) {
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2 className="text-center text-lg font-semibold mb-2 text-cyan-600">Submission Confirmation</h2>
          <p>{message}</p>
          <button onClick={onClose} className="close-btn">Close</button>
        </div>
        <style jsx>{`
          .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: rgba(0, 0, 0, 0.6);
            z-index: 1000;
          }
          .modal-content {
            padding: 20px;
            background: white;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            text-align: center;
            width: 300px;
          }
          .close-btn {
            display: inline-block;
            padding: 8px 15px;
            margin-top: 15px;
            font-size: 16px;
            color: white;
            background-color: #007bff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s;
          }
          .close-btn:hover {
            background-color: #0056b3;
          }
        `}</style>
      </div>
    );
}



  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-cyan-300 via-cyan-100 to-cyan-50">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md mt-16 mb-8">
      {showModal && (
          <Modal message="Thank you for the registration, you will be contacted by our team for further information 😊" onClose={handleCloseModal} />
        )}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-purple-800 my-4 mb-2">French Learning  Registration Form</h1>
          <p className="text-rose-600 uppercase mt-4 mb-8 font-semibold">Kshitiksha Educare 📚</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField icon={<FaUser />} name="name" label="Name" placeholder="Enter your name" value={formData.name} onChange={handleChange} />
          <InputField icon={<FaEnvelope />} name="email" label="E-Mail" placeholder="Enter your email" value={formData.email} onChange={handleChange} />
          <InputField icon={<FaPhone />} name="phone" label="Mobile Number" placeholder="Enter your mobile number" value={formData.phone} onChange={handleChange} />
          <InputField name="currentCity" label="Current City" placeholder="Enter your current city" value={formData.currentCity} onChange={handleChange} />
          <GenderSelection gender={formData.gender} onChange={handleChange} />
          <button type="submit" className="btn bg-purple-700 hover:bg-purple-800 w-full rounded-full text-white py-2">Submit</button>
        </form>
      </div>
    </div>
  );
}

function InputField({ icon, name, label, placeholder, value, onChange }) {
  return (
    <div>
      <label className="text-gray-700 font-medium">{label}</label>
      <div className="flex items-center bg-gray-100 rounded-full pl-4 pr-2 py-2 mt-2">
        {icon && <span className="text-lg text-gray-500 mr-2">{icon}</span>}
        <input type="text" name={name} placeholder={placeholder} className="input flex-1 bg-transparent outline-none" value={value} onChange={onChange} required />
      </div>
    </div>
  );
}

function GenderSelection({ gender, onChange }) {
  return (
    <div>
      <label className="text-gray-700 block font-medium">Gender</label>
      <div className="flex space-x-4">
        <GenderOption icon={<MdOutlineMale />} label="Male" name="gender" value="Male" checked={gender === "Male"} onChange={onChange} />
        <GenderOption icon={<MdOutlineFemale />} label="Female" name="gender" value="Female" checked={gender === "Female"} onChange={onChange} />
      </div>
    </div>
  );
}

function GenderOption({ icon, label, name, value, checked, onChange }) {
  return (
    <label className="flex items-center space-x-2 cursor-pointer">
      <input type="radio" name={name} value={value} className="radio radio-primary" checked={checked} onChange={onChange} required />
      {icon && <span className="text-lg text-gray-500">{icon}</span>}
      <span className="label-text">{label}</span>
    </label>
  );
}

export default RegistrationForm;
