import { useState, useEffect } from "react";
import { listDocuments } from "../api/services";
import { useAuth } from "../context/AuthContext";

export default function UploadCompliance() {
  const { user } = useAuth();
  const [documents, setDocuments] = useState([]);
  const [loadingDocs, setLoadingDocs] = useState(true);

  const [compliance, setCompliance] = useState({
    docId: "",
    deadline: "",
    status: "",
    assignedTo: "",
    remarks: "",
  });

  useEffect(() => {
    if (!user?.user_id) return;

    const fetchDocuments = async () => {
      try {
        const docs = await listDocuments(user.user_id);
        console.log("Fetched documents:", docs);
        setDocuments(docs);
      } catch (err) {
        console.error("Failed to fetch documents:", err);
      } finally {
        setLoadingDocs(false);
      }
    };

    fetchDocuments();
  }, [user?.user_id]);

  const handleSubmit = () => {
    console.log("Upload Compliance:", compliance);
    // API call here
  };

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-100 flex flex-col gap-8">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
        Upload Compliance Rules
      </h1>

      <div className="w-full max-w-10xl mx-auto p-6 md:p-8 bg-white rounded-xl shadow-md flex flex-col gap-4">
        {/* Document ID Dropdown */}
        <select
          value={compliance.docId}
          onChange={(e) =>
            setCompliance({ ...compliance, docId: e.target.value })
          }
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-900"
        >
          <option value="">
            {loadingDocs ? "Loading documents..." : "Select Document"}
          </option>

          {/* Demo File Option */}
          <option value="demo-file">Demo File</option>

          {/* Fetched Documents */}
          {documents.length > 0
            ? documents.map((doc) => (
                <option key={doc.doc_id || doc.id} value={doc.doc_id || doc.id}>
                  {doc.title || doc.doc_id || doc.id}
                </option>
              ))
            : !loadingDocs && <option disabled>No documents found</option>}
        </select>

        <input
          type="date"
          value={compliance.deadline}
          onChange={(e) =>
            setCompliance({ ...compliance, deadline: e.target.value })
          }
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-900"
        />

        <select
          value={compliance.status}
          onChange={(e) =>
            setCompliance({ ...compliance, status: e.target.value })
          }
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-900"
        >
          <option value="">Select Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="completed">Completed</option>
        </select>

        <input
          type="text"
          placeholder="Assigned To"
          value={compliance.assignedTo}
          onChange={(e) =>
            setCompliance({ ...compliance, assignedTo: e.target.value })
          }
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-900"
        />

        <textarea
          placeholder="Remarks"
          value={compliance.remarks}
          onChange={(e) =>
            setCompliance({ ...compliance, remarks: e.target.value })
          }
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-900 resize-none"
          rows={4}
        />

        <button
          onClick={handleSubmit}
          className="self-start px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition mt-2"
        >
          Submit Compliance
        </button>
      </div>
    </div>
  );
}
