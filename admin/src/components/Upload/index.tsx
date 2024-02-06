import React, { useState, useId } from "react";

import { Loader, Typography } from "@strapi/design-system";
import { Upload as UploadIcon } from "@strapi/icons";

import { Label } from "./Label";

import { HtmlMedia } from "../../types";
import { upload } from "../../api";

import * as S from "./styles";

interface UploadProps {
  onChange?: (e: HtmlMedia) => void;
}

export const Upload = ({ onChange }: UploadProps) => {
  const inputId = "input_" + useId();
  const [loading, setLoading] = useState(false);

  const uploadFile = (file: File) => {
    if (file) {
      setLoading(true);

      upload(file)
        .then((res) => {
          onChange?.(res);
        })
        .catch((err) => {
          alert(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const changeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    if (file) uploadFile(file);
  };

  const dropHandler = (e: React.DragEvent) => {
    uploadFile(e.dataTransfer.files[0]);
    e.preventDefault();
    e.stopPropagation();
  };

  if (loading) {
    return <Loader>Loading content...</Loader>;
  }

  return (
    <S.Wrapper>
      <input type="file" id={inputId} name={inputId} onChange={changeHandler} />
      <Label htmlFor={inputId} onDrop={dropHandler}>
        <S.Inner>
          <UploadIcon />
          <Typography fontWeight="bold" textColor="neutral800">
            Click to add an asset or drag and drop one in this area
          </Typography>
        </S.Inner>
      </Label>
    </S.Wrapper>
  );
};
