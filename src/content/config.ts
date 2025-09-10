import { defineCollection, z } from 'astro:content';

const site = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    logo: z.string().optional(),
    favicon: z.string().optional(),
    web3AccessKey: z.string().optional(),
    siteName: z.string().optional(),
    links: z.array(z.object({
      text: z.string(),
      link: z.string(),
      dropdown: z.boolean().optional(),
      sublinks: z.array(z.object({
        text: z.string(),
        link: z.string(),
      })).optional(),
    })).optional(),
    rightButton1: z.object({
      text: z.string(),
      link: z.string(),
    }).optional(),
    rightButton2: z.object({
      text: z.string(),
      link: z.string(),
    }).optional(),
    mail: z.string().optional(),
    PrimaryPages: z.array(z.object({
      name: z.string(),
      link: z.string(),
    })).optional(),
    UtilityPages: z.array(z.object({
      name: z.string(),
      link: z.string(),
    })).optional(),
    Resources: z.array(z.object({
      name: z.string(),
      link: z.string(),
    })).optional(),
    socialLinks: z.array(z.object({
      icon: z.string(),
      link: z.string(),
    })).optional(),
  })
});

const blogs = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    author: z.object({
      name: z.string(),
      img: z.string(),
    }),
    category: z.string(),
    shortDescription: z.string(),
    image: z.string(),
    featured: z.boolean().optional(),
    readTime: z.string().optional(),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    tags: z.array(z.string()).optional(),
    tradesType: z.array(z.string()).optional(),
  })
});

const services = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().optional(),
    icon: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    indexheader: z.string().optional(),
  })
});

const portfolio = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().optional(),
    image: z.string().optional(),
    type: z.string().optional(),
    category: z.string().optional(),
    client: z.string().optional(),
    duration: z.string().optional(),
    websiteLink: z.string().optional(),
    shortDescription: z.string().optional(),
    indexHeader: z.string().optional(),
    button: z.object({
      link: z.string(),
      text: z.string(),
    }).optional(),
    sliderText: z.array(z.string()).optional(),
    relatedProjectsText: z.string().optional(),
  })
});

const aboutPage = defineCollection({
  type: 'content',
  schema: z.object({
    header: z.string().optional(),
    subheading: z.string().optional(),
    bodyText: z.string().optional(),
    trustIndicator: z.string().optional(),
    trustIndicators: z.array(z.string()).optional(),
    heroImage: z.string().optional(),
    buttonPrimary: z.object({
      text: z.string(),
      link: z.string(),
    }).optional(),
    blockquote: z.string().optional(),
    img: z.string().optional(),
    person: z.object({
      name: z.string(),
      post: z.string(),
      image: z.string(),
    }).optional(),
    videoLink: z.string().optional(),
    experienceYears: z.number().optional(),
    customers: z.number().optional(),
    projectsCompleted: z.number().optional(),
    fundsArranged: z.string().optional(),
    successes: z.array(z.string()).optional(),
    images: z.array(z.string()).optional(),
    features: z.array(z.object({
      image: z.string(),
      title: z.string(),
      description: z.string(),
    })).optional(),
    button: z.object({
      text: z.string(),
      link: z.string(),
    }).optional(),
    description: z.string().optional(),
    points: z.array(z.string()).optional(),
    members: z.array(z.object({
      name: z.string(),
      post: z.string(),
      image: z.string(),
      socialLinks: z.array(z.object({
        icon: z.string(),
        link: z.string(),
      })),
    })).optional(),
    testimonials: z.array(z.object({
      name: z.string(),
      position: z.string(),
      rating: z.number(),
      text: z.string(),
    })).optional(),
    results: z.object({
      title: z.string(),
      items: z.array(z.string()),
    }).optional(),
    processSteps: z.array(z.object({
      step: z.string(),
      title: z.string(),
      description: z.string(),
    })).optional(),
    differentiators: z.object({
      title: z.string(),
      items: z.array(z.string()),
    }).optional(),
    benefits: z.array(z.string()).optional(),
    contactInfo: z.object({
      phone: z.object({
        label: z.string(),
        value: z.string(),
      }).optional(),
      email: z.object({
        label: z.string(),
        value: z.string(),
      }).optional(),
      hours: z.object({
        label: z.string(),
        value: z.string(),
      }).optional(),
    }).optional(),
    responsePromise: z.object({
      title: z.string(),
      description: z.string(),
    }).optional(),
    stats: z.array(z.object({
      number: z.string(),
      label: z.string(),
      description: z.string(),
    })).optional(),
    financeTypes: z.object({
      residential: z.object({
        title: z.string(),
        items: z.array(z.object({
          title: z.string(),
          description: z.string(),
        })),
      }).optional(),
      commercial: z.object({
        title: z.string(),
        items: z.array(z.object({
          title: z.string(),
          description: z.string(),
        })),
      }).optional(),
    }).optional(),
    SatisfiedClients: z.number().optional(),
    ActiveEngagement: z.number().optional(),
    SuccessProjects: z.number().optional(),
    AwardsWinning: z.number().optional(),
  })
});

