import { useLanguage } from "../context/LanguageContext";
import { FileText, Search, Clock, AlertTriangle } from "lucide-react";

function StatsShow() {
  const { t } = useLanguage();
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-xl border border-neutral-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">
                {t.totalDocuments}
              </p>
              <p className="text-2xl font-bold text-primary">1,247</p>
            </div>
            <FileText className="text-neutral-400" size={24} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-neutral-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">
                {t.pendingReview}
              </p>
              <p className="text-2xl font-bold text-warning">23</p>
            </div>
            <Clock className="text-neutral-400" size={24} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-neutral-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">
                {t.urgentDirectives}
              </p>
              <p className="text-2xl font-bold text-danger">8</p>
            </div>
            <AlertTriangle className="text-neutral-400" size={24} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-neutral-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">
                {t.thisWeek}
              </p>
              <p className="text-2xl font-bold text-success">156</p>
            </div>
            <FileText className="text-neutral-400" size={24} />
          </div>
        </div>
      </div>
    </>
  );
}

export default StatsShow;
