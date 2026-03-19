export interface ProjectData {
    id: string;
    title: string;
    description: string;
    technologies: string[];
    diagrams: {
        id: string;
        title: string;
        type: 'banking_architecture' | 'banking_pipeline' | 'banking_gitops' | 'banking_monitoring' | 'mistle_lifecycle' | 'mistle_aws' | 'mistle_pipeline' | 'mistle_monitoring' | 'aws_infra' | 'portfolio_aws' | 'portfolio_cicd' | 'general';
        description?: string;
    }[];
    liveUrl: string;
    githubUrl: string;
}