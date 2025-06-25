import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Preferences = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("fitfreakUser"));

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }

    const prefs = JSON.parse(localStorage.getItem("fitfreakPrefs"));
    if (!prefs) return;
  }, [navigate]);

  const existingPrefs = JSON.parse(localStorage.getItem("fitfreakPrefs"));

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    goal: "",
    workoutMode: "",
    weight: "",
    bodyType: "",
    ...(existingPrefs || {}),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("fitfreakPrefs", JSON.stringify(formData));
    toast.success("Preferences saved successfully!");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4 transition-all duration-500">
      <form
        onSubmit={handleSubmit}
        className="bg-[#111] p-6 rounded-xl shadow-xl w-full max-w-md space-y-6 border border-orange-500 animate-fadeIn"
      >
        <h2 className="text-3xl font-bold text-center text-orange-400 drop-shadow-glow">
          Step {step} of 3
        </h2>

        {/* Progress Bar */}
        <div className="w-full bg-gray-700 rounded-full h-2.5 mb-4 overflow-hidden">
          <div
            className="bg-orange-500 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        {/* Step 1 */}
        {step === 1 && (
          <div className="animate-fadeIn">
            <label className="block mb-2 font-medium text-orange-300">
              Your Fitness Goal
            </label>
            <select
              name="goal"
              value={formData.goal}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-black border border-orange-500 text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              <option value="">-- Select --</option>
              <option value="Lose Weight">Lose Weight</option>
              <option value="Gain Muscle">Gain Muscle</option>
              <option value="Stay Fit">Stay Fit</option>
            </select>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="animate-fadeIn space-y-4">
            <div>
              <label className="block mb-2 font-medium text-orange-300">Workout Mode</label>
              <select
                name="workoutMode"
                value={formData.workoutMode}
                onChange={handleChange}
                required
                className="w-full p-2 rounded bg-black border border-orange-500 text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                <option value="">-- Select --</option>
                <option value="Home">Home</option>
                <option value="Gym">Gym</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 font-medium text-orange-300">Body Type</label>
              <select
                name="bodyType"
                value={formData.bodyType}
                onChange={handleChange}
                required
                className="w-full p-2 rounded bg-black border border-orange-500 text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                <option value="">-- Select --</option>
                <option value="Ectomorph">Ectomorph</option>
                <option value="Mesomorph">Mesomorph</option>
                <option value="Endomorph">Endomorph</option>
              </select>
            </div>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div className="animate-fadeIn space-y-4">
            <div>
              <label className="block mb-2 font-medium text-orange-300">Current Weight (kg)</label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                required
                className="w-full p-2 rounded bg-black border border-orange-500 text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            <div className="text-sm text-orange-300 mt-2">
              <strong className="block mb-1 text-orange-400">Summary:</strong>
              Goal: {formData.goal}<br />
              Mode: {formData.workoutMode}<br />
              Body Type: {formData.bodyType}<br />
              Weight: {formData.weight} kg
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          {step > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="bg-gray-800 text-orange-400 px-4 py-2 rounded hover:scale-105 transition-all border border-orange-500"
            >
              Back
            </button>
          )}

          {step < 3 ? (
            <button
              type="button"
              onClick={nextStep}
              className="bg-orange-500 text-white px-4 py-2 rounded hover:scale-105 transition-all shadow-orange-glow"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="bg-orange-500 text-white px-4 py-2 rounded hover:scale-105 transition-all shadow-orange-glow"
            >
              Save Preferences
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Preferences;
