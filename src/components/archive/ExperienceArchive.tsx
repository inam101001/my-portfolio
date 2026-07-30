import { education, experiences } from "../../data/portfolio";

export function ExperienceArchive() {
  return (
    <section
      id="experience"
      className="experience-archive page-shell"
      aria-labelledby="experience-title"
    >
      <div className="experience-heading">
        <h2 id="experience-title">A field record built close to production.</h2>
        <p>
          Backend engineering, delivery automation, cloud deployment, product
          interfaces, and technical mentoring across four operating contexts.
        </p>
      </div>

      <div className="experience-table" role="list">
        {experiences.map((item) => (
          <article
            className="experience-row"
            key={`${item.company}-${item.period}`}
            role="listitem"
          >
            <time>{item.period}</time>
            <div>
              <h3>{item.role}</h3>
              <p>
                {item.company} <span>· {item.location}</span>
              </p>
            </div>
            <p>{item.detail}</p>
          </article>
        ))}
      </div>

      <div className="education-reel">
        <h3>Education</h3>
        <div>
          {education.map((item) => (
            <article key={`${item.degree}-${item.period}`}>
              <time>{item.period}</time>
              <strong>{item.degree}</strong>
              <p>
                {item.institution} · {item.location}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
