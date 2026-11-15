import { ArrowUpRight, FolderSearch, ShieldCheck } from "lucide-react";
import { serviceCategories } from "@/content/landing";

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
          Examples will be shared only when evidence and permission to publish are confirmed.
        </p>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {publishable.length > 0
            ? publishable.map((item) => (
                <article
                  key={item.id}
                  className="flex flex-col rounded-3xl border border-evergreen/15 bg-paper p-6 shadow-soft"
                >
                  <ShieldCheck aria-hidden="true" className="size-6" />
                  <p className="mt-6 text-xs uppercase tracking-wider">{item.category}</p>
                  <h3 className="mt-2 text-2xl font-medium">{item.title}</h3>
                  <p className="mt-3 text-evergreen-soft">{item.summary}</p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold">
                    Approved project example
                    <ArrowUpRight aria-hidden="true" className="size-4" />
                  </span>
                </article>
              ))
            : serviceCategories.map((category) => (
                <article
                  key={category.title}
                  className="flex flex-col rounded-3xl border border-evergreen/15 bg-paper p-6 shadow-soft"
                >
                  <FolderSearch aria-hidden="true" className="size-6" />
                  <p className="mt-6 text-xs uppercase tracking-wider">Service area</p>
                  <h3 className="mt-2 text-2xl font-medium">{category.title}</h3>
                  <p className="mt-3 text-evergreen-soft">{category.summary}</p>
                  <p className="mt-auto pt-6 text-sm font-semibold text-evergreen-soft">
                    Project evidence pending publication approval
                  </p>
                </article>
              ))}
        </div>
        {publishable.length === 0 && (
          <p className="mt-6 text-sm text-evergreen-soft">
            These are service-area placeholders, not client projects or evidence of delivered\n            results.
          </p>
        )}
      </div>
    </section>
  );
}
