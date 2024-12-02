import React from "react";
import { Phone, Mail, MapPin } from "lucide-react";

const ContactInfo: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-black/50 backdrop-blur-sm border border-[#00ff99]/20 rounded-lg flex items-center justify-center">
          <Phone className="text-[#00ff99]" size={24} />
        </div>
        <div>
          <h3 className="text-white font-mono">Phone</h3>
          <p className="text-gray-400">(+92) 348 620 5084</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-black/50 backdrop-blur-sm border border-[#00ff99]/20 rounded-lg flex items-center justify-center">
          <Mail className="text-[#00ff99]" size={24} />
        </div>
        <div>
          <h3 className="text-white font-mono">Email</h3>
          <p className="text-gray-400">inam101001@gmail.com</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-black/50 backdrop-blur-sm border border-[#00ff99]/20 rounded-lg flex items-center justify-center">
          <MapPin className="text-[#00ff99]" size={24} />
        </div>
        <div>
          <h3 className="text-white font-mono">Address</h3>
          <p className="text-gray-400">Punjab, Pakistan</p>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
