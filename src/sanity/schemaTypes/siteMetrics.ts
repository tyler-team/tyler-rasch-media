import { defineType, defineField } from "sanity";

export const siteMetrics = defineType({
  name: "siteMetrics",
  title: "1BWS Site Metrics (실시간 KPI)",
  type: "document",
  fields: [
    defineField({
      name: "key",
      title: "Singleton Key (기본값: 1bws-global)",
      type: "string",
      initialValue: "1bws-global",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subscribersKo",
      title: "Subscribers KR (예: 89.1만+)",
      type: "string",
    }),
    defineField({
      name: "subscribersEn",
      title: "Subscribers EN (예: 891K+)",
      type: "string",
    }),
    defineField({
      name: "views90dKo",
      title: "90-Day Cross-Platform Views KR (예: 3,550만+)",
      type: "string",
    }),
    defineField({
      name: "views90dEn",
      title: "90-Day Cross-Platform Views EN (예: 35.5M+)",
      type: "string",
    }),
    defineField({
      name: "decisionMakersPct",
      title: "Ages 25-54 Decision Makers % (예: 69.8%)",
      type: "string",
    }),
    defineField({
      name: "retentionPct",
      title: "Viewer Retention % (예: 60.6%)",
      type: "string",
    }),
    defineField({
      name: "updatedAt",
      title: "Last Synced At",
      type: "datetime",
    }),
  ],
});

export default siteMetrics;
