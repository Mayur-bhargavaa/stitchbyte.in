'use client';

import Link from 'next/link';

export default function ProjectShowcase() {
  const projects = [
    {
      id: 1,
      title: 'EcoTech Solutions',
      description: 'Sustainable technology marketplace',
      image: 'https://readdy.ai/api/search-image?query=modern%20ecommerce%20website%20sustainable%20technology%20products%20green%20clean%20interface%20minimalist%20design%20professional%20layout&width=400&height=300&seq=project-1&orientation=landscape',
      tech: ['WordPress', 'WooCommerce'],
      logo: 'https://readdy.ai/api/search-image?query=modern%20company%20logo%20eco%20tech%20green%20leaf%20symbol%20minimalist%20design%20professional%20branding&width=60&height=60&seq=logo-1&orientation=squarish',
      caseStudy: true
    },
    {
      id: 2,
      title: 'FitTrack Pro',
      description: 'Fitness tracking web application',
      image: 'https://readdy.ai/api/search-image?query=fitness%20tracking%20dashboard%20web%20app%20modern%20interface%20charts%20analytics%20health%20metrics%20clean%20design&width=400&height=300&seq=project-2&orientation=landscape',
      tech: ['Custom Code', 'React'],
      logo: 'https://readdy.ai/api/search-image?query=fitness%20app%20logo%20dumbbell%20symbol%20modern%20minimalist%20design%20professional%20branding&width=60&height=60&seq=logo-2&orientation=squarish',
      caseStudy: true
    },
    {
      id: 3,
      title: 'StyleHub Boutique',
      description: 'Fashion ecommerce store',
      image: 'https://readdy.ai/api/search-image?query=fashion%20ecommerce%20website%20elegant%20clothing%20store%20modern%20design%20product%20showcase%20clean%20interface&width=400&height=300&seq=project-3&orientation=landscape',
      tech: ['Shopify', 'Custom Theme'],
      logo: 'https://readdy.ai/api/search-image?query=fashion%20boutique%20logo%20elegant%20script%20font%20minimalist%20design%20professional%20branding&width=60&height=60&seq=logo-3&orientation=squarish',
      caseStudy: false
    },
    {
      id: 4,
      title: 'TechFlow CRM',
      description: 'Customer relationship management system',
      image: 'https://readdy.ai/api/search-image?query=crm%20dashboard%20interface%20modern%20business%20application%20clean%20design%20data%20visualization%20professional%20layout&width=400&height=300&seq=project-4&orientation=landscape',
      tech: ['Custom Code', 'Node.js'],
      logo: 'https://readdy.ai/api/search-image?query=tech%20company%20logo%20abstract%20geometric%20symbol%20modern%20minimalist%20design%20professional%20branding&width=60&height=60&seq=logo-4&orientation=squarish',
      caseStudy: true
    },
    {
      id: 5,
      title: 'FoodieExpress',
      description: 'Food delivery platform',
      image: 'https://readdy.ai/api/search-image?query=food%20delivery%20app%20interface%20modern%20design%20restaurant%20listings%20clean%20layout%20professional%20mobile%20first&width=400&height=300&seq=project-5&orientation=landscape',
      tech: ['WordPress', 'Custom Plugin'],
      logo: 'https://readdy.ai/api/search-image?query=food%20delivery%20logo%20chef%20hat%20symbol%20modern%20minimalist%20design%20professional%20branding&width=60&height=60&seq=logo-5&orientation=squarish',
      caseStudy: false
    },
    {
      id: 6,
      title: 'LearnSpace Academy',
      description: 'Online learning management system',
      image: 'https://readdy.ai/api/search-image?query=online%20learning%20platform%20interface%20modern%20education%20website%20clean%20design%20course%20layout%20professional&width=400&height=300&seq=project-6&orientation=landscape',
      tech: ['Custom Code', 'LMS'],
      logo: 'https://readdy.ai/api/search-image?query=education%20logo%20book%20graduation%20cap%20symbol%20modern%20minimalist%20design%20professional%20branding&width=60&height=60&seq=logo-6&orientation=squarish',
      caseStudy: true
    },
    {
      id: 7,
      title: 'FinanceFlow',
      description: 'Personal finance management app',
      image: 'https://readdy.ai/api/search-image?query=finance%20dashboard%20interface%20modern%20banking%20app%20clean%20design%20charts%20analytics%20professional%20layout&width=400&height=300&seq=project-7&orientation=landscape',
      tech: ['Custom Code', 'React'],
      logo: 'https://readdy.ai/api/search-image?query=finance%20app%20logo%20money%20graph%20symbol%20modern%20minimalist%20design%20professional%20branding&width=60&height=60&seq=logo-7&orientation=squarish',
      caseStudy: false
    },
    {
      id: 8,
      title: 'GreenGarden Store',
      description: 'Plant and gardening ecommerce',
      image: 'https://readdy.ai/api/search-image?query=gardening%20ecommerce%20website%20plant%20store%20modern%20design%20product%20showcase%20green%20theme%20clean%20interface&width=400&height=300&seq=project-8&orientation=landscape',
      tech: ['Shopify', 'Apps'],
      logo: 'https://readdy.ai/api/search-image?query=gardening%20store%20logo%20plant%20leaf%20symbol%20modern%20minimalist%20design%20professional%20branding&width=60&height=60&seq=logo-8&orientation=squarish',
      caseStudy: true
    }
  ];

  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
            Our Recent Work
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how we've helped startups and businesses launch their digital presence with modern, responsive websites and applications.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
              <div className="relative">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover object-top"
                />
                {project.caseStudy && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-[#2A8B8A] text-white px-3 py-1 rounded-full text-sm font-medium">
                      Case Study
                    </span>
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <img 
                    src={project.logo} 
                    alt={`${project.title} logo`}
                    className="w-8 h-8 rounded-full mr-3"
                  />
                  <h3 className="text-xl font-bold text-black">{project.title}</h3>
                </div>
                
                <p className="text-gray-600 mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-[#e6f6f6] text-[#2A8B8A] rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <Link 
                    href="/projects"
                    className="text-[#2A8B8A] hover:underline font-medium cursor-pointer"
                  >
                    View Project
                  </Link>
                  {project.caseStudy && (
                    <Link 
                      href="/projects"
                      className="text-gray-500 hover:text-[#2A8B8A] cursor-pointer"
                    >
                      <i className="ri-external-link-line"></i>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
            href="/projects"
            className="border-2 border-[#2A8B8A] text-[#2A8B8A] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#2A8B8A] hover:text-white transition-all duration-300 whitespace-nowrap cursor-pointer inline-block"
          >
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  );
}
