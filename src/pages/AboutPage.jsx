import React, { useState, useEffect } from 'react';
import { 
  Code, Database, Cpu, Palette, Layers, Zap, Github, 
  Linkedin, Mail, Star, Award, Coffee, Users, Target,
  Lightbulb, Heart, ChevronDown, ExternalLink
} from 'lucide-react';

const AboutPage = () => {
  const [activeTab, setActiveTab] = useState('team');
  const [hoveredMember, setHoveredMember] = useState(null);

  const teamMembers = [
    {
      name: "Himanshu Saxena",
      role: "Frontend Team Lead & Solutions Architect",
      team: "Frontend",
      description: "Leading the frontend architecture with expertise in modern web technologies and API integration. Passionate about creating seamless user experiences and scalable solutions.",
      skills: ["React.js", "TypeScript", "API Integration", "System Architecture", "Team Leadership"],
      icon: Layers,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
      achievements: ["Led 15+ successful projects", "Mentored 8 developers", "Architected microservices"]
    },
    {
      name: "Shanvi",
      role: "UI/UX Design Lead & Product Designer",
      team: "Frontend",
      description: "Crafting intuitive and beautiful user interfaces with a focus on user-centered design principles. Expert in creating design systems that scale.",
      skills: ["UI/UX Design", "Design Systems", "User Research", "Prototyping", "Visual Design"],
      icon: Palette,
      color: "from-pink-500 to-rose-500",
      bgColor: "bg-pink-50",
      textColor: "text-pink-600",
      achievements: ["Designed 20+ user interfaces", "98% user satisfaction", "Created unified design system"]
    },
    {
      name: "Shwe Win Aung",
      role: "Frontend Developer & Animation Specialist",
      team: "Frontend",
      description: "Bringing designs to life with smooth animations and interactive experiences. Specializes in modern frontend frameworks and creative web technologies.",
      skills: ["React.js", "CSS Animations", "Framer Motion", "Three.js", "Creative Coding"],
      icon: Zap,
      color: "from-purple-500 to-indigo-500",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
      achievements: ["Created 50+ animations", "Improved UX by 40%", "Built interactive demos"]
    },
    {
      name: "Bhishan Sharma",
      role: "AI/ML Engineer & Workflow Architect",
      team: "Backend",
      description: "Designing and implementing intelligent systems with advanced AI workflows. Expert in machine learning pipelines and automation technologies.",
      skills: ["Python", "Machine Learning", "AI Workflows", "MLOps", "Data Science"],
      icon: Cpu,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
      achievements: ["Built 12 ML models", "Automated 80% workflows", "Published 3 research papers"]
    },
    {
      name: "Akarsh Mishra",
      role: "Data Engineer & Integration Specialist",
      team: "Backend",
      description: "Managing complex data pipelines and integration workflows using n8n and various data sources. Expert in ETL processes and data transformation.",
      skills: ["Data Engineering", "n8n Automation", "ETL Pipelines", "API Integration", "Data Analytics"],
      icon: Database,
      color: "from-orange-500 to-amber-500",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600",
      achievements: ["Processed 10TB+ data", "Integrated 25+ APIs", "Reduced processing time by 60%"]
    },
    {
      name: "Himanshu Jha",
      role: "Backend Developer & Database Architect",
      team: "Backend",
      description: "Building robust backend systems with focus on database optimization and API development. Expert in scalable server architectures and data modeling.",
      skills: ["Node.js", "Database Design", "API Development", "System Optimization", "Cloud Services"],
      icon: Code,
      color: "from-teal-500 to-cyan-500",
      bgColor: "bg-teal-50",
      textColor: "text-teal-600",
      achievements: ["Optimized DB by 70%", "Built 100+ APIs", "Managed 5 production systems"]
    }
  ];

  const stats = [
    { label: "Projects Completed", value: "50+", icon: Award },
    { label: "Lines of Code", value: "100K+", icon: Code },
    { label: "Coffee Consumed", value: "2000+", icon: Coffee },
    { label: "Happy Clients", value: "25+", icon: Heart }
  ];

  const values = [
    {
      title: "Innovation First",
      description: "We embrace cutting-edge technologies and creative solutions to solve complex problems.",
      icon: Lightbulb,
      color: "text-yellow-600"
    },
    {
      title: "Collaborative Spirit",
      description: "Our diverse team works together, combining different perspectives for better outcomes.",
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Quality Focus",
      description: "We maintain high standards in code quality, design, and user experience.",
      icon: Target,
      color: "text-green-600"
    },
    {
      title: "Continuous Learning",
      description: "We stay updated with latest technologies and continuously improve our skills.",
      icon: Star,
      color: "text-purple-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-6">
            Meet Our Team
          </h1>
          <p className="text-xl text-neutral-600 min-w-2xl mx-auto mb-8">
            A passionate group of developers, designers, and engineers working together to create 
            innovative solutions and exceptional digital experiences.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-white/20">
                <stat.icon className="h-8 w-8 text-accent mx-auto mb-3" />
                <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-neutral-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="px-4 mb-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-full p-1 shadow-lg border border-neutral-200">
              {['team', 'values', 'story'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-8 py-3 rounded-full font-medium transition-all duration-300 capitalize ${
                    activeTab === tab
                      ? 'bg-accent text-white shadow-md'
                      : 'text-neutral-600 hover:text-accent'
                  }`}
                >
                  {tab === 'team' ? 'Our Team' : tab === 'values' ? 'Our Values' : 'Our Story'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      {activeTab === 'team' && (
        <section className="px-4 pb-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-primary mb-4">The Dream Team</h2>
              <p className="text-lg text-neutral-600 min-w-2xl mx-auto">
                Each member brings unique expertise and passion to create something extraordinary together.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="group relative bg-white rounded-3xl p-8 shadow-sm border border-neutral-200 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2"
                  onMouseEnter={() => setHoveredMember(index)}
                  onMouseLeave={() => setHoveredMember(null)}
                >
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${member.color} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`}></div>
                  
                  {/* Team Badge */}
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mb-4 ${member.bgColor} ${member.textColor}`}>
                    {member.team} Team
                  </div>

                  {/* Avatar */}
                  <div className={`w-20 h-20 rounded-2xl ${member.bgColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <member.icon className={`h-10 w-10 ${member.textColor}`} />
                  </div>

                  {/* Member Info */}
                  <h3 className="text-xl font-bold text-primary mb-2">{member.name}</h3>
                  <p className={`font-semibold mb-4 ${member.textColor}`}>{member.role}</p>
                  <p className="text-neutral-600 text-sm mb-6 leading-relaxed">{member.description}</p>

                  {/* Skills */}
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {member.skills.slice(0, 3).map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-3 py-1 bg-neutral-100 text-neutral-700 rounded-full text-xs font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                      {member.skills.length > 3 && (
                        <span className="px-3 py-1 bg-neutral-100 text-neutral-700 rounded-full text-xs font-medium">
                          +{member.skills.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Achievements - Show on Hover */}
                  <div className={`transition-all duration-500 ${
                    hoveredMember === index ? 'opacity-100 max-h-40' : 'opacity-0 max-h-0 overflow-hidden'
                  }`}>
                    <h4 className="font-semibold text-primary mb-2">Key Achievements</h4>
                    <ul className="space-y-1">
                      {member.achievements.map((achievement, achIndex) => (
                        <li key={achIndex} className="text-sm text-neutral-600 flex items-center">
                          <Star className="h-3 w-3 text-accent mr-2 flex-shrink-0" />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Social Links */}
                  <div className="flex space-x-3 mt-6 pt-6 border-t border-neutral-100">
                    <button className="p-2 text-neutral-400 hover:text-neutral-600 transition-colors">
                      <Github className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-neutral-400 hover:text-blue-600 transition-colors">
                      <Linkedin className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-neutral-400 hover:text-accent transition-colors">
                      <Mail className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Values Section */}
      {activeTab === 'values' && (
        <section className="px-4 pb-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-primary mb-4">Our Core Values</h2>
              <p className="text-lg text-neutral-600 min-w-2xl mx-auto">
                The principles that guide our work and shape our team culture.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-sm border border-neutral-200 hover:shadow-lg transition-all duration-300">
                  <div className={`w-16 h-16 rounded-2xl bg-neutral-50 flex items-center justify-center mb-6`}>
                    <value.icon className={`h-8 w-8 ${value.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-4">{value.title}</h3>
                  <p className="text-neutral-600 leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Story Section */}
      {activeTab === 'story' && (
        <section className="px-4 pb-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-primary mb-4">Our Story</h2>
              <p className="text-lg text-neutral-600">
                From individual expertise to collective excellence.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-neutral-200">
              <div className="prose prose-lg max-w-none">
                <p className="text-xl text-neutral-700 leading-relaxed mb-6">
                  Our team came together with a shared vision: to build innovative digital solutions 
                  that make a real difference. What started as individual expertise in different 
                  domains has evolved into a cohesive unit that thrives on collaboration and creativity.
                </p>
                
                <p className="text-neutral-600 leading-relaxed mb-6">
                  With diverse backgrounds spanning frontend development, backend architecture, AI/ML engineering, 
                  and design, we bring a unique perspective to every project. Our frontend team excels at 
                  creating intuitive user experiences, while our backend specialists ensure robust, 
                  scalable systems that power our applications.
                </p>

                <p className="text-neutral-600 leading-relaxed mb-8">
                  We believe in the power of technology to solve complex problems, but we also understand 
                  that the best solutions come from understanding people. That's why user experience, 
                  code quality, and innovative thinking are at the heart of everything we do.
                </p>

                <div className="bg-gradient-to-r from-accent/10 to-primary/10 rounded-2xl p-6 border-l-4 border-accent">
                  <p className="text-primary font-semibold text-lg italic">
                    "Great things are done by a series of small things brought together." 
                  </p>
                  <p className="text-neutral-600 mt-2">- Our team philosophy</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section 
      <section className="px-4 py-16 bg-gradient-to-r from-primary to-accent">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Work With Us?</h2>
          <p className="text-xl text-white/90 mb-8">
            Let's create something amazing together. Get in touch to discuss your next project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-primary px-8 py-3 rounded-full font-semibold hover:bg-neutral-100 transition-colors flex items-center justify-center">
              <Mail className="h-5 w-5 mr-2" />
              Get In Touch
            </button>
            <button className="bg-white/20 text-white px-8 py-3 rounded-full font-semibold hover:bg-white/30 transition-colors backdrop-blur-sm flex items-center justify-center">
              <ExternalLink className="h-5 w-5 mr-2" />
              View Our Work
            </button>
          </div>
        </div>
      </section>*/}
    </div>
  );
};

export default AboutPage;