import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

const ContactInfo: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-[#1a1a1a] rounded-lg flex items-center justify-center">
          <Phone className="text-[#00ff99]" size={24} />
        </div>
        <div>
          <h3 className="text-white font-mono">Phone</h3>
          <p className="text-gray-400">(+48) 321 654 876</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-[#1a1a1a] rounded-lg flex items-center justify-center">
          <Mail className="text-[#00ff99]" size={24} />
        </div>
        <div>
          <h3 className="text-white font-mono">Email</h3>
          <p className="text-gray-400">youremail@gmail.com</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-[#1a1a1a] rounded-lg flex items-center justify-center">
          <MapPin className="text-[#00ff99]" size={24} />
        </div>
        <div>
          <h3 className="text-white font-mono">Address</h3>
          <p className="text-gray-400">Code Corner, Tech Town 13579</p>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;