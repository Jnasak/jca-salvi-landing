import { ArrowUpRight, FolderSearch, ShieldCheck } from "lucide-react";

export interface ProjectCaseStudy {
  id: string;
  category: string;
  title: string;
  summary: string;
  evidenceReference?: string;
  publicationApprovalReference?: string;
  publicationApproved: boolean;
}

/** UI gate only; references require independent evidence/permission validation. */
export function canPublishProject(project: ProjectCaseStudy): boolean {
  return (
    project.publicationApproved === true &&
    Boolean(project.title.trim()) &&
    Boolean(project.summary.trim()) &&
    Boolean(project.evidenceReference?.trim()) &&
    Boolean(project.publicationApprovalReference?.trim())
  );
}

export function Projects({ projects = [] }: { projects?: readonly ProjectCaseStudy[] }) {
  const publishable = projects.filter(canPublishProject);
  return (
    <section id="projects" aria-labelledby="projects-title" className="py-20 sm:py-28">
      <div className="container-page">
        <p className="eyebrow text-evergreen-soft">Projects</p>
        <h2 id="projects-title" className="mt-4 text-4xl font-medium sm:text-5xl">
          What meaningful delivery looks like.
        </h2>
        <p className="mt-5 max-w-3xl text-evergreen-soft">
          Explore our approach to practical delivery.
        </p>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {publishable.length > 0 ? (
            publishable.map((item) => (
              <article
                key={item.id}
                className="flex flex-col rounded-3xl border border-evergreen/15 bg-paper p-6 shadow-soft"
              >
                <ShieldCheck aria-hidden="true" className="size-6" />
                <p className="mt-6 text-xs uppercase tracking-wider">{item.category}</p>
                <h3 className="mt-2 text-2xl font-medium">{item.title}</h3>
                <p className="mt-3 text-evergreen-soft">{item.summary}</p>
                <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold">
                  Project example
                  <ArrowUpRight aria-hidden="true" className="size-4" />
                </span>
              </article>
            ))
          ) : (
            <article className="evidence-empty md:col-span-2 lg:col-span-3">
              <FolderSearch aria-hidden="true" className="size-7" />
              <div>
                <h3 className="text-2xl font-medium">Project stories coming soon.</h3>
                <p className="mt-3 text-evergreen-soft">
                  No client projects or results are presented in this design preview.
                </p>
              </div>
            </article>
          )}
        </div>
      </div>
    </section>
  );
}
