import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { listDocuments, markViewed } from "../api/services";
import VerticalCard from "./VerticalCard";
import { useAuth } from "../context/AuthContext";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  FileText,
  Layers,
} from "lucide-react";

const DocumentStacksSection = ({ userId }) => {
  const { user } = useAuth();
  const [documentStacks, setDocumentStacks] = useState({
    stack1: [],
    stack2: [],
    stack3: [],
    stack4: [],
    stack5: [],
    stack6: [],
  });

  const [currentTopIndices, setCurrentTopIndices] = useState({
    stack1: 0,
    stack2: 0,
    stack3: 0,
    stack4: 0,
    stack5: 0,
    stack6: 0,
  });

  const [processingStates, setProcessingStates] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch documents
  useEffect(() => {
    const fetchDocuments = async () => {
      if (!userId) return;
      try {
        setLoading(true);
        const response = await listDocuments(userId);
        console.log("Fetched documents:", response);
        const documents = response.documents || response.data || response;
        console.log("Normalized documents:", documents);
        if (Array.isArray(documents)) categorizeDocuments(documents);
      } catch (err) {
        console.error("Error fetching documents:", err);
        setError("Failed to fetch documents");
      } finally {
        setLoading(false);
      }
    };
    fetchDocuments();
  }, [userId]);

  const categorizeDocuments = (documents) => {
    const stacks = {
      stack1: [],
      stack2: [],
      stack3: [],
      stack4: [],
      stack5: [],
      stack6: [],
    };

    documents.forEach((doc) => {
      const normalizedDoc = {
        id: doc.id || doc.doc_id,
        title: doc.title || "Untitled Document",
        cloudinaryUrl: doc.cloudinary_url || "#",
        priority: doc.priority || "normal",
        viewed: doc.viewed || false,
        marked_as_read: doc.marked_as_read || false,
      };

      stacks.stack1.push(normalizedDoc); // all
      if (normalizedDoc.viewed && !normalizedDoc.marked_as_read)
        stacks.stack2.push(normalizedDoc);
      else if (normalizedDoc.priority === "high")
        stacks.stack3.push(normalizedDoc);
      else if (normalizedDoc.priority === "normal")
        stacks.stack4.push(normalizedDoc);
      else if (normalizedDoc.priority === "medium")
        stacks.stack5.push(normalizedDoc);
      else if (["urgent", "critical"].includes(normalizedDoc.priority))
        stacks.stack6.push(normalizedDoc);
    });

    setDocumentStacks(stacks);
  };

  const handleMarkAsRead = async (stackKey, document) => {
    setProcessingStates((p) => ({ ...p, [stackKey]: true }));
    try {
      if (userId && document.id) await markViewed(userId, document.id);

      setDocumentStacks((prev) => {
        const newStacks = { ...prev };
        const idx = currentTopIndices[stackKey];
        if (newStacks[stackKey][idx]) {
          newStacks[stackKey][idx] = {
            ...newStacks[stackKey][idx],
            marked_as_read: true,
          };
        }
        return newStacks;
      });

      setCurrentTopIndices((prev) => ({
        ...prev,
        [stackKey]: prev[stackKey] + 1,
      }));
    } catch (err) {
      console.error(err);
    } finally {
      setProcessingStates((p) => ({ ...p, [stackKey]: false }));
    }
  };

  const handleOpenDocument = (document) => {
    if (document.cloudinaryUrl && document.cloudinaryUrl !== "#") {
      window.open(document.cloudinaryUrl, "_blank");
    }
  };

  // Stack Configs
  const stackConfigs = [
    {
      key: "stack6",
      title: "High Priority",
      description: "Critical docs needing action",
      icon: AlertCircle,
      gradient: "from-red-500 to-red-700",
    },
    {
      key: "stack5",
      title: "Normal Priority",
      description: "Moderate importance",
      icon: Clock,
      gradient: "from-yellow-400 to-yellow-600",
    },
    {
      key: "stack2",
      title: "Viewed - Unread",
      description: "Opened but not marked",
      icon: Layers,
      gradient: "from-blue-400 to-blue-600",
    },
    {
      key: "stack4",
      title: "Low Priority",
      description: "Regular review",
      icon: FileText,
      gradient: "from-green-400 to-green-600",
    },
    {
      key: "stack1",
      title: "All Documents",
      description: "Complete collection",
      icon: CheckCircle,
      gradient: "from-neutral-400 to-neutral-600",
    },
  ];

  // Layout: first 3 + next 2
  const firstRow = stackConfigs.slice(0, 3);
  const secondRow = stackConfigs.slice(3);

  if (loading) {
    return (
      <div className="grid grid-cols-3 gap-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="h-full rounded-2xl bg-neutral-200 animate-pulse "
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-xl">
        <p className="text-red-600">⚠️ {error}</p>
      </div>
    );
  }

  return (
    <section className="mb-10">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-primary">Document Dashboard</h2>
        <p className="text-neutral-600 mt-5">
          Organized stacks for streamlined review
        </p>
      </div>

      {/* First Row (3 stacks) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {firstRow.map((config) => (
          <StackCard
            key={config.key}
            config={config}
            documentStacks={documentStacks}
            currentTopIndices={currentTopIndices}
            handleMarkAsRead={handleMarkAsRead}
            handleOpenDocument={handleOpenDocument}
          />
        ))}
      </div>

      {/* Second Row (2 large stacks) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {secondRow.map((config) => (
          <StackCard
            key={config.key}
            config={config}
            documentStacks={documentStacks}
            currentTopIndices={currentTopIndices}
            handleMarkAsRead={handleMarkAsRead}
            handleOpenDocument={handleOpenDocument}
          />
        ))}
      </div>
    </section>
  );
};

// Extracted StackCard for reusability
const StackCard = ({
  config,
  documentStacks,
  currentTopIndices,
  handleMarkAsRead,
  handleOpenDocument,
}) => {
  const currentStack = documentStacks[config.key] || [];
  const currentTopIndex = currentTopIndices[config.key];
  const Icon = config.icon;

  return (
    <div className="rounded-2xl shadow-lg border border-neutral-200  bg-white overflow-hidden flex flex-col">
      {/* Header */}
      <div
        className={`px-4 py-3 bg-gradient-to-r ${config.gradient} text-white`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon className="w-5 h-5" />
            <h3 className="font-semibold text-sm">{config.title}</h3>
          </div>
          <span className="bg-white/20 rounded-full px-2 py-0.5 text-xs">
            {Math.max(0, currentStack.length - currentTopIndex)}
          </span>
        </div>
        <p className="text-xs opacity-90 mt-1">{config.description}</p>
      </div>

      {/* Body */}
      <div className="relative flex-1 p-3 mb-15">
        {currentStack.length === 0 ? (
          <div className="h-full flex items-center justify-center mb-10 text-neutral-500 text-sm">
            No Docs
          </div>
        ) : (
          <AnimatePresence>
            {currentStack
              .slice(currentTopIndex, currentTopIndex + 3)
              .map((document, i) => {
                const isTopCard = i === 0;
                return (
                  <motion.div
                    key={document.id}
                    className="absolute inset-0"
                    initial={{ y: i * 8, scale: 1 - i * 0.02 }}
                    animate={{ y: i * 8, scale: 1 - i * 0.02 }}
                    exit={{ opacity: 0 }}
                    drag={isTopCard ? "x" : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={(e, info) => {
                      if (info.offset.x > 120) {
                        handleMarkAsRead(config.key, document);
                      } else if (info.offset.x < -120) {
                        handleOpenDocument(document);
                      }
                    }}
                    whileDrag={{ rotate: 5 }}
                  >
                    <VerticalCard
                      document={document}
                      isTopCard={isTopCard}
                      onOpenDocument={handleOpenDocument}
                      onMarkAsRead={() =>
                        handleMarkAsRead(config.key, document)
                      }
                      className="h-full w-full"
                    />
                  </motion.div>
                );
              })}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default DocumentStacksSection;
