function toNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function distanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;

  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

const profiles = [
  {
    id: "al_quaa",
    names: ["al qua", "al qua'a", "al quaa", "qua", "qoua"],
    center: { lat: 23.52, lon: 55.55 },
    radiusKm: 45,
    profile: "Rural desert community",
    basis:
      "Based on Tatweer Hackathon context: camel farms, rural households, desert setting, and stargazing potential.",
    strengths: [
      "Camel farming community",
      "Stargazing and desert tourism potential",
      "Strong word-of-mouth community networks",
      "Local food, craft, and farm product opportunities",
      "Small-scale businesses can be tested with nearby residents first",
    ],
    recommendedCustomers: [
      "Camel farm owners",
      "Families",
      "Nearby residents",
      "Visitors",
      "Schools",
      "Tourists",
    ],
    marketing: [
      "WhatsApp community groups",
      "Family and farm networks",
      "Instagram reels",
      "Local events",
      "Tourism partnerships",
    ],
    opportunities: [
      "Camel products",
      "Home bakery",
      "Meal preparation",
      "Desert photography",
      "Stargazing tours",
      "Crafts",
      "Farm services",
    ],
    firstMarketAdvice:
      "Start by validating with nearby families, farms, and visitors before expanding to Al Ain or Abu Dhabi.",
  },
  {
    id: "al_ain",
    names: ["al ain", "al-ain"],
    center: { lat: 24.1302, lon: 55.8023 },
    radiusKm: 60,
    profile: "Agricultural and family-centered city",
    basis:
      "Al Ain is widely known as the Garden City and is connected to surrounding rural communities.",
    strengths: [
      "Agriculture and date farming context",
      "Family communities",
      "Students and universities",
      "Tourism and heritage sites",
      "Access to a larger customer base than smaller villages",
    ],
    recommendedCustomers: [
      "Families",
      "Students",
      "Parents",
      "Tourists",
      "Small businesses",
    ],
    marketing: [
      "Instagram",
      "WhatsApp",
      "Google Maps listing",
      "School and university groups",
      "Local markets",
    ],
    opportunities: [
      "Food businesses",
      "Tutoring",
      "Date products",
      "Photography",
      "Digital services",
      "Crafts",
    ],
    firstMarketAdvice:
      "Test the idea with families, students, and small businesses in Al Ain before expanding wider.",
  },
  {
    id: "abu_dhabi",
    names: ["abu dhabi", "rabdan", "khalifa city", "mussafah", "baniyas"],
    center: { lat: 24.4539, lon: 54.3773 },
    radiusKm: 80,
    profile: "Urban Abu Dhabi market",
    basis:
      "Abu Dhabi has a larger urban customer base, stronger delivery access, and more business service options.",
    strengths: [
      "Large customer base",
      "Higher purchasing power",
      "Business support ecosystem",
      "Delivery and logistics access",
      "Professional and family customer segments",
    ],
    recommendedCustomers: [
      "Families",
      "Professionals",
      "Students",
      "Small businesses",
      "Companies",
    ],
    marketing: [
      "Instagram",
      "Google Maps listing",
      "TikTok",
      "WhatsApp Business",
      "Paid ads after validation",
    ],
    opportunities: [
      "Food delivery",
      "Digital services",
      "Tutoring",
      "Photography",
      "Beauty services",
      "Professional services",
    ],
    firstMarketAdvice:
      "Start with a small customer group nearby, then use online channels and delivery options to expand.",
  },
];

export function getLocationInsights(formData = {}) {
  const locationText = String(formData.location || "").toLowerCase();
  const latitude = toNumber(formData.latitude);
  const longitude = toNumber(formData.longitude);

  const textMatch = profiles.find((profile) =>
    profile.names.some((name) => locationText.includes(name))
  );

  if (textMatch) return textMatch;

  if (latitude !== null && longitude !== null) {
    const nearest = profiles
      .map((profile) => ({
        ...profile,
        distance: distanceKm(
          latitude,
          longitude,
          profile.center.lat,
          profile.center.lon
        ),
      }))
      .sort((a, b) => a.distance - b.distance)[0];

    if (nearest && nearest.distance <= nearest.radiusKm) {
      return nearest;
    }
  }

  return {
    id: "general_uae",
    profile: "General UAE community",
    basis:
      "No specific rural profile was detected, so Bedaya uses general UAE startup guidance.",
    strengths: [
      "Community networks",
      "Digital selling channels",
      "Small business opportunities",
      "Low-cost validation through family and local contacts",
    ],
    recommendedCustomers: ["Local residents", "Families", "Small businesses"],
    marketing: ["WhatsApp", "Instagram", "Google Maps listing"],
    opportunities: ["Home business", "Services", "Food", "Tutoring", "Crafts"],
    firstMarketAdvice:
      "Use your immediate area as the first validation market before spending heavily.",
  };
}