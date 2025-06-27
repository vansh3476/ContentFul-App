import { notFound } from "next/navigation";
import type { Metadata } from "next";
import HeroBlock from "@/components/blocks/HeroBlock";
import TwoColumnRow from "@/components/blocks/TwoColumnRow";
import ImageGrid from "@/components/blocks/ImageGrid";
import {
  safeGraphQLRequest,
  GET_PAGE_QUERY,
  GET_ALL_PAGES_QUERY,
} from "@/lib/contentful";
import type { PageContent } from "@/types/contentful";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const data:any = await safeGraphQLRequest(GET_ALL_PAGES_QUERY);
    const pages = data?.pageCollection?.items || [];

    return pages
      .filter((page: any) => page?.slug)
      .map((page: any) => ({
        slug: page.slug,
      }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [{ slug: "page-1" }]; // Fallback
  }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const data:any= await safeGraphQLRequest(GET_PAGE_QUERY, { slug });
    console.log(
      JSON.stringify(data?.pageCollection?.items?.[0]),
      "data11313111"
    );
    const page = data?.pageCollection?.items?.[0];

    if (!page) {
      return {
        title: "Page Not Found",
        description: "The requested page could not be found.",
      };
    }

    return page;
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: `Landing Page - ${slug}`,
      description: "Dynamic landing page built with Contentful",
    };
  }
}

export default async function LandingPage({ params }: PageProps) {
  const { slug } = await params;

  try {
    const data:any = await safeGraphQLRequest(GET_PAGE_QUERY, { slug });
    const page:any = data?.pageCollection?.items?.[0];

    if (!page) {
      notFound();
    }

    const layoutConfig = page.layoutConfig || { components: [] };
    const sortedComponents =
      layoutConfig.components?.sort((a: any, b: any) => a.order - b.order) ||
      [];

    const renderComponent = (component: any, index: number) => {
      switch (component.type) {
        case "hero":
          const heroContent = page.heroBlocksCollection?.items?.[0];
          console.log(heroContent, "heroContent");
          if (!heroContent) return null;
          return <HeroBlock key={`hero-${index}`} content={heroContent} />;

        case "twoColumn":
          const twoColumnContent = page.twoColumnRowsCollection?.items?.[0];
          console.log(twoColumnContent, "twoColumnContent");

          if (!twoColumnContent) return null;
          return (
            <TwoColumnRow
              key={`twoColumn-${index}`}
              content={twoColumnContent}
            />
          );

        case "imageGrid":
          const imageGridContent = page.imageGridsCollection?.items?.[0]?.imagesCollection?.items;
          console.log(imageGridContent, "imageGridContent");

          if (!imageGridContent) return null;
          return (
            <ImageGrid key={`imageGrid-${index}`} content={imageGridContent} />
          );

        default:
          return null;
      }
    };

    // JSON-LD structured data
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: page.title,
      description: `Dynamic landing page: ${page.title}`,
      url: `${process.env.NEXT_PUBLIC_APP_URL}/landing/${slug}`,
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: process.env.NEXT_PUBLIC_APP_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: page.title,
            item: `${process.env.NEXT_PUBLIC_APP_URL}/landing/${slug}`,
          },
        ],
      },
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <main>
          {sortedComponents.map((component:any, index:number) =>
            renderComponent(component, index)
          )}
        </main>
      </>
    );
  } catch (error) {
    console.error("Error rendering landing page:", error);
    notFound();
  }
}