const IndexPage = defineCollection({
  type: 'content',
  schema: z.object({
    header: z.string().optional(),
    description: z.string().optional(),
    subheading: z.string().optional(),
    bodyText: z.string().optional(),
    trustIndicator: z.string().optional(),
    heroImage: z.string().optional(),
    buttonPrimary: z.object({
      text: z.string(),
      link: z.string(),
    }).optional(),
    buttonSecondary: z.object({
      text: z.string(),
      link: z.string(),
    }).optional(),
    images: z.array(z.string()).optional(),
    valueStack: z.array(z.object({
      item: z.string(),
      value: z.string(),
    })).optional(),
    totalValue: z.string().optional(),
    investment: z.string().optional(),
    investmentSubtext: z.string().optional(),
    disclaimer: z.string().optional(),
    proofPoints: z.array(z.string()).optional(),
    experienceYears: z.number().optional(),
    customers: z.number().optional(),
    projectsCompleted: z.number().optional(),
    fundsArranged: z.string().optional(),
    successes: z.array(z.string()).optional(),
    image: z.string().optional(),
    button: z.object({
      text: z.string(),
      link: z.string(),
    }).optional(),
    process: z.array(z.object({
      step: z.number(),
      title: z.string(),
      duration: z.string(),
      description: z.string(),
    })).optional(),
    services: z.object({
      quickWins: z.object({
        title: z.string(),
        services: z.array(z.object({
          name: z.string(),
          timing: z.string(),
          amount: z.string(),
          feature: z.string(),
        })),
      }).optional(),
      growthFuel: z.object({
        title: z.string(),
        services: z.array(z.object({
          name: z.string(),
          timing: z.string(),
          amount: z.string(),
          feature: z.string(),
        })),
      }).optional(),
      wealthBuild: z.object({
        title: z.string(),
        services: z.array(z.object({
          name: z.string(),
          timing: z.string(),
          amount: z.string(),
          feature: z.string(),
        })),
      }).optional(),
      urgentNeeds: z.object({
        title: z.string(),
        services: z.array(z.object({
          name: z.string(),
          timing: z.string(),
          amount: z.string(),
          feature: z.string(),
        })),
      }).optional(),
      strategic: z.object({
        title: z.string(),
        services: z.array(z.object({
          name: z.string(),
          timing: z.string(),
          amount: z.string(),
          feature: z.string(),
        })),
      }).optional(),
      personal: z.object({
        title: z.string(),
        services: z.array(z.object({
          name: z.string(),
          timing: z.string(),
          amount: z.string(),
          feature: z.string(),
        })),
      }).optional(),
    }).optional(),
    costs: z.array(z.object({
      type: z.string(),
      impact: z.string(),
      amount: z.string(),
    })).optional(),
    totalCost: z.string().optional(),
    title: z.string().optional(),
    limitedCapacity: z.object({
      title: z.string(),
      description: z.string(),
      spotsRemaining: z.number(),
      lastUpdated: z.string(),
    }).optional(),
    strategy: z.object({
      title: z.string(),
      validity: z.string(),
    }).optional(),
    majorBanks: z.array(z.object({
      name: z.string(),
      logo: z.string(),
    })).optional(),
    specialistLenders: z.object({
      source: z.string(),
      display: z.string(),
    }).optional(),
    form: z.object({
      placeholder: z.string(),
      buttonText: z.string(),
    }).optional(),
    callBenefits: z.array(z.string()).optional(),
    callDetails: z.object({
      duration: z.string(),
      commitment: z.string(),
    }).optional(),
    security: z.string().optional(),
    Header: z.string().optional(),
    testimonials: z.array(z.object({
      name: z.string(),
      post: z.string(),
      title: z.string(),
      description: z.string(),
      rating: z.number(),
      verified: z.string().optional(),
    })).optional(),
    videoLink: z.string().optional(),
    guarantees: z.array(z.object({
      title: z.string(),
      description: z.string(),
    })).optional(),
    content: z.array(z.object({
      Q: z.string(),
      A: z.string(),
    })).optional(),
  })
});

const career = defineCollection({
  type: 'content',
  schema: z.object({
    position: z.string(),
    description: z.string(),
    type: z.string(),
    category: z.string(),
    location: z.string(),
    salaryRange: z.string(),
  })
});

const contact = defineCollection({
  type: 'content',
  schema: z.object({
    cards: z.array(z.object({
      title: z.string(),
      description: z.string(),
      icon: z.string(),
    })).optional(),
    mail: z.string().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
    header: z.string().optional(),
    description: z.string().optional(),
    client: z.object({
      name: z.string(),
      post: z.string(),
      testimonial: z.string(),
      image: z.string(),
    }).optional(),
  })
});

const notFound = defineCollection({
  type: 'content',
  schema: z.object({
    header: z.string(),
    description: z.string(),
    image: z.string(),
    button: z.object({
      text: z.string(),
      link: z.string(),
    }),
  })
});

const comingSoon = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    form: z.object({
      placeholder: z.string(),
      buttonText: z.string(),
    }),
    description: z.string(),
  })
});

const privacyPolicy = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
  })
});

const termsCondition = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
  })
});

const Pricing = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().optional(),
  })
});

const successStoriesPage = defineCollection({
  type: 'content',
  schema: z.object({
    header: z.string().optional(),
    content: z.string().optional(),
    preTitle: z.string().optional(),
    primaryButtonText: z.string().optional(),
    primaryButtonHref: z.string().optional(),
    secondaryButtonText: z.string().optional(),
    secondaryButtonHref: z.string().optional(),
  })
});

export const collections = {
  site,
  blogs,
  services,
  portfolio,
  aboutPage,
  IndexPage,
  career,
  contact,
  notFound,
  comingSoon,
  privacyPolicy,
  termsCondition,
  Pricing,
  successStoriesPage,
};