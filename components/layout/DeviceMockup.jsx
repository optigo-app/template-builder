import React from 'react';
import { Monitor, Tablet, Smartphone } from 'lucide-react';
import Link from 'next/link';
const DeviceMockup = ({ children, activeDevice, onChange ,component}) => {
  const devices = [
    { id: 'mobile', icon: Smartphone, width: '375px', label: 'Mobile' },
    { id: 'tablet', icon: Tablet, width: '768px', label: 'Tablet' },
    { id: 'desktop', icon: Monitor, width: '100%', label: 'Desktop' },
  ];

  const currentDevice = devices.find(d => d.id === activeDevice) || devices[2];

  return (
    <div className="flex flex-col flex-1   bg-gray-100 " style={{width:"81.5%"}}>
      {/* Device Selector Toolbar */}
      <div className="bg-white border-b border-gray-200 p-2 flex justify-center gap-4   z-10" style={{padding:"12px",position:"sticky",top:0,borderLeft:"1px solid #e5e7eb"}}>
        <div className='relative flex items-center gap-4'>
        {devices.map((device) => (
          <button
            key={device.id}
            onClick={() => onChange(device.id)}
            className={`p-2 rounded-lg transition-all flex items-center gap-2 ${
              activeDevice === device.id 
                ? 'bg-indigo-100 text-indigo-600 ring-1 ring-indigo-300' 
                : 'text-gray-500 hover:bg-gray-100'
            }`}
            title={device.label}
          >
            <device.icon size={20} />
            <span className="text-xs font-medium">{device.label}</span>
          </button>
        ))}
        </div>
        <Link 
         href={`/Preview/${component}`}
           className="  text-white px-5 py-2 rounded-lg text-sm font-semibold absolute right-8 top-3   hover:shadow-md hover:bg-blue-500 cursor-pointer transition-all active:scale-95  top-0"
           style={{ backgroundColor: "#615fff", padding: "8px 18px",fontSize: "14px" }}
         >
          Preview
     </Link>
       
      </div>
      


      {/* Viewport Container */}
      <div className="flex-1 overflow-auto p-8 flex justify-center items-start transition-all duration-500 ease-in-out">
        <div 
          className=" transition-all duration-500 ease-in-out overflow-hidden"
          style={{ 
            width: currentDevice.width,
            minHeight: '100%',
            borderRadius: activeDevice === 'desktop' ? '0px' : '24px',
            border: activeDevice === 'desktop' ? 'none' : '5px solid #1f2937'
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default DeviceMockup;