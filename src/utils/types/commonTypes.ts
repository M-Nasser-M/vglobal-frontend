import * as z from "zod";

export const NavlinkSchema = z.object({
  home: z.string(),
  "permenant-immigration": z.string(),
  "temporary-immigration": z.string(),
  blog: z.string(),
  "about-us": z.string(),
  "book-consult": z.string(),
});
export const NavlinksSchema = z.array(NavlinkSchema);
export type Navlink = z.infer<typeof NavlinkSchema>;

export const CommonSchema = z.object({
  navlinks: z.array(NavlinkSchema),
});

export type Common = z.infer<typeof CommonSchema>;
export type Navlinks = z.infer<typeof NavlinksSchema>;
