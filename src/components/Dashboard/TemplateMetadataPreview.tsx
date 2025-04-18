import { VideoData } from "@app/src/lib/types";
import { DateTime } from "luxon";
import { Timestamp } from "firebase/firestore";
import { READABLE_DATE_FORMAT } from "@app/src/lib/utils";

interface Props {
  data: VideoData;
}

export default function TemplateMetadataPreview({ data }: Props) {
  const headers = ["Title", "ID", "Composition ID", "Created At", "Duration in Seconds", "Frames per Second", "Background Video", "Background"];

  let readableDate = "";

  if (typeof data.createdAt === "object" && "seconds" in data.createdAt) {
    readableDate = DateTime.fromSeconds(data.createdAt.seconds).toFormat(READABLE_DATE_FORMAT);
  } else if (data.createdAt instanceof Timestamp) {
    readableDate = DateTime.fromSeconds(data.createdAt.seconds).toFormat(READABLE_DATE_FORMAT);
  } else if (typeof data.createdAt === "string") {
    // Optional: handle string format if needed
    readableDate = DateTime.fromISO(data.createdAt).toFormat(READABLE_DATE_FORMAT);
  }

  return (
    <section className="bg-white shadow-sm">
      <div className="px-3 py-3">
        <div className="d-flex gap-4">
          <div className="fw-bold">
            {headers.map((item, index) => (
              <p
                key={`metadata-header-${index.toString()}`}
                className="py-1 px-2">
                {item}:{" "}
              </p>
            ))}
          </div>
          <div>
            <p className="py-1 px-2">{data.title}</p>
            <p className="py-1 px-2">{data.id}</p>
            <p className="py-1 px-2">{data.compositionId}</p>
            <p className="py-1 px-2">{readableDate}</p>
            <p className="py-1 px-2">{data.duration} s</p>
            <p className="py-1 px-2">{data.fps} FPS</p>
            <p className="py-1 px-2">
              <a
                target="_blank"
                href={data.backgroundVideoUrl}>
                Video URL
              </a>
            </p>
            <p className="py-1 px-2">{data.backgroundColor}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
