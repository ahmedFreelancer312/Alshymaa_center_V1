export interface Feature {
    icon: React.ReactNode;
    title: string;
    description: string;
    color: string;
  }
  
  export interface Step {
    step: string;
    icon: React.ReactNode;
    title: string;
    description: string;
    color: string;
  }
  
  export interface Testimonial {
    quote: string;
    name: string;
    role: string;
    rating: number;
  }
  
  export interface FAQItem {
    question: string;
    answer: string;
  }
  
  export interface PricingPlan {
    name: string;
    price: string;
    description: string;
    features: string[];
    isPopular?: boolean;
    buttonText: string;
    buttonVariant: 'primary' | 'secondary';
  }

  // CardComponent Props
  export interface CardComponentProps {
    title: string;
    count: number | string;
    icon?: React.ReactNode;
    iconClass?: string;
    link?: string;
    colorClass?: string;
    children?: React.ReactNode;
  }
  

  export interface RecentlyUploadedFilesCardProps {
    fileName: string;
    date: string;
    icon?: React.ReactNode;
    course?: string;
    fileUrl : string
  }

  export interface UpcomingScheduleCardProps {
    title: string;
    course: string;
    time: string;
  }
  

  export interface CourseProps {
    id: number;
    name: string;
    department: string;
    instructor: string;
    lecturesCount: number;
    // image: string;
    // progress: number;
  }

  export interface AssignmentProps {
    id: string;
    title: string;
    course: string;
    grade: string;
    uploadDate: string;
    dueDate: string;
    pdfUrl: string;
    status: string;
  }