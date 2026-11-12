// Everything about you that isn't a project, certificate or tool lives here.
// Edit text freely; the page updates on save.

export const SITE = {
  name: "Pooja Lingwat",
  shortName: "Pooja",
  role: "AI full stack developer",
  description:
    "Pooja Lingwat, AI full stack developer and CSE student at MIT-WPU, Pune. Selected for the Kohler AI Lab, SIH 2026 top 100.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://poojalingwat.vercel.app",
  email: "pooja.work102@gmail.com",
  github: "https://github.com/poojawork102",
  githubUser: "poojawork102",
  linkedin: "https://www.linkedin.com/in/pooja-lingwat-4a04b2255",
  resume: "/resume.pdf",
  location: "Pune, India",
  timezone: "IST (UTC+5:30)",
  status: "Open to tech internships",
};

export const HERO = {
  proof: [
    { value: "Selected", label: "Kohler AI Lab, MIT-WPU" },
    { value: "Top 100", label: "of 450+ teams, SIH 2026" },
    { value: "8.54", label: "CGPA, B.Tech CSE" },
  ],
  // **double stars** make a phrase bold
  intro:
    "I'm a third-year CSE student who builds **AI-powered full stack apps**, from the API to the screen. I take **ownership of every prompt and every line** that ships: I read it, test it and can explain why it's there.",
};

export const INTRO_TERMINAL = {
  question: "who is pooja lingwat?",
  lines: [
    { text: "POOJA LINGWAT", tone: "name" },
    { text: "AI Full Stack Developer / CSE @ MIT-WPU / Pune", tone: "dim" },
    { text: "Currently @ Kohler AI Lab. Also building things on my own.", tone: "plain" },
    { text: "Third year, specialising in Cloud Computing.", tone: "dim" },
    { text: "I own every prompt and every line I ship.", tone: "dim" },
    { text: "// Open to tech internships and placements.", tone: "accent" },
  ] as const,
  enter: "enter my portfolio",
  footer: "■ POOJA.LINGWAT ■ rev 2026.11",
};

export const ABOUT = {
  heading: "I like building the whole thing, not just one layer",
  paragraphs: [
    "I'm Pooja, studying Computer Science at **MIT World Peace University** in Pune with a specialisation in **Cloud Computing**. I enjoy taking an idea from a rough sketch to something people can actually use: the data model, the API, the AI part and the screen on top.",
    "I care about things working out of the box, so I write tests early and keep the stack simple. Outside projects, I've co-written a research paper on **brain-computer interfaces** and spent two semesters as an elected student representative.",
  ],
  now: [
    { label: "Building", text: "Plumbline's next version in the Kohler AI Lab" },
    { label: "Learning", text: "Docker, Jenkins and Kubernetes in my cloud and DevOps lab" },
    { label: "Preparing", text: "for placements and internships" },
  ],
  capabilities: [
    { title: "Full stack apps", text: "React, Flask, FastAPI, REST APIs, PostgreSQL, MySQL, Docker" },
    { title: "AI inside the app", text: "Gemini API, scikit-learn, Isolation Forest, computer vision, constraint solving" },
    { title: "Networking and security", text: "TCP sockets, checksums, risk scoring, bot detection" },
    {
      title: "Research",
      badge: "Accepted, ICSSCC-2026",
      text: "Review paper on EEG biomarkers and BCI designs for food craving detection, presented at the conference.",
    },
  ],
};

export const EDUCATION = {
  cgpa: "8.54",
  scale: "/ 10",
  degree: "B.Tech, Computer Science and Engineering",
  school: "MIT World Peace University, Pune. Specialising in Cloud Computing.",
  meta: "2024 to 2028, currently in third year",
};

export type Role = {
  when: string;
  tag?: string;
  place?: string;
  title: string;
  org: string;
  points: string[];
  tech?: string[];
};

export const EXPERIENCE: Role[] = [
  {
    when: "Sep 2026 to now",
    tag: "On-site",
    place: "Pune",
    title: "Member, Kohler AI Lab",
    org: "Kohler with MIT-WPU",
    points: [
      "Selected after an aptitude test across the CSE division, a prototype round of 100 and two interview rounds at Kohler's office.",
      "Extending Plumbline with more layout options, 3D views, role-based access and cloud saving.",
    ],
    tech: ["Python", "Flask", "Gemini API", "React", "PostgreSQL"],
  },
  {
    when: "Dec 2025 to Jan 2026",
    tag: "Research",
    title: "Student Researcher",
    org: "ICSSCC-2026, MIT-WPU",
    points: [
      "Co-authored a review paper on EEG biomarkers (LPP, P300, frontal alpha asymmetry, theta) for food craving detection.",
      "Paper accepted at ICSSCC-2026; presented it at the conference as a second-year student.",
    ],
    tech: ["EEG", "BCI", "Literature review"],
  },
  {
    when: "2025",
    tag: "1-week training",
    title: "Google AI Tools Training",
    org: "Google for Startups",
    points: [
      "Week-long hands-on programme on Google's AI tools: AI Studio, the Gemini API and NotebookLM.",
      "Ended with deploying a small AI web app on Cloud Run.",
    ],
    tech: ["Gemini API", "Cloud Run", "Prompt design"],
  },
];

export const LEADERSHIP = [
  {
    when: "Aug 2024 to May 2025",
    title: "Student Representative",
    org: "MIT World Peace University",
    text: "Elected by 90+ classmates to take academic issues to faculty for two semesters.",
  },
  {
    when: "Jul 2026",
    title: "Student Liaison",
    org: "Placement Cell, Alumni and International Relations",
    text: "Coordinated guest logistics, including UPSC rank holders, at university events with 500+ attendees.",
  },
  {
    when: "2025",
    title: "Squad Captain",
    org: "Life Realization Program, MIT-WPU",
    text: "Led a 50-member squad through a 7-day residential programme: schedules, drills and daily operations.",
  },
];

export const RECOGNITION = [
  {
    badge: "Selected",
    when: "Sep 2026",
    title: "Kohler AI Lab @ MIT-WPU",
    text: "Chosen through Kohler's own process for industry project work.",
    funnel: ["CSE aptitude test", "Top 100 prototypes", "Top 60 interviews", "Selected"],
  },
  {
    badge: "Top 100",
    when: "2026",
    title: "Smart India Hackathon 2026",
    text: "Q-Diagnostix, a quantum-classical ML idea for early detection of heart disease, Parkinson's and diabetes, reached the national round from 450+ teams.",
  },
  {
    badge: "Accepted",
    when: "Mar 2026",
    title: "ICSSCC-2026 paper",
    text: "Review of EEG-based BCIs for food craving detection in diabetic care, accepted and presented at MIT-WPU's international conference.",
  },
];

export const CONTACT = {
  heading: "Get in touch",
  sub: "Hiring for an internship, or want to talk through one of my projects? Send a message and I'll reply to your email.",
  openTo: "Tech internships: backend, AI, cloud",
  response: "Usually within 2 days",
  responseNote: "LinkedIn message is faster for anything urgent.",
};
