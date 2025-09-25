import React from 'react';
import { motion } from 'framer-motion';

const VerticalCard = ({ 
  document, 
  isTopCard = false, 
  onOpenDocument, 
  onMarkAsRead, 
  isProcessing = false,
  style = {},
  className = "",
  ...motionProps 
}) => {
  const getFileIcon = (type) => {
    const icons = {
      PDF: '📄',
      DOC: '📝',
      XLS: '📊',
      IMG: '🖼️',
      PPT: '📊',
      TXT: '📃'
    };
    return icons[type] || '📁';
  };

  const handleCardClick = () => {
    if (isTopCard && onOpenDocument) {
      onOpenDocument(document);
    }
  };

  const handleMarkAsRead = (e) => {
    e.stopPropagation();
    if (onMarkAsRead && !isProcessing) {
      onMarkAsRead(document);
    }
  };

  const handleOpenDocument = (e) => {
    e.stopPropagation();
    if (onOpenDocument && !isProcessing) {
      onOpenDocument(document);
    }
  };

  return (
    <motion.div
      className={`bg-white border border-gray-200 shadow-lg rounded-2xl p-6 w-96 ${
        isTopCard ? 'cursor-pointer' : 'cursor-not-allowed'
      } ${className}`}
      style={style}
      onClick={handleCardClick}
      whileHover={isTopCard ? { scale: 1.02 } : {}}
      whileTap={isTopCard ? { scale: 0.98 } : {}}
      {...motionProps}
    >
      {/* Interaction overlay for top card */}
      {isTopCard && (
        <motion.div
          className="absolute inset-0 bg-blue-50 rounded-2xl opacity-0"
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}
      
      {/* Disabled overlay for non-top cards */}
      {!isTopCard && (
        <div className="absolute inset-0 bg-gray-100/80 rounded-2xl pointer-events-none" />
      )}

      <div className="relative z-10">
        {/* Document Header */}
        <div className="flex items-start space-x-4 mb-4">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
            {getFileIcon(document.type)}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-gray-900 font-semibold text-lg mb-1 truncate">
              {document.title}
            </h3>
            <p className="text-gray-600 text-sm mb-2">
              {document.type} • {document.uploadDate}
            </p>
            <div className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
              document.status === 'read' 
                ? 'bg-green-100 text-green-700 border border-green-200'
                : 'bg-yellow-100 text-yellow-700 border border-yellow-200'
            }`}>
              {document.status === 'read' ? '✓ Read' : '• Unread'}
            </div>
          </div>
        </div>

        {/* Document Preview/Thumbnail */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg h-32 mb-4 flex items-center justify-center overflow-hidden">
          {document.thumbnailUrl ? (
            <img 
              src={document.thumbnailUrl} 
              alt={`${document.title} preview`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-gray-500 text-sm text-center">
              <div className="text-2xl mb-1">{getFileIcon(document.type)}</div>
              <span>Document Preview</span>
            </div>
          )}
        </div>

        {/* Document Details */}
        {document.size && (
          <div className="text-gray-500 text-xs mb-4">
            Size: {document.size}
          </div>
        )}

        {/* Action Buttons - Only visible and functional on top card */}
        {isTopCard && (
          <div className="flex space-x-3">
            <motion.button
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              onClick={handleOpenDocument}
              disabled={isProcessing}
              whileTap={{ scale: 0.95 }}
            >
              📖 Open Document
            </motion.button>
            
            <motion.button
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm whitespace-nowrap"
              onClick={handleMarkAsRead}
              disabled={isProcessing}
              whileTap={{ scale: 0.95 }}
            >
              {isProcessing ? '⏳' : '✓'} 
              {isProcessing ? ' Processing...' : ' Mark as Read'}
            </motion.button>
          </div>
        )}

        {/* Gradient overlay for visual depth */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-50/20 via-transparent to-gray-50/20 pointer-events-none" />
      </div>
    </motion.div>
  );
};

export default VerticalCard;