import { Certificate } from "aws-cdk-lib/aws-certificatemanager";
import { HostedZone } from "aws-cdk-lib/aws-route53";
import { NextjsSite } from "sst/constructs";
import { SSTConfig } from "sst";

export default {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  config(_input) {
    return {
      name: "vglobal-frontned",
      region: "eu-north-1",
    };
  },

  stacks(app) {
    app.stack(function Site({ stack }) {
      const site = new NextjsSite(stack, "site", {
        runtime: "nodejs20.x",
        environment: {
          NEXT_PUBLIC_STRAPI_API_URL: process.env.NEXT_PUBLIC_STRAPI_API_URL!,
          NEXT_PUBLIC_STRAPI_URL: process.env.NEXT_PUBLIC_STRAPI_URL!,
          STRAPI_API_TOKEN: process.env.STRAPI_API_TOKEN!,
          STRAPI_API_URL: process.env.STRAPI_API_URL!,
          STRAPI_URL: process.env.STRAPI_URL!,
          NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET!,
          NEXTAUTH_URL: process.env.NEXTAUTH_URL!,
        },
        customDomain: {
          domainName: "vglobal.ca",
          isExternalDomain: true,
          cdk: {
            hostedZone: HostedZone.fromHostedZoneAttributes(
              stack,
              "vglobal.caZone",
              {
                hostedZoneId: process.env.HOSTED_ZONE_ID!,
                zoneName: process.env.HOSTED_ZONE_NAME!,
              }
            ),
            certificate: Certificate.fromCertificateArn(
              stack,
              "MyCert",
              process.env.CERTIFICATE_ARN!
            ),
          },
        },
      });

      stack.addOutputs({
        SiteUrl: site.url,
      });
    });
  },
} satisfies SSTConfig;
