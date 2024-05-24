import {
  FaGithub,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="py-12 text-pink-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="col-span-1">
            <h3 className="text-pink-700 font-bold mb-4">Company</h3>
            <p className="text-pink-600 mb-2">About Us</p>
            <p className="text-pink-600 mb-2">Careers</p>
            <p className="text-pink-600 mb-2">Press</p>
            <p className="text-pink-600">Blog</p>
          </div>
          <div className="col-span-1">
            <h3 className="text-pink-700 font-bold mb-4">Resources</h3>
            <p className="text-pink-600 mb-2">Documentation</p>
            <p className="text-pink-600 mb-2">Guides</p>
            <p className="text-pink-600 mb-2">API Reference</p>
            <p className="text-pink-600">Tutorials</p>
          </div>
          <div className="col-span-1">
            <h3 className="text-pink-700 font-bold mb-4">Contact</h3>
            <p className="text-pink-600 mb-2 flex items-center">
              <FaEnvelope className="mr-2" />
              contact@company.com
            </p>
            <p className="text-pink-600 mb-2 flex items-center">
              <FaMapMarkerAlt className="mr-2" />
              123 Main Street, Anytown USA
            </p>
            <p className="text-pink-600 flex items-center">
              <FaPhoneAlt className="mr-2" />
              (123) 456-7890
            </p>
          </div>
          <div className="col-span-1">
            <h3 className="text-pink-700 font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-6 items-center justify-center">
              <a
                href="#"
                className="text-pink-600 hover:text-white transition-colors duration-300"
              >
                <FaGithub size={24} />
              </a>
              <a
                href="#"
                className="text-pink-600 hover:text-white transition-colors duration-300"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href="#"
                className="text-pink-600 hover:text-white transition-colors duration-300"
              >
                <FaLinkedin size={24} />
              </a>
              <a
                href="#"
                className="text-pink-600 hover:text-white transition-colors duration-300"
              >
                <FaYoutube size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700">
          <p className="text-gray-400 text-center">
            &copy; {new Date().getFullYear()} Beacon. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
