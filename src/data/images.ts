/**
 * Image registry.
 *
 * Photography on this site is ILLUSTRATIVE — licensed editorial imagery that
 * represents each discipline. It does not depict Kstone Projects work. Swap in
 * project photography by replacing files in /public/images or changing the
 * paths here. Intrinsic sizes are used to prevent layout shift.
 */

export type SiteImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** CSS object-position to control cropping, e.g. "50% 30%". */
  position?: string;
};

const img = (
  file: string,
  alt: string,
  width: number,
  height: number,
  position?: string,
): SiteImage => ({ src: `/images/${file}`, alt, width, height, position });

export const images = {
  heroBridge: img(
    "bridge-pelje2.jpg",
    "A long cable-stayed sea crossing on concrete piers, framed by low cloud over still water",
    2400,
    1600,
    "50% 55%",
  ),
  bridgeSpan: img(
    "bridge-pelje1.jpg",
    "Cable-stayed bridge deck extending across a bay beneath low cloud",
    2400,
    1509,
  ),
  bridgePiers: img(
    "bridge-pelje3.jpg",
    "Reinforced concrete bridge piers rising from open water",
    2400,
    1600,
  ),
  roadWorks: img(
    "road-a70.jpg",
    "Aerial view of a motorway junction under construction",
    2400,
    1798,
    "50% 40%",
  ),
  roadInterchange: img(
    "road-a73.jpg",
    "Aerial view of a completed motorway interchange with slip roads",
    2400,
    1798,
  ),
  viaduct: img(
    "road-viaduct2.jpg",
    "Underside of a prestressed concrete viaduct crossing a river valley",
    2400,
    1520,
  ),
  port: img(
    "marine-bremerhaven.jpg",
    "Quayside container cranes at a deep-water port terminal",
    2400,
    1996,
    "50% 45%",
  ),
  jetty: img(
    "marine-pier.jpg",
    "A timber-decked pier extending in perspective into open water",
    2400,
    1800,
  ),
  shoreProtection: img(
    "coast-tetrapods.jpg",
    "Interlocking concrete armour units used for coastal defence",
    2400,
    1598,
  ),
  towers: img(
    "tower-up.jpg",
    "Glass and steel towers seen from street level against a pale sky",
    2400,
    1600,
  ),
  towersAlt: img(
    "tower-high.jpg",
    "Looking up between dark glass high-rise facades",
    2400,
    1600,
  ),
  modernBuilding: img(
    "bldg-modern.jpg",
    "Angular modern building with a faceted glass and white facade",
    2400,
    1600,
  ),
  siteCranes: img(
    "site-cranes.jpg",
    "Tower cranes beside multi-storey buildings under construction",
    2400,
    1350,
  ),
  rebar: img(
    "site-rebar.jpg",
    "Engineers on a reinforced concrete slab with rebar and formwork",
    2400,
    1590,
  ),
  siteTeam: img(
    "site-workers.jpg",
    "A site team in high-visibility clothing reviewing an excavated foundation area",
    2400,
    1600,
    "50% 60%",
  ),
  piling: img(
    "piling-liebherr.jpg",
    "A piling rig with auger drilling a foundation on a construction site",
    2400,
    1878,
    "50% 35%",
  ),
  blueprint: img(
    "plans-pencil.jpg",
    "Technical construction drawings with a pencil and set square",
    2400,
    1600,
  ),
  equipment: img(
    "equip-cat.jpg",
    "A hydraulic excavator working on a mound of earth under a clear sky",
    2400,
    1600,
  ),
  residential: img(
    "house-evening.jpg",
    "Contemporary residential building at dusk with warm interior lighting",
    2400,
    1600,
  ),
} satisfies Record<string, SiteImage>;

export type ImageKey = keyof typeof images;
