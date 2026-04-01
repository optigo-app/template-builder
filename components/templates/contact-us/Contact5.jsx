// import React from 'react';
// import { Mail, Phone, User, AlertCircle, Edit2 } from 'lucide-react';

// const Contact5 = ({ data, selectedId, setSelectedId, viewMode }) => {
//     // Extracting the three sections from the JSON structure
//     const heroSection = data?.components.find(c => c.id === "section-1-hero");
//     const infoSection = data?.components.find(c => c.id === "section-2-info");
//     const formSection = data?.components.find(c => c.id === "section-3-form");

//     const isMobile = viewMode === "mobile";

//     // Helper to render icons based on field type or icon name
//     const renderIcon = (iconName) => {
//         switch (iconName) {
//             case 'User': return <User size={18} />;
//             case 'Phone': return <Phone size={18} />;
//             case 'Mail': return <Mail size={18} />;
//             case 'AlertCircle': return <AlertCircle size={18} />;
//             case 'Edit2': return <Edit2 size={18} />;
//             default: return null;
//         }
//     };

//     return (
//         <div className="w-full min-h-screen font-sans bg-[#f0f9f4]">
            
//             {/* 1. Hero Section (Heading & Text on BG Image) */}
//             {heroSection && (
//                 <div 
//                     className={`relative w-full flex items-center justify-start overflow-hidden transition-all ${selectedId === heroSection.id ? 'ring-4 ring-blue-400 inset-0' : ''}`}
//                     onClick={() => setSelectedId(heroSection.id)}
//                     style={{ 
//                         backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2072&auto=format&fit=crop')`,
//                         backgroundSize: 'cover',
//                         backgroundPosition: 'center',
//                         padding: heroSection.props.padding || '100px 5%',
//                         minHeight: '350px'
//                     }}
//                 >
//                     <div className="max-w-7xl mx-auto w-full text-left">
//                         <h1 
//                             className="font-bold mb-4"
//                             style={{ 
//                                 fontSize: isMobile ? '36px' : `${heroSection.props.headingFontSize}px`, 
//                                 color: heroSection.props.headingColor 
//                             }}
//                         >
//                             {heroSection.props.heading}
//                         </h1>
//                         <p 
//                             className="max-w-xl opacity-90"
//                             style={{ 
//                                 fontSize: `${heroSection.props.contentFontSize}px`, 
//                                 color: heroSection.props.contentColor 
//                             }}
//                         >
//                             {heroSection.props.subtext}
//                         </p>
//                     </div>
//                 </div>
//             )}

//             {/* Main Content Area: Split Info & Form */}
//             <div className="max-w-7xl mx-auto px-6 py-16 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                
//                 {/* 2. Info Section (Subheading, Content, Phone) */}
//                 {infoSection && (
//                     <div 
//                         className={`space-y-8 py-8 transition-all ${selectedId === infoSection.id ? 'ring-2 ring-blue-400 p-6 rounded-xl bg-white' : ''}`}
//                         onClick={() => setSelectedId(infoSection.id)}
//                     >
//                         <div className="space-y-4">
//                             <h2 
//                                 className="font-extrabold leading-tight"
//                                 style={{ 
//                                     fontSize: isMobile ? '28px' : `${infoSection.props.headingFontSize}px`, 
//                                     color: infoSection.props.headingColor 
//                                 }}
//                             >
//                                 {infoSection.props.heading}
//                             </h2>
//                             <h3 className="text-xl font-bold text-gray-800">
//                                 {infoSection.props.subheading}
//                             </h3>
//                             <p 
//                                 className="leading-relaxed"
//                                 style={{ 
//                                     fontSize: `${infoSection.props.contentFontSize}px`, 
//                                     color: infoSection.props.contentColor 
//                                 }}
//                             >
//                                 {infoSection.props.content}
//                             </p>
//                         </div>

//                         {/* Phone CTA */}
//                         <div className="flex items-center gap-4 group cursor-pointer">
//                             <div 
//                                 className="p-3 rounded-full flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110"
//                                 style={{ backgroundColor: infoSection.props.iconColor }}
//                             >
//                                 <Phone size={24} fill="currentColor" />
//                             </div>
//                             <span className="text-2xl font-black text-gray-900">
//                                 {infoSection.props.phoneDisplay}
//                             </span>
//                         </div>
//                     </div>
//                 )}

