// import React from 'react';
// import { FaInstagram, FaFacebookF, FaLinkedinIn, FaPinterestP } from 'react-icons/fa';

// const SocialMedia1 = ({ data, selectedId, setSelectedId, viewMode }) => {
//     // In your specific JSON, components IS the array of social items
//     const socialItems = data?.components || [];
    
//     const isMobile = viewMode === "mobile";

//     const renderIcon = (name) => {
//         const iconProps = { size: 18, className: "text-gray-700" };
        
//         switch (name?.toLowerCase()) {
//             case 'instagram': 
//                 return <FaInstagram {...iconProps} />;
//             case 'linkedin': 
//                 return <FaLinkedinIn {...iconProps} />;
//             case 'facebook': 
//                 return <FaFacebookF {...iconProps} />; 
//             case 'pinterest': 
//                 return <FaPinterestP {...iconProps} />;
//             default:
//                 return null;
//         }
//     };

//     return (
//         <div className="w-full bg-white py-12 px-4 md:px-10 font-sans">
//             {/* Header section matching the elvee design layout */}
//             <div className="mb-6 border-b border-gray-100 pb-2">
//                 <h3 className="text-[10px] font-bold tracking-[0.3em] text-gray-400 uppercase">
//                     SOCIAL MEDIA
//                 </h3>
//             </div>

//             {/* Grid layout for the social media cards */}
//             <div className={`grid gap-5 ${isMobile ? 'grid-cols-1' : 'grid-cols-2 lg:grid-cols-4'}`}>
//                 {socialItems.map((item, index) => {
//                     const itemId = `social-${index}`;
//                     return (
//                         <div 
//                             key={index}
//                             className={`relative group cursor-pointer overflow-hidden rounded-md transition-all 
//                                 ${selectedId === itemId ? 'ring-4 ring-blue-100' : 'hover:shadow-xl'}`}
//                             onClick={() => setSelectedId?.(itemId)}
//                         >
//                             <div className="aspect-[4/5] w-full bg-gray-50">
//                                 <img 
//                                     src={item.image} 
//                                     alt={item.socialmedianame}
//                                     className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
//                                     style={{
//                                         borderRadius: item.styling?.borderRadius || '0px',
//                                         objectFit: item.styling?.objectFit || 'cover'
//                                     }}
//                                 />
//                             </div>
                            
//                             {/* Platform Icon Badge located in the bottom-left corner */}
//                             <div className="absolute bottom-4 left-4 bg-white p-2 rounded-full shadow-md border border-gray-100">
//                                 {renderIcon(item.socialmedianame)}
//                             </div>
//                         </div>
//                     );
//                 })}
//             </div>
//         </div>
//     );
// };

// export default SocialMedia1;








import React, { useState, useEffect } from 'react';
 
import { 
  Trash2, Plus, Settings2, X, MousePointer2, 
  Image as ImageIcon, Layout 
} from 'lucide-react';
 
import { FaInstagram, FaFacebookF, FaLinkedinIn, FaPinterestP } from 'react-icons/fa';

import DeviceMockup from '../../layout/DeviceMockup';
import Swal from 'sweetalert2';

