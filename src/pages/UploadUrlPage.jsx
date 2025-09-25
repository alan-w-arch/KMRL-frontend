import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { uploadUrl } from "../api/services";

const departmentsList = [
  "Engineering",
  "Procurement",
  "HR",
  "Finance",
  "Legal & Compliance",
];

function UploadUrlPage() {
  const { user } = useAuth();
  const [priority, setPriority] = useState("normal");
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleDepartmentChange = (dept) => {
    setSelectedDepartments((prev) =>
      prev.includes(dept) ? prev.filter((d) => d !== dept) : [...prev, dept]
    );
  };

  const handleSubmit = async () => {
    if (!url) {
      alert("Please enter a URL!");
      return;
    }
    if (!selectedDepartments.length) {
      alert("Please select at least one department!");
      return;
    }
    if (!user?.id) {
      alert("User not authenticated!");
      return;
    }

    // Basic URL validation
    try {
      new URL(url);
    } catch (error) {
      alert("Please enter a valid URL!");
      return;
    }

    setIsLoading(true);

    try {
      const uploadPromises = selectedDepartments.map(async (department) => {
        const urlData = {
          user_id: user.id,
          url: url,
          dept_name: department,
          priority: priority,
        };

        return await uploadUrl(urlData);
      });

      // Wait for all uploads to complete
      const results = await Promise.all(uploadPromises);

      const successfulUploads = results.filter(
        (result) => result.success !== false
      ).length;

      if (successfulUploads > 0) {
        alert(
          `URL uploaded successfully to ${successfulUploads} department(s)!`
        );

        // Reset form
        setUrl("");
        setSelectedDepartments([]);
        setPriority("medium");

        navigate("/dashboard");
      } else {
        throw new Error("All uploads failed");
      }
    } catch (error) {
      console.error("Upload failed:", error);

      if (error.response?.data?.detail) {
        alert(`Upload failed: ${error.response.data.detail}`);
      } else {
        alert("Failed to upload URL! Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-[115vh] mx-auto p-6">
      <h1 className="text-2xl font-bold text-primary mb-6">
        Upload Document URL
      </h1>

      {/* User ID */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-neutral-700 mb-1">
          User ID
        </label>
        <input
          type="text"
          value={user?.id || ""}
          disabled
          className="w-full rounded-lg border border-neutral-300 p-2 bg-neutral-100 text-neutral-600"
        />
      </div>

      {/* Priority */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-neutral-700 mb-2">
          Priority
        </label>
        <div className="flex gap-3">
          {["low", "normal", "high"].map((p) => (
            <button
              key={p}
              onClick={() => setPriority(p)}
              className={`px-4 py-2 rounded-lg border transition-colors ${
                priority === p
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-neutral-700 border-neutral-300 hover:border-accent"
              }`}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Departments */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-neutral-700 mb-2">
          Departments
        </label>
        <div className="grid grid-cols-2 gap-2">
          {departmentsList.map((dept) => (
            <label
              key={dept}
              className="flex items-center gap-2 p-2 rounded-lg border border-neutral-300 cursor-pointer hover:bg-accent/10"
            >
              <input
                type="checkbox"
                checked={selectedDepartments.includes(dept)}
                onChange={() => handleDepartmentChange(dept)}
                className="form-checkbox text-primary"
                disabled={isLoading}
              />
              <span>{dept}</span>
            </label>
          ))}
        </div>
      </div>

      {/* URL Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-neutral-700 mb-2">
          Document URL
        </label>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter the document URL here (e.g., https://example.com/document.pdf)"
          className="w-full rounded-lg border border-neutral-300 p-2"
          disabled={isLoading}
        />
      </div>

      {/* Submit Button */}
      <div className="mt-6 text-right">
        <button
          onClick={handleSubmit} // or handleSubmitSequential if you prefer
          disabled={isLoading}
          className={`px-6 py-2 rounded-lg transition-colors ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-primary text-white hover:bg-primary/90"
          }`}
        >
          {isLoading ? "Uploading..." : "Submit"}
        </button>
      </div>
    </div>
  );
}

export default UploadUrlPage;
