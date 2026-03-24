import { notFound } from "next/navigation";
import { portfolioItems, getItemById } from "../../../data/portfolio";

const projectOrder = portfolioItems.map((item) => item.id);
import { ProjectNav } from "../../../components/ProjectNav";
import SeismicDetail from "../../../components/custom-detail-views/seismic";
import TheCarribooJackDetail from "../../../components/custom-detail-views/the-carriboo-jack";
import ExposedDetail from "../../../components/custom-detail-views/exposed";
import StormDayzDetail from "../../../components/custom-detail-views/storm-dayz";
import BeersOnTrailsDetail from "../../../components/custom-detail-views/beers-on-trails";
import ViagenDetail from "../../../components/custom-detail-views/viagen";
import PeruvianMountainRidesDetail from "../../../components/custom-detail-views/peruvian-mountain-rides";
import AvaraDetail from "../../../components/custom-detail-views/avara";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projectOrder.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const item = getItemById(slug);
  if (!item) return {};
  return {
    title: `${item.title} — Nathan Kirschner`,
    description: item.shortDescription ?? item.description,
  };
}

export default async function WorkPage({ params }: PageProps) {
  const { slug } = await params;
  const item = getItemById(slug);

  if (!item || !projectOrder.includes(slug)) {
    notFound();
  }

  const renderDetail = () => {
    switch (slug) {
      case "seismic":
        return <SeismicDetail item={item} />;
      case "the-carriboo-jack":
        return <TheCarribooJackDetail item={item} />;
      case "exposed":
        return <ExposedDetail item={item} />;
      case "storm-dayz":
        return <StormDayzDetail item={item} />;
      case "beers-on-trails":
        return <BeersOnTrailsDetail item={item} />;
      case "viagen":
        return <ViagenDetail item={item} />;
      case "peruvian-mountain-rides":
        return <PeruvianMountainRidesDetail item={item} />;
      case "avara":
        return <AvaraDetail item={item} />;
      default:
        return notFound();
    }
  };

  return (
    <main className="min-h-screen bg-black">
      <ProjectNav />

      {/* Title */}
      <div className="w-full flex flex-col items-center justify-center pt-24 pb-0 px-4">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold uppercase text-white leading-none text-center">
          {item.title}
        </h1>
        {item.metadata?.client && (
          <p className="text-white/50 text-lg font-semibold tracking-wide">
            {item.metadata.client}
          </p>
        )}
      </div>

      {/* Detail content */}
      {renderDetail()}
    </main>
  );
}
