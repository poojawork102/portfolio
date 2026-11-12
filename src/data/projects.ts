// Projects. Add a new object to this list to add a project.
// - slug: used in the URL /projects/<slug>
// - image: put a screenshot in /public/projects/ and set image: "/projects/name.png" (it replaces the drawn preview)
// - featured: true shows the big card at the top

export type Project = {
  slug: string;
  name: string;
  category: string;
  summary: string;
  tech: string[];
  code?: string;
  demo?: string;
  image?: string;
  art?: string;
  featured?: boolean;
  details: { label: string; text: string }[];
};

export const PROJECTS: Project[] = [
  {
    slug: "plumbline",
    name: "Plumbline",
    category: "AI / Full Stack",
    summary: "Plain-English brief in, budget-checked bathroom floor plan out, in under two seconds.",
    tech: ["Python","Flask","Gemini API","Constraint solver","pytest"],
    code: "https://github.com/poojawork102/plumbline",
    demo: "https://youtu.be/HDnUypq6zeM",
    art: "plan",
    featured: true,
    details: [
      { label: "Problem", text: "Planning a bathroom means juggling space, fixtures, budget and water rules at once." },
      { label: "My part", text: "Solo build: brief parser, layout solver, Flask app and tests." },
      { label: "Key decision", text: "A verify, repair, fallback loop so the app never returns an impossible layout." },
      { label: "Result", text: "22 passing tests. Got me selected for the Kohler AI Lab." },
    ],
  },
  {
    slug: "qcsight",
    name: "QCSight",
    category: "Computer Vision / Hackathon",
    summary: "AI vision that inspects cabinets on a production line and flags defects before they ship.",
    tech: ["Python","Computer vision","Team of 4"],
    code: "https://github.com/pegasus1196/QCSight",
    art: "qc",
    details: [
      { label: "Problem", text: "Emerson's Project Eagle Eye: manual quality checks on cabinets are slow and miss small defects." },
      { label: "Event", text: "VIT Code Apex 3.0 hackathon, VIT Pune, built with Anjali, Piyush and Sid." },
      { label: "My part", text: "Presented our proposed solution in the team pitch. Confirm and add what you built." },
    ],
  },
  {
    slug: "data-shuffling-attack-detection",
    name: "Data Shuffling Attack Detection",
    category: "Security / Backend",
    summary: "Scores every request on an admission portal and routes it to allow, captcha or block.",
    tech: ["FastAPI","PostgreSQL","Isolation Forest","JWT","Docker"],
    code: "https://github.com/poojawork102/sem-project",
    art: "risk",
    details: [
      { label: "Problem", text: "Bots can resubmit and reorder admission data faster than staff can review it." },
      { label: "My part", text: "Team project. I designed the risk scoring and tested the system." },
      { label: "Key decision", text: "Weighted score (IP 40%, duplicates 30%, speed 30%) so only the middle tier needs a human." },
      { label: "Result", text: "Isolation Forest validated on simulated bot traffic, with JWT auth and daily audit logs." },
    ],
  },
  {
    slug: "securetransfer",
    name: "SecureTransfer",
    category: "Networking",
    summary: "TCP client and server that verify every file on arrival and resend anything corrupted.",
    tech: ["Python","TCP sockets","Checksums","Dashboard"],
    code: "https://github.com/poojawork102/securetransfer",
    art: "net",
    details: [
      { label: "Problem", text: "A file can arrive corrupted, and plain TCP will not tell you." },
      { label: "My part", text: "Solo build for the Computer Networks lab: client, server and live dashboard." },
      { label: "Key decision", text: "Dropped extra attack modes to keep one thing done properly: verified delivery." },
      { label: "Result", text: "Checksum check on every transfer, shown live on the dashboard." },
    ],
  },
  {
    slug: "unipocket",
    name: "UniPocket",
    category: "Full Stack",
    summary: "Student finance tracker with category budgets, over-limit alerts and weekly trends.",
    tech: ["Flask","MySQL","C++","Vercel"],
    code: "https://github.com/poojawork102",
    art: "money",
    details: [
      { label: "Problem", text: "Students lose track of small daily spends until the month is gone." },
      { label: "My part", text: "Solo build, deployed on Vercel for personal use." },
      { label: "Key decision", text: "11 MySQL triggers keep balances correct without manual checks." },
      { label: "Result", text: "Live tracker, plus a C++ desktop version that works offline." },
    ],
  },
];