//                 {/* 3. Form Section (Floating Card) */}
//                 {formSection && (
//                     <div 
//                         className={`shadow-2xl transition-all -mt-32 lg:-mt-48 relative z-10 ${selectedId === formSection.id ? 'ring-4 ring-blue-500' : ''}`}
//                         onClick={() => setSelectedId(formSection.id)}
//                         style={{ 
//                             backgroundColor: formSection.props.backgroundColor, 
//                             borderRadius: `${formSection.props.borderRadius}px`,
//                             padding: isMobile ? '30px' : formSection.props.padding
//                         }}
//                     >
//                         <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
//                             {formSection.props.fields.map((field) => (
//                                 <div key={field.id} className="relative border-b border-gray-100 pb-2 group">
//                                     <div className="flex items-center gap-3">
//                                         <span className="text-gray-400 group-focus-within:text-emerald-600 transition-colors">
//                                             {renderIcon(field.icon)}
//                                         </span>
//                                         <div className="flex-1">
//                                             <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1">
//                                                 {field.label}
//                                             </label>
//                                             {field.type === "textarea" ? (
//                                                 <textarea 
//                                                     readOnly
//                                                     placeholder={field.placeholder}
//                                                     className="w-full bg-transparent text-sm text-gray-800 placeholder:text-gray-300 outline-none resize-none"
//                                                     rows={2}
//                                                 />
//                                             ) : (
//                                                 <input 
//                                                     type={field.type}
//                                                     readOnly
//                                                     placeholder={field.placeholder}
//                                                     className="w-full bg-transparent text-sm text-gray-800 placeholder:text-gray-300 outline-none"
//                                                 />
//                                             )}
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))}

//                             <button 
//                                 className="w-fit px-8 py-3.5 font-bold text-sm tracking-wide transition-all active:scale-[0.95] hover:opacity-90 shadow-lg mt-4"
//                                 style={{ 
//                                     backgroundColor: formSection.props.buttonColor, 
//                                     color: formSection.props.buttonTextColor,
//                                     borderRadius: `${formSection.props.buttonBorderRadius}px`
//                                 }}
//                             >
//                                 {formSection.props.buttonText}
//                             </button>
//                         </form>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Contact5;


import React, { useState, useEffect } from 'react';
import { Settings2, Mail, Phone, User, AlertCircle, Edit2, MousePointer2, X, Trash2, Plus, Layout, Type, Image as ImageIcon } from 'lucide-react';
import DeviceMockup from '../../layout/DeviceMockup';
import Swal from 'sweetalert2';
import templatesData from '@/data/templates.json';

const Contact5 = ({ data: initialData }) => {
    const [data, setData] = useState(initialData || { components: [] });
    const [selectedId, setSelectedId] = useState(null);
    const [viewMode, setViewMode] = useState('desktop');
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);

    useEffect(() => {
        if (initialData) setData(initialData);
    }, [initialData]);

    const getComp = (id) => data?.components?.find((item) => item.id === id) || { props: { fields: [] } };

    const handleUpdate = (id, field, value) => {
        setData((prev) => ({
            ...prev,
            components: prev.components.map((comp) =>
                comp.id === id ? { ...comp, props: { ...comp.props, [field]: value } } : comp
            ),
        }));
    };

    const handleGlobalUpdate = (field, value) => {
        setData(prev => ({ ...prev, [field]: value }));
    };

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
    });

    const handleSave = async () => {
        try {
            Toast.fire({ icon: 'info', title: 'Saving template...', timer: 0 });
            let folderName = "general";
            templatesData.forEach(cat => {
                const found = cat.templates.find(t => t.templateId === data.templateId);
                if (found) folderName = cat.category;
            });

            const response = await fetch('/api/save-template', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...data, category: folderName }),
            });

            if (response.ok) {
                Toast.fire({ icon: 'success', title: 'Saved successfully', timer: 2000 });
            } else {
                throw new Error();
            }
        } catch (error) {
            Toast.fire({ icon: 'error', title: 'Save failed', timer: 3000 });
        }
    };

    const Editable = ({ id, field, className, tag: Tag = "div", style = {} }) => {
        const comp = getComp(id);
        const val = comp.props[field];

        return (
            <Tag
                className={`${className} outline-none focus:ring-2 focus:ring-blue-400 rounded transition-all`}
                style={{ ...style, whiteSpace: 'pre-line' }}
                contentEditable
                suppressContentEditableWarning={true}
                onBlur={(e) => handleUpdate(id, field, e.target.innerText)}
                onClick={(e) => { e.stopPropagation(); setSelectedId(id); }}
            >
                {val}
            </Tag>
        );
    };

    const renderIcon = (iconName) => {
        switch (iconName) {
            case 'User': return <User size={18} />;
            case 'Phone': return <Phone size={18} />;
            case 'Mail': return <Mail size={18} />;
            case 'AlertCircle': return <AlertCircle size={18} />;
            case 'Edit2': return <Edit2 size={18} />;
            default: return null;
        }
    };

    // Helper for the Color Input UI
    const ColorPicker = ({ label, value, onChange }) => (
        <div>
            <span className="text-[10px] font-bold text-gray-500 uppercase mb-1 block">{label}</span>
            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg p-1 gap-2">
                <input
                    type="color"
                    className="w-6 h-6 rounded cursor-pointer border-none bg-transparent"
                    value={value || "#000000"}
                    onChange={(e) => onChange(e.target.value)}
                />
                <input
                    type="text"
                    className="text-[9px] font-mono w-full bg-transparent outline-none uppercase"
                    value={value || "#000000"}
                    onChange={(e) => onChange(e.target.value)}
                />
            </div>
        </div>
    );

    const heroSection = getComp("section-1-hero");
    const infoSection = getComp("section-2-info");
    const formSection = getComp("section-3-form");

    const renderCanvasContent = () => {
        const isMobile = viewMode === "mobile";
        return (
            <div className="w-full min-h-screen font-sans" style={{ backgroundColor: data.backgroundColor || "#f0f9f4" }}>
                
                {/* 1. Hero Section */}
                <div 
                    className={`relative w-full flex items-center justify-start transition-all cursor-pointer ${selectedId === 'section-1-hero' ? 'ring-4 ring-blue-400' : ''}`}
                    onClick={(e) => { e.stopPropagation(); setSelectedId('section-1-hero'); }}
                    style={{ 
                        backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('${heroSection.props.backgroundImage ||  ""}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        padding: heroSection.props.padding || '100px 5%',
                        minHeight: '350px'
                    }}
                >
                    <div className="max-w-7xl mx-auto w-full text-left">
                        <Editable 
                            id="section-1-hero" field="heading" tag="h1"
                            className="font-bold mb-4"
                            style={{ 
                                fontSize: isMobile ? '36px' : `${heroSection.props.headingFontSize}px`, 
                                color: heroSection.props.headingColor 
                            }}
                        />
                        <Editable 
                            id="section-1-hero" field="subtext" tag="p"
                            className="max-w-xl opacity-90"
                            style={{ 
                                fontSize: `${heroSection.props.contentFontSize}px`, 
                                color: heroSection.props.contentColor 
                            }}
                        />
                    </div>
                </div>

                {/* Main Content Area */}
                <div className={`max-w-7xl mx-auto px-6 py-16 md:px-12 grid gap-16 items-start ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
                    
                    {/* 2. Info Section */}
                    <div 
                        className={`space-y-8 py-8 transition-all cursor-pointer ${selectedId === 'section-2-info' ? 'ring-2 ring-blue-400 p-6 rounded-xl bg-white' : ''}`}
                        onClick={(e) => { e.stopPropagation(); setSelectedId('section-2-info'); }}
                    >
                        <div className="space-y-4">
                            <Editable 
                                id="section-2-info" field="heading" tag="h2"
                                className="font-extrabold leading-tight"
                                style={{ 
                                    fontSize: isMobile ? '28px' : `${infoSection.props.headingFontSize}px`, 
                                    color: infoSection.props.headingColor 
                                }}
                            />
                            <Editable 
                                id="section-2-info" field="subheading" tag="h3" 
                                className="font-bold" 
                                style={{
                                    fontSize: `${infoSection.props.subheadingFontSize || 20}px`,
                                    color: infoSection.props.subheadingColor || '#1f2937'
                                }}
                            />
                            <Editable 
                                id="section-2-info" field="content" tag="p"
                                className="leading-relaxed"
                                style={{ 
                                    fontSize: `${infoSection.props.contentFontSize}px`, 
                                    color: infoSection.props.contentColor 
                                }}
                            />
                        </div>

                        <div className="flex items-center gap-4 group">
                            <div 
                                className="p-3 rounded-full flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110"
                                style={{ backgroundColor: formSection.props.buttonColor}}
                            >
                                <Phone size={24} fill="currentColor" />
                            </div>
                            <Editable id="section-2-info" field="phoneDisplay" tag="span" className="text-2xl font-black text-gray-900" />
                        </div>
                    </div>

                    {/* 3. Form Section */}
                    <div 
                        className={`shadow-2xl transition-all relative z-10 cursor-pointer ${isMobile ? 'mt-0' : '-mt-0'} ${selectedId === 'section-3-form' ? 'ring-4 ring-blue-500' : ''}`}
                        onClick={(e) => { e.stopPropagation(); setSelectedId('section-3-form'); }}
                        style={{ 
                            backgroundColor: formSection.props.backgroundColor, 
                            borderRadius: `${formSection.props.borderRadius}px`,
                            padding: isMobile ? '30px' : formSection.props.padding
                        }}
                    >
                        <div className="space-y-6">
                            {formSection.props.fields?.map((field) => (
                                <div key={field.id} className="relative border-b border-gray-100 pb-2">
                                    <div className="flex items-center gap-3">
                                        <span className="text-gray-400">{renderIcon(field.icon)}</span>
                                        <div className="flex-1">
                                           
                                            <input 
                                                 
                                                placeholder={field.placeholder}
                                                className="w-full bg-transparent text-sm text-gray-800 outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <button 
                                className="w-fit px-8 py-3.5 font-bold text-sm tracking-wide transition-all shadow-lg mt-4"
                                style={{ 
                                    backgroundColor: formSection.props.buttonColor, 
                                    color: formSection.props.buttonTextColor,
                                    borderRadius: `${formSection.props.buttonBorderRadius}px`
                                }}
                            >
                                {formSection.props.buttonText}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="flex min-h-screen bg-gray-100 font-sans w-full" style={{width:"95.3%"}}>
          <button
                          onClick={() => setIsPreviewOpen(true)}
                          className="fixed cursor-pointer top-3 right-80 z-50 bg-indigo-600 text-white px-6 py-2 rounded-lg transition-all flex items-center gap-2 font-bold text-sm"
                      >
                          <MousePointer2 size={14} /> Preview
                      </button>

            <div className="flex-1 overflow-y-auto">
                <DeviceMockup activeDevice={viewMode} onChange={setViewMode}>
                    {renderCanvasContent()}
                </DeviceMockup>
            </div>

            {/* Sidebar Settings */}
         {/* Sidebar Settings */}
         <div className="w-80 bg-white border-l border-gray-200 shadow-2xl z-[60] flex flex-col fixed right-0 h-full overflow-y-auto">
    <div className="p-4 border-b flex justify-between items-center sticky top-0 bg-white z-10">
         <h2 className="font-bold flex items-center gap-2"><Settings2 size={18} /> Settings</h2>
        <button onClick={handleSave} className="bg-indigo-600 text-white px-4 py-1.5 rounded text-sm font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-colors">Publish</button>
    </div>

    <div className="p-6 space-y-8">
        {/* Global Background */}
        <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase mb-2 block tracking-wider">Global Canvas</span>
            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg p-1.5 gap-2">
                <input
                    type="color"
                    className="w-6 h-6 rounded cursor-pointer border-none"
                    value={data.backgroundColor}
                    onChange={(e) => handleGlobalUpdate('backgroundColor', e.target.value)}
                />
                <input
                    type="text"
                    className="text-[10px] font-mono w-full bg-transparent outline-none uppercase text-gray-600"
                    value={data.backgroundColor}
                    onChange={(e) => handleGlobalUpdate('backgroundColor', e.target.value)}
                />
            </div>
        </div>

        {/* Section Specific Controls */}
        {selectedId === 'section-1-hero' && (
            <div className="space-y-6 animate-in slide-in-from-right-4">
                
                
                {/* Background Image */}
                <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase mb-2 block">Background Image URL</label>
                    <input 
                        type="text" 
                        className="w-full text-xs p-2.5 border border-gray-200 rounded-lg bg-gray-50 focus:ring-1 focus:ring-indigo-500 outline-none"
                        value={heroSection.props.backgroundImage}
                        onChange={(e) => handleUpdate(selectedId, 'backgroundImage', e.target.value)}
                        placeholder="https://..."
                    />
                </div>

                {/* Heading Typography */}
                <div className="space-y-4">
                    <div>
                        <div className="flex justify-between mb-2">
                            <span className="text-[10px] font-bold text-gray-500 uppercase">Heading Size</span>
                            <span className="text-xs font-bold text-indigo-600">{heroSection.props.headingFontSize}px</span>
                        </div>
                        <input type="range" min="20" max="100" value={heroSection.props.headingFontSize} onChange={(e) => handleUpdate(selectedId, 'headingFontSize', parseInt(e.target.value))} className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
                    </div>
                    
                    <div>
                        <span className="text-[10px] font-bold text-gray-500 uppercase mb-1 block">Heading Color</span>
                        <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg p-1 gap-2">
                            <input type="color" className="w-6 h-6 rounded cursor-pointer border-none" value={heroSection.props.headingColor} onChange={(e) => handleUpdate(selectedId, 'headingColor', e.target.value)} />
                            <input type="text" className="text-[9px] font-mono w-full bg-transparent outline-none uppercase" value={heroSection.props.headingColor} onChange={(e) => handleUpdate(selectedId, 'headingColor', e.target.value)} />
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <div className="flex justify-between mb-2">
                            <span className="text-[10px] font-bold text-gray-500 uppercase">Content Size</span>
                            <span className="text-xs font-bold text-indigo-600">{heroSection.props.contentFontSize}px</span>
                        </div>
                        <input type="range" min="20" max="100" value={heroSection.props.contentFontSize} onChange={(e) => handleUpdate(selectedId, 'contentFontSize', parseInt(e.target.value))} className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
                    </div>
                    
                    <div>
                        <span className="text-[10px] font-bold text-gray-500 uppercase mb-1 block">Content Color</span>
                        <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg p-1 gap-2">
                            <input type="color" className="w-6 h-6 rounded cursor-pointer border-none" value={heroSection.props.contentColor} onChange={(e) => handleUpdate(selectedId, 'contentColor', e.target.value)} />
                            <input type="text" className="text-[9px] font-mono w-full bg-transparent outline-none uppercase" value={heroSection.props.contentColor} onChange={(e) => handleUpdate(selectedId, 'contentColor', e.target.value)} />
                        </div>
                    </div>
                </div>
            </div>
        )}

        {selectedId === 'section-2-info' && (
            <div className="space-y-6 animate-in slide-in-from-right-4">
             
                
                {/* Info Heading */}
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 space-y-4">
                    <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Main Heading</span>
                    <div>
                        <div className="flex justify-between mb-1.5">
                            <span className="text-[10px] font-bold text-gray-400 uppercase">Font Size</span>
                            <span className="text-xs font-bold text-indigo-600">{infoSection.props.headingFontSize}px</span>
                        </div>
                        <input type="range" min="20" max="60" value={infoSection.props.headingFontSize} onChange={(e) => handleUpdate(selectedId, 'headingFontSize', parseInt(e.target.value))} className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
                    </div>
                    <div>
                        <div className="flex items-center bg-white border border-gray-200 rounded-lg p-1 gap-2">
                            <input type="color" className="w-6 h-6 rounded cursor-pointer border-none" value={infoSection.props.headingColor} onChange={(e) => handleUpdate(selectedId, 'headingColor', e.target.value)} />
                            <input type="text" className="text-[9px] font-mono w-full bg-transparent outline-none uppercase text-gray-500" value={infoSection.props.headingColor} onChange={(e) => handleUpdate(selectedId, 'headingColor', e.target.value)} />
                        </div>
                    </div>
                </div>

                {/* Subheading */}
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 space-y-4">
                    <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Sub Heading</span>
                    <div>
                        <div className="flex justify-between mb-1.5">
                            <span className="text-[10px] font-bold text-gray-400 uppercase">Font Size</span>
                            <span className="text-xs font-bold text-indigo-600">{infoSection.props.subheadingFontSize || 20}px</span>
                        </div>
                        <input type="range" min="14" max="40" value={infoSection.props.subheadingFontSize || 20} onChange={(e) => handleUpdate(selectedId, 'subheadingFontSize', parseInt(e.target.value))} className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
                    </div>
                    <div>
                        <div className="flex items-center bg-white border border-gray-200 rounded-lg p-1 gap-2">
                            <input type="color" className="w-6 h-6 rounded cursor-pointer border-none" value={infoSection.props.subheadingColor} onChange={(e) => handleUpdate(selectedId, 'subheadingColor', e.target.value)} />
                            <input type="text" className="text-[9px] font-mono w-full bg-transparent outline-none uppercase text-gray-500" value={infoSection.props.subheadingColor} onChange={(e) => handleUpdate(selectedId, 'subheadingColor', e.target.value)} />
                        </div>
                    </div>
                </div>

                 {/* content */}
                 <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 space-y-4">
                    <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Content</span>
                    <div>
                        <div className="flex justify-between mb-1.5">
                            <span className="text-[10px] font-bold text-gray-400 uppercase">Font Size</span>
                            <span className="text-xs font-bold text-indigo-600">{infoSection.props.contentFontSize || 20}px</span>
                        </div>
                        <input type="range" min="14" max="40" value={infoSection.props.contentFontSize || 20} onChange={(e) => handleUpdate(selectedId, 'contentFontSize', parseInt(e.target.value))} className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
                    </div>
                    <div>
                        <div className="flex items-center bg-white border border-gray-200 rounded-lg p-1 gap-2">
                            <input type="color" className="w-6 h-6 rounded cursor-pointer border-none" value={infoSection.props.contentColor} onChange={(e) => handleUpdate(selectedId, 'contentColor', e.target.value)} />
                            <input type="text" className="text-[9px] font-mono w-full bg-transparent outline-none uppercase text-gray-500" value={infoSection.props.contentColor} onChange={(e) => handleUpdate(selectedId, 'contentColor', e.target.value)} />
                        </div>
                    </div>
                </div>
            </div>
        )}

{selectedId === 'section-3-form' && (
    <div className="space-y-6 animate-in slide-in-from-right-4">
        <h3 className="font-bold text-indigo-600 border-b border-indigo-50 pb-2 flex items-center gap-2">
            <Settings2 size={16}/> Form Card Settings
        </h3>
        
        {/* Card Styling */}
        <div className="space-y-4">
            <div>
                <span className="text-[10px] font-bold text-gray-500 uppercase mb-1 block">Card Background</span>
                <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg p-1 gap-2">
                    <input type="color" className="w-6 h-6 rounded cursor-pointer border-none" value={formSection.props.backgroundColor} onChange={(e) => handleUpdate(selectedId, 'backgroundColor', e.target.value)} />
                    <input type="text" className="text-[9px] font-mono w-full bg-transparent outline-none uppercase" value={formSection.props.backgroundColor} onChange={(e) => handleUpdate(selectedId, 'backgroundColor', e.target.value)} />
                </div>
            </div>

            <div>
                <div className="flex justify-between mb-2">
                    <span className="text-[10px] font-bold text-gray-500 uppercase">Corner Radius</span>
                    <span className="text-xs font-bold text-indigo-600">{formSection.props.borderRadius}px</span>
                </div>
                <input type="range" min="0" max="50" value={formSection.props.borderRadius} onChange={(e) => handleUpdate(selectedId, 'borderRadius', parseInt(e.target.value))} className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
            </div>
        </div>

        {/* SECTION: FORM FIELDS */}
        <div className="pt-4 border-t border-gray-100">
             {/* Button Styling */}
        <div className="pt-4 border-t border-gray-100">
            <h3 className="font-bold text-indigo-600 mb-4 text-[11px] uppercase tracking-wider">Button Style</h3>
            <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                    <span className="text-[10px] font-bold text-gray-500 uppercase mb-1 block">BG Color</span>
                    <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg p-1 gap-2">
                        <input type="color" className="w-5 h-5 rounded cursor-pointer border-none" value={formSection.props.buttonColor} onChange={(e) => handleUpdate(selectedId, 'buttonColor', e.target.value)} />
                        <input type="text" className="text-[9px] font-mono w-full bg-transparent outline-none uppercase" value={formSection.props.buttonColor} onChange={(e) => handleUpdate(selectedId, 'buttonColor', e.target.value)} />
                    </div>
                </div>
                <div>
                    <span className="text-[10px] font-bold text-gray-500 uppercase mb-1 block">Text Color</span>
                    <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg p-1 gap-2">
                        <input type="color" className="w-5 h-5 rounded cursor-pointer border-none" value={formSection.props.buttonTextColor} onChange={(e) => handleUpdate(selectedId, 'buttonTextColor', e.target.value)} />
                        <input type="text" className="text-[9px] font-mono w-full bg-transparent outline-none uppercase" value={formSection.props.buttonTextColor} onChange={(e) => handleUpdate(selectedId, 'buttonTextColor', e.target.value)} />
                    </div>
                </div>
            </div>
        </div>
            <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">
                    Form Fields
                </span>
                <button
                    onClick={() => {
                        const newField = {
                            id: `field-${Date.now()}`,
                            type: "text",
                            label: "New Label",
                            placeholder: "Enter value...",
                            width: "100%"
                        };
                        handleUpdate(selectedId, "fields", [...(formSection.props.fields || []), newField]);
                    }}
                    className="text-[10px] cursor-pointer bg-indigo-600 text-white px-2.5 py-1 rounded-md font-bold hover:bg-indigo-700 transition-all shadow-sm"
                >
                    + ADD FIELD
                </button>
            </div>

            <div className="space-y-3">
                {formSection.props.fields?.map((field, index) => (
                    <div key={field.id} className="p-3 bg-gray-50 border border-gray-200 rounded-xl space-y-3 relative group transition-all hover:border-indigo-200 hover:bg-white">
                        <button
                            onClick={() => {
                                const filtered = formSection.props.fields.filter((_, i) => i !== index);
                                handleUpdate(selectedId, "fields", filtered);
                            }}
                            className="absolute -top-2 -right-2 cursor-pointer bg-white text-red-500 shadow-md border border-red-100 rounded-full p-1.5 hover:bg-red-500 hover:text-white transition-all z-10"
                        >
                            <Trash2 size={10} />
                        </button>

                        <div className="grid grid-cols-1 gap-3">
                            <div className="flex flex-col gap-1">
                                <span className="text-[9px] font-bold text-gray-400 uppercase ml-1">Input Type</span>
                                <select
                                    value={field.type}
                                    onChange={(e) => {
                                        const newFields = [...formSection.props.fields];
                                        newFields[index].type = e.target.value;
                                        handleUpdate(selectedId, "fields", newFields);
                                    }}
                                    className="w-full bg-white border border-gray-200 rounded-md px-2 py-1.5 text-[11px] outline-none focus:ring-1 focus:ring-indigo-400"
                                >
                                    <option value="text">Short Text</option>
                                    <option value="email">Email Address</option>
                                    <option value="tel">Phone Number</option>
                                    <option value="textarea">Long Text (Area)</option>
                                    <option value="number">Number</option>
                                    <option value="date">Date Picker</option>
                                </select>
                            </div>

                            <div className="flex flex-col gap-1">
                                <span className="text-[9px] font-bold text-gray-400 uppercase ml-1">Field Label</span>
                                <input
                                    type="text"
                                    value={field.label}
                                    onChange={(e) => {
                                        const newFields = [...formSection.props.fields];
                                        newFields[index].label = e.target.value;
                                        handleUpdate(selectedId, "fields", newFields);
                                    }}
                                    className="w-full bg-white border border-gray-200 rounded-md px-2 py-1.5 text-[11px] outline-none focus:ring-1 focus:ring-indigo-400"
                                    placeholder="e.g., Full Name"
                                />
                            </div>

                            <div className="flex flex-col gap-1">
                                <span className="text-[9px] font-bold text-gray-400 uppercase ml-1">Placeholder</span>
                                <input
                                    type="text"
                                    value={field.placeholder}
                                    onChange={(e) => {
                                        const newFields = [...formSection.props.fields];
                                        newFields[index].placeholder = e.target.value;
                                        handleUpdate(selectedId, "fields", newFields);
                                    }}
                                    className="w-full bg-white border border-gray-200 rounded-md px-2 py-1.5 text-[11px] outline-none focus:ring-1 focus:ring-indigo-400"
                                    placeholder="e.g., John Doe"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        
       
    </div>
)}

        {!selectedId && (
             <div className="h-full flex flex-col items-center justify-center text-center px-4">
             <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
                 <svg className="w-10 h-10 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                 </svg>
             </div>
             <h3 className="text-lg font-bold text-gray-800 mb-2">No Block Selected</h3>
             <p className="text-sm text-gray-400 max-w-[180px]">Click any element to start customizing.</p>
         </div>
        )}
    </div>
</div>
        </div>
    );
};

export default Contact5;