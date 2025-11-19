import { NextRequest } from "next/server";

export const runtime = "edge";

// Utility function to create a delay
const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Smart answer generator based on question category
function generateDynamicAnswer(question: string): {
  answer: string;
  sources: { name: string; url: string; snippet?: string }[];
} {
  const lowerQuery = question.toLowerCase();

  // A. Programming Questions
  if (lowerQuery.includes('programming') || lowerQuery.includes('language') || 
      lowerQuery.includes('developer') || lowerQuery.includes('coding') ||
      lowerQuery.includes('javascript') || lowerQuery.includes('python') ||
      lowerQuery.includes('react') || lowerQuery.includes('node')) {
    
    return {
      answer: `Here's a comprehensive guide to ${question}:\n\n**Top 10 Programming Languages in 2025:**\n\n1. **JavaScript** - Versatile language for web development, backend (Node.js), and mobile apps\n2. **Python** - Ideal for AI/ML, data science, web development, and automation\n3. **TypeScript** - JavaScript with static typing, perfect for large-scale applications\n4. **Java** - Enterprise-grade language for backend systems and Android development\n5. **Go** - Fast, efficient language for microservices and cloud infrastructure\n6. **Rust** - Memory-safe systems programming with exceptional performance\n7. **C#** - Microsoft's versatile language for .NET applications and game development\n8. **Swift** - Apple's modern language for iOS and macOS development\n9. **Kotlin** - Modern alternative to Java, preferred for Android development\n10. **C++** - High-performance language for system programming and game engines\n\n**Key Development Skills:**\n• Version control with Git\n• Database design and management\n• API development and integration\n• Testing and debugging techniques\n• Cloud deployment and DevOps\n\nThese languages and skills form the foundation of modern software development.`,
      sources: [
        { name: "Stack Overflow Developer Survey", url: "https://stackoverflow.com/insights/survey" },
        { name: "GitHub Programming Languages", url: "https://github.com/topics" },
        { name: "MDN Web Docs", url: "https://developer.mozilla.org" },
        { name: "freeCodeCamp", url: "https://freecodecamp.org" }
      ]
    };
  }

  // B. Person Questions
  if (lowerQuery.includes('who is') || lowerQuery.includes('tell me about') ||
      lowerQuery.includes('virat kohli') || lowerQuery.includes('sachin') ||
      lowerQuery.includes('elon musk') || lowerQuery.includes('biography')) {
    
    const personName = question.replace(/who is|tell me about/gi, '').trim();
    return {
      answer: `**Biography of ${personName}**\n\n${personName} is a prominent figure known for their significant contributions in their field. Here's an overview of their life and achievements:\n\n**Early Life:**\n• Born into a family that shaped their early interests\n• Showed exceptional talent from a young age\n• Pursued education that laid the foundation for future success\n\n**Career Highlights:**\n• Breakthrough moment that established their reputation\n• Major achievements that defined their legacy\n• Recognition and awards from peers and institutions\n• Continuous innovation and leadership in their domain\n\n**Personal Life:**\n• Known for their dedication and work ethic\n• Philanthropic activities and social contributions\n• Inspiration to millions around the world\n\n**Legacy:**\n• Lasting impact on their industry/field\n• Mentorship and influence on future generations\n• Ongoing projects and future endeavors\n\n${personName} continues to be a source of inspiration and their work remains influential in shaping the future.`,
      sources: [
        { name: "Wikipedia Biography", url: "https://en.wikipedia.org/wiki/" + encodeURIComponent(personName) },
        { name: "Biography.com", url: "https://biography.com" },
        { name: "IMDb Profile", url: "https://imdb.com" },
        { name: "Official Website", url: "https://example.com" }
      ]
    };
  }

  // C. Technology/Concepts Questions
  if (lowerQuery.includes('what is') || lowerQuery.includes('explain') ||
      lowerQuery.includes('quantum computing') || lowerQuery.includes('ai') ||
      lowerQuery.includes('blockchain') || lowerQuery.includes('machine learning')) {
    
    const concept = question.replace(/what is|explain/gi, '').trim();
    return {
      answer: `**Understanding ${concept}**\n\n${concept} is a revolutionary technology that's transforming how we approach complex problems. Here's a comprehensive explanation:\n\n**Definition:**\n${concept} refers to an advanced technological approach that leverages innovative methods to solve traditional challenges in new ways.\n\n**Key Features:**\n• **Scalability** - Ability to handle increasing workloads efficiently\n• **Security** - Robust protection mechanisms and data integrity\n• **Performance** - Optimized processing speeds and resource utilization\n• **Accessibility** - User-friendly interfaces and broad compatibility\n\n**How It Works:**\n1. **Data Processing** - Advanced algorithms analyze and process information\n2. **Pattern Recognition** - System identifies trends and relationships\n3. **Decision Making** - Automated or assisted decision processes\n4. **Continuous Learning** - Adaptive improvements over time\n\n**Applications:**\n• Healthcare and medical diagnostics\n• Financial services and trading\n• Transportation and logistics\n• Entertainment and media\n• Education and research\n\n**Future Implications:**\n${concept} is expected to drive significant changes across industries, creating new opportunities while addressing current limitations in technology and human capability.`,
      sources: [
        { name: "TechCrunch", url: "https://techcrunch.com" },
        { name: "Wired Magazine", url: "https://wired.com" },
        { name: "MIT Technology Review", url: "https://technologyreview.com" },
        { name: "IEEE Spectrum", url: "https://spectrum.ieee.org" }
      ]
    };
  }

  // D. Country/Location Questions
  if (lowerQuery.includes('about') && (lowerQuery.includes('india') || lowerQuery.includes('usa') ||
      lowerQuery.includes('japan') || lowerQuery.includes('country') || lowerQuery.includes('nation'))) {
    
    const location = question.replace(/about|tell me about/gi, '').trim();
    return {
      answer: `**${location} - Country Overview**\n\n${location} is a fascinating nation with a rich history, diverse culture, and significant global influence. Here's a comprehensive overview:\n\n**Geography & Demographics:**\n• Strategic location with diverse landscapes\n• Population of millions with varied ethnic groups\n• Major cities serving as economic and cultural hubs\n• Natural resources and environmental features\n\n**Economy:**\n• GDP ranking among world economies\n• Key industries: technology, manufacturing, services, agriculture\n• Major exports and trade partnerships\n• Innovation hubs and business centers\n\n**Culture & Society:**\n• Rich cultural heritage and traditions\n• Multiple languages and regional diversity\n• Arts, literature, and entertainment contributions\n• Educational institutions and research centers\n\n**Government & Politics:**\n• Political system and governance structure\n• International relations and diplomatic ties\n• Participation in global organizations\n• Domestic and foreign policy priorities\n\n**Notable Achievements:**\n• Scientific and technological advancements\n• Sports and Olympic achievements\n• Cultural exports and soft power\n• Contributions to global peace and development\n\n${location} continues to play an important role in shaping the global landscape through its economic, cultural, and political contributions.`,
      sources: [
        { name: "Encyclopedia Britannica", url: "https://britannica.com" },
        { name: "World Bank Data", url: "https://worldbank.org" },
        { name: "CIA World Factbook", url: "https://cia.gov/factbook" },
        { name: "UN Country Profiles", url: "https://un.org" }
      ]
    };
  }

  // E. General Questions
  return {
    answer: `**Comprehensive Answer to: "${question}"**\n\nThank you for your interesting question. Here's a detailed response that covers multiple aspects of your inquiry:\n\n**Overview:**\nYour question touches on an important topic that deserves a thorough explanation. Let me break down the key elements and provide you with valuable insights.\n\n**Key Points:**\n• **Context** - Understanding the background and significance\n• **Current State** - Present situation and recent developments\n• **Analysis** - Critical examination of various factors\n• **Implications** - Potential impacts and consequences\n\n**Detailed Explanation:**\nThe topic you've asked about involves multiple interconnected elements that work together to create a complex but fascinating subject. Research and expert analysis have revealed several important patterns and trends that help us understand the bigger picture.\n\n**Practical Applications:**\n• Real-world usage and implementation\n• Benefits and advantages for users\n• Potential challenges and solutions\n• Future developments and improvements\n\n**Expert Insights:**\nProfessionals in the field emphasize the importance of understanding both the theoretical foundations and practical applications. This balanced approach ensures comprehensive knowledge and informed decision-making.\n\n**Conclusion:**\nThis multi-faceted topic continues to evolve, and staying informed about developments will help you maintain a current understanding of its implications and opportunities.`,
    sources: [
      { name: "Wikipedia", url: "https://wikipedia.org" },
      { name: "Encyclopedia.com", url: "https://encyclopedia.com" },
      { name: "Research Gate", url: "https://researchgate.net" },
      { name: "Academic Sources", url: "https://scholar.google.com" }
    ]
  };
}

// Generate search results based on question category
function generateSearchResults(question: string) {
  const lowerQuery = question.toLowerCase();

  if (lowerQuery.includes('programming') || lowerQuery.includes('coding') || lowerQuery.includes('developer')) {
    return [
      { name: "Stack Overflow", url: "https://stackoverflow.com", snippet: "Programming community Q&A platform" },
      { name: "GitHub", url: "https://github.com", snippet: "Code repositories and open source projects" },
      { name: "MDN Web Docs", url: "https://developer.mozilla.org", snippet: "Web development documentation" },
      { name: "freeCodeCamp", url: "https://freecodecamp.org", snippet: "Learn to code for free" }
    ];
  }

  if (lowerQuery.includes('who is') || lowerQuery.includes('biography')) {
    return [
      { name: "Wikipedia", url: "https://wikipedia.org", snippet: "Free online encyclopedia" },
      { name: "Biography.com", url: "https://biography.com", snippet: "Famous people biographies" },
      { name: "IMDb", url: "https://imdb.com", snippet: "Internet Movie Database" },
      { name: "Britannica", url: "https://britannica.com", snippet: "Encyclopedia Britannica" }
    ];
  }

  if (lowerQuery.includes('what is') || lowerQuery.includes('explain') || lowerQuery.includes('technology')) {
    return [
      { name: "TechCrunch", url: "https://techcrunch.com", snippet: "Technology news and analysis" },
      { name: "Wired", url: "https://wired.com", snippet: "Technology, science, and culture" },
      { name: "MIT Technology Review", url: "https://technologyreview.com", snippet: "Emerging technology insights" },
      { name: "IEEE Spectrum", url: "https://spectrum.ieee.org", snippet: "Engineering and technology news" }
    ];
  }

  if (lowerQuery.includes('country') || lowerQuery.includes('about') && (lowerQuery.includes('india') || lowerQuery.includes('usa'))) {
    return [
      { name: "Encyclopedia Britannica", url: "https://britannica.com", snippet: "Comprehensive country information" },
      { name: "World Bank", url: "https://worldbank.org", snippet: "Economic and development data" },
      { name: "CIA World Factbook", url: "https://cia.gov/factbook", snippet: "Country profiles and statistics" },
      { name: "UN Data", url: "https://data.un.org", snippet: "United Nations country data" }
    ];
  }

  // Default general results
  return [
    { name: "Wikipedia", url: "https://wikipedia.org", snippet: "Free online encyclopedia" },
    { name: "Britannica", url: "https://britannica.com", snippet: "Encyclopedia Britannica" },
    { name: "Google Scholar", url: "https://scholar.google.com", snippet: "Academic research papers" },
    { name: "Research Portal", url: "https://example.com", snippet: "Research and information hub" }
  ];
}

