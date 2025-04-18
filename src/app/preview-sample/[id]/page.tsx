import { mockVideos } from "@app/src/data/mockData";
import { Metadata } from "next";
import PageComponent from "./components/PageComponent";
import { notFound } from 'next/navigation';

type PageProps = {
  params: {
    id: string;
  };
};

// You can also fetch data here if needed
export async function generateMetadata(_props: Promise<PageProps>): Promise<Metadata> {
  const { params } = await _props; // 👈 await the promise to extract params
  const { id } = await params;

  const formattedTitle = id.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return {
    title: `${formattedTitle} | Bravanna`,
    description: `Video Template preview for '${formattedTitle}' on Bravanna.`,
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const videoData = mockVideos.find((v) => v.id === id);
  if (!videoData) notFound();

  return (
    <>
      <PageComponent
        id={id}
        videoData={videoData}
      />
    </>
  );
}
