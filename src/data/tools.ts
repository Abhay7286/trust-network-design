
export interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  type: "Free" | "Open Source" | "Paid" | "Freemium";
  trustScore: number;
  githubStars: number;
  website: string;
  github?: string;
  tags: string[];
  lastUpdated: string;
  submittedBy: string;
  votes: number;
  relatedTools: string[];
}

export const tools: Tool[] = [
  // OSINT Tools
  {
    id: "shodan",
    name: "Shodan",
    description: "Search engine for Internet-connected devices and services",
    category: "OSINT",
    type: "Freemium",
    trustScore: 4.8,
    githubStars: 0,
    website: "https://shodan.io",
    tags: ["network-scanning", "iot", "search", "reconnaissance"],
    lastUpdated: "2024-01-15",
    submittedBy: "admin",
    votes: 1250,
    relatedTools: ["censys", "maltego"]
  },
  {
    id: "maltego",
    name: "Maltego",
    description: "Link analysis tool for data mining and visualization",
    category: "OSINT",
    type: "Freemium",
    trustScore: 4.6,
    githubStars: 0,
    website: "https://maltego.com",
    tags: ["data-mining", "visualization", "investigation", "graph-analysis"],
    lastUpdated: "2024-01-10",
    submittedBy: "admin",
    votes: 890,
    relatedTools: ["shodan", "spiderfoot"]
  },
  {
    id: "censys",
    name: "Censys",
    description: "Internet-wide asset discovery and attack surface management",
    category: "OSINT",
    type: "Freemium",
    trustScore: 4.7,
    githubStars: 0,
    website: "https://censys.io",
    tags: ["asset-discovery", "attack-surface", "reconnaissance"],
    lastUpdated: "2024-01-12",
    submittedBy: "admin",
    votes: 720,
    relatedTools: ["shodan", "masscan"]
  },
  {
    id: "spiderfoot",
    name: "SpiderFoot",
    description: "Automated OSINT collection tool",
    category: "OSINT",
    type: "Open Source",
    trustScore: 4.5,
    githubStars: 12500,
    website: "https://spiderfoot.net",
    github: "https://github.com/smicallef/spiderfoot",
    tags: ["automation", "osint", "reconnaissance", "footprinting"],
    lastUpdated: "2024-01-14",
    submittedBy: "community",
    votes: 650,
    relatedTools: ["maltego", "recon-ng"]
  },
  {
    id: "recon-ng",
    name: "Recon-ng",
    description: "Web reconnaissance framework with independent modules",
    category: "OSINT",
    type: "Open Source",
    trustScore: 4.4,
    githubStars: 3200,
    website: "https://github.com/lanmaster53/recon-ng",
    github: "https://github.com/lanmaster53/recon-ng",
    tags: ["reconnaissance", "framework", "modules", "web"],
    lastUpdated: "2024-01-08",
    submittedBy: "community",
    votes: 480,
    relatedTools: ["spiderfoot", "theharvester"]
  },

  // Scanners
  {
    id: "nmap",
    name: "Nmap",
    description: "Network discovery and security auditing tool",
    category: "Scanners",
    type: "Open Source",
    trustScore: 4.9,
    githubStars: 8500,
    website: "https://nmap.org",
    github: "https://github.com/nmap/nmap",
    tags: ["network-scanning", "port-scanning", "service-detection"],
    lastUpdated: "2024-01-16",
    submittedBy: "admin",
    votes: 2100,
    relatedTools: ["masscan", "zmap"]
  },
  {
    id: "masscan",
    name: "Masscan",
    description: "TCP port scanner, spews SYN packets asynchronously",
    category: "Scanners",
    type: "Open Source",
    trustScore: 4.6,
    githubStars: 23000,
    website: "https://github.com/robertdavidgraham/masscan",
    github: "https://github.com/robertdavidgraham/masscan",
    tags: ["port-scanning", "fast-scanning", "network"],
    lastUpdated: "2024-01-11",
    submittedBy: "community",
    votes: 890,
    relatedTools: ["nmap", "zmap"]
  },
  {
    id: "nuclei",
    name: "Nuclei",
    description: "Fast and customizable vulnerability scanner",
    category: "Scanners",
    type: "Open Source",
    trustScore: 4.8,
    githubStars: 19000,
    website: "https://nuclei.projectdiscovery.io",
    github: "https://github.com/projectdiscovery/nuclei",
    tags: ["vulnerability-scanning", "templates", "automation"],
    lastUpdated: "2024-01-17",
    submittedBy: "admin",
    votes: 1540,
    relatedTools: ["nessus", "openvas"]
  },
  {
    id: "nessus",
    name: "Nessus",
    description: "Comprehensive vulnerability assessment solution",
    category: "Scanners",
    type: "Paid",
    trustScore: 4.7,
    githubStars: 0,
    website: "https://tenable.com/products/nessus",
    tags: ["vulnerability-assessment", "compliance", "enterprise"],
    lastUpdated: "2024-01-13",
    submittedBy: "admin",
    votes: 1200,
    relatedTools: ["nuclei", "openvas"]
  },
  {
    id: "openvas",
    name: "OpenVAS",
    description: "Open source vulnerability assessment platform",
    category: "Scanners",
    type: "Open Source",
    trustScore: 4.5,
    githubStars: 3400,
    website: "https://openvas.org",
    github: "https://github.com/greenbone/openvas-scanner",
    tags: ["vulnerability-assessment", "open-source", "gvm"],
    lastUpdated: "2024-01-09",
    submittedBy: "community",
    votes: 780,
    relatedTools: ["nessus", "nuclei"]
  },

  // Red Teaming
  {
    id: "metasploit",
    name: "Metasploit",
    description: "Penetration testing framework",
    category: "Red Teaming",
    type: "Freemium",
    trustScore: 4.8,
    githubStars: 33000,
    website: "https://metasploit.com",
    github: "https://github.com/rapid7/metasploit-framework",
    tags: ["penetration-testing", "exploitation", "framework"],
    lastUpdated: "2024-01-18",
    submittedBy: "admin",
    votes: 1890,
    relatedTools: ["cobalt-strike", "empire"]
  },
  {
    id: "cobalt-strike",
    name: "Cobalt Strike",
    description: "Adversary simulation and red team operations platform",
    category: "Red Teaming",
    type: "Paid",
    trustScore: 4.6,
    githubStars: 0,
    website: "https://cobaltstrike.com",
    tags: ["red-team", "adversary-simulation", "c2"],
    lastUpdated: "2024-01-14",
    submittedBy: "admin",
    votes: 950,
    relatedTools: ["metasploit", "empire"]
  },
  {
    id: "empire",
    name: "Empire",
    description: "Post-exploitation agent built on cryptologically-secure communications",
    category: "Red Teaming",
    type: "Open Source",
    trustScore: 4.4,
    githubStars: 7200,
    website: "https://github.com/EmpireProject/Empire",
    github: "https://github.com/EmpireProject/Empire",
    tags: ["post-exploitation", "agent", "powershell"],
    lastUpdated: "2024-01-07",
    submittedBy: "community",
    votes: 620,
    relatedTools: ["metasploit", "cobalt-strike"]
  },
  {
    id: "bloodhound",
    name: "BloodHound",
    description: "Active Directory reconnaissance and attack path mapping",
    category: "Red Teaming",
    type: "Open Source",
    trustScore: 4.7,
    githubStars: 9800,
    website: "https://bloodhound.readthedocs.io",
    github: "https://github.com/BloodHoundAD/BloodHound",
    tags: ["active-directory", "reconnaissance", "attack-path"],
    lastUpdated: "2024-01-15",
    submittedBy: "community",
    votes: 1100,
    relatedTools: ["sharphound", "mimikatz"]
  },

  // SOC Tools
  {
    id: "splunk",
    name: "Splunk",
    description: "Data platform for security information and event management",
    category: "SOC Tools",
    type: "Paid",
    trustScore: 4.5,
    githubStars: 0,
    website: "https://splunk.com",
    tags: ["siem", "log-analysis", "security-monitoring"],
    lastUpdated: "2024-01-16",
    submittedBy: "admin",
    votes: 1340,
    relatedTools: ["elastic-stack", "qradar"]
  },
  {
    id: "elastic-stack",
    name: "Elastic Stack",
    description: "Search and analytics engine for security monitoring",
    category: "SOC Tools",
    type: "Freemium",
    trustScore: 4.6,
    githubStars: 69000,
    website: "https://elastic.co/elastic-stack",
    github: "https://github.com/elastic/elasticsearch",
    tags: ["elk", "log-analysis", "search", "visualization"],
    lastUpdated: "2024-01-17",
    submittedBy: "admin",
    votes: 1520,
    relatedTools: ["splunk", "graylog"]
  },
  {
    id: "osquery",
    name: "osquery",
    description: "SQL-based operating system instrumentation framework",
    category: "SOC Tools",
    type: "Open Source",
    trustScore: 4.4,
    githubStars: 21000,
    website: "https://osquery.io",
    github: "https://github.com/osquery/osquery",
    tags: ["endpoint-monitoring", "sql", "instrumentation"],
    lastUpdated: "2024-01-12",
    submittedBy: "community",
    votes: 890,
    relatedTools: ["kolide", "fleet"]
  },
  {
    id: "suricata",
    name: "Suricata",
    description: "Network IDS, IPS and Network Security Monitoring engine",
    category: "SOC Tools",
    type: "Open Source",
    trustScore: 4.5,
    githubStars: 4200,
    website: "https://suricata.io",
    github: "https://github.com/OISF/suricata",
    tags: ["ids", "ips", "network-monitoring"],
    lastUpdated: "2024-01-13",
    submittedBy: "admin",
    votes: 720,
    relatedTools: ["snort", "zeek"]
  },

  // Threat Intelligence
  {
    id: "misp",
    name: "MISP",
    description: "Threat intelligence platform for sharing, storing and correlating IOCs",
    category: "Threat Intelligence",
    type: "Open Source",
    trustScore: 4.6,
    githubStars: 5100,
    website: "https://misp-project.org",
    github: "https://github.com/MISP/MISP",
    tags: ["threat-intelligence", "ioc", "sharing"],
    lastUpdated: "2024-01-14",
    submittedBy: "admin",
    votes: 980,
    relatedTools: ["opencti", "yara"]
  },
  {
    id: "opencti",
    name: "OpenCTI",
    description: "Open cyber threat intelligence platform",
    category: "Threat Intelligence",
    type: "Open Source",
    trustScore: 4.5,
    githubStars: 6200,
    website: "https://opencti.io",
    github: "https://github.com/OpenCTI-Platform/opencti",
    tags: ["threat-intelligence", "cti", "knowledge-graph"],
    lastUpdated: "2024-01-15",
    submittedBy: "admin",
    votes: 670,
    relatedTools: ["misp", "stix"]
  },
  {
    id: "yara",
    name: "YARA",
    description: "Pattern matching engine for malware identification",
    category: "Threat Intelligence",
    type: "Open Source",
    trustScore: 4.7,
    githubStars: 8100,
    website: "https://virustotal.github.io/yara/",
    github: "https://github.com/virustotal/yara",
    tags: ["malware-detection", "pattern-matching", "rules"],
    lastUpdated: "2024-01-16",
    submittedBy: "admin",
    votes: 1230,
    relatedTools: ["clamav", "volatility"]
  },
  {
    id: "virustotal",
    name: "VirusTotal",
    description: "File and URL analysis service for malware detection",
    category: "Threat Intelligence",
    type: "Freemium",
    trustScore: 4.8,
    githubStars: 0,
    website: "https://virustotal.com",
    tags: ["malware-analysis", "file-scanning", "threat-detection"],
    lastUpdated: "2024-01-17",
    submittedBy: "admin",
    votes: 1560,
    relatedTools: ["hybrid-analysis", "joe-sandbox"]
  }
];

export const getToolsByCategory = (category: string) => {
  if (category === "all") return tools;
  return tools.filter(tool => tool.category.toLowerCase().replace(" ", "-") === category);
};

export const getToolsByType = (type: string) => {
  if (type === "all") return tools;
  return tools.filter(tool => tool.type.toLowerCase().replace(" ", "-") === type);
};

export const searchTools = (query: string) => {
  const lowercaseQuery = query.toLowerCase();
  return tools.filter(tool => 
    tool.name.toLowerCase().includes(lowercaseQuery) ||
    tool.description.toLowerCase().includes(lowercaseQuery) ||
    tool.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};

export const getToolById = (id: string) => {
  return tools.find(tool => tool.id === id);
};

export const getRelatedTools = (toolId: string) => {
  const tool = getToolById(toolId);
  if (!tool) return [];
  return tools.filter(t => tool.relatedTools.includes(t.id));
};
