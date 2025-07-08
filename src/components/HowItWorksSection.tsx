
import { Card, CardContent } from "@/components/ui/card";

const steps = [
  {
    number: "1",
    title: "Browse Trusted Categories",
    description: "Explore our curated collection of cybersecurity providers, OSINT tools, and Google Dork techniques."
  },
  {
    number: "2",
    title: "Choose the Right Tool",
    description: "Find the perfect solution for your needs with detailed descriptions and user reviews."
  },
  {
    number: "3",
    title: "Visit the Source Confidently",
    description: "Access verified external resources knowing they've been vetted by cybersecurity professionals."
  }
];

const HowItWorksSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-black mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your simple path to cybersecurity resources
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step) => (
            <Card key={step.number} className="bg-white border-2 border-gray-100 text-center group hover:border-black transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 group-hover:bg-gray-800 transition-colors duration-300">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold text-black mb-4">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
