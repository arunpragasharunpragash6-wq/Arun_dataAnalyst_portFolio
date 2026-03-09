const grid = document.getElementById("project-grid");
const yearEl = document.getElementById("year");

yearEl.textContent = new Date().getFullYear();

const placeholderMarkup = `
  <article class="placeholder-card">
    <h3>First Case Study Coming Soon</h3>
    <p>
      This section is ready for your upcoming data analyst projects. Add your first dashboard, SQL analysis, or Excel case study in <code>projects.json</code>.
    </p>
    <span class="placeholder-note">Live portfolio now. Analytics projects next.</span>
  </article>
  <article class="placeholder-card">
    <h3>Project Cards Will Show</h3>
    <p>
      Each card can include the project title, short summary, tool stack, and a live report or repository link.
    </p>
    <span class="placeholder-note">Built for future uploads.</span>
  </article>
`;

function renderProjects(projects) {
  if (!Array.isArray(projects) || projects.length === 0) {
    grid.innerHTML = placeholderMarkup;
    return;
  }

  grid.innerHTML = projects
    .map((project) => {
      const tags = Array.isArray(project.tags)
        ? project.tags.map((tag) => `<span>${tag}</span>`).join("")
        : "";

      const safeTitle = project.title || "Untitled Project";
      const safeDescription = project.description || "Description coming soon.";
      const safeLink = project.link || "#";
      const linkLabel = safeLink === "#" ? "Link Coming Soon" : "View Project";

      return `
        <article class="project-card">
          <h3>${safeTitle}</h3>
          <p>${safeDescription}</p>
          <div class="project-tags">${tags}</div>
          <a class="project-link" href="${safeLink}" target="_blank" rel="noreferrer">${linkLabel}</a>
        </article>
      `;
    })
    .join("");
}

fetch("./projects.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Unable to load projects.json");
    }
    return response.json();
  })
  .then((data) => renderProjects(data.projects))
  .catch(() => {
    renderProjects([]);
  });
