import { FiArrowRight } from 'react-icons/fi';
import { Feature } from '../types';
import { FaBook, FaCalendarAlt, FaChartLine, FaClipboardList, FaUsers} from 'react-icons/fa';
import { 
  FaFileAlt, 
} from 'react-icons/fa';

const features: Feature[] = [
  {
    icon: <FaClipboardList className="text-4xl text-primary" />,
    title: "Assignment Tracker",
    description: "Never miss a deadline with color-coded priority levels and automated reminders for all your coursework.",
    color: "bg-background-secondary"
  },
  {
    icon: <FaBook className="text-4xl text-success" />,
    title: "Smart Study Planner",
    description: "AI-powered scheduling that adapts to your learning pace and exam dates for optimal retention.",
    color: "bg-background-secondary"
  },
  {
    icon: <FaUsers className="text-4xl text-primary-dark" />,
    title: "Group Collaboration",
    description: "Real-time document sharing and task delegation for group projects with version history.",
    color: "bg-background-secondary"
  },
  {
    icon: <FaCalendarAlt className="text-4xl text-error" />,
    title: "Exam Countdown",
    description: "Visual timeline with daily study targets and personalized revision recommendations.",
    color: "bg-background-secondary"
  },
  {
    icon: <FaChartLine className="text-4xl text-warning" />,
    title: "Grade Analytics",
    description: "Predictive grading and performance trends across all your courses with improvement suggestions.",
    color: "bg-background-secondary"
  },
  {
    icon: <FaFileAlt className="text-4xl text-primary" />,
    title: "Digital Notebook",
    description: "Organize lecture notes with multimedia support and smart search across all your materials.",
    color: "bg-background-secondary"
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 bg-background-secondary">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-text">Powerful Features Designed for Students</h2>
          <p className="mt-4 text-xl text-text-secondary max-w-3xl mx-auto">
            Everything you need to stay organized, productive, and ahead in your studies.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {features.map((feature, index) => (
            <div key={index} className={`p-8 rounded-xl ${feature.color} hover:shadow-md transition`}>
              <div className="w-16 h-16 flex items-center justify-center rounded-lg bg-background shadow-sm">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mt-6 text-text">{feature.title}</h3>
              <p className="mt-2 text-text-secondary">{feature.description}</p>
              <button className="mt-4 flex items-center text-primary font-medium">
                Learn more <FiArrowRight className="ml-2" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;