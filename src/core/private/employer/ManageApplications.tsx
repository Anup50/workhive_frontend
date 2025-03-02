import { Briefcase } from "lucide-react";
import { useState } from "react";
import JobSelectionDropdown from "../../../components/JobDropdown";
import ManageApplicants from "../../../components/ManageApplicants"; // Import the component

const ManageApplications = () => {
  const [selectedJobId, setSelectedJobId] = useState("");

  return (
    <div className="p-6 min-h-screen bg-base-100 text-base-content">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-2 mb-8">
          <Briefcase className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold">Manage Applications</h1>
        </div>

        {/* Job Selection */}
        <div className="mb-8 bg-base-200 p-4 rounded-lg">
          <div className="max-w-4xl mx-auto">
            <JobSelectionDropdown onSelectJob={setSelectedJobId} />

            {/* Render ManageApplicants when job is selected */}
            {selectedJobId && <ManageApplicants jobId={selectedJobId} />}
          </div>
        </div>

        {/* Empty state when no job selected */}
        {!selectedJobId && (
          <div className="text-center p-8 bg-base-200 rounded-lg">
            <Briefcase className="w-16 h-16 mx-auto text-base-content/50 mb-4" />
            <p className="text-xl">Select a job position to view candidates</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageApplications;
