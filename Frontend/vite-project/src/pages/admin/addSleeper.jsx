import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { token } from "../../context/token";
import { movements, detectionTypes, types } from "../../componnents/constant/constant"; 

const AddSleeper = () => {
  const [inputs, setInputs] = useState({
    name: "",
    types: "",
    movements: "",
    detection_type: "",
    description: "",
    image: ""
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
    setSuccessMessage("");
  };

  const handleFileChange = (e) => {
    setInputs({ ...inputs, image: e.target.files[0] });
    setSuccessMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      const { name, types, movements, detection_type, description, image } = inputs;

      if (!name.trim() || !types.trim() || !movements.trim() || !detection_type.trim() || !description.trim() || !image) {
        return toast.warning("Veuillez remplir tous les champs");
      }

      formData.append("name", name);
      formData.append("types", types);
      formData.append("movements", movements);
      formData.append("detection_type", detection_type);
      formData.append("description", description);
      formData.append("image", image);

      const res = await axios.post("/api/sleepers/new", formData, { headers: token() });

      setSuccessMessage(res.data.message);
      toast.success(res.data.message);
    } catch (e) {
      // toast.error("Erreur lors de la création du sleeper");
      setErrorMessage("Erreur lors de la création du sleeper");
    }
  };

  return (
    <div className="mt-15 center container">
      <h1>Create a new sleeper</h1>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <form className="center" onSubmit={handleSubmit}>
        <div>
          <label className="block">Sleeper's name</label>
          <input name="name" onChange={handleChange} />
        </div>

        <div>
          <label className="block">Sleeper's type</label>
          <select name="types" value={inputs.types} onChange={handleChange} required>
            <option value="">-- Choose type --</option>
            {types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-demi mbt-demi">
          <label className="block">Image</label>
          <input type="file" name="file" onChange={handleFileChange} />
        </div>

        <div className="mt-demi mbt-demi">
          <label className="block">Movement</label>
          <select name="movements" value={inputs.movements} onChange={handleChange} required>
            <option value="">-- Choose movements --</option>
            {movements.map((movement) => (
              <option key={movement} value={movement}>
                {movement}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-demi mbt-demi">
          <label className="block">Detection's type</label>
          <select name="detection_type" value={inputs.detection_type} onChange={handleChange} required>
            <option value="">-- Choose a detection type --</option>
            {detectionTypes.map((detection_type) => (
              <option key={detection_type} value={detection_type}>
                {detection_type}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-demi mbt-demi">
          <label className="block">Description</label>
          <textarea name="description" value={inputs.description} onChange={handleChange} />
        </div>

        <button type="submit">Add a new sleeper</button>
      </form>
    </div>
  );
};

export default AddSleeper;
