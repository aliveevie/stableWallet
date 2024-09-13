"use client";

import { useState } from 'react';
import { FaTelegramPlane, FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import { Footer } from '../../../components/footer'; // Assuming you already have a Footer component

const Support = () => {
  const [showForm, setShowForm] = useState(false); // To toggle the form
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    complaint: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setShowForm(false); // Hide the form after submission
    // Here you can handle the form submission, for example, send the form data to an API
    console.log(formData);
  };

  const toggleForm = () => {
    setShowForm(true); // Show the form when clicked
    setFormSubmitted(false); // Reset the submission state
  };

  return (
    <div className="container mx-auto p-4 flex flex-col justify-between h-screen bg-gray-900 text-white">
      {/* Main Content */}
      <div className="flex-grow flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold text-center mb-6">Support</h1>

        {/* Contact Information */}
        {!showForm && !formSubmitted && (
          <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md mx-auto mb-6 text-center">
            <h2 className="text-xl font-semibold mb-4">Contact Customer Support 24/7</h2>

            <div className="space-y-4">
              <div className="flex items-center justify-center">
                <FaWhatsapp className="text-2xl mr-4 text-green-500" />
                <a
                  href="https://wa.me/2348138300357"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:underline"
                >
                  +2348138300357
                </a>
              </div>

              <div className="flex items-center justify-center">
                <FaTelegramPlane className="text-2xl mr-4 text-blue-500" />
                <a
                  href="https://t.me/ibrahim_193"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:underline"
                >
                  Telegram: ibrahim_193
                </a>
              </div>

              <div className="flex items-center justify-center">
                <FaEnvelope className="text-2xl mr-4 text-blue-500" />
                <a
                  href="mailto:support@stablewallet.com"
                  className="text-white hover:underline"
                >
                  support@stablewallet.com
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Button to show/hide complaint form */}
        {!showForm && !formSubmitted && (
          <div className="text-center">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded font-semibold hover:bg-blue-600 transition duration-300"
              onClick={toggleForm}
            >
              Send Complaint
            </button>
          </div>
        )}

        {/* Complaint Form */}
        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md mx-auto mb-6 mt-6"
          >
            <h2 className="text-xl font-semibold mb-4">Send a Message for Complaint</h2>

            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-700 rounded bg-gray-700 text-white"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-700 rounded bg-gray-700 text-white"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="complaint" className="block text-sm font-medium mb-1">
                Complaint
              </label>
              <textarea
                id="complaint"
                name="complaint"
                value={formData.complaint}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-700 rounded bg-gray-700 text-white h-32"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 px-4 rounded font-semibold hover:bg-green-600 transition duration-300"
            >
              Submit Complaint
            </button>
          </form>
        )}

        {/* Success Message */}
        {formSubmitted && (
          <div className="bg-green-500 text-white py-2 px-4 rounded-lg text-center w-full max-w-md mx-auto mb-6">
            Complaint submitted successfully!
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Support;
