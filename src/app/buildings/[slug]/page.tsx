import PropertyDetailClient from '../../../components/PropertyDetailClient';
import { defaultBuildings, getBuildingBySlug } from '../../../utils/contentData';

type BuildingDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return defaultBuildings.map((building) => ({ slug: building.slug }));
}

export default async function BuildingDetailPage({ params }: BuildingDetailPageProps) {
  const { slug } = await params;
  const building = getBuildingBySlug(slug) ?? null;

  return (
    <div className="app-shell section-spacing">
      <PropertyDetailClient slug={slug} initialBuilding={building} />
    </div>
  );
}