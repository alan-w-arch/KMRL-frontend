// src/pages/ViewSummary.jsx
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ChevronDown, ChevronUp } from "lucide-react";
import { listDocuments, getSummary } from "../api/services";
import { useAuth } from "../context/AuthContext";

export default function ViewSummary() {
  const { t, i18n } = useTranslation();
  const [docs, setDocs] = useState([]);
  const [openDoc, setOpenDoc] = useState(null);
  const [summaries, setSummaries] = useState({});
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  // Fetch document list on mount
  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const res = listDocuments(user.id);
        setDocs(res.data || []);
      } catch (err) {
        console.error("Error fetching docs:", err);
      }
    };
    fetchDocs();
  }, []);

  // Handle accordion toggle
  const handleToggle = async (docId) => {
    if (openDoc === docId) {
      setOpenDoc(null);
      return;
    }
    setOpenDoc(docId);

    // If summary not loaded yet, fetch it
    if (!summaries[docId]) {
      setLoading(true);
      try {
        const res = await api.get(`/documents/${docId}/summary`, {
          params: { lang: i18n.language },
        });
        setSummaries((prev) => ({ ...prev, [docId]: res.data.summary }));
      } catch (err) {
        console.error("Error fetching summary:", err);
      } finally {
        setLoading(false);
      }
    }
  };

  // Toggle language
  const toggleLang = () => {
    const newLang = i18n.language === "en" ? "ml" : "en";
    i18n.changeLanguage(newLang);

    // Re-fetch summary for open accordion in new language
    if (openDoc) {
      setSummaries((prev) => {
        const updated = { ...prev };
        delete updated[openDoc];
        return updated;
      });
      handleToggle(openDoc);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-heading text-primary">
          {t("documentSummaries")}
        </h1>
        <button
          onClick={toggleLang}
          className="px-4 py-2 bg-accent text-secondary rounded-md shadow hover:bg-primary transition"
        >
          {i18n.language === "en" ? "മലയാളം" : "English"}
        </button>
      </div>

      <div className="space-y-4">
        {docs.length === 0 ? (
          <p className="text-neutral-600">{t("noDocuments")}</p>
        ) : (
          docs.map((doc) => (
            <div
              key={doc.id}
              className="border border-neutral-300 rounded-lg overflow-hidden shadow-sm"
            >
              <button
                onClick={() => handleToggle(doc.id)}
                className="w-full flex justify-between items-center px-4 py-3 bg-neutral-100 hover:bg-neutral-200 transition"
              >
                <span className="font-medium text-primary">{doc.name}</span>
                {openDoc === doc.id ? (
                  <ChevronUp className="w-5 h-5 text-primary" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-primary" />
                )}
              </button>

              {openDoc === doc.id && (
                <div className="p-4 bg-secondary text-primary">
                  {loading && !summaries[doc.id] ? (
                    <p>{t("loading")}...</p>
                  ) : (
                    <p className="whitespace-pre-line">
                      {summaries[doc.id] || t("noSummary")}
                    </p>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
