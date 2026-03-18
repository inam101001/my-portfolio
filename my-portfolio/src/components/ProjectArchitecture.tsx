import React from "react";
import * as Banking from "./diagrams/BankingDiagrams";
import * as Mistle from "./diagrams/MistleDiagrams";

interface DiagramProps {
  type: string;
}

const ProjectArchitecture: React.FC<DiagramProps> = ({ type }) => {
  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      {/* ───── BANKING APP DIAGRAMS ───── */}
      {type === 'banking_architecture' && <Banking.BankingSystem />}
      {type === 'banking_pipeline' && <Banking.BankingPipeline />}
      {type === 'banking_gitops' && <Banking.BankingGitOps />}
      {type === 'banking_monitoring' && <Banking.BankingObservability />}

      {/* ───── MISTLE APP DIAGRAMS ───── */}
      {type === 'mistle_lifecycle' && <Mistle.MistleLifecycle />}
      {type === 'mistle_aws' && <Mistle.MistleAWS />}
      {type === 'mistle_pipeline' && <Mistle.MistlePipeline />}
      {type === 'mistle_monitoring' && <Mistle.MistleMonitoring />}

      {/* ───── GENERAL ARCHITECTURE (FALLBACK) ───── */}
      {type === 'aws_infra' && <Mistle.MistleAWS />}

      {/* ───── LOADING / FALLBACK ───── */}
      {!['banking_architecture', 'banking_pipeline', 'banking_gitops', 'banking_monitoring', 
         'mistle_lifecycle', 'mistle_aws', 'mistle_pipeline', 'mistle_monitoring', 
         'aws_infra'].includes(type) && (
        <div className="text-gray-700 font-mono italic text-sm">Diagram in high-res preparation...</div>
      )}
    </div>
  );
};

export default ProjectArchitecture;
