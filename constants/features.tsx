import { AiFillPieChart, AiOutlineTeam } from 'react-icons/ai';
import { BsBarChartFill, BsServer } from 'react-icons/bs';
import { GrOrganization } from 'react-icons/gr';
import { GiLockSpy } from 'react-icons/gi';
import { MdDarkMode } from 'react-icons/md';

// constants/features.ts
export const features = [
  {
    heading: 'Branded QR menus',
    description:
      'Customize logo, colors, and layout so your digital menu feels like an extension of your brand, not a generic template.',
    icon: <AiFillPieChart className="text-primary h-4 w-4 relative z-50" />,
  },
  {
    heading: 'Multiple menus & sections',
    description:
      'Create breakfast, lunch, seasonal or special event menus with flexible sections and item organization.',
    icon: <BsBarChartFill className="text-primary h-4 w-4 relative z-50" />,
  },
  {
    heading: 'Real-time updates',
    description:
      'Change prices, hide sold-out items, or add new dishes and see them update instantly for every guest.',
    icon: <AiOutlineTeam className="text-primary h-4 w-4 relative z-50" />,
  },
  {
    heading: 'Multi-language ready',
    description:
      'Store translations per item and show guests the right language based on how they access your menu.',
    icon: <BsServer className="text-primary h-4 w-4 relative z-50" />,
  },
  {
    heading: 'Guest insights & analytics',
    description:
      'See which items are viewed the most, which sections guests spend time on, and how your menu performs over time.',
    icon: <GiLockSpy className="text-primary h-4 w-4 relative z-50" />,
  },
  {
    heading: 'Video-first menus (coming soon)',
    description:
      'Show dishes as short, vertical videos for a richer experience and higher engagement, coming in a future release.',
    icon: <MdDarkMode className="text-primary h-4 w-4 relative z-50" />,
  },
];
