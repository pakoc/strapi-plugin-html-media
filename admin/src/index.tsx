import { prefixPluginTranslations } from "@strapi/helper-plugin";

import pluginPkg from "../../package.json";
import pluginId from "./pluginId";
import Initializer from "./components/Initializer";
import PluginIcon from "./components/PluginIcon";

const name = pluginPkg.strapi.name;

export default {
  register(app: any) {
    app.customFields.register({
      name: "uid",
      type: "uid",
      pluginId,
      icon: () => {
        return <PluginIcon />;
      },
      intlLabel: {
        id: `${pluginId}.label`,
        defaultMessage: "HTML Media Uploader",
      },
      intlDescription: {
        id: `${pluginId}.description`,
        defaultMessage: "HTML Media",
      },
      components: {
        Input: async () => import("./components/ZipUploader"),
      },
    });

    const plugin = {
      id: pluginId,
      initializer: Initializer,
      isReady: false,
      name,
    };

    app.registerPlugin(plugin);
  },

  bootstrap(app: any) {},

  async registerTrads(app: any) {
    const { locales } = app;

    const importedTrads = await Promise.all(
      (locales as any[]).map((locale) => {
        return import(`./translations/${locale}.json`)
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  },
};
