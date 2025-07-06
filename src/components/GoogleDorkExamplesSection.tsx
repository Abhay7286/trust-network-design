
import { Copy, AlertTriangle } from "lucide-react";
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
      syntax: "\"password\" filetype:txt",
      description: "Combine operators for specific searches",
      example: "\"password\" filetype:txt site:pastebin.com",
      purpose: "Find text files containing passwords"
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
      syntax: "\"Index of /\" password",
      description: "Find exposed password files",
      example: "\"Index of /\" \"password.txt\"",
      purpose: "Locate password files in open directories"
    },
    {
      syntax: "inurl:\"php?id=\"",
      description: "Find potential SQL injection points",
      example: "inurl:\"php?id=\" \"error\"",
      purpose: "Discover vulnerable web applications"
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
            Common Google Dork Examples
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Master these advanced search operators to enhance your OSINT capabilities 
            and cybersecurity research skills.
          </p>
        </div>

        {/* Disclaimer */}
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 mb-12 max-w-4xl mx-auto">
          <div className="flex items-start gap-3">
            <AlertTriangle className="text-red-400 mt-1" size={20} />
            <div>
              <h3 className="text-red-400 font-semibold mb-2">⚠️ Legal and Ethical Use Only</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                These Google Dork techniques should only be used for legitimate purposes such as 
                security research, bug hunting on systems you own or have permission to test, 
                and educational purposes. Unauthorized access to systems or data is illegal and unethical. 
                Always respect privacy and follow applicable laws and regulations.
              </p>
            </div>
          </div>
        </div>

        {/* Google Dorks Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {googleDorks.map((dork, index) => (
            <Card key={index} className="bg-gray-900 border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg group">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg text-white group-hover:text-blue-400 transition-colors">
                    {dork.syntax}
                  </CardTitle>
                  <button
                    onClick={() => copyToClipboard(dork.syntax)}
                    className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                    title="Copy to clipboard"
                  >
                    <Copy size={16} className="text-gray-400 hover:text-blue-400" />
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
                    <code className="text-sm bg-gray-800 text-green-400 px-3 py-2 rounded-lg block font-mono">
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

        {/* Additional Tips */}
        <div className="mt-16 max-w-4xl mx-auto">
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white text-xl">💡 Pro Tips for Effective Google Dorking</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  <span>Combine multiple operators for more precise results (e.g., site:example.com filetype:pdf)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">•</span>
                  <span>Use quotes for exact phrase matching ("admin panel")</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">•</span>
                  <span>Try variations of keywords and synonyms for comprehensive searches</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400">•</span>
                  <span>Use the minus operator (-) to exclude unwanted results</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">•</span>
                  <span>Always verify findings through legitimate channels before reporting</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default GoogleDorkExamplesSection;
