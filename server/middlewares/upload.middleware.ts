import { copyFile, mkdir, unlink } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import { existsSync } from "fs";
import path from "path";
import decompress from "decompress";
import pluginId from "../../admin/src/pluginId";

export default (config, { strapi }) => {
  return async (ctx, next) => {
    const rootDir = "public";
    const baseOutput = path.join(
      "uploads",
      strapi.plugin(pluginId).config("baseDir", "media")
    );
    const sourceOutput = path.join(baseOutput, "sources"); // output for zip
    const viewOutput = path.join(baseOutput, "view"); // output for extracted files

    const file = ctx.request.files.file;
    const fileNameArr = file.name.split(".");
    const ext = fileNameArr.pop();

    if (ext !== "zip") {
      throw new Error("Bad file format: expected zip");
    }
    const uid = randomUUID();
    const fileName = fileNameArr.join(".") + "_" + uid;
    const filePath = path.join(sourceOutput, fileName + "." + ext);
    if (!existsSync(path.join(rootDir, sourceOutput))) {
      await mkdir(path.join(rootDir, sourceOutput), { recursive: true });
    }

    await copyFile(file.path, path.join(rootDir, filePath));
    unlink(file.path);

    try {
      await decompress(
        path.join(rootDir, filePath),
        path.join(rootDir, viewOutput, fileName)
      );
    } catch (e) {
      throw new Error(`Unzip error ${e}`);
    }

    ctx.state.uploadedData = {
      uid,
      fileName: file.name,
      sourceUrl: "/" + filePath,
      viewUrl: "/" + viewOutput + "/" + fileName + "/index.html",
      size: file.size,
    };

    return next();
  };
};
