import { SSTConfig } from "sst";
import { NextjsSite } from "sst/constructs";

export default {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  config(_input) {
    return {
      name: "vglobal-frontned",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      const site = new NextjsSite(stack, "site");

      stack.addOutputs({
        SiteUrl: site.url,
      });
    });
  },
} satisfies SSTConfig;
