// Sample data structure for Results page
// Replace with real content or connect to CMS later

export const resultsProjects = [
  {
    id: "proj-001",
    title: "1 Bedroom Senior Move-In Setup",
    category: "Transitions",
    date: "2026-02-01",
    location: "Dayton, OH",
    description: "Created a familiar, calming space with essential furniture, meaningful artwork, and personal touches that immediately felt like home.",
    media: {
      before: [
        { type: "image", src: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&q=80", alt: "Before: cluttered bedroom with boxes" }
      ],
      after: [
        { type: "image", src: "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=800&q=80", alt: "After: organized, welcoming bedroom setup" }
      ],
      afterVideo: { type: "mp4", src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", isVertical: false }
    }
  },
  {
    id: "proj-002",
    title: "Garage Organization System",
    category: "Organization",
    date: "2026-01-28",
    location: "Cincinnati, OH",
    description: "Transformed an overwhelming garage into a functional, organized space with clear zones and easy-to-maintain systems.",
    media: {
      before: [
        { type: "image", src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80", alt: "Before: cluttered garage with items everywhere" }
      ],
      after: [
        { type: "image", src: "https://images.unsplash.com/photo-1600518464441-9154a4dea21b?w=800&q=80", alt: "After: organized garage with labeled storage" }
      ],
      beforeVideo: { type: "youtube", url: "https://www.youtube.com/watch?v=jNQXAC9IVRw", isVertical: false },
      afterVideo: { type: "youtube", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", isVertical: false }
    }
  },
  {
    id: "proj-003",
    title: "Senior Apartment Full Setup",
    category: "Transitions",
    date: "2026-01-15",
    location: "Springfield, OH",
    description: "Complete move-in service including furniture placement, closet organization, and decorative touches that brought comfort and familiarity.",
    media: {
      before: [
        { type: "image", src: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80", alt: "Before: empty senior living apartment" }
      ],
      after: [
        { type: "image", src: "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800&q=80", alt: "After: fully furnished and decorated senior apartment" }
      ],
      videos: []
    }
  },
  {
    id: "proj-004",
    title: "Kitchen Pantry Makeover",
    category: "Organization",
    date: "2026-01-10",
    location: "Kettering, OH",
    description: "Reorganized pantry with clear containers, labels, and zones that make meal prep easier and maintain order.",
    media: {
      before: [
        { type: "image", src: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80", alt: "Before: disorganized pantry shelves" }
      ],
      after: [
        { type: "image", src: "https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=800&q=80", alt: "After: organized pantry with labeled containers" }
      ]
    }
  }
];

export const testimonials = [
  {
    id: "t-001",
    quote: "I cannot tell you how many people have commented that it looks like they've lived there forever and that it's beautiful.",
    role: "Referral Partner",
    name: "",
    city: "",
    featured: true,
    category: "Transitions"
  },
  {
    id: "t-002",
    quote: "He loves his room. That is a saving grace – thanks to you.",
    role: "Loved One",
    name: "",
    city: "",
    featured: false,
    category: "Transitions"
  },
  {
    id: "t-003",
    quote: "He's been giving tours to all the employees. You are amazing.",
    role: "Loved One",
    name: "",
    city: "",
    featured: false,
    category: "Transitions"
  },
  {
    id: "t-004",
    quote: "Aw, it's like home.",
    role: "Resident",
    name: "",
    city: "",
    featured: false,
    category: "Transitions"
  },
  {
    id: "t-005",
    quote: "Our garage went from chaos to calm in one day. The systems are so simple to maintain!",
    role: "Client",
    name: "Sarah",
    city: "Dayton",
    featured: false,
    category: "Organization"
  },
  {
    id: "t-006",
    quote: "Amy made the transition so much easier for our family. Mom's new space feels warm and familiar.",
    role: "Loved One",
    name: "Jennifer",
    city: "Cincinnati",
    featured: false,
    category: "Transitions"
  }
];