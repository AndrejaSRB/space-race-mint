import Ship1 from "../../public/Tier_1_notail.png";
import Ship2 from "../../public/Tier_2_notail.png";
import Ship3 from "../../public/Tier_3_notail.png";

const tiers = [
  {
    id: 3,
    title: "TIER 3",
    eth: "0.066",
    description:
      "Valid for one Ascension season into Stage 2, perfect for newcomers to the OogaVerse.",
    img: Ship3,
    totalSupply: 1500,
  },
  {
    id: 2,
    title: "TIER 2",
    eth: "0.14",
    description:
      "Provides access for three Ascension seasons, balancing cost with meaningful long-term utility.",
    img: Ship2,
    totalSupply: 1000,
  },
  {
    id: 1,
    title: "TIER 1",
    eth: "0.288",
    description:
      "These premium SpaceShips offer unlimited MekaApes Ascension season validity, ensuring continuous engagement across all aspects of Stage 2 and beyond.",
    img: Ship1,
    totalSupply: 500,
  },
];
export default tiers;
