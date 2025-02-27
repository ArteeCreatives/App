import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Animated,
  TextInput,
  Platform,
  Dimensions,
  StatusBar,
  Switch,
  Modal,
  Linking,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather, FontAwesome, MaterialIcons, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { PanGestureHandler } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');

const PortfolioApp = () => {
  // State management
  const [activeTab, setActiveTab] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [contactModalVisible, setContactModalVisible] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filterCategory, setFilterCategory] = useState('All');
  const [expandedProject, setExpandedProject] = useState(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [installPromptVisible, setInstallPromptVisible] = useState(false);

  // Animated values for UI transitions
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const menuSlideAnim = useRef(new Animated.Value(0)).current;
  const headerOpacity = useRef(new Animated.Value(1)).current;
  const scrollY = useRef(new Animated.Value(0)).current;
  
  // References
  const scrollViewRef = useRef(null);

  // Auto-close install prompt after 5 seconds
  useEffect(() => {
    if (Platform.OS === 'web') {
      // Simulate PWA install prompt after 3 seconds
      const timer = setTimeout(() => {
        setInstallPromptVisible(true);
        
        // Auto-hide after 5 seconds
        const hideTimer = setTimeout(() => {
          setInstallPromptVisible(false);
        }, 5000);
        
        return () => clearTimeout(hideTimer);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  // Handle menu animation
  useEffect(() => {
    Animated.timing(menuSlideAnim, {
      toValue: isMenuOpen ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isMenuOpen]);

  // Handle scroll animation for header
  useEffect(() => {
    Animated.timing(headerOpacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [activeTab]);

  // PORTFOLIO DATA
  // About data
  const aboutData = {
    name: "Hrushikesh Areti",
    title: "Graphic Designer & Photographer",
    bio: "I'm a versatile creative professional specializing in graphic design and photography. My passion lies in capturing moments that reveal hidden stories and raw emotions, while merging creativity with precision to communicate impactful ideas.",
    experience: 2,
    projects: 30,
    clients: 10,
    skills: ["Graphic Design", "Photography", "Brand Identity", "Editing","Web Design", "Social Media"],
    profileImage: "https://iili.io/3JM8lMG.md.jpg"
  };

  // Services data
  const servicesData = [
    {
      category: "Design",
      items: [
        "Poster Design", 
        "Logos", 
        "Brochures", 
        "Business Cards", 
        "Billboards", 
        "Book Covers", 
        "Book Layouts", 
        "Letterheads"
      ]
    },
    {
      category: "Digital",
      items: [
        "YouTube Thumbnails", 
        "Social Media Posts", 
        "Web Design", 
        "Blog Images", 
        "Landing Pages", 
        "Podcast Covers", 
        "PPT Presentations", 
        "Simple Infographics"
      ]
    },
    {
      category: "Photography",
      items: [
        "AI Photo Editing", 
        "Product Mock-ups", 
        "Headshots", 
        "Event Photography",
        "Cinematic Photo Editing",
      ]
    },
    {
      category: "Marketing",
      items: [
        "Festival Posters", 
        "Business Reports", 
        "Adv Posters", 
        "Magazine Covers", 
        "Event Invitations", 
        "Flyers & Posters", 
        "Package Labels", 
        "Restaurant Menus"
      ]
    }
  ];

  // Portfolio projects data
  const portfolioProjects = [
    {
      id: "1",
      title: "Champions High School Branding",
      category: "Branding",
      image: "https://api.a0.dev/assets/image?text=school%20branding%20design%20with%20logo%20and%20stationary%20professional%20education%20brand%20identity&aspect=16:9&seed=111",
      description: "Complete brand identity for Champions High School including logo design, stationery, and promotional materials.",
      client: "Champions High School",
      tags: ["Logo Design", "Brand Identity", "Print Design"],
      year: "2023"
    },
    {
      id: "2",
      title: "Astra Consultants Annual Report",
      category: "Print",
      image: "https://api.a0.dev/assets/image?text=professional%20business%20annual%20report%20design%20with%20graphs%20and%20corporate%20layout&aspect=16:9&seed=222",
      description: "Professional annual report design with custom infographics and corporate branding elements for Astra Consultants.",
      client: "Astra Consultants",
      tags: ["Report Design", "Infographics", "Corporate"],
      year: "2022"
    },
    {
      id: "3",
      title: "Vision of God Campaign",
      category: "Social Media",
      image: "https://api.a0.dev/assets/image?text=church%20social%20media%20campaign%20designs%20for%20religious%20organization&aspect=16:9&seed=333",
      description: "Social media campaign for Vision of God church featuring consistent design elements across multiple platforms.",
      client: "Vision of God",
      tags: ["Social Media", "Campaign", "Religious"],
      year: "2023"
    },
    {
      id: "4",
      title: "Genius Public School Yearbook",
      category: "Print",
      image: "https://api.a0.dev/assets/image?text=school%20yearbook%20design%20with%20student%20photos%20and%20memories%20education%20publication&aspect=16:9&seed=444",
      description: "Creative yearbook design for Genius Public School featuring custom layouts and photography.",
      client: "Genius Public School",
      tags: ["Publication", "Layout Design", "Photography"],
      year: "2022"
    },
    {
      id: "5",
      title: "CSI KMR Event Materials",
      category: "Marketing",
      image: "https://api.a0.dev/assets/image?text=event%20materials%20design%20banners%20brochures%20and%20promotional%20items&aspect=16:9&seed=555",
      description: "Comprehensive event materials including banners, brochures, and digital assets for CSI KMR's annual conference.",
      client: "CSI KMR",
      tags: ["Event Design", "Print", "Digital"],
      year: "2023"
    },
    {
      id: "6",
      title: "Milestone Technologies Website",
      category: "Web Design",
      image: "https://api.a0.dev/assets/image?text=technology%20company%20website%20design%20modern%20UI%20corporate%20tech%20web%20design&aspect=16:9&seed=666",
      description: "Modern website design for Milestone Technologies showcasing their services and technological solutions.",
      client: "Milestone Technologies",
      tags: ["Web Design", "UI/UX", "Corporate"],
      year: "2022"
    },
    {
      id: "7",
      title: "Sarojinidevi Product Photography",
      category: "Photography",
      image: "https://api.a0.dev/assets/image?text=product%20photography%20for%20retail%20items%20professional%20catalog%20photos&aspect=16:9&seed=777",
      description: "High-quality product photography for Sarojinidevi Innovations' new product line, including post-processing and retouching.",
      client: "Sarojinidevi Innovations",
      tags: ["Photography", "Product", "Editing"],
      year: "2023"
    },
    {
      id: "8",
      title: "Kennedy International Rebrand",
      category: "Branding",
      image: "https://api.a0.dev/assets/image?text=corporate%20rebranding%20project%20with%20logo%20redesign%20and%20brand%20guidelines&aspect=16:9&seed=888",
      description: "Complete rebranding project for Kennedy International, including logo redesign, brand guidelines, and marketing materials.",
      client: "Kennedy International",
      tags: ["Rebrand", "Logo Design", "Brand Identity"],
      year: "2022"
    }
  ];

  // Clients data
  const clientsData = [
    { id: "1", name: "Champions High School", image: "https://iili.io/JP3aCQ4.png" },
    { id: "2", name: "Genius Public School", image: "https://iili.io/JP3R8mv.png" },
    { id: "3", name: "Indian Public School", image: "https://iili.io/JP3c0DG.md.png" },
    { id: "4", name: "P.P School", image: "https://iili.io/JP3lHJt.md.png" },
    { id: "5", name: "Milestone Technologies", image: "https://iili.io/2dJiddP.png" },
    { id: "6", name: "Vision of God", image: "https://iili.io/JP3hHdv.jpg" },
    { id: "7", name: "Sarojinidevi Innovations", image: "https://iili.io/JP30T3N.png" },
    { id: "8", name: "CSI KMR", image: "https://iili.io/JPFfdTF.jpg" },
    { id: "9", name: "Astra Consultants", image: "https://iili.io/JinktlS.jpg" },
    { id: "10", name: "Kennedy International", image: "https://iili.io/JP3iLWg.jpg" }
  ];

  // Get unique categories for portfolio filters
  const portfolioCategories = ['All', ...new Set(portfolioProjects.map(project => project.category))];

  // Filter projects based on selected category
  const filteredProjects = filterCategory === 'All' 
    ? portfolioProjects 
    : portfolioProjects.filter(project => project.category === filterCategory);

  // Handle contact form submission
 const handleContactSubmit = async (e) => {
  e.preventDefault(); // Prevent default form submission behavior

  const errors = {};
  if (!contactForm.name.trim()) errors.name = "Name is required";
  if (!contactForm.email.trim()) errors.email = "Email is required";
  else if (!/\S+@\S+\.\S+/.test(contactForm.email)) errors.email = "Email is invalid";
  if (!contactForm.message.trim()) errors.message = "Message is required";

  setFormErrors(errors);

  if (Object.keys(errors).length === 0) {
    setIsSubmitting(true);

    try {
      const response = await fetch("https://formsubmit.co/arteecreatives@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          name: contactForm.name,
          email: contactForm.email,
          message: contactForm.message,
        }),
      });

      if (response.ok) {
        setContactForm({ name: "", email: "", message: "" });
        setIsSubmitting(false);
        setContactModalVisible(false);
        alert("Thank you for your message! I'll get back to you soon.");
      } else {
        throw new Error("Failed to send message.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  }
};


  // Handle scroll to section
  const scrollToSection = (section) => {
    // Close menu if open
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
    
    // Set active tab
    setActiveTab(section);
    
    // Scroll to top of screen
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
  };

  // Open project details
  const openProjectDetails = (project) => {
    setExpandedProject(project);
    setDetailModalVisible(true);
  };

  // Determine theme colors
  const theme = {
    background: '#121212',
    surface: '#1E1E1E',
    surfaceAlt: '#2D2D2D',
    textPrimary: '#FFFFFF',
    textSecondary: '#B3B3B3',
    accent: '#FF5733',
    accentLight: '#FF8C66',
    accentDark: '#CC4427',
    divider: 'rgba(255,255,255,0.12)',
  };

  // Render active screen based on tab
  const renderScreen = () => {
    switch (activeTab) {
      case 'home':
        return (
          <View style={styles.screenContainer}>
            {/* Hero Section */}
            <View style={styles.heroSection}>
              <LinearGradient
                colors={['rgba(255, 87, 51, ', 'rgba(204, 68, 39, 0.9)']}
                style={styles.heroGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.heroContent}>
                  <Image 
                    source={{ uri: aboutData.profileImage }} 
                    style={styles.heroImage} 
                  />
                  <Text style={styles.heroName}>{aboutData.name}</Text>
                  <Text style={styles.heroTitle}>{aboutData.title}</Text>
                  
                  <View style={styles.heroButtons}>
                    <TouchableOpacity 
                      style={[styles.heroButton, styles.primaryButton]}
                      onPress={() => scrollToSection('portfolio')}
                    >
                      <Text style={styles.primaryButtonText}>View Portfolio</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                      style={[styles.heroButton, styles.outlineButton]}
                      onPress={() => setContactModalVisible(true)}
                    >
                      <Text style={styles.outlineButtonText}>Contact Me</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </LinearGradient>
            </View>
            
            {/* About Section */}
            <View style={styles.sectionContainer}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>About Me</Text>
                <View style={styles.titleUnderline} />
              </View>
              
              <Text style={styles.aboutBio}>{aboutData.bio}</Text>
              
              <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>{aboutData.experience}+</Text>
                  <Text style={styles.statLabel}>Years Experience</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>{aboutData.projects}+</Text>
                  <Text style={styles.statLabel}>Projects Completed</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>{aboutData.clients}+</Text>
                  <Text style={styles.statLabel}>Happy Clients</Text>
                </View>
              </View>
              
              <View style={styles.skillsContainer}>
                <Text style={styles.skillsTitle}>My Skills</Text>
                <View style={styles.skillsList}>
                  {aboutData.skills.map((skill, index) => (
                    <View key={index} style={styles.skillItem}>
                      <Text style={styles.skillText}>{skill}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
            
            {/* Services Highlights */}
            <View style={styles.servicesHighlight}>
              <LinearGradient
                colors={['rgba(46, 46, 46, 0.9)', 'rgba(30, 30, 30, 0.95)']}
                style={styles.servicesGradient}
              >
                <View style={styles.servicesHighlightContent}>
                  <Text style={styles.servicesHighlightTitle}>Professional Creative Services</Text>
                  <Text style={styles.servicesHighlightText}>
                    I offer a comprehensive range of design and photography services to help your brand stand out.
                  </Text>
                  
                  <TouchableOpacity 
                    style={styles.servicesHighlightButton}
                    onPress={() => scrollToSection('services')}
                  >
                    <Text style={styles.servicesHighlightButtonText}>Explore Services</Text>
                    <MaterialIcons name="arrow-forward" size={18} color={theme.accent} />
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </View>
            
            {/* Featured Projects */}
            <View style={styles.sectionContainer}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Featured Work</Text>
                <View style={styles.titleUnderline} />
              </View>
              
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.featuredScroll}
                contentContainerStyle={styles.featuredScrollContent}
              >
                {portfolioProjects.slice(0, 4).map((project) => (
                  <TouchableOpacity 
                    key={project.id} 
                    style={styles.featuredItem}
                    onPress={() => openProjectDetails(project)}
                  >
                    <Image 
                      source={{ uri: project.image }}
                      style={styles.featuredImage}
                    />
                    <View style={styles.featuredOverlay}>
                      <Text style={styles.featuredTitle}>{project.title}</Text>
                      <Text style={styles.featuredCategory}>{project.category}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              
              <TouchableOpacity 
                style={styles.viewAllButton}
                onPress={() => scrollToSection('portfolio')}
              >
                <Text style={styles.viewAllButtonText}>View All Projects</Text>
              </TouchableOpacity>
            </View>
            
            {/* Contact Call to Action */}
            <View style={styles.contactCTA}>
              <LinearGradient
                colors={['rgba(255, 87, 51, 0.9)', 'rgba(204, 68, 39, 1)']}
                style={styles.contactGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.contactCTAContent}>
                  <Text style={styles.contactCTATitle}>Ready to start your project?</Text>
                  <Text style={styles.contactCTAText}>
                    Let's collaborate to bring your creative vision to life.
                  </Text>
                  
                  <TouchableOpacity 
                    style={styles.contactCTAButton}
                    onPress={() => setContactModalVisible(true)}
                  >
                    <Text style={styles.contactCTAButtonText}>Get in Touch</Text>
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </View>
          </View>
        );
        
      case 'portfolio':
        return (
          <View style={styles.screenContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>My Portfolio</Text>
              <View style={styles.titleUnderline} />
            </View>
            
            {/* Category Filters */}
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.filterContainer}
              contentContainerStyle={styles.filterContent}
            >
              {portfolioCategories.map((category, index) => (
                <TouchableOpacity 
                  key={index}
                  style={[
                    styles.filterItem,
                    filterCategory === category && styles.filterItemActive
                  ]}
                  onPress={() => setFilterCategory(category)}
                >
                  <Text 
                    style={[
                      styles.filterText,
                      filterCategory === category && styles.filterTextActive
                    ]}
                  >
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            
            {/* Portfolio Grid */}
            <View style={styles.portfolioGrid}>
              {filteredProjects.map((project) => (
                <TouchableOpacity 
                  key={project.id}
                  style={styles.portfolioItem}
                  onPress={() => openProjectDetails(project)}
                >
                  <Image 
                    source={{ uri: project.image }}
                    style={styles.portfolioImage}
                  />
                  <View style={styles.portfolioOverlay}>
                    <Text style={styles.portfolioTitle}>{project.title}</Text>
                    <View style={styles.portfolioMeta}>
                      <Text style={styles.portfolioCategory}>{project.category}</Text>
                      <MaterialIcons name="arrow-forward" size={16} color="#fff" />
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );
        
      case 'services':
        return (
          <View style={styles.screenContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>My Services</Text>
              <View style={styles.titleUnderline} />
            </View>
            
            <Text style={styles.servicesIntro}>
              I offer a comprehensive range of creative services to help your brand stand out.
              Each service is tailored to meet your specific needs and goals.
            </Text>
            
            {/* Services Categories */}
            {servicesData.map((serviceCategory, index) => (
              <View key={index} style={styles.serviceCategory}>
                <View style={styles.serviceCategoryHeader}>
                  <Text style={styles.serviceCategoryTitle}>{serviceCategory.category}</Text>
                </View>
                
                <View style={styles.servicesList}>
                  {serviceCategory.items.map((service, sIndex) => (
                    <View key={sIndex} style={styles.serviceItem}>
                      <MaterialIcons name="check-circle" size={20} color={theme.accent} />
                      <Text style={styles.serviceText}>{service}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
            
            {/* Service Process */}
            <View style={styles.processContainer}>
              <Text style={styles.processTitle}>My Creative Process</Text>
              
              <View style={styles.processList}>
                <View style={styles.processItem}>
                  <View style={styles.processIconContainer}>
                    <MaterialCommunityIcons name="lightbulb-on" size={24} color="#fff" />
                  </View>
                  <View style={styles.processContent}>
                    <Text style={styles.processItemTitle}>1. Discovery</Text>
                    <Text style={styles.processText}>
                      Understanding your brand, goals, and requirements through detailed consultation.
                    </Text>
                  </View>
                </View>
                
                <View style={styles.processConnector} />
                
                <View style={styles.processItem}>
                  <View style={styles.processIconContainer}>
                    <MaterialCommunityIcons name="pencil-ruler" size={24} color="#fff" />
                  </View>
                  <View style={styles.processContent}>
                    <Text style={styles.processItemTitle}>2. Concept & Design</Text>
                    <Text style={styles.processText}>
                      Creating initial concepts and developing them based on your feedback.
                    </Text>
                  </View>
                </View>
                
                <View style={styles.processConnector} />
                
                <View style={styles.processItem}>
                  <View style={styles.processIconContainer}>
                    <MaterialCommunityIcons name="clipboard-check" size={24} color="#fff" />
                  </View>
                  <View style={styles.processContent}>
                    <Text style={styles.processItemTitle}>3. Refinement</Text>
                    <Text style={styles.processText}>
                      Fine-tuning the design to perfection with your input and approval.
                    </Text>
                  </View>
                </View>
                
                <View style={styles.processConnector} />
                
                <View style={styles.processItem}>
                  <View style={styles.processIconContainer}>
                    <MaterialCommunityIcons name="rocket-launch" size={24} color="#fff" />
                  </View>
                  <View style={styles.processContent}>
                    <Text style={styles.processItemTitle}>4. Delivery</Text>
                    <Text style={styles.processText}>
                      Providing final files in all required formats for your immediate use.
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            
            {/* Get Quote CTA */}
            <View style={styles.quoteCTA}>
              <Text style={styles.quoteCTATitle}>Need a custom quote?</Text>
              <Text style={styles.quoteCTAText}>
                Contact me for a detailed quote tailored to your specific project requirements.
              </Text>
              
              <TouchableOpacity 
                style={styles.quoteCTAButton}
                onPress={() => setContactModalVisible(true)}
              >
                <Text style={styles.quoteCTAButtonText}>Request a Quote</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
        
      case 'clients':
        return (
          <View style={styles.screenContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Clients & Collaborations</Text>
              <View style={styles.titleUnderline} />
            </View>
            
            <Text style={styles.clientsIntro}>
              I've had the privilege of working with amazing clients across various industries.
              Here are some of the brands that have trusted me with their creative projects.
            </Text>
            
            {/* Clients Grid */}
            <View style={styles.clientsGrid}>
              {clientsData.map((client) => (
                <View key={client.id} style={styles.clientItem}>
                  <Image 
                    source={{ uri: client.image }}
                    style={styles.clientLogo}
                  />
                  <Text style={styles.clientName}>{client.name}</Text>
                </View>
              ))}
            </View>
            
            {/* Testimonials */}
            <View style={styles.testimonialsContainer}>
              <Text style={styles.testimonialsTitle}>Client Testimonials</Text>
              
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.testimonialsScroll}
                contentContainerStyle={styles.testimonialsContent}
              >
                <View style={styles.testimonialItem}>
                  <MaterialIcons name="format-quote" size={24} color={theme.accent} style={styles.quoteIcon} />
                  <Text style={styles.testimonialText}>
                    "Hrushikesh delivered exceptional design work for our school branding. His creativity and attention to detail were impressive, and he was a pleasure to work with throughout the project."
                  </Text>
                  <View style={styles.testimonialAuthor}>
                    <Text style={styles.testimonialName}>Nissy Samson</Text>
                    <Text style={styles.testimonialRole}>Principal, Champions High School</Text>
                  </View>
                </View>
                
                <View style={styles.testimonialItem}>
                  <MaterialIcons name="format-quote" size={24} color={theme.accent} style={styles.quoteIcon} />
                  <Text style={styles.testimonialText}>
                    "Working with Hrushikesh was a seamless experience. He understood our requirements perfectly and delivered a stunning annual report that exceeded our expectations."
                  </Text>
                  <View style={styles.testimonialAuthor}>
                    <Text style={styles.testimonialName}>Lokesh Areti</Text>
                    <Text style={styles.testimonialRole}>CEO, Astra Consultants</Text>
                  </View>
                </View>
                
                <View style={styles.testimonialItem}>
                  <MaterialIcons name="format-quote" size={24} color={theme.accent} style={styles.quoteIcon} />
                  <Text style={styles.testimonialText}>
                    "The product photography Hrushikesh did for our new product line was absolutely stunning. His eye for detail and composition helped showcase our products in the best possible light."
                  </Text>
                  <View style={styles.testimonialAuthor}>
                    <Text style={styles.testimonialName}>Prashanth </Text>
                    <Text style={styles.testimonialRole}>CEO, Sarojinidevi Innovations</Text>
                  </View>
                </View>
              </ScrollView>
            </View>
          </View>
        );
        
      case 'contact':
        return (
          <View style={styles.screenContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Get in Touch</Text>
              <View style={styles.titleUnderline} />
            </View>
            
            <Text style={styles.contactIntro}>
              Have a project in mind or want to discuss your creative needs?
              I'm just a message away. Let's create something amazing together.
            </Text>
            
            {/* Contact Form Card */}
            <View style={styles.contactFormCard}>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Your Name</Text>
                <TextInput
                  style={styles.formInput}
                  placeholder="Enter your name"
                  placeholderTextColor={theme.textSecondary}
                  value={contactForm.name}
                  onChangeText={(text) => setContactForm({...contactForm, name: text})}
                />
                {formErrors.name && <Text style={styles.formError}>{formErrors.name}</Text>}
              </View>
              
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Email Address</Text>
                <TextInput
                  style={styles.formInput}
                  placeholder="Enter your email"
                  placeholderTextColor={theme.textSecondary}
                  keyboardType="email-address"
                  value={contactForm.email}
                  onChangeText={(text) => setContactForm({...contactForm, email: text})}
                />
                {formErrors.email && <Text style={styles.formError}>{formErrors.email}</Text>}
              </View>
              
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Your Message</Text>
                <TextInput
                  style={[styles.formInput, styles.formTextarea]}
                  placeholder="Tell me about your project"
                  placeholderTextColor={theme.textSecondary}
                  multiline
                  numberOfLines={5}
                  textAlignVertical="top"
                  value={contactForm.message}
                  onChangeText={(text) => setContactForm({...contactForm, message: text})}
                />
                {formErrors.message && <Text style={styles.formError}>{formErrors.message}</Text>}
              </View>
              
              <TouchableOpacity 
                style={styles.submitButton}
                onPress={handleContactSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <ActivityIndicator color="#fff" size="small" />
                ) : (
                  <Text style={styles.submitButtonText}>Send Message</Text>
                )}
              </TouchableOpacity>
            </View>
            
            {/* Contact Info */}
            <View style={styles.contactInfoContainer}>
              <Text style={styles.contactInfoTitle}>Contact Information</Text>
              
              <View style={styles.contactInfoItem}>
                <View style={styles.contactIconContainer}>
                  <MaterialIcons name="phone" size={20} color="#fff" />
                </View>
                <View style={styles.contactInfoContent}>
                  <Text style={styles.contactInfoLabel}>Phone</Text>
                  <TouchableOpacity
                    onPress={() => Linking.openURL('tel:+916305202806')}
                  >
                    <Text style={styles.contactInfoText}>+91 6305202806</Text>
                  </TouchableOpacity>
                </View>
              </View>
              
              <View style={styles.contactInfoItem}>
                <View style={styles.contactIconContainer}>
                  <MaterialIcons name="email" size={20} color="#fff" />
                </View>
                <View style={styles.contactInfoContent}>
                  <Text style={styles.contactInfoLabel}>Email</Text>
                  <TouchableOpacity
                    onPress={() => Linking.openURL('mailto:arteecreatives@gmail.com')}
                  >
                    <Text style={styles.contactInfoText}>arteecreatives@gmail.com</Text>
                  </TouchableOpacity>
                </View>
              </View>
              
              <View style={styles.contactInfoItem}>
                <View style={styles.contactIconContainer}>
                  <MaterialIcons name="location-on" size={20} color="#fff" />
                </View>
                <View style={styles.contactInfoContent}>
                  <Text style={styles.contactInfoLabel}>Location</Text>
                  <Text style={styles.contactInfoText}>Hyderabad, India</Text>
                </View>
              </View>
            </View>
            
            {/* Social Media */}
            <View style={styles.socialContainer}>
              <Text style={styles.socialTitle}>Follow Me</Text>
              
              <View style={styles.socialLinks}>
                <TouchableOpacity 
                  style={styles.socialButton}
                  onPress={() => Linking.openURL('https://www.instagram.com/__richie__rich_/')}
                >
                  <FontAwesome name="instagram" size={20} color="#fff" />
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.socialButton}
                  onPress={() => Linking.openURL('https://behance.net')}
                >
                  <FontAwesome name="behance" size={20} color="#fff" />
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.socialButton}
                  onPress={() => Linking.openURL('https://www.linkedin.com/in/hrushikesh-areti')}
                >
                  <FontAwesome name="linkedin" size={20} color="#fff" />
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.socialButton}
                  onPress={() => Linking.openURL('https://www.youtube.com/@ArteeCreatives')}
                >
                  <FontAwesome name="youtube" size={20} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );
        
      default:
        return <View />;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={theme.background} barStyle="light-content" />
      
      {/* Header */}
      <Animated.View 
        style={[
          styles.header,
          { opacity: headerOpacity }
        ]}
      >
        <TouchableOpacity onPress={() => setIsMenuOpen(!isMenuOpen)}>
          <Feather name={isMenuOpen ? "x" : "menu"} size={24} color={theme.textPrimary} />
        </TouchableOpacity>
        
        <View style={styles.headerCenter}>
          <Image
            source={{ uri: 'https://iili.io/3JMQt9a.md.png' }}
            style={styles.logo}
          />
          <Text style={styles.logoText}>Artee Creatives</Text>
        </View>
        
        <TouchableOpacity onPress={() => setContactModalVisible(true)}>
          <Feather name="mail" size={24} color={theme.textPrimary} />
        </TouchableOpacity>
      </Animated.View>

      {/* Sliding Menu */}
      <Animated.View 
        style={[
          styles.menuOverlay,
          {
            opacity: menuSlideAnim,
            transform: [
              {
                translateX: menuSlideAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-300, 0],
                })
              }
            ],
            pointerEvents: isMenuOpen ? 'auto' : 'none'
          }
        ]}
      >
        <TouchableOpacity 
          style={styles.menuCloseArea}
          activeOpacity={1}
          onPress={() => setIsMenuOpen(false)}
        />
        
        <View style={styles.menuContent}>
          <View style={styles.menuHeader}>
            <Image
              source={{ uri: aboutData.profileImage }}
              style={styles.menuProfileImage}
            />
            <Text style={styles.menuName}>{aboutData.name}</Text>
            <Text style={styles.menuTitle}>{aboutData.title}</Text>
          </View>
          
          <View style={styles.menuItems}>
            <TouchableOpacity 
              style={[styles.menuItem, activeTab === 'home' && styles.menuItemActive]}
              onPress={() => scrollToSection('home')}
            >
              <Feather name="home" size={20} color={activeTab === 'home' ? theme.accent : theme.textPrimary} />
              <Text style={[styles.menuItemText, activeTab === 'home' && styles.menuItemTextActive]}>Home</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.menuItem, activeTab === 'portfolio' && styles.menuItemActive]}
              onPress={() => scrollToSection('portfolio')}
            >
              <Feather name="grid" size={20} color={activeTab === 'portfolio' ? theme.accent : theme.textPrimary} />
              <Text style={[styles.menuItemText, activeTab === 'portfolio' && styles.menuItemTextActive]}>Portfolio</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.menuItem, activeTab === 'services' && styles.menuItemActive]}
              onPress={() => scrollToSection('services')}
            >
              <Feather name="layers" size={20} color={activeTab === 'services' ? theme.accent : theme.textPrimary} />
              <Text style={[styles.menuItemText, activeTab === 'services' && styles.menuItemTextActive]}>Services</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.menuItem, activeTab === 'clients' && styles.menuItemActive]}
              onPress={() => scrollToSection('clients')}
            >
              <Feather name="users" size={20} color={activeTab === 'clients' ? theme.accent : theme.textPrimary} />
              <Text style={[styles.menuItemText, activeTab === 'clients' && styles.menuItemTextActive]}>Clients</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.menuItem, activeTab === 'contact' && styles.menuItemActive]}
              onPress={() => scrollToSection('contact')}
            >
              <Feather name="mail" size={20} color={activeTab === 'contact' ? theme.accent : theme.textPrimary} />
              <Text style={[styles.menuItemText, activeTab === 'contact' && styles.menuItemTextActive]}>Contact</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.menuFooter}>
            <View style={styles.menuSocial}>
              <TouchableOpacity style={styles.menuSocialIcon}>
                <FontAwesome name="instagram" size={18} color={theme.textPrimary} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuSocialIcon}>
                <FontAwesome name="behance" size={18} color={theme.textPrimary} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuSocialIcon}>
                <FontAwesome name="linkedin" size={18} color={theme.textPrimary} />
              </TouchableOpacity>
            </View>
            
            <Text style={styles.menuCopyright}>© 2025 Artee Creatives</Text>
          </View>
        </View>
      </Animated.View>

      {/* Main Content */}
      <Animated.ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
      >
        {renderScreen()}
        
        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerContent}>
            <View style={styles.footerInfo}>
              <Image
                source={{ uri: 'https://iili.io/3JMQt9a.md.png' }}
                style={styles.footerLogo}
              />
              <Text style={styles.footerText}>
                Creating impactful visual experiences through design and photography.
              </Text>
            </View>
            
            <View style={styles.footerLinks}>
              <TouchableOpacity onPress={() => scrollToSection('home')}>
                <Text style={styles.footerLinkText}>Home</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => scrollToSection('portfolio')}>
                <Text style={styles.footerLinkText}>Portfolio</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => scrollToSection('services')}>
                <Text style={styles.footerLinkText}>Services</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => scrollToSection('clients')}>
                <Text style={styles.footerLinkText}>Clients</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => scrollToSection('contact')}>
                <Text style={styles.footerLinkText}>Contact</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.footerBottom}>
            <Text style={styles.footerCopyright}>© 2025 Artee Creatives. All rights reserved.</Text>
          </View>
        </View>
      </Animated.ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => scrollToSection('home')}
        >
          <Feather 
            name="home" 
            size={22} 
            color={activeTab === 'home' ? theme.accent : theme.textSecondary} 
          />
          <Text 
            style={[
              styles.navLabel, 
              { color: activeTab === 'home' ? theme.accent : theme.textSecondary }
            ]}
          >
            Home
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => scrollToSection('portfolio')}
        >
          <Feather 
            name="grid" 
            size={22} 
            color={activeTab === 'portfolio' ? theme.accent : theme.textSecondary} 
          />
          <Text 
            style={[
              styles.navLabel, 
              { color: activeTab === 'portfolio' ? theme.accent : theme.textSecondary }
            ]}
          >
            Portfolio
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => scrollToSection('services')}
        >
          <Feather 
            name="layers" 
            size={22} 
            color={activeTab === 'services' ? theme.accent : theme.textSecondary} 
          />
          <Text 
            style={[
              styles.navLabel, 
              { color: activeTab === 'services' ? theme.accent : theme.textSecondary }
            ]}
          >
            Services
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => scrollToSection('clients')}
        >
          <Feather 
            name="users" 
            size={22} 
            color={activeTab === 'clients' ? theme.accent : theme.textSecondary} 
          />
          <Text 
            style={[
              styles.navLabel, 
              { color: activeTab === 'clients' ? theme.accent : theme.textSecondary }
            ]}
          >
            Clients
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => scrollToSection('contact')}
        >
          <Feather 
            name="mail" 
            size={22} 
            color={activeTab === 'contact' ? theme.accent : theme.textSecondary} 
          />
          <Text 
            style={[
              styles.navLabel, 
              { color: activeTab === 'contact' ? theme.accent : theme.textSecondary }
            ]}
          >
            Contact
          </Text>
        </TouchableOpacity>
      </View>

      {/* Contact Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={contactModalVisible}
        onRequestClose={() => setContactModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.contactModal}>
            <View style={styles.contactModalHeader}>
              <Text style={styles.contactModalTitle}>Contact Me</Text>
              <TouchableOpacity onPress={() => setContactModalVisible(false)}>
                <Feather name="x" size={24} color={theme.textPrimary} />
              </TouchableOpacity>
            </View>
            
            <View style={styles.modalFormGroup}>
              <Text style={styles.modalFormLabel}>Your Name</Text>
              <TextInput
                style={styles.modalFormInput}
                placeholder="Enter your name"
                placeholderTextColor={theme.textSecondary}
                value={contactForm.name}
                onChangeText={(text) => setContactForm({...contactForm, name: text})}
              />
              {formErrors.name && <Text style={styles.formError}>{formErrors.name}</Text>}
            </View>
            
            <View style={styles.modalFormGroup}>
              <Text style={styles.modalFormLabel}>Email Address</Text>
              <TextInput
                style={styles.modalFormInput}
                placeholder="Enter your email"
                placeholderTextColor={theme.textSecondary}
                keyboardType="email-address"
                value={contactForm.email}
                onChangeText={(text) => setContactForm({...contactForm, email: text})}
              />
              {formErrors.email && <Text style={styles.formError}>{formErrors.email}</Text>}
            </View>
            
            <View style={styles.modalFormGroup}>
              <Text style={styles.modalFormLabel}>Your Message</Text>
              <TextInput
                style={[styles.modalFormInput, styles.modalFormTextarea]}
                placeholder="Tell me about your project"
                placeholderTextColor={theme.textSecondary}
                multiline
                numberOfLines={5}
                textAlignVertical="top"
                value={contactForm.message}
                onChangeText={(text) => setContactForm({...contactForm, message: text})}
              />
              {formErrors.message && <Text style={styles.formError}>{formErrors.message}</Text>}
            </View>
            
            <TouchableOpacity 
              style={styles.modalSubmitButton}
              onPress={handleContactSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Text style={styles.modalSubmitButtonText}>Send Message</Text>
              )}
            </TouchableOpacity>
            
            <View style={styles.modalContactDirect}>
              <Text style={styles.modalContactDirectTitle}>Or contact directly:</Text>
              
              <TouchableOpacity 
                style={styles.modalContactDirectItem}
                onPress={() => Linking.openURL('tel:+916305202806')}
              >
                <Feather name="phone" size={18} color={theme.accent} />
                <Text style={styles.modalContactDirectText}>+91 6305202806</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.modalContactDirectItem}
                onPress={() => Linking.openURL('mailto:arteecreatives@gmail.com')}
              >
                <Feather name="mail" size={18} color={theme.accent} />
                <Text style={styles.modalContactDirectText}>arteecreatives@gmail.com</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Project Detail Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={detailModalVisible}
        onRequestClose={() => setDetailModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.projectDetailModal}>
            {expandedProject && (
              <>
                <ScrollView style={styles.projectDetailScroll}>
                  <Image 
                    source={{ uri: expandedProject.image }}
                    style={styles.projectDetailImage}
                  />
                  
                  <View style={styles.projectDetailContent}>
                    <View style={styles.projectDetailHeader}>
                      <Text style={styles.projectDetailTitle}>{expandedProject.title}</Text>
                      <View style={styles.projectDetailMeta}>
                        <Text style={styles.projectDetailCategory}>{expandedProject.category}</Text>
                        <Text style={styles.projectDetailYear}>{expandedProject.year}</Text>
                      </View>
                    </View>
                    
                    <View style={styles.projectDetailSection}>
                      <Text style={styles.projectDetailSectionTitle}>Project Overview</Text>
                      <Text style={styles.projectDetailDescription}>
                        {expandedProject.description}
                      </Text>
                    </View>
                    
                    <View style={styles.projectDetailSection}>
                      <Text style={styles.projectDetailSectionTitle}>Client</Text>
                      <Text style={styles.projectDetailClient}>{expandedProject.client}</Text>
                    </View>
                    
                    <View style={styles.projectDetailSection}>
                      <Text style={styles.projectDetailSectionTitle}>Services Provided</Text>
                      <View style={styles.projectDetailTags}>
                        {expandedProject.tags.map((tag, index) => (
                          <View key={index} style={styles.projectDetailTag}>
                            <Text style={styles.projectDetailTagText}>{tag}</Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  </View>
                </ScrollView>
                
                <View style={styles.projectDetailActions}>
                  <TouchableOpacity 
                    style={styles.projectDetailClose}
                    onPress={() => setDetailModalVisible(false)}
                  >
                    <Text style={styles.projectDetailCloseText}>Close</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={styles.projectDetailContact}
                    onPress={() => {
                      setDetailModalVisible(false);
                      setTimeout(() => {
                        setContactModalVisible(true);
                      }, 300);
                    }}
                  >
                    <Text style={styles.projectDetailContactText}>Inquire Similar Project</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* PWA Install Prompt */}
      {installPromptVisible && Platform.OS === 'web' && (
        <View style={styles.installPrompt}>
          <View style={styles.installPromptContent}>
            <View style={styles.installPromptIcon}>
              <Image
                source={{ uri: 'https://iili.io/3JM4KQ9.md.jpg' }}
                style={styles.installPromptLogo}
              />
            </View>
            <View style={styles.installPromptText}>
              <Text style={styles.installPromptTitle}>Add to Home Screen</Text>
              <Text style={styles.installPromptDescription}>
                Install this app for a better experience
              </Text>
            </View>
            <TouchableOpacity 
              style={styles.installPromptClose}
              onPress={() => setInstallPromptVisible(false)}
            >
              <Feather name="x" size={18} color={theme.textSecondary} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#1E1E1E',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
    zIndex: 10,
  },
  headerCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 32,
    height: 32,
    borderRadius: 8,
  },
  logoText: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#121212',
  },
  screenContainer: {
    padding: 20,
    paddingBottom: 100, // Extra padding for bottom navigation
  },
  
  // Menu Styles
  menuOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 20,
    flexDirection: 'row',
  },
  menuCloseArea: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  menuContent: {
    width: 280,
    backgroundColor: '#1E1E1E',
    height: '100%',
    padding: 20,
    paddingTop: 40,
    justifyContent: 'space-between',
  },
  menuHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  menuProfileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
  },
  menuName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  menuTitle: {
    fontSize: 14,
    color: '#B3B3B3',
  },
  menuItems: {
    marginBottom: 30,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  menuItemActive: {
    borderLeftWidth: 3,
    borderLeftColor: '#FF5733',
    paddingLeft: 8,
    marginLeft: -11,
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 12,
    color: '#FFFFFF',
  },
  menuItemTextActive: {
    color: '#FF5733',
  },
  menuFooter: {
    marginTop: 'auto',
  },
  menuSocial: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  menuSocialIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuCopyright: {
    fontSize: 12,
    color: '#B3B3B3',
  },
  
  // Bottom Navigation
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#1E1E1E',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    flex: 1,
  },
  navLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  
  // Hero Section
  heroSection: {
    marginTop: 10,
    marginBottom: 30,
    borderRadius: 16,
    overflow: 'hidden',
    height: 400,
  },
  heroGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heroContent: {
    alignItems: 'center',
  },
  heroImage: {
    width: 200,
    height: 200,
    borderRadius: 140,
    borderWidth: 4,
    borderColor: '#FFFFFF',
    marginBottom: 16,
  },
  heroName: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
    textAlign: 'center',
  },
  heroTitle: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 24,
    textAlign: 'center',
  },
  heroButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  heroButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginHorizontal: 8,
  },
  primaryButton: {
    backgroundColor: '#FFFFFF',
  },
  primaryButtonText: {
    color: '#FF5733',
    fontWeight: '600',
    fontSize: 16,
  },
  outlineButton: {
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  outlineButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  
  // Section Styles
  sectionContainer: {
    marginBottom: 36,
  },
  sectionHeader: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  titleUnderline: {
    width: 40,
    height: 3,
    backgroundColor: '#FF5733',
    borderRadius: 2,
  },
  
  // About Section
  aboutBio: {
    fontSize: 16,
    lineHeight: 24,
    color: '#B3B3B3',
    marginBottom: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#2D2D2D',
    borderRadius: 12,
    marginHorizontal: 5,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FF5733',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  skillsContainer: {
    marginTop: 16,
  },
  skillsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  skillsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillItem: {
    backgroundColor: '#2D2D2D',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  skillText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  
  // Services Highlight
  servicesHighlight: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 36,
    height: 200,
  },
  servicesGradient: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  servicesHighlightContent: {
    justifyContent: 'center',
  },
  servicesHighlightTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  servicesHighlightText: {
    fontSize: 16,
    color: '#B3B3B3',
    marginBottom: 16,
    lineHeight: 22,
  },
  servicesHighlightButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  servicesHighlightButtonText: {
    fontSize: 16,
    color: '#FF5733',
    fontWeight: '600',
    marginRight: 8,
  },
  
  // Featured Section
  featuredScroll: {
    marginLeft: -20,
    marginRight: -20,
  },
  featuredScrollContent: {
    paddingHorizontal: 20,
  },
  featuredItem: {
    width: 260,
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 16,
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  featuredOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  featuredTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  featuredCategory: {
    fontSize: 12,
    color: '#FF5733',
  },
  viewAllButton: {
    marginTop: 20,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#2D2D2D',
    alignItems: 'center',
  },
  viewAllButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  
  // Contact CTA
  contactCTA: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
  },
  contactGradient: {
    padding: 24,
  },
  contactCTAContent: {
    alignItems: 'center',
  },
  contactCTATitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 12,
    textAlign: 'center',
  },
  contactCTAText: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    marginBottom: 20,
  },
  contactCTAButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
  },
  contactCTAButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF5733',
  },
  
  // Portfolio Section
  filterContainer: {
    marginBottom: 20,
    marginLeft: -20,
    marginRight: -20,
  },
  filterContent: {
    paddingHorizontal: 20,
  },
  filterItem: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#2D2D2D',
  },
  filterItemActive: {
    backgroundColor: '#FF5733',
  },
  filterText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  filterTextActive: {
    fontWeight: '600',
  },
  portfolioGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  portfolioItem: {
    width: '48%',
    height: 180,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
  },
  portfolioImage: {
    width: '100%',
    height: '100%',
  },
  portfolioOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  portfolioTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  portfolioMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  portfolioCategory: {
    fontSize: 11,
    color: '#FF5733',
  },
  
  // Services Section
  servicesIntro: {
    fontSize: 16,
    lineHeight: 24,
    color: '#B3B3B3',
    marginBottom: 24,
  },
  serviceCategory: {
    marginBottom: 24,
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    overflow: 'hidden',
  },
  serviceCategoryHeader: {
    padding: 16,
    backgroundColor: '#2D2D2D',
  },
  serviceCategoryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  servicesList: {
    padding: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    paddingVertical: 8,
  },
  serviceText: {
    fontSize: 14,
    color: '#B3B3B3',
    marginLeft: 8,
  },
  processContainer: {
    marginTop: 24,
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 20,
  },
  processTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  processList: {
    position: 'relative',
  },
  processItem: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  processIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FF5733',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  processContent: {
    flex: 1,
  },
  processItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  processText: {
    fontSize: 14,
    color: '#B3B3B3',
    lineHeight: 20,
  },
  processConnector: {
    position: 'absolute',
    left: 24,
    width: 2,
    backgroundColor: 'rgba(255,87,51,0.3)',
    top: 50,
    bottom: 50,
    zIndex: -1,
  },
  quoteCTA: {
    marginTop: 24,
    backgroundColor: '#2D2D2D',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
  },
  quoteCTATitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  quoteCTAText: {
    fontSize: 14,
    color: '#B3B3B3',
    marginBottom: 20,
    textAlign: 'center',
  },
  quoteCTAButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    backgroundColor: '#FF5733',
  },
  quoteCTAButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  
  // Clients Section
  clientsIntro: {
    fontSize: 16,
    lineHeight: 24,
    color: '#B3B3B3',
    marginBottom: 24,
  },
  clientsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  clientItem: {
    width: '30%',
    alignItems: 'center',
    marginBottom: 20,
  },
  clientLogo: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#2D2D2D',
    marginBottom: 8,
  },
  clientName: {
    fontSize: 12,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  testimonialsContainer: {
    marginTop: 24,
  },
  testimonialsTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  testimonialsScroll: {
    marginLeft: -20,
    marginRight: -20,
  },
  testimonialsContent: {
    paddingHorizontal: 20,
  },
  testimonialItem: {
    width: 300,
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 20,
    marginRight: 16,
  },
  quoteIcon: {
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  testimonialText: {
    fontSize: 14,
    color: '#B3B3B3',
    lineHeight: 20,
    marginBottom: 16,
  },
  testimonialAuthor: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
    paddingTop: 12,
  },
  testimonialName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  testimonialRole: {
    fontSize: 12,
    color: '#B3B3B3',
  },
  
  // Contact Section
  contactIntro: {
    fontSize: 16,
    lineHeight: 24,
    color: '#B3B3B3',
    marginBottom: 24,
  },
  contactFormCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
  },
  formGroup: {
    marginBottom: 16,
  },
  formLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  formInput: {
    backgroundColor: '#2D2D2D',
    borderRadius: 8,
    padding: 12,
    color: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  formTextarea: {
    minHeight: 120,
  },
  formError: {
    color: '#FF5733',
    fontSize: 12,
    marginTop: 4,
  },
  submitButton: {
    backgroundColor: '#FF5733',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  contactInfoContainer: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
  },
  contactInfoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  contactInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  contactIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FF5733',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  contactInfoContent: {
    flex: 1,
  },
  contactInfoLabel: {
    fontSize: 12,
    color: '#B3B3B3',
    marginBottom: 2,
  },
  contactInfoText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  socialContainer: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 20,
  },
  socialTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  socialLinks: {
    flexDirection: 'row',
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#2D2D2D',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  
  // Footer
  footer: {
    backgroundColor: '#1E1E1E',
    padding: 20,
    paddingBottom: 100, // Extra space for bottom navigation
  },
  footerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  footerInfo: {
    flex: 1,
    marginRight: 20,
  },
  footerLogo: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginBottom: 12,
  },
  footerText: {
    fontSize: 14,
    color: '#B3B3B3',
    lineHeight: 20,
  },
  footerLinks: {
    flex: 1,
  },
  footerLinkText: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 12,
  },
  footerBottom: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
    paddingTop: 20,
  },
  footerCopyright: {
    fontSize: 12,
    color: '#B3B3B3',
    textAlign: 'center',
  },
  
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  contactModal: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    width: '100%',
    maxHeight: '90%',
    padding: 20,
  },
  contactModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
    paddingBottom: 12,
  },
  contactModalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  modalFormGroup: {
    marginBottom: 16,
  },
  modalFormLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  modalFormInput: {
    backgroundColor: '#2D2D2D',
    borderRadius: 8,
    padding: 12,
    color: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  modalFormTextarea: {
    minHeight: 120,
  },
  modalSubmitButton: {
    backgroundColor: '#FF5733',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  modalSubmitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  modalContactDirect: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
    paddingTop: 16,
  },
  modalContactDirectTitle: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 12,
  },
  modalContactDirectItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  modalContactDirectText: {
    fontSize: 14,
    color: '#FFFFFF',
    marginLeft: 12,
  },
  
  // Project Detail Modal
  projectDetailModal: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    width: '100%',
    maxHeight: '90%',
  },
  projectDetailScroll: {
    maxHeight: 500,
  },
  projectDetailImage: {
    width: '100%',
    height: 200,
  },
  projectDetailContent: {
    padding: 20,
  },
  projectDetailHeader: {
    marginBottom: 16,
  },
  projectDetailTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  projectDetailMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  projectDetailCategory: {
    fontSize: 14,
    color: '#FF5733',
  },
  projectDetailYear: {
    fontSize: 14,
    color: '#B3B3B3',
  },
  projectDetailSection: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  projectDetailSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  projectDetailDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: '#B3B3B3',
  },
  projectDetailClient: {
    fontSize: 14,
    color: '#B3B3B3',
  },
  projectDetailTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  projectDetailTag: {
    backgroundColor: '#2D2D2D',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  projectDetailTagText: {
    fontSize: 12,
    color: '#FFFFFF',
  },
  projectDetailActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  projectDetailClose: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: 'rgba(255,255,255,0.1)',
  },
  projectDetailCloseText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  projectDetailContact: {
    flex: 2,
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#FF5733',
  },
  projectDetailContactText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  
  // PWA Install Prompt
  installPrompt: {
    position: 'absolute',
    bottom: 70,
    left: 20,
    right: 20,
    backgroundColor: '#2D2D2D',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    zIndex: 1000,
  },
  installPromptContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  installPromptIcon: {
    marginRight: 16,
  },
  installPromptLogo: {
    width: 40,
    height: 40,
    borderRadius: 8,
  },
  installPromptText: {
    flex: 1,
  },
  installPromptTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  installPromptDescription: {
    fontSize: 14,
    color: '#B3B3B3',
  },
  installPromptClose: {
    padding: 4,
  },
});

export default PortfolioApp;