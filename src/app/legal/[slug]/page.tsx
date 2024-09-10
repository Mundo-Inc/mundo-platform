import { notFound } from "next/navigation";

import MainContent from "@/components/mainContent";
import { Mdx } from "@/components/mdx";
import { allDocuments } from "contentlayer/generated";
import Header from "@/app/(header-menu)/_components/Header";
import Bg from "@/components/bg";

interface PageProps {
  params: {
    slug: string;
  };
}

async function getDocFromParams(slug: string) {
  const doc = allDocuments.find((doc) => doc._raw.flattenedPath === slug);

  if (!doc) {
    notFound();
  }

  return doc;
}

export default async function Page({ params }: PageProps) {
  const doc = await getDocFromParams(params.slug);

  return (
    <div className="flex flex-col">
      <Header />
      <MainContent
        withHeader
        className="flex min-h-svh items-center justify-center"
      >
        <section className="container max-w-6xl pb-20">
          <Mdx code={doc.body.code} />
        </section>

        <Bg className="opacity-20" />
      </MainContent>
    </div>
  );
}
