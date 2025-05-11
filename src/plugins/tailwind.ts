import {DocusaurusContext} from "@docusaurus/types";

const tailwind = (context: DocusaurusContext) => {
    return {
      name: "tailwind",
      configurePostCss(postcssOptions) {
        postcssOptions.plugins = [require("@tailwindcss/postcss")];
        return postcssOptions;
      },
    };
};

export default tailwind;
