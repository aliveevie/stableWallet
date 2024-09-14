import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaHome, FaPaperPlane, FaHistory, FaHeadset, FaTimes } from 'react-icons/fa';
import useStore from "@/functions/main";

export const Sidebar = ({ onClose }) => {


  const { state, renderCredential, formatDate } = useStore();
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [date, setDate] = useState('');
  const [hovered, setHovered] = useState(null);
  const router = useRouter(); // For navigation

  const menuItems = [
    { name: 'Home', icon: <FaHome />, path: '/pages/home' },
    { name: 'Send', icon: <FaPaperPlane />, path: '/pages/send' },
    { name: 'History', icon: <FaHistory />, path: '/pages/transactions' },
    { name: 'Support', icon: <FaHeadset />, path: '/pages/support' },
  ];

  const handleNavigation = (path) => {
    router.push(path); // Navigate to the respective path
    onClose(); // Close the sidebar when a link is clicked
  };

  const handleLogout = () => {
    localStorage.clear(); // Clear the local storage
    router.push('/'); // Redirect to home page
  };

  useEffect(() => {

    const customerData = async () => {

        if(state.customerCredentials[0]){
          const data = await renderCredential(state.customerCredentials[0]);
          if(data){
            setName(data.name)
            setCode(data.countryCode);
            setDate(formatDate(new Date())); // Format the date when setting it
          }
        }
      
    }
    customerData();

  }, [state.customerCredentials])

  return (
    <div className="fixed top-0 left-0 h-full w-2/3 bg-gray-900 p-6 shadow-lg flex flex-col items-start z-50 sidebar">
      {/* Close Button */}
      <button
        className="text-white ml-auto mb-4"
        onClick={onClose} // Close the sidebar on button click
      >
        <FaTimes className="text-2xl" />
      </button>

      <div className="flex flex-col items-center mb-12">
        {/* Customer Initials */}
        <div className="bg-blue-500 rounded-full w-16 h-16 flex items-center justify-center text-2xl text-white mb-2">
          {code}
        </div>
        <p className="text-white font-bold text-xl">{name}</p>
        <p className="text-white font-bold text-sm">{date}</p>

      </div>

      {/* Menu Items */}
      <ul className="space-y-6 w-full">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className="flex items-center space-x-4 cursor-pointer"
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => handleNavigation(item.path)}
          >
            <span className="text-white text-2xl">{item.icon}</span>
            <span className={`text-white font-semibold transition-all duration-300 ${hovered === index ? 'opacity-100 ml-2' : 'opacity-0 ml-0'}`}>
              {item.name}
            </span>
          </li>
        ))}
      </ul>

      {/* Logout Button */}
      <div className="mt-auto w-full flex justify-center">
        <button
          onClick={handleLogout} // Call handleLogout on button click
          className="bg-red-500 text-white py-2 px-6 rounded-md w-full font-semibold hover:bg-red-600 transition duration-300">
          Logout
        </button>
      </div>
    </div>
  );
};
