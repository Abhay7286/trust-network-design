
import { Copy, Lock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const GoogleDorkExamplesSection = () => {
  const googleDorks = [
    {
      syntax: "site:example.com",
      description: "Search within a specific domain",
      example: "site:github.com password",
      purpose: "Find all pages from a specific website"
    },
    {
      syntax: "filetype:pdf",
      description: "Search for specific file types",
      example: "filetype:pdf confidential",
      purpose: "Locate documents of specific formats"
    },
    {
      syntax: "intitle:\"index of\"",
      description: "Find directory listings",
      example: "intitle:\"index of\" private",
      purpose: "Discover exposed directories"
    },
    {
      syntax: "inurl:admin",
      description: "Search within URLs",
      example: "inurl:admin login",
      purpose: "Find admin panels and login pages"
    },
    {
      syntax: "ext:sql",
      description: "Search for file extensions",
      example: "ext:sql \"password\"",
      purpose: "Find database files or backups"
    },
    {
      syntax: "cache:example.com",
      description: "View cached version of a page",
      example: "cache:example.com/secret",
      purpose: "Access cached content that may be removed"
    },
    {
      syntax: "intext:\"confidential\"",
      description: "Search within page content",
      example: "intext:\"confidential\" filetype:doc",
      purpose: "Find documents with specific text content"
    },
    {
      syntax: "allintitle:admin panel",
      description: "All words must appear in title",
      example: "allintitle:admin panel login",
      purpose: "Find pages with all specified words in title"
    },
    {
      syntax: "allinurl:wp-content upload",
      description: "All words must appear in URL",
      example: "allinurl:wp-content upload",
      purpose: "Find WordPress upload directories"
    },
    {
      syntax: "inurl:\"php?id=\"",
      description: "Find potential SQL injection points",
      example: "inurl:\"php?id=\" \"error\"",
      purpose: "Discover vulnerable web applications"
    },
    {
      syntax: "ext:log",
      description: "Find exposed log files",
      example: "ext:log \"error\" site:example.com",
      purpose: "Locate system and application log files"
    },
    {
      syntax: "inurl:ftp -inurl:http -inurl:https",
      description: "Find FTP directories",
      example: "inurl:ftp -inurl:http site:example.com",
      purpose: "Discover FTP file listings"
    },
    {
      syntax: "\"Index of /backup\"",
      description: "Find backup directories",
      example: "\"Index of /backup\" password",
      purpose: "Locate backup file directories"
    },
    {
      syntax: "filetype:env \"DB_PASSWORD\"",
      description: "Find environment files with database passwords",
      example: "filetype:env \"DB_PASSWORD\" site:github.com",
      purpose: "Discover exposed environment configuration files"
    },
    {
      syntax: "intitle:\"Welcome to nginx!\"",
      description: "Find default nginx installations",
      example: "intitle:\"Welcome to nginx!\" server",
      purpose: "Identify unconfigured web servers"
    },
    {
      syntax: "inurl:\"/phpmyadmin/\"",
      description: "Find phpMyAdmin installations",
      example: "inurl:\"/phpmyadmin/\" \"Welcome to phpMyAdmin\"",
      purpose: "Locate database management interfaces"
    },
    {
      syntax: "ext:xls \"password\"",
      description: "Find Excel files containing passwords",
      example: "ext:xls \"password\" \"username\"",
      purpose: "Discover spreadsheets with credential information"
    },
    {
      syntax: "intitle:\"Apache Status\"",
      description: "Find Apache server status pages",
      example: "intitle:\"Apache Status\" \"server uptime\"",
      purpose: "Access Apache server information pages"
    },
    {
      syntax: "\"powered by\" inurl:admin",
      description: "Find admin panels by CMS",
      example: "\"powered by WordPress\" inurl:admin",
      purpose: "Identify content management system admin areas"
    },
    {
      syntax: "intext:\"mysql_connect\"",
      description: "Find PHP files with database connections",
      example: "intext:\"mysql_connect\" filetype:php",
      purpose: "Discover PHP files containing database connection code"
    },
    {
      syntax: "ext:cfg \"password\"",
      description: "Find configuration files with passwords",
      example: "ext:cfg \"password\" \"username\"",
      purpose: "Locate configuration files containing credentials"
    },
    {
      syntax: "inurl:\"server-status\"",
      description: "Find Apache server status information",
      example: "inurl:\"server-status\" \"Apache Server Status\"",
      purpose: "Access detailed Apache server statistics"
    },
    {
      syntax: "filetype:properties \"password\"",
      description: "Find Java properties files with passwords",
      example: "filetype:properties \"jdbc.password\"",
      purpose: "Discover Java application configuration files"
    },
    {
      syntax: "\"Index of\" intext:\"Parent Directory\"",
      description: "Find open directory listings",
      example: "\"Index of\" intext:\"Parent Directory\" documents",
      purpose: "Locate accessible file directory structures"
    }
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <section id="google-dork-examples" className="py-20 bg-gray-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-6">
            Advanced Google Dork Examples
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Master these powerful search operators to enhance your OSINT capabilities 
            and cybersecurity research skills for ethical purposes only.
          </p>
        </div>

        {/* Google Dorks Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {googleDorks.map((dork, index) => (
            <Card key={index} className="bg-gray-900 border-gray-700 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg group">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg text-white group-hover:text-purple-400 transition-colors font-mono">
                    {dork.syntax}
                  </CardTitle>
                  <button
                    onClick={() => copyToClipboard(dork.syntax)}
                    className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                    title="Copy to clipboard"
                  >
                    <Copy size={16} className="text-gray-400 hover:text-purple-400" />
                  </button>
                </div>
                <CardDescription className="text-gray-400">
                  {dork.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Example:</p>
                    <code className="text-sm bg-gray-800 text-green-400 px-3 py-2 rounded-lg block font-mono break-all">
                      {dork.example}
                    </code>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Purpose:</p>
                    <p className="text-sm text-gray-300">{dork.purpose}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 max-w-4xl mx-auto">
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white text-xl flex items-center gap-2">
                <Lock className="text-red-400" size={24} />
                ⚠️ Legal and Ethical Use Only
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-4">
                These Google Dork techniques should only be used for legitimate purposes such as 
                security research, bug hunting on systems you own or have permission to test, 
                and educational purposes. Unauthorized access to systems or data is illegal and unethical.
              </p>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• Always respect privacy and follow applicable laws and regulations</li>
                <li>• Only test on systems you own or have explicit permission to test</li>
                <li>• Use findings responsibly and report vulnerabilities through proper channels</li>
                <li>• Consider the impact of your research on individuals and organizations</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default GoogleDorkExamplesSection;
