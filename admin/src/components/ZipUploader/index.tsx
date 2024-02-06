import { forwardRef, useEffect, useState } from "react";
import {
  CarouselInput,
  CarouselSlide,
  CarouselActions,
  Loader,
} from "@strapi/design-system";

import { useIntl } from "react-intl";

import { HtmlMedia } from "../../types";
import { mediaRequest } from "../../api";

import { Upload } from "../Upload";
import { Actions } from "../Actions";
import { MediaInfo } from "../MediaInfo";

const ZipUploader = forwardRef(
  ({ intlLabel, name, error, value, onChange, ...props }: any, ref) => {
    const { formatMessage } = useIntl();
    const [mediaInfo, setMediaInfo] = useState<HtmlMedia | null>();
    const [loading, setLoading] = useState(false);

    const setValue = (value: string | null) => {
      onChange?.({
        target: {
          name,
          value,
          type: "uid",
        },
      });
    };

    const onUpload = (e: HtmlMedia) => {
      setValue(e.uid);
    };

    const onDelete = () => {
      setValue(null);
      setMediaInfo(null);
    };

    useEffect(() => {
      const getMedia = () => {
        if (!value) return;
        setLoading(true);
        mediaRequest
          .getMediaByUID(value)
          .then((res) => {
            setMediaInfo(res);
          })
          .finally(() => {
            setLoading(false);
          });
      };

      getMedia();
    }, [value]);

    return (
      <CarouselInput
        label={intlLabel ? formatMessage(intlLabel) : ""}
        selectedSlide={0}
        actions={
          <CarouselActions>
            <Actions media={mediaInfo} onDelete={onDelete} />
          </CarouselActions>
        }
        style={{}}
      >
        <CarouselSlide>
          {loading ? (
            <Loader>Loading content...</Loader>
          ) : mediaInfo ? (
            <MediaInfo mediaInfo={mediaInfo} />
          ) : (
            <Upload onChange={onUpload} />
          )}
        </CarouselSlide>
      </CarouselInput>
    );
  }
);

export default ZipUploader;
