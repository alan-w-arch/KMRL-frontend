import { useState, useEffect } from 'react';
import { getUserHistory } from '../api/services';
import { useAuth } from "../context/AuthContext";
import { Link } from 'react-router-dom';

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      setLoading(true);
      const historyData = await getUserHistory(user.id);
      console.log('Fetched history data:', historyData);
      setHistory(historyData);
    } catch (error) {
      console.error('Failed to load history:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-heading font-bold text-primary mb-2">
                Activity History
              </h1>
              <p className="text-neutral-600">Track your document views and interactions</p>
            </div>
            <Link 
              to="/dashboard" 
              className="px-4 py-2 bg-accent text-white rounded-md hover:bg-accent/90 transition-colors"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>

        {/* History Content */}
        <div className="bg-white rounded-xl shadow-md p-6">
          {history.length > 0 ? (
            <div className="space-y-4">
              {history.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-neutral-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-lg ${
                      item.type === 'view' ? 'bg-info/10 text-info' : 
                      item.type === 'download' ? 'bg-success/10 text-success' : 
                      'bg-warning/10 text-warning'
                    }`}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {item.type === 'view' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />}
                        {item.type === 'download' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />}
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-primary">{item.documentName}</h3>
                      <p className="text-sm text-neutral-500">{item.action} • {new Date(item.timestamp).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    item.status === 'completed' ? 'bg-success/10 text-success' :
                    item.status === 'pending' ? 'bg-warning/10 text-warning' :
                    'bg-neutral-100 text-neutral-600'
                  }`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <svg className="w-16 h-16 mx-auto text-neutral-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-lg font-medium text-neutral-900 mb-2">No activity history yet</h3>
              <p className="text-neutral-500 mb-6">Your document views and interactions will appear here</p>
              <Link 
                to="/dashboard" 
                className="inline-flex items-center px-4 py-2 bg-accent text-white rounded-md hover:bg-accent/90 transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Browse Documents
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default History;