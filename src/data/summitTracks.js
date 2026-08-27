import enterpriseImg from '@/assets/images/summit-card.webp'
import serviceImg from '@/assets/images/tabs/tab-service.webp'
import gamedevImg from '@/assets/images/tabs/tab-gamedev.webp'
import aiNativeImg from '@/assets/images/tabs/tab-ainative.webp'
import cardStartupSummit from '@/assets/images/tabs/card-startup-summit.webp'
import cardStartupGeneric from '@/assets/images/tabs/card-startup-generic.webp'
import cardJapan from '@/assets/images/tabs/card-japan.webp'
import cardOts from '@/assets/images/tabs/card-ots.webp'
import cardMideast from '@/assets/images/tabs/card-mideast.webp'
import cardSabriya from '@/assets/images/tabs/card-sabriya.webp'
import cardAws from '@/assets/images/tabs/card-aws.webp'

/**
 * Summit yo'nalishlari — Figmadagi olti holatdan olingan.
 * `layout: 'detail'` — meta panel + katta karta; `layout: 'grid'` — tadbir kartalari.
 * Grid kartalarida `span` 6 ustunli setkadagi kenglik (3 = yarim, 2 = uchdan bir).
 */
export const SUMMIT_TRACKS = [
  {
    tab: 'Enterprise Uzbekistan',
    layout: 'detail',
    title: 'Enterprise Uzbekistan Summit',
    meta: ['September 23,2026', '10:00 - 12:00', 'CAEx, Hall 1'],
    image: enterpriseImg,
    imageAlt: 'Enterprise Uzbekistan Summit session',
    promo: {
      title: 'Enterprise Uzbekistan Summit',
      text: 'Legally protected testing environment for new business models and frontier technologies.',
    },
    lead: "Discover Enterprise Uzbekistan — the country's first dedicated jurisdiction built for global technology business.",
    bullets: [
      'Running on elements of English and Welsh law, it offers a legal environment that locks in the day you enter and remains guaranteed through 2100 — for IT exporters, data centers, startups, and infrastructure and institutional investors alike.',
      "On September 23, Enterprise Uzbekistan takes the stage at ICT Week to open the framework up in person. Meet the people building it, see how it's structured, and get a first look at what it means to operate inside it.",
      'Join us at CAEx, Main Hall — come see it before everyone else does.',
    ],
    audience: 'global tech companies, investors, legal and financial advisors, and government officials',
  },

  {
    tab: 'Startup & VC',
    layout: 'grid',
    title: 'Startup & Venture summit',
    cards: [
      {
        span: 2,
        image: cardStartupSummit,
        title: 'Startup & Venture Summit',
        meta: ['Sep 22, 2026', '14:00 - 17:00', 'CAEX, Main Hall'],
        text: "The flagship gathering of Central Asia's startup ecosystem — bringing together founders, investors and government leaders to discuss the region's next stage of growth",
      },
      {
        span: 2,
        image: cardStartupGeneric,
        title: 'Startup Blink Awards',
        meta: ['Sep 23, 2026', '16:00 - 18:00', 'CAEX, Hall 3'],
        text: 'An official award ceremony celebrating the top-performing startup ecosystems and ecosystem builders shaping the global innovation landscape.',
      },
      {
        span: 2,
        image: cardStartupGeneric,
        title: 'Startup World Cup - Uzbekistan Regional Final',
        meta: ['Sep 24, 2026', '10:00 - 17:00', 'CAEX, Main Hall'],
        text: "The regional final of the world's largest startup competition, where top regional startups compete for a spot in the global final and a share of $1M+ in investment.",
      },
      {
        span: 3,
        image: cardStartupGeneric,
        title: 'Ignyte Challenge',
        meta: ['Sep 25, 2026', '11:00 - 13:00', 'CAEX, Hall 3'],
        text: 'A high-energy pitch competition in partnership with DIFC Innovation Hub and IGNYTE connecting ambitious startups with international investors and industry experts.',
      },
      {
        span: 3,
        image: cardStartupGeneric,
        title: 'Taqdimot (Startup Pitches)',
        meta: ['Sep 25, 2026', '14:00 - 17:00', 'CAEX, Hall 2'],
        text: 'Live pitch sessions showcasing promising global startups to investors, corporates and ecosystem partners, serving as a match-making platform.',
      },
    ],
  },

  {
    tab: 'Service Companies',
    layout: 'detail',
    title: 'Tech & Service outsourcing conference',
    meta: ['September 23, 2026', '12:00-14:00', 'CAEx, Hall 3'],
    image: serviceImg,
    imageAlt: 'Tech and service outsourcing conference hall',
    promo: {
      title: 'Regulatory Sandbox',
      text: 'Legally protected testing environment for new business models and frontier technologies.',
    },
    lead: 'Explore the future of global services and outsourcing from the heart of Central Asia. Discover why Uzbekistan is the next big outsourcing destination for ITES companies and investment.',
    bullets: [
      'Insights into 0% tax breaks for companies',
      'Access a multilingual, tech-savvy workforce of 21 million+',
      'Special IT visa and 3-year zero-cost office support program',
    ],
    audience: 'outsourcing companies, IT leaders, global service providers, investors, and government officials',
  },

  {
    tab: 'Global Bridge',
    layout: 'grid',
    title: 'Global Bridge',
    cards: [
      {
        span: 3,
        image: cardJapan,
        title: 'Uzbek-Japan Digital Community Forum',
        meta: ['September 22, 2026', '15:00 - 18:00', 'CAEX, Hall 3'],
        text: 'Explore new opportunities for collaboration between Uzbekistan and Japan in the ICT sector, from joint software development to talent exchange and market entry support.',
        bullets: [
          "Insights into Japan's approach to IT outsourcing partnerships",
          'Access to a growing pool of Uzbek IT talent for Japanese companies',
          'Government-backed support for bilateral tech initiatives',
        ],
        audience: 'Japanese tech companies, IT leaders, government officials and investors',
      },
      {
        span: 3,
        image: cardOts,
        title: 'OTS Technology forum',
        meta: ['September 23, 2026', '12:00 - 14:00', 'CAEX, Hall 2'],
        text: 'The forum unites key stakeholders from the Organization of Turkic States (OTS) to advance cooperation in digital innovation and startup ecosystems.',
        bullets: [
          'Government-led innovation ecosystem insights',
          'Panel on startup support and cross-border growth',
          'Strategic networking across the OTS innovation ecosystem',
        ],
        audience:
          'Government representatives, technology parks, innovation agencies, startup ecosystem leaders, investors, founders',
      },
      {
        span: 2,
        image: cardMideast,
        title: 'Uzbekistan - Middle east tech summit',
        meta: ['Sep 24, 2026', '14:00 - 16:30', 'IT Park Complex'],
        text: "The Summit connects Uzbekistan's tech ecosystem with Middle Eastern investors to expand IT exports and unlock new growth in the MENA region.",
        bullets: [
          'Investment into Uzbekistan IT and digital infrastructure sector',
          'Market entry of Middle Eastern technology companies into Central Asia',
          'Expansion of Uzbek startups and IT service companies into GCC markets',
        ],
        audience: 'Women entrepreneurs, developers, investors and ecosystem partners',
      },
      {
        span: 2,
        image: cardSabriya,
        title: 'Sabriya: Women in Digital Economy',
        meta: ['Sep 24, 2026', '14:00 - 16:30', 'CAEX, Hall 3'],
        text: "Discover Sabriya — IT Park's initiative empowering women to lead and grow in the digital economy across Uzbekistan and beyond.",
        bullets: [
          'Insights into funding and mentorship programs for women-led startups',
          'Access to a growing network of female founders and tech leaders',
          'Practical guidance on career growth in tech',
        ],
        audience: 'Women entrepreneurs, developers, investors and ecosystem partners',
      },
      {
        span: 2,
        image: cardAws,
        title: 'AWS Community Day',
        meta: ['Sep 25, 2026', '10:00 - 17:00', 'CAEX, Main Hall'],
        text: 'Join a full day of cloud technology talks and hands-on sessions led by AWS experts and the regional developer community.',
        bullets: [
          'Insights into the latest AWS services and cloud architecture',
          'Access to real-world case studies from cloud practitioners',
          'Networking with developers, architects and DevOps engineers',
        ],
        audience: 'Developers, cloud architects, DevOps engineers and IT leaders',
      },
    ],
  },

  {
    tab: 'Gamedev',
    layout: 'detail',
    title: 'GameGap: Gamedev conference',
    meta: ['September 25, 2026', '14:00 - 17:00', 'CAEx, Hall 3'],
    image: gamedevImg,
    imageAlt: 'GameGap gamedev conference stage',
    lead: "Discover the future of gaming from the heart of Central Asia. Explore why Uzbekistan's GameDev ecosystem is becoming a key hub for studios, publishers and investors in the region.",
    bullets: [
      'Insights from world-class gaming industry experts',
      'Access to a growing regional talent pool and gaming market',
      'Networking with publishers, investors and studio founders',
    ],
    audience: 'game developers, publishers, investors, gaming executives and industry professionals',
  },

  {
    tab: 'AI Native',
    layout: 'detail',
    title: 'AI NATIVE: IDEAS TO INNOVATION',
    meta: ['September 24, 2026', '10:00 – 12:15', 'CAEx, Hall 3'],
    image: aiNativeImg,
    imageAlt: 'AI Native conference with robotics demo',
    lead: 'Step into a world where AI thinks, speaks, creates, and moves — from intelligent agents and LLMs to cloud technologies and real-world robotics.',
    bullets: [
      'Experience LLMs and cloud AI in action with live, hands-on demos',
      'See robotics on stage — from working prototypes to AI built for real jobs',
      'Step into the arena yourself with “Join the AI Game” and discover study programs, career opportunities, and hackathons',
    ],
    audience: 'AI developers, tech founders, robotics innovators, enterprise IT leaders, and students',
  },
]
