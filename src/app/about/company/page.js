import CardNav from '../../../components/CardNav';
import Footer from '../../../components/Footer';

export default function Company() {
  const items = [
    {
      label: "About",
      bgColor: "#0D0716",
      textColor: "#fff",
      links: [
        { label: "Company", ariaLabel: "About Company", href: "/about/company" }
      ]
    },
    {
      label: "Projects", 
      bgColor: "#170D27",
      textColor: "#fff",
      cardHref: "/projects/discover",
      links: [
        { label: "New Proposal", ariaLabel: "New Proposal", href: "/projects/new-proposal" },
        { label: "Top Growing Project", ariaLabel: "Top Growing Project", href: "/projects/top-growing" }
      ]
    },
    {
      label: "Contact",
      bgColor: "#271E37", 
      textColor: "#fff",
      links: [
        { label: "Collaborators", ariaLabel: "Collaborators", href: "/contact/collaborators" }
      ]
    }
  ];

  return (
    <div>
      <CardNav
        items={items}
        baseColor="#fff"
        menuColor="#000"
        buttonBgColor="#111"
        buttonTextColor="#fff"
        ease="power3.out"
      />
      
      <section className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center pt-20">
        <div className="text-center px-4 max-w-4xl">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">About Our Company</h1>
          <p className="text-xl text-gray-600 mb-8">Founded in 2020, Braynix Studios has been at the forefront of digital innovation.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4 text-purple-600">Our Mission</h3>
              <p className="text-gray-600">To empower businesses through innovative technology solutions.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4 text-pink-600">Our Vision</h3>
              <p className="text-gray-600">To be the leading digital transformation partner.</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}