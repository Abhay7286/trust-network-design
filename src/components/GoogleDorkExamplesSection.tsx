
import { Copy, Search, Shield, Database, Globe, Eye, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const googleDorks = [
  // Basic Search Operators
  {
    syntax: 'site:example.com',
    description: 'Search within a specific domain or website',
    example: 'site:github.com security tools',
    category: 'Basic Operators',
    icon: Globe
  },
  {
    syntax: 'filetype:pdf',
    description: 'Find specific file types and formats',
    example: 'filetype:pdf cybersecurity handbook',
    category: 'Basic Operators',
    icon: Database
  },
  {
    syntax: 'intitle:"keyword"',
    description: 'Search for specific words in page titles',
    example: 'intitle:"admin panel" login',
    category: 'Basic Operators',
    icon: Search
  },
  {
    syntax: 'inurl:admin',
    description: 'Find pages with specific words in the URL',
    example: 'inurl:admin inurl:login',
    category: 'Basic Operators',
    icon: Search
  },

  // Directory Listings & Exposed Files
  {
    syntax: 'intitle:"index of"',
    description: 'Find open directory listings and file indexes',
    example: 'intitle:"index of" backup',
    category: 'Exposed Data',
    icon: Database
  },
  {
    syntax: 'ext:log',
    description: 'Find exposed log files that may contain sensitive data',
    example: 'ext:log "error" OR "exception"',
    category: 'Exposed Data',
    icon: Database
  },
  {
    syntax: 'ext:sql',
    description: 'Locate database dump files and SQL backups',
    example: 'ext:sql "INSERT INTO" users',
    category: 'Exposed Data',
    icon: Database
  },
  {
    syntax: 'filetype:env',
    description: 'Find environment configuration files with secrets',
    example: 'filetype:env "DB_PASSWORD"',
    category: 'Exposed Data',
    icon: Lock
  },

  // Login & Admin Pages
  {
    syntax: 'inurl:admin/login',
    description: 'Find admin login pages and control panels',
    example: 'inurl:admin/login site:company.com',
    category: 'Admin Access',
    icon: Shield
  },
  {
    syntax: 'intitle:"Dashboard" "admin"',
    description: 'Locate administrative dashboards and control panels',
    example: 'intitle:"Dashboard" "admin" "panel"',
    category: 'Admin Access',
    icon: Shield
  },
  {
    syntax: 'inurl:wp-admin',
    description: 'Find WordPress admin areas and login pages',
    example: 'inurl:wp-admin inurl:login',
    category: 'Admin Access',
    icon: Shield
  },
  {
    syntax: 'intitle:"phpMyAdmin"',
    description: 'Locate phpMyAdmin database management interfaces',
    example: 'intitle:"phpMyAdmin" "Welcome to phpMyAdmin"',
    category: 'Admin Access',
    icon: Database
  },

  // Configuration & Sensitive Files
  {
    syntax: 'filetype:xml | filetype:conf',
    description: 'Find configuration files that may contain credentials',
    example: 'filetype:xml "password" OR "username"',
    category: 'Configuration',
    icon: Lock
  },
  {
    syntax: 'ext:txt "password"',
    description: 'Search for text files containing passwords',
    example: 'ext:txt "password" OR "passwd" OR "pwd"',
    category: 'Configuration',
    icon: Lock
  },
  {
    syntax: 'filetype:backup',
    description: 'Find backup files that might contain sensitive data',
    example: 'filetype:backup database OR config',
    category: 'Configuration',
    icon: Database
  },
  {
    syntax: 'ext:bak | ext:old',
    description: 'Locate backup and old files with potential data exposure',
    example: 'ext:bak OR ext:old "config" OR "database"',
    category: 'Configuration',
    icon: Database
  },

  // Error Pages & Debug Info
  {
    syntax: '"Fatal error" "Warning"',
    description: 'Find error pages that reveal system information',
    example: '"Fatal error" "MySQL" "line"',
    category: 'Error Pages',
    icon: Search
  },
  {
    syntax: 'intitle:"Error" "SQL"',
    description: 'Locate SQL error pages that may expose database info',
    example: 'intitle:"Error" "SQL syntax" OR "mysql"',
    category: 'Error Pages',
    icon: Database
  },
  {
    syntax: '"Warning: include"',
    description: 'Find PHP include/require warnings with path disclosure',
    example: '"Warning: include" "failed to open stream"',
    category: 'Error Pages',
    icon: Search
  },

  // Social & Communication
  {
    syntax: 'site:pastebin.com "password"',
    description: 'Search paste sites for leaked credentials and data',
    example: 'site:pastebin.com "email" "password"',
    category: 'Data Leaks',
    icon: Eye
  },
  {
    syntax: 'site:github.com "API_KEY"',
    description: 'Find exposed API keys and secrets in code repositories',
    example: 'site:github.com "API_KEY" OR "SECRET_KEY"',
    category: 'Data Leaks',
    icon: Lock
  },
  {
    syntax: '"@gmail.com" filetype:xls',
    description: 'Find spreadsheets containing email addresses',
    example: '"@gmail.com" filetype:xls OR filetype:csv',
    category: 'Data Leaks',
    icon: Eye
  },

  // Advanced Combinations
  {
    syntax: 'inurl:"/phpmyadmin/" intitle:"Welcome"',
    description: 'Comprehensive search for accessible phpMyAdmin instances',
    example: 'inurl:"/phpmyadmin/" intitle:"Welcome to phpMyAdmin"',
    category: 'Advanced',
    icon: Database
  },
  {
    syntax: 'filetype:sql "INSERT INTO" "VALUES"',
    description: 'Find SQL dump files with actual data insertions',
    example: 'filetype:sql "INSERT INTO users" "VALUES"',
    category: 'Advanced',
    icon: Database
  },
  {
    syntax: 'site:*.edu filetype:pdf "confidential"',
    description: 'Search educational domains for confidential documents',
    example: 'site:*.edu filetype:pdf "confidential" OR "internal"',
    category: 'Advanced',
    icon: Lock
  }
];

const GoogleDorkExamplesSection = () => {
  const categories = [...new Set(googleDorks.map(dork => dork.category))];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <section id="google-dorks" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-black mb-6">
            Master Google Dork Techniques
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Advanced search operators for ethical cybersecurity research and penetration testing. 
            Use responsibly and only on systems you own or have permission to test.
          </p>
        </div>

        {categories.map((category) => (
          <div key={category} className="mb-20">
            <h3 className="text-3xl font-bold text-black mb-12 text-center">
              {category}
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {googleDorks
                .filter(dork => dork.category === category)
                .map((dork, index) => (
                  <Card 
                    key={index} 
                    className="bg-white border-2 border-gray-200 hover:border-black transition-all duration-300 hover:shadow-lg group"
                  >
                    <CardContent className="p-8">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-gray-100 rounded-xl group-hover:bg-gray-200 transition-colors">
                          <dork.icon className="text-black" size={24} />
                        </div>
                        <span className="text-sm text-gray-600 font-medium">{dork.category}</span>
                      </div>

                      <div className="mb-4">
                        <code className="text-lg font-mono text-black bg-gray-100 px-3 py-2 rounded-lg block overflow-x-auto">
                          {dork.syntax}
                        </code>
                      </div>

                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {dork.description}
                      </p>

                      <div className="mb-6">
                        <p className="text-sm text-gray-500 mb-2">Example:</p>
                        <code className="text-sm text-gray-700 bg-gray-50 px-2 py-1 rounded block overflow-x-auto">
                          {dork.example}
                        </code>
                      </div>

                      <div className="flex gap-3">
                        <Button
                          variant="outline"
                          className="flex-1 border-gray-200 text-gray-700 hover:bg-gray-100"
                          onClick={() => copyToClipboard(dork.syntax)}
                        >
                          <Copy size={16} className="mr-2" />
                          Copy
                        </Button>
                        <Button
                          className="flex-1 bg-black hover:bg-gray-800 text-white"
                          onClick={() => window.open(`https://google.com/search?q=${encodeURIComponent(dork.syntax)}`, '_blank')}
                        >
                          <Search size={16} className="mr-2" />
                          Search
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        ))}

        {/* Disclaimer */}
        <div className="mt-16 bg-gray-100 p-8 rounded-lg border-2 border-gray-200">
          <div className="text-center">
            <Shield className="mx-auto mb-4 text-black" size={32} />
            <h3 className="text-xl font-bold text-black mb-4">Ethical Use Disclaimer</h3>
            <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
              These Google Dorks are provided for educational and authorized security testing purposes only. 
              Always ensure you have proper authorization before conducting any security research. 
              Unauthorized access to systems is illegal and unethical.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoogleDorkExamplesSection;
