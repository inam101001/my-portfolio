export interface ProjectData {
    id: string;
    title: string;
    description: string;
    technologies: string[];
    diagrams: {
        id: string;
        title: string;
        type: 'banking_architecture' | 'banking_pipeline' | 'banking_gitops' | 'banking_monitoring' | 'aws_infra' | 'general';
        description?: string;
    }[];
    liveUrl: string;
    githubUrl: string;
}