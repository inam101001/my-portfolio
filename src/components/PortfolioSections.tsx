import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Download, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { ProjectVisual } from "./ProjectVisual";

const projects = [
  {
    id: "01",
    kind: "banking" as const,
    title: "Microservices Banking Platform",
    summary:
      "An event-driven banking platform running four FastAPI services across Kubernetes, with GitOps delivery, security scanning, and full observability.",
    outcome: "Traceable, self-healing delivery",
    stack: ["Kubernetes", "ArgoCD", "RabbitMQ", "Prometheus", "Terraform"],
    href: "https://github.com/inam101001",
  },
  {
    id: "02",
    kind: "mistle" as const,
    title: "Mistle Diagram Platform",
    summary:
      "A containerized Next.js product deployed to AWS EC2 behind Nginx, Route 53, CloudFront, and ACM, provisioned with Terraform and shipped through GitHub Actions.",
    outcome: "Automated cloud delivery",
    stack: ["AWS", "Docker", "Terraform", "GitHub Actions", "Grafana"],
    href: "https://github.com/inam101001/Mistle",
    image: "/mistle.jpg",
  },
  {
    id: "03",
    kind: "portfolio" as const,
    title: "Portfolio Delivery System",
    summary:
      "A production pipeline for this portfolio using multi-stage Docker builds, Trivy auditing, Terraform-managed AWS infrastructure, and monitored Nginx delivery.",
    outcome: "Infrastructure and app released together",
    stack: ["React", "AWS", "Trivy", "Docker", "CloudFront"],
    href: "https://github.com/inam101001/my-portfolio",
  },
];

const experience = [
  {
    period: "07.2024 - 04.2025",
    role: "Software Engineer, Backend & DevOps",
    company: "Binomical LLC",
    detail:
      "Built Jenkins and GitHub webhook pipelines, deployed containerized applications to Google Cloud Run, and integrated LLM-powered automation.",
  },
  {
    period: "Summer 2023",
    role: "Web Developer Intern",
    company: "KaiRiz Cyber Technologies",
    detail:
      "Built responsive React interfaces and contributed to backend microservices in a cybersecurity product environment.",
  },
  {
    period: "2022 - 2023",
    role: "Freelance Web Developer",
    company: "E-commerce startup",
    detail:
      "Delivered full-stack commerce systems with performance optimization and Stripe payment integrations.",
  },
  {
    period: "2022 - 2023",
    role: "Teaching Assistant",
    company: "University of Gujrat",
    detail:
      "Mentored data structures and algorithms labs and reviewed more than 60 student projects.",
  },
];

const reveal = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0 },
};

function useSectionMotion() {
  const reducedMotion = useReducedMotion();
  const transition = reducedMotion
    ? { duration: 0 }
    : { duration: 0.72, ease: [0.22, 1, 0.36, 1] as const };

  return { reducedMotion, transition };
}

export function WorkSection() {
  const { reducedMotion, transition } = useSectionMotion();

  return (
    <section id="work" className="work-section page-band" aria-labelledby="work-title">
      <div className="section-intro">
        <span className="section-index">01 / Selected systems</span>
        <h2 id="work-title">Infrastructure you can inspect.</h2>
        <p>
          Each project is presented as an operating system: what moves through it,
          what keeps it healthy, and how it reaches production.
        </p>
      </div>

      <div className="project-list">
        {projects.map((project) => (
          <motion.article
            className="project-row"
            key={project.id}
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ ...transition, delay: reducedMotion ? 0 : 0.06 }}
          >
            <div className="project-copy">
              <div className="project-meta">
                <span>{project.id}</span>
                <span>{project.outcome}</span>
              </div>
              <h3>{project.title}</h3>
              <p>{project.summary}</p>
              <ul className="stack-list" aria-label={`${project.title} technologies`}>
                {project.stack.map((tool) => <li key={tool}>{tool}</li>)}
              </ul>
              <a href={project.href} target="_blank" rel="noreferrer">
                Inspect repository <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            </div>
            <ProjectVisual
              kind={project.kind}
              image={project.image}
              alt={project.image ? "Mistle diagram platform shown on a laptop" : undefined}
            />
            <span className="project-ordinal" aria-hidden="true">{project.id}</span>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

export function ExperienceSection() {
  const { reducedMotion, transition } = useSectionMotion();

  return (
    <section id="experience" className="experience-section page-band" aria-labelledby="experience-title">
      <div className="section-intro compact">
        <span className="section-index">03 / Field record</span>
        <h2 id="experience-title">Built close to production.</h2>
      </div>

      <div className="experience-ledger">
        {experience.map((item, index) => (
          <motion.article
            key={`${item.company}-${item.period}`}
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.55 }}
            transition={{ ...transition, delay: reducedMotion ? 0 : index * 0.04 }}
          >
            <time>{item.period}</time>
            <div>
              <h3>{item.role}</h3>
              <p className="experience-company">{item.company}</p>
            </div>
            <p>{item.detail}</p>
          </motion.article>
        ))}
      </div>

      <div className="education-line">
        <span>Current study</span>
        <strong>MSc Web & Data Science</strong>
        <p>Universität Koblenz · April 2025 - ongoing</p>
      </div>
    </section>
  );
}

export function ContactSection() {
  return (
    <section id="contact" className="contact-section page-band" aria-labelledby="contact-title">
      <div className="contact-signal" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="contact-copy">
        <span className="section-index">04 / Open channel</span>
        <h2 id="contact-title">Let's keep the system alive.</h2>
        <p>
          Based in Rhineland-Palatinate, Germany. Available for DevOps,
          platform engineering, cloud infrastructure, and automation work.
        </p>
      </div>
      <div className="contact-actions">
        <a className="primary-action" href="mailto:inam101001@gmail.com">
          <Mail size={18} aria-hidden="true" /> Start a conversation
        </a>
        <a href="/InamUlHaq_CV.pdf" download>
          <Download size={18} aria-hidden="true" /> Download CV
        </a>
      </div>
      <footer className="site-footer">
        <span><MapPin size={15} aria-hidden="true" /> Germany</span>
        <div>
          <a href="https://github.com/inam101001" target="_blank" rel="noreferrer" aria-label="GitHub">
            <Github size={19} />
          </a>
          <a href="https://www.linkedin.com/in/iaminam/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <Linkedin size={19} />
          </a>
        </div>
        <span>Inam Ul Haq · 2026</span>
      </footer>
    </section>
  );
}
