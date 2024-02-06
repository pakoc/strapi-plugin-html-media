import { Strapi } from "@strapi/strapi";
import pluginId from "../../admin/src/pluginId";

export default ({ strapi }: { strapi: Strapi }) => ({
  async save(data) {
    const result = await strapi.entityService?.create(
      `plugin::${pluginId}.html-media`,
      {
        data,
      }
    );
    return result;
  },
  async findOne(uid: string) {
    const result = await strapi?.db
      ?.query(`plugin::${pluginId}.html-media`)
      .findOne({
        where: {
          uid,
        },
      });

    return result;
  },
});
