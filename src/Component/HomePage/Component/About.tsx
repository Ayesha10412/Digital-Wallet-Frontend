
export default function About() {
  const teamMembers = [
  {
    name: "Alice Johnson",
    role: "CEO & Founder",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    name: "Bob Smith",
    role: "CTO",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    name: "Charlie Davis",
    role: "Product Designer",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Diana Lee",
    role: "Lead Developer",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
  },
];
  return (
    <section className="bg-background text-white py-20 ">
      <div className="max-w-7xl mx-auto px-4 space-y-16">

        {/* Hero / Mission Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-600">
            About Our Digital Wallet
          </h1>
          <p className="text-lg md:text-lg text-gray-400">
            We empower people to manage, send, and spend their money safely and effortlessly.  
            Our mission is to make digital finance simple, secure, and accessible for everyone.
          </p>
        </div>

        {/* Our Story */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4 text-blue-600">Our Story</h2>
            <p className="text-gray-400 leading-relaxed">
              Founded with a vision to simplify everyday financial transactions, our digital wallet provides 
              a seamless experience for sending, receiving, and managing money.  
              We believe in transparency, security, and empowering users with tools to make smart financial decisions.
            </p>
          </div>
          <img
            src="https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=800"
            alt="Our Story"
            className="rounded-xl shadow-lg w-full h-auto object-cover"
          />
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <img
            src="https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=800"
            alt="Mission & Vision"
            className="rounded-xl shadow-lg w-full h-auto object-cover"
          />
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-blue-600">Our Mission</h2>
            <p className="text-gray-400 leading-relaxed">
              To empower users with a secure, reliable, and smart digital wallet that simplifies daily payments, 
              enhances financial awareness, and gives peace of mind through advanced security.
            </p>

            <h2 className="text-3xl font-bold text-blue-600">Our Vision</h2>
            <p className="text-gray-400 leading-relaxed">
              To become the most trusted digital wallet globally, bridging the gap between modern technology 
              and financial freedom for everyone.
            </p>
          </div>
        </div>

       {/* Team Section */}
        <div className="text-center space-y-6">
          <h2 className="text-3xl font-bold text-blue-600">Meet the Team</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Our team consists of passionate fintech innovators, security experts, and UX designers committed 
            to delivering a world-class digital wallet experience.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-12">
            {teamMembers.map((member) => (
              <div key={member.name} className="space-y-3 text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto object-cover shadow-lg"
                />
                <p className="font-semibold text-lg">{member.name}</p>
                <p className="text-gray-400 text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
