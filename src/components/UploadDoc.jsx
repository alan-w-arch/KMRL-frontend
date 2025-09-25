import { useRef } from "react";
import { useLanguage } from "../context/LanguageContext";
import { Upload } from "lucide-react";

function UploadDoc() {
  const { t } = useLanguage();
  const fileInputRef = useRef(null);

  //handleFileUpload
  const handleFileUpload = async (event) => {
    const files = Array.from(event.target.files);

    if (files.length === 0) return;

    for (const file of files) {
      const fileId = Date.now() + Math.random();

      // Validate file type and size
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ];
      const maxSize = 10 * 1024 * 1024; // 10MB

      if (
        !allowedTypes.includes(file.type) &&
        !file.name.match(/\.(pdf|doc|docx|xls|xlsx)$/i)
      ) {
        alert(`File type not supported: ${file.name}`);
        continue;
      }

      if (file.size > maxSize) {
        alert(`File too large: ${file.name}. Maximum size is 10MB.`);
        continue;
      }

      // Add file to state with uploading status
      const newFile = {
        id: fileId,
        name: file.name,
        type: file.type.includes("pdf")
          ? "pdf"
          : file.type.includes("word") || file.name.includes("doc")
          ? "doc"
          : file.type.includes("sheet") || file.name.includes("xls")
          ? "excel"
          : "other",
        size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
        uploadDate: new Date().toISOString().split("T")[0],
        status: "uploading",
        priority: "medium",
        department: "General",
        summary: "Uploading document...",
      };

      setUploadedFiles((prev) => [newFile, ...prev]);
      setUploadProgress((prev) => ({ ...prev, [fileId]: 0 }));

      try {
        // Create FormData for file upload
        const formData = new FormData();
        formData.append("file", file);
        formData.append("user_id", localStorage.getItem("user_id"));
        formData.append("dept_name", "Engineering");

        // Upload file with progress tracking
        const response = await axios.post(API_ENDPOINTS.UPLOAD_FILE, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress((prev) => ({ ...prev, [fileId]: progress }));
          },
          timeout: 30000, // 30 second timeout
        });

        // Update file status to processing
        setUploadedFiles((prev) =>
          prev.map((f) =>
            f.id === fileId
              ? {
                  ...f,
                  status: "processing",
                  summary:
                    response.data?.message ||
                    "Document uploaded successfully. Processing...",
                }
              : f
          )
        );

        // Clear upload progress
        setUploadProgress((prev) => {
          const newProgress = { ...prev };
          delete newProgress[fileId];
          return newProgress;
        });

        // Poll for processing status (you can replace this with WebSocket or actual API polling)
        pollProcessingStatus(fileId);
      } catch (error) {
        console.error("File upload error:", error);

        let errorMessage = "Upload failed. Please try again.";
        if (error.response?.data?.message) {
          errorMessage = error.response.data.message;
        } else if (error.code === "ECONNABORTED") {
          errorMessage = "Upload timeout. Please try again.";
        } else if (error.message) {
          errorMessage = error.message;
        }

        // Update file status to error
        setUploadedFiles((prev) =>
          prev.map((f) =>
            f.id === fileId
              ? {
                  ...f,
                  status: "error",
                  summary: errorMessage,
                }
              : f
          )
        );

        // Clear upload progress
        setUploadProgress((prev) => {
          const newProgress = { ...prev };
          delete newProgress[fileId];
          return newProgress;
        });
      }
    }

    // Clear file input
    if (event.target) {
      event.target.value = "";
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl border border-neutral-200 p-6 mb-8">
        <h2 className="text-lg font-heading font-semibold text-primary mb-4">
          {t.uploadDocument}
        </h2>
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-neutral-300 rounded-xl p-8 text-center hover:border-accent hover:bg-accent/5 transition-colors cursor-pointer"
        >
          <Upload className="mx-auto mb-4 text-neutral-400" size={48} />
          <p className="text-lg font-medium text-neutral-700 mb-2">
            {t.dragDrop}
          </p>
          <p className="text-sm text-neutral-500">{t.uploadInfo}</p>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".pdf,.doc,.docx,.xls,.xlsx"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>
      </div>
    </>
  );
}

export default UploadDoc;
