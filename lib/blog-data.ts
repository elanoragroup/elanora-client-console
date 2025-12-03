export interface BlogPost {
    id: string
    slug: string
    title: string
    excerpt: string
    content: string
    coverImage: string
    date: string
    author: {
        name: string
        avatar: string
        role: string
    }
    category: string
    readTime: string
    tags: string[]
    featured?: boolean
}

export const categories = [
    'All',
    'Accounting',
    'Tax',
    'Legal',
    'HR',
    'Technology',
    'Business'
]

export const blogPosts: BlogPost[] = [
    {
        id: '1',
        slug: 'future-of-accounting-automation',
        title: 'The Future of Accounting: How Automation is Changing the Game',
        excerpt: 'Discover how AI and automation are reshaping the accounting landscape and what it means for your business finances.',
        content: `
      <p>The accounting industry is undergoing a massive transformation, driven by artificial intelligence and automation technologies. Gone are the days of manual data entry and tedious reconciliations.</p>
      
      <h2>The Rise of AI in Accounting</h2>
      <p>Artificial Intelligence is revolutionizing how we handle financial data. From automated invoice processing to predictive analytics, AI tools are helping businesses make smarter financial decisions faster than ever before.</p>
      
      <h2>Benefits of Automation</h2>
      <ul>
        <li><strong>Reduced Errors:</strong> Automated systems significantly reduce the risk of human error in data entry and calculations.</li>
        <li><strong>Time Savings:</strong> Tasks that used to take hours can now be completed in minutes.</li>
        <li><strong>Real-time Insights:</strong> Get instant access to your financial health with real-time reporting.</li>
      </ul>
      
      <h2>What This Means for Business Owners</h2>
      <p>For business owners, this shift means more time to focus on growth and strategy rather than getting bogged down in paperwork. It also means having access to better financial insights to drive decision-making.</p>
    `,
        coverImage: 'https://images.unsplash.com/photo-1554224155-9d4d54619dca?w=800&h=500&fit=crop',
        date: '2025-03-15',
        author: {
            name: 'Sarah Johnson',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
            role: 'Senior Accountant'
        },
        category: 'Accounting',
        readTime: '5 min read',
        tags: ['Automation', 'AI', 'Future of Work'],
        featured: true
    },
    {
        id: '2',
        slug: 'tax-planning-strategies-2025',
        title: 'Essential Tax Planning Strategies for Small Businesses in 2025',
        excerpt: 'Stay ahead of the curve with these crucial tax planning strategies designed to maximize your deductions and minimize liability.',
        content: `
      <p>Effective tax planning is a year-round activity, not just something to think about in April. Here are the key strategies for 2025.</p>
      
      <h2>Maximize Deductions</h2>
      <p>Ensure you're taking advantage of all available deductions, including the new green energy credits and digital transformation incentives.</p>
      
      <h2>Retirement Planning</h2>
      <p>Contributing to retirement plans is still one of the best ways to lower your taxable income while building for the future.</p>
    `,
        coverImage: 'https://images.unsplash.com/photo-1586486855514-8c633cc6fd38?w=800&h=500&fit=crop',
        date: '2025-03-10',
        author: {
            name: 'Michael Chen',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
            role: 'Tax Consultant'
        },
        category: 'Tax',
        readTime: '7 min read',
        tags: ['Tax Tips', 'Small Business', 'Finance'],
        featured: true
    },
    {
        id: '3',
        slug: 'navigating-employment-laws',
        title: 'Navigating Complex Employment Laws: A Guide for Startups',
        excerpt: 'Understanding employment laws is critical for startups. Learn about the latest regulations and how to stay compliant.',
        content: `
      <p>Employment laws are constantly evolving. For startups, staying compliant can be a daunting task. This guide breaks down the essentials.</p>
      
      <h2>Key Compliance Areas</h2>
      <p>From wage and hour laws to workplace safety regulations, we cover the critical areas every startup founder needs to know.</p>
    `,
        coverImage: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=800&h=500&fit=crop',
        date: '2025-03-05',
        author: {
            name: 'Emily Rodriguez',
            avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop',
            role: 'Legal Advisor'
        },
        category: 'Legal',
        readTime: '6 min read',
        tags: ['Compliance', 'Startups', 'Employment Law'],
        featured: false
    },
    {
        id: '4',
        slug: 'remote-work-culture',
        title: 'Building a Strong Remote Work Culture',
        excerpt: 'Remote work is here to stay. Learn how to foster a positive and productive culture for your distributed team.',
        content: `
      <p>Building a culture without a physical office requires intention and creativity. Here's how successful companies are doing it.</p>
    `,
        coverImage: 'https://images.unsplash.com/photo-1593642632823-8f78536788c6?w=800&h=500&fit=crop',
        date: '2025-02-28',
        author: {
            name: 'David Kim',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
            role: 'HR Specialist'
        },
        category: 'HR',
        readTime: '4 min read',
        tags: ['Remote Work', 'Culture', 'Management'],
        featured: false
    },
    {
        id: '5',
        slug: 'cybersecurity-essentials',
        title: 'Cybersecurity Essentials for Modern Businesses',
        excerpt: 'Protect your business data with these fundamental cybersecurity practices that every company should implement.',
        content: `
      <p>Cyber threats are increasing in sophistication. Protecting your business requires a proactive approach to security.</p>
    `,
        coverImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=500&fit=crop',
        date: '2025-02-20',
        author: {
            name: 'Alex Turner',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
            role: 'Tech Consultant'
        },
        category: 'Technology',
        readTime: '8 min read',
        tags: ['Security', 'Technology', 'Data Protection'],
        featured: false
    },
    {
        id: '6',
        slug: 'scaling-your-business',
        title: 'Strategies for Scaling Your Business Sustainably',
        excerpt: 'Growth is good, but sustainable growth is better. Discover strategies to scale your operations without breaking the bank.',
        content: `
      <p>Scaling a business involves more than just increasing sales. It requires scalable processes, systems, and teams.</p>
    `,
        coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop',
        date: '2025-02-15',
        author: {
            name: 'Sarah Johnson',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
            role: 'Senior Accountant'
        },
        category: 'Business',
        readTime: '6 min read',
        tags: ['Growth', 'Strategy', 'Management'],
        featured: false
    }
]
