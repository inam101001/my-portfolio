import { education, primaryTools, workHistory } from "../data/portfolio";

export function ExperienceSection() {
  return (
    <section id="experience" className="experience-section chapter-shell">
      <div className="experience-heading">
        <h2>Foundations, laid.</h2>
        <p>
          Two roles across two years — full-stack delivery, backend systems,
          and the DevOps pipelines that ship them.
        </p>
      </div>
      <div className="experience-split">
        <div className="experience-work">
          <span className="experience-subhead">Work</span>
          <div className="experience-record-list">
            {workHistory.map((job, index) => (
              <article key={job.role}>
                <span className="experience-record-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3>{job.role}</h3>
                  <p className="experience-record-meta">
                    {job.company}
                    {job.location ? `, ${job.location}` : ""} · {job.period}
                  </p>
                  <ul className="experience-record-areas">
                    {job.areas?.map((area) => (
                      <li key={area.title}>
                        <b>{area.title}</b>
                        {area.body}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="education-block">
          <span className="experience-subhead">Education</span>
          <div className="education-grid">
            {education.map((entry, index) => (
              <article key={entry.degree}>
                <span className="education-index">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{entry.degree}</h3>
                  <p>{entry.institution}</p>
                  <p>
                    {entry.period} · {entry.location}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
      <div className="experience-tools" aria-label="Experience tools">
        {primaryTools.map((tool) => (
          <span key={tool}>{tool}</span>
        ))}
      </div>
    </section>
  );
}