const SocialMedia1 = ({ data: initialData }) => {
  const [data, setData] = useState(initialData || { components: [] });
  const [selectedId, setSelectedId] = useState(null);
  const [viewMode, setViewMode] = useState('desktop');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  useEffect(() => {
    if (initialData) setData(initialData);
  }, [initialData]);

  const getComp = (id) => data?.components?.find((item) => item.id === id) || { props: {} };

  const handleUpdate = (id, field, value) => {
    setData((prev) => ({
      ...prev,
      components: prev.components.map((comp) =>
        comp.id === id ? { ...comp, props: { ...comp.props, [field]: value } } : comp
      ),
    }));
  };

  const handleAddPost = () => {
    const newId = `post-${Date.now()}`;
    const newPost = {
      id: newId,
      type: "social-post",
      props: {
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2070&auto=format&fit=crop",
        socialmedianame: "instagram",
        borderRadius: 12,
        aspectRatio: "4/5",
        iconShape: "circle",
        iconColor: "#374151"
      }
    };
    setData(prev => ({ ...prev, components: [...prev.components, newPost] }));
    setSelectedId(newId);
  };

  const handleDeletePost = (id) => {
    setData(prev => ({ ...prev, components: prev.components.filter(c => c.id !== id) }));
    setSelectedId(null);
  };

  const renderIcon = (itemProps, size = 18) => {
    const { socialmedianame, iconShape, iconColor } = itemProps;
    const iconStyle = { color: iconColor || "#374151" };
    
    let IconComponent;
    switch (socialmedianame?.toLowerCase()) {
      case 'instagram': IconComponent = <FaInstagram size={size} style={iconStyle} />; break;
      case 'facebook': IconComponent = <FaFacebookF size={size} style={iconStyle} />; break;
      case 'linkedin': IconComponent = <FaLinkedinIn size={size} style={iconStyle} />; break;
      case 'pinterest': IconComponent = <FaPinterestP size={size} style={iconStyle} />; break;
      default: IconComponent = <FaInstagram size={size} style={iconStyle} />;
    }

    const shapeClasses = {
      circle: "rounded-full",
      square: "rounded-none",
      rounded: "rounded-lg"
    };

    return (
      <div className={`bg-white p-2.5 shadow-xl border border-gray-100 flex items-center justify-center ${shapeClasses[iconShape] || "rounded-full"}`}>
        {IconComponent}
      </div>
    );
  };

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    background: 'rgba(255, 255, 255, 0.8)',
    backdrop: 'transparent',
  });

  const handleSave = async () => {
    try {
      Toast.fire({ icon: 'info', title: 'Saving template...', timer: 0 });
      const response = await fetch('/api/save-template', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, category: "social-media" }),
      });
      if (response.ok) Toast.fire({ icon: 'success', title: 'Saved successfully', timer: 2000 });
      else throw new Error();
    } catch (error) {
      Toast.fire({ icon: 'error', title: 'Save failed', timer: 3000 });
    }
  };

  const activeComp = selectedId ? getComp(selectedId) : null;

  const renderCanvasContent = (isPreview = false) => (
    <div className={`w-full bg-white py-12 px-4 md:px-10 font-sans min-h-screen ${isPreview ? '' : 'pb-40'}`}>
      <div className="mb-10 border-b border-gray-100 pb-4">
        <h3 className="text-[10px] font-bold tracking-[0.3em] text-gray-400 uppercase">SOCIAL MEDIA</h3>
      </div>

      <div className={`grid gap-6 ${
  viewMode === 'mobile' 
    ? 'grid-cols-1' 
    : viewMode === 'tablet' 
      ? 'grid-cols-2' 
      : 'grid-cols-2 lg:grid-cols-4'
}`}>
        {data?.components?.map((item) => (
          <div
            key={item.id}
            onClick={(e) => { e.stopPropagation(); !isPreview && setSelectedId(item.id); }}
            className={`relative group cursor-pointer transition-all duration-300 
              ${selectedId === item.id && !isPreview ? 'ring-4 ring-indigo-500 rounded-lg scale-[1.02]' : 'hover:shadow-2xl'}`}
              style={{ borderRadius: `${item?.props?.borderRadius || 0}px` }}
          >
            <div 
              className="overflow-hidden bg-gray-100"
              style={{ aspectRatio: item?.props?.aspectRatio || "4/5", borderRadius: `${item?.props?.borderRadius || 0}px` }}
            >
              <img src={item?.props?.image} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Post" />
            </div>

            <div className="absolute bottom-4 left-4">
              {renderIcon(item.props)}
            </div>

            {!isPreview && (
              <button onClick={(e) => { e.stopPropagation(); handleDeletePost(item.id); }} className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <Trash2 size={14} />
              </button>
            )}
          </div>
        ))}
        {!isPreview && (
          <button onClick={handleAddPost} className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl min-h-[300px] text-gray-400 hover:border-indigo-400 transition-all">
            <Plus size={40} className="mb-2" />
            <span className="font-medium text-sm">Add Social Post</span>
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans w-full">
      <button onClick={() => setIsPreviewOpen(true)} className="fixed top-3 right-80 z-50 cursor-pointer bg-[#615fff] text-white px-6 py-2 shadow-2xl rounded-lg flex items-center gap-2 font-bold text-xs">
        <MousePointer2 size={13} /> Preview
      </button>

      <div className="flex-1" onClick={() => setSelectedId(null)}>
        <DeviceMockup activeDevice={viewMode} onChange={setViewMode}>
          {renderCanvasContent(false)}
        </DeviceMockup>
      </div>

      {isPreviewOpen && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md flex flex-col items-center justify-start overflow-y-auto p-10">
          <button onClick={() => setIsPreviewOpen(false)} className="absolute top-6 right-10 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all">
            <X size={32} />
          </button>
          <div className="w-full max-w-7xl mt-10">{renderCanvasContent(true)}</div>
        </div>
      )}

      {/* SETTINGS SIDEBAR */}
      <div className="w-[18%] bg-white border-l border-gray-200 shadow-2xl fixed top-0 right-0 h-screen overflow-y-auto z-[60] flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="p-4 bg-white border-b border-gray-200 sticky top-0 z-10 flex justify-between items-center">
          <h2 className="text-sm font-bold flex items-center gap-2"><Settings2 size={16} />Settings</h2>
          <button   onClick={handleSave}
                            className="text-white px-5 py-2 rounded-lg text-sm font-semibold bg-[#615fff] hover:bg-blue-600 transition-all shadow-md">Publish</button>
        </div>

        <div className="p-5 space-y-6">
          {activeComp ? (
            <div className="space-y-6">
 
              <div className="space-y-4">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest block">Content</label>
                <div>
                  <span className="text-xs font-medium text-gray-700 block mb-1">Image URL</span>
                  <input
                    type="text"
                    value={activeComp.props.image || ""}
                    onChange={(e) => handleUpdate(activeComp.id, "image", e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-[11px] outline-none"
                  />
                </div>
                <div>
                  <span className="text-xs font-medium text-gray-700 block mb-1">Social Platform</span>
                  <select
                    value={activeComp.props.socialmedianame?.toLowerCase() || "instagram"}
                    onChange={(e) => handleUpdate(activeComp.id, "socialmedianame", e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-xs"
                  >
                    <option value="instagram">Instagram</option>
                    <option value="facebook">Facebook</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="pinterest">Pinterest</option>
                  </select>
                </div>
              </div>

              {/* Icon Customization Section */}
              <div className="space-y-4 border-t pt-4">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest block">Icon Style</label>
                <div>
                  <span className="text-xs font-medium text-gray-700 block mb-2">Icon Shape</span>
                  <div className="flex gap-2">
                    {['circle', 'square', 'rounded'].map((shape) => (
                      <button
                        key={shape}
                        onClick={() => handleUpdate(activeComp.id, "iconShape", shape)}
                        className={`flex-1 py-2 text-[10px] border rounded capitalize transition-all ${activeComp.props.iconShape === shape ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-gray-50 hover:bg-gray-100 border-gray-200'}`}
                      >
                        {shape}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-xs font-medium text-gray-700 block mb-2">Icon Color</span>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={activeComp.props.iconColor || "#374151"}
                      onChange={(e) => handleUpdate(activeComp.id, "iconColor", e.target.value)}
                      className="w-10 h-10 rounded cursor-pointer border-none bg-transparent"
                    />
                    <span className="text-[10px] font-mono text-gray-500 uppercase">{activeComp.props.iconColor || "#374151"}</span>
                  </div>
                </div>
              </div>

              {/* Layout/Styling Section */}
              <div className="space-y-4 border-t pt-4">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest block">Layout</label>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-xs font-medium text-gray-700">Card Radius</span>
                    <span className="text-xs font-bold text-indigo-600">{activeComp.props.borderRadius || 0}px</span>
                  </div>
                  <input
                    type="range" min="0" max="50"
                    value={activeComp.props.borderRadius || 0}
                    onChange={(e) => handleUpdate(activeComp.id, "borderRadius", parseInt(e.target.value))}
                    className="w-full accent-[#615fff]"
                  />
                </div>
                <div>
                  <span className="text-xs font-medium text-gray-700 block mb-1">Aspect Ratio</span>
                  <div className="grid grid-cols-2 gap-2">
                    {["1/1", "4/5", "16/9", "3/4"].map(ratio => (
                      <button
                        key={ratio}
                        onClick={() => handleUpdate(activeComp.id, "aspectRatio", ratio)}
                        className={`text-[10px] py-1 border rounded ${activeComp.props.aspectRatio === ratio ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-gray-50 border-gray-100'}`}
                      >
                        {ratio === "1/1" ? "Square" : ratio === "4/5" ? "Portrait" : ratio}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-60 flex flex-col items-center justify-center text-center opacity-40">
              <ImageIcon size={40} className="mb-2 text-gray-300" />
              <p className="text-xs">Select a social card<br />to edit properties</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SocialMedia1;