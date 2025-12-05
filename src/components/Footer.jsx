import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-4">
            <span className="text-white">Braynix</span>
            <span className="text-blue-400"> Studios</span>
          </h3>
          <p className="text-gray-400">Creating innovative digital solutions for modern businesses.</p>
        </div>
        
        <div>
          <h4 className="font-semibold mb-4">Company</h4>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-white transition-colors">About</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Team</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-semibold mb-4">Services</h4>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-white transition-colors">Web Development</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Mobile Apps</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Consulting</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-semibold mb-4">Contact</h4>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-white transition-colors">Email</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
            <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
          </ul>
        </div>
      </div>
      
      <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
        <p>&copy; 2024 Braynix Studios. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
