import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Upload } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { uploadFile } from "../api/services";

const departmentsList = [
  "Engineering",
  "Procurement",
  "HR",
  "Finance",
  "Legal & Compliance",
];

function UploadDocPage() {
  const { user } = useAuth();
  const [priority, setPriority] = useState("normal");
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleDepartmentChange = (dept) => {
    setSelectedDepartments((prev) =>
      prev.includes(dept) ? prev.filter((d) => d !== dept) : [...prev, dept]
    );
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setSelectedFile(file);
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      alert("Please select a file first!");
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

    const file = selectedFile;

    // File type validation
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/bmp",
      "image/webp",
    ];

    const allowedExtensions =
      /\.(pdf|doc|docx|xls|xlsx|jpg|jpeg|png|gif|bmp|webp)$/i;
    const maxSize = 10 * 1024 * 1024; // 10MB

    // Type validation
    if (
      !allowedTypes.includes(file.type) &&
      !allowedExtensions.test(file.name)
    ) {
      alert(
        `File type not supported: ${file.name}. Please upload PDF, Word, Excel, or image files.`
      );
      return;
    }

    // Size validation
    if (file.size > maxSize) {
      alert(`File too large: ${file.name}. Maximum size is 10MB.`);
      return;
    }

    setIsLoading(true);

    try {
      // Upload to all departments in parallel
      const uploadPromises = selectedDepartments.map(async (department) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("user_id", user.id);
        formData.append("dept_name", department);
        formData.append("priority", priority);

        return await uploadFile(formData);
      });

      // Wait for all uploads to complete
      const results = await Promise.all(uploadPromises);

      // Check if all uploads were successful
      const successfulUploads = results.filter(
        (result) => result.success !== false
      ).length;

      if (successfulUploads > 0) {
        alert(
          `File uploaded successfully to ${successfulUploads} department(s)!`
        );

        // Reset form
        setSelectedFile(null);
        setSelectedDepartments([]);
        setPriority("normal");

        // Clear file input
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }

        navigate("/dashboard");
      } else {
        throw new Error("All uploads failed");
      }
    } catch (error) {
      console.error("Upload failed:", error);

      if (error.response?.data?.detail) {
        alert(`Upload failed: ${error.response.data.detail}`);
      } else if (error.request) {
        alert("Upload failed: Network error. Please check your connection.");
      } else {
        alert("Upload failed: " + error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-[115vh] mx-auto p-6">
      <h1 className="text-2xl font-bold text-primary mb-6">Upload Documents</h1>

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
              disabled={isLoading}
              className={`px-4 py-2 rounded-lg border transition-colors ${
                priority === p
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-neutral-700 border-neutral-300 hover:border-accent"
              } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
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
              className={`flex items-center gap-2 p-2 rounded-lg border border-neutral-300 cursor-pointer hover:bg-accent/10 ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
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

      {/* File Upload */}
      <div
        onClick={() => !isLoading && fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer mb-4 ${
          isLoading
            ? "border-gray-300 bg-gray-100 cursor-not-allowed"
            : "border-neutral-300 hover:border-accent hover:bg-accent/5"
        }`}
      >
        {!selectedFile ? (
          <>
            <Upload
              className={`mx-auto mb-4 ${
                isLoading ? "text-gray-400" : "text-neutral-400"
              }`}
              size={48}
            />
            <p
              className={`text-lg font-medium mb-2 ${
                isLoading ? "text-gray-600" : "text-neutral-700"
              }`}
            >
              Click or drag file to upload
            </p>
            <p
              className={`text-sm ${
                isLoading ? "text-gray-500" : "text-neutral-500"
              }`}
            >
              Supported: pdf, doc, docx, xls, xlsx, images
            </p>
          </>
        ) : (
          <p
            className={`text-lg font-medium ${
              isLoading ? "text-gray-600" : "text-neutral-700"
            }`}
          >
            {selectedFile.name}
          </p>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.gif,.bmp,.webp"
          onChange={handleFileSelect}
          className="hidden"
          disabled={isLoading}
        />
      </div>

      {/* Upload Button */}
      <div className="mt-6 text-right">
        <button
          onClick={handleSubmit}
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

export default UploadDocPage;