export async function POST(request: NextRequest) {
  const { question } = await request.json();
  
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const send = (data: any) => {
        const chunk = encoder.encode(`data: ${JSON.stringify(data)}\n\n`);
        controller.enqueue(chunk);
      };

      try {
        // Step 1: Initial Query
        send({
          step_type: "INITIAL_QUERY",
          content: { query: question }
        });
        await wait(500);

        // Step 2: Search Web
        send({
          step_type: "SEARCH_WEB", 
          content: { status: "searching" }
        });
        await wait(800);

        // Step 3: Search Results
        const searchResults = generateSearchResults(question);
        send({
          step_type: "SEARCH_RESULTS",
          content: { web_results: searchResults }
        });
        await wait(1000);

        // Step 4: Generate dynamic answer and stream text chunks
        const { answer, sources } = generateDynamicAnswer(question);
        const words = answer.split(' ');
        
        for (const word of words) {
          send({
            type: "TEXT_CHUNK",
            payload: { text: word + " " }
          });
          await wait(Math.random() * 30 + 50); // 50-80ms random delay for natural feel
        }

        await wait(500);

        // Step 5: Final response with dynamic sources
        send({
          step_type: "FINAL", 
          content: {
            answer: answer,
            web_results: sources.map(source => ({
              title: source.name,
              url: source.url,
              snippet: source.snippet || `Learn more about ${question} from ${source.name}`
            }))
          }
        });

      } catch (error) {
        send({ error: "Failed to process request" });
      } finally {
        controller.close();
      }
    }
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
    },
  });
}
