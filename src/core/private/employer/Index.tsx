import React, { useState } from "react";
import JobForm from "./JobForms";

const Index: React.FC = () => {
  const [jobId, setJobId] = useState<string | null>(null);

  const handleSuccess = () => {
    console.log("Job successfully added or updated");
    setJobId(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        {jobId ? "Edit Job" : "Add Job"}
      </h1>
      <JobForm jobId={jobId ?? undefined} onSuccess={handleSuccess} />
    </div>
  );
};

export default Index;
