
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        duration: 0.8,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="container mx-auto px-6 text-center">
        <motion.div 
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            className="text-5xl lg:text-7xl font-bold mb-8 leading-tight"
            variants={itemVariants}
          >
            Your Gateway to Cybersecurity Intelligence
          </motion.h1>
          
          <motion.p 
            className="text-xl lg:text-2xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto"
            variants={itemVariants}
          >
            Explore trusted tools, verified service providers, and powerful OSINT techniques — all in one place.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center"
            variants={containerVariants}
          >
            <motion.div variants={buttonVariants}>
              <Link to="/providers">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button className="bg-white text-black hover:bg-gray-100 px-8 py-6 text-lg font-semibold rounded-lg transition-all duration-300 min-w-[200px] hover:shadow-lg hover:shadow-white/20">
                    🔍 Find Providers
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
            <motion.div variants={buttonVariants}>
              <Link to="/osint">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button 
                    variant="outline" 
                    className="border-2 border-black bg-black text-white hover:bg-gray-800 hover:border-gray-800 px-8 py-6 text-lg font-semibold rounded-lg transition-all duration-300 min-w-[200px] hover:shadow-lg hover:shadow-black/20"
                  >
                    🧠 Learn OSINT
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
