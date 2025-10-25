// lib/data/whiskeyProcess.js
export const whiskeyMakingProcess = {
  hero: {
    title: "The Art of Whiskey Making",
    subtitle: "A Journey Through Time, Tradition, and Craftsmanship",
    description: "Discover the meticulous process behind every drop of Queen's Crown whiskey—where centuries-old traditions meet modern precision to create liquid poetry.",
    backgroundImage: "/images/background/greenbg.jpg"
  },
  introduction: {
    title: "Crafting Liquid Legacy",
    content: "At Queen Global Barrels, whiskey making is not merely a process—it is an art form passed down through generations. Each bottle represents countless hours of dedication, expertise, and an unwavering commitment to excellence. Our master distillers combine time-honored techniques with innovative approaches to create spirits that tell the story of our heritage.",
    image: "/images/background/master.jpg",
    imageAlt: "Master distiller carefully examining whiskey in the distillery"
  },
  processes: [
    {
      id: 1,
      step: "01",
      title: "Grain Selection & Milling",
      subtitle: "The Foundation of Excellence",
      description: "Our journey begins with the careful selection of premium grains. We source the finest corn, wheat, and barley from trusted agricultural partners who share our commitment to quality. Each grain is meticulously inspected and tested before being milled to the perfect consistency that will unlock its full flavor potential.",
      details: [
        "Hand-selected premium grains from certified suppliers",
        "Rigorous quality testing for moisture content and purity",
        "Precision milling to optimize fermentation efficiency",
        "Temperature-controlled storage to preserve grain integrity"
      ],
      image: "/images/background/bg1.jpg",
      imageAlt: "Premium grains being carefully selected and inspected",
      processTime: "2-3 Days",
      expertise: "Grain Master"
    },
    {
      id: 2,
      step: "02",
      title: "Mashing & Fermentation",
      subtitle: "The Alchemy Begins",
      description: "The milled grains are combined with pure mountain water in our copper mash tuns, where temperature and timing are controlled with scientific precision. Our proprietary yeast strains, cultivated over decades, transform the starches into alcohol, creating the foundation for our whiskey's distinctive character.",
      details: [
        "Pure mountain water sourced from protected watersheds",
        "Proprietary yeast strains developed over 25 years",
        "Computer-monitored temperature control systems",
        "7-10 day fermentation process for optimal flavor development"
      ],
      image: "/images/background/fermentation.jpg",
      imageAlt: "Copper fermentation tanks in the distillery with bubbling mash",
      processTime: "7-10 Days",
      expertise: "Fermentation Specialist"
    },
    {
      id: 3,
      step: "03",
      title: "Double Distillation",
      subtitle: "Purification & Concentration",
      description: "Our copper pot stills, crafted by master artisans, perform the ancient art of distillation. Through careful double distillation, we capture only the 'heart' of each run—the purest, most flavorful portion—while discarding the harsh heads and tails that could compromise quality.",
      details: [
        "Hand-forged copper pot stills for superior heat distribution",
        "Master distiller's cuts determine heads, hearts, and tails",
        "Precise temperature control throughout the distillation process",
        "Only the finest 60% of each distillation is retained"
      ],
      image: "/images/background/distillation.jpg",
      imageAlt: "Gleaming copper pot stills during the distillation process",
      processTime: "12-16 Hours",
      expertise: "Master Distiller"
    },
    {
      id: 4,
      step: "04",
      title: "Barrel Aging",
      subtitle: "Time's Patient Transformation",
      description: "The clear spirit enters charred American oak barrels, beginning its transformation into whiskey. In our climate-controlled rickhouses, each barrel breathes with the seasons, slowly extracting color, flavor, and character from the wood while angels claim their share.",
      details: [
        "New American oak barrels with precise char levels",
        "Climate-controlled aging warehouses",
        "Regular barrel rotation for consistent maturation",
        "Minimum 4-year aging for premium expressions"
      ],
      image: "/images/background/bg2.jpg",
      imageAlt: "Rows of whiskey barrels aging in the rickhouse",
      processTime: "4-12 Years",
      expertise: "Warehouse Master"
    },
    {
      id: 5,
      step: "05",
      title: "Blending & Bottling",
      subtitle: "The Final Masterpiece",
      description: "Our master blender tastes hundreds of barrels to select those that will create the perfect harmony. Each batch is carefully blended to maintain consistency while celebrating the unique character that makes Queen's Crown exceptional. Finally, each bottle is filled, sealed, and labeled by hand.",
      details: [
        "Master blender selects barrels at peak maturity",
        "Small-batch blending for quality control",
        "Non-chill filtration to preserve natural flavors",
        "Hand-numbered bottles for authenticity"
      ],
      image: "/images/background/labelling.jpg",
      imageAlt: "Hand bottling of premium whiskey with careful quality control",
      processTime: "3-5 Days",
      expertise: "Master Blender"
    }
  ],
  philosophy: {
    title: "Our Distilling Philosophy",
    subtitle: "Where Tradition Meets Innovation",
    content: "We believe that great whiskey cannot be rushed. It requires patience, skill, and an unwavering commitment to quality at every step. Our philosophy centers on three core principles: respect for tradition, pursuit of perfection, and dedication to craft. Every decision we make—from grain selection to final bottling—is guided by these timeless values.",
    principles: [
      {
        icon: "⏳",
        title: "Time & Patience",
        description: "Great whiskey requires time to develop its character. We never rush the process."
      },
      {
        icon: "🎯",
        title: "Precision & Craft",
        description: "Every detail matters. From temperature control to barrel selection, precision guides our craft."
      },
      {
        icon: "🌿",
        title: "Nature & Tradition",
        description: "We honor traditional methods while respecting the natural ingredients that make our whiskey exceptional."
      }
    ]
  },
  craftsmen: {
    title: "Master Craftsmen",
    subtitle: "The Hands Behind the Art",
    description: "We have the skilled artisans who bring decades of experience to every aspect of our whiskey making process.",
    team: [
      {
        name: "Robert McAllister",
        title: "Master Distiller",
        experience: "30 Years",
        specialty: "Distillation & Quality Control",
        image: "/whiskey-making/master-distiller-portrait.jpg"
      },
      {
        name: "Sarah Chen",
        title: "Master Blender",
        experience: "18 Years",
        specialty: "Flavor Profiling & Blending",
        image: "/whiskey-making/master-blender-portrait.jpg"
      },
      {
        name: "James McKenzie",
        title: "Warehouse Master",
        experience: "25 Years",
        specialty: "Barrel Aging & Maturation",
        image: "/whiskey-making/warehouse-master-portrait.jpg"
      }
    ]
  }
};

export default whiskeyMakingProcess;
