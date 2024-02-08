import { Attachment } from "@strapi/icons";
import { HtmlMedia } from "../../types";

import * as S from "./styles";

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
    <S.Wrapper>
      <Attachment /> {mediaInfo?.fileName} {size}
    </S.Wrapper>
  );
};
