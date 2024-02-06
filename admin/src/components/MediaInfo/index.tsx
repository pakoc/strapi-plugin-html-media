import { Attachment } from "@strapi/icons";
import { HtmlMedia } from "../../types";

interface MediaInfoProps {
  mediaInfo?: HtmlMedia | null;
}
export const MediaInfo = ({ mediaInfo }: MediaInfoProps) => {
  if (!mediaInfo) {
    return null;
  }

  const size = Intl.NumberFormat("en", {
    notation: "compact",
    style: "unit",
    unit: "byte",
    unitDisplay: "narrow",
  }).format(mediaInfo?.size);

  return (
    <div style={{ display: "flex", gap: 5 }}>
      <Attachment /> {mediaInfo?.fileName} {size}
    </div>
  );
};
