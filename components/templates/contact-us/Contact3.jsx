// import React from 'react';
// import { Trash2 } from 'lucide-react';

// const Contact3 = ({ data, selectedId, setSelectedId, handleUpdate, handleDeleteSection, viewMode }) => {
//     // Extracting components for easier access
//     const headingComp = data.components.find(c => c.id === "main-heading-contact");
//     const gridComp = data.components.find(c => c.id === "contact-content-grid");
//     const formSection = gridComp?.children.find(c => c.id === "contact-form-section");
//     const infoSection = gridComp?.children.find(c => c.id === "contact-info-address-map");

//     const isMobile = viewMode === "mobile";

//     return (
//         <div className="w-full bg-white font-sans overflow-x-hidden ">
//                  <section className= "">
//             {/* 1. Main Heading Section */}
//             {headingComp && (
//                 <div 
//                     className="max-w-4xl mx-auto px-4 mb-12 text-center"
//                     onClick={() => setSelectedId(headingComp.id)}
//                     style={{ margin: headingComp.props.margin,margin:"auto" ,marginBottom:"40px"}}
//                 >
//                     <h1 
//                         className="font-bold mb-4"
//                         style={{ 
//                             fontSize: `${headingComp.props.headingFontSize}px`, 
//                             color: headingComp.props.headingColor 
//                         }}
//                     >
//                         {headingComp.props.heading}
//                     </h1>
//                     <p 
//                         style={{ 
//                             fontSize: `${headingComp.props.contentFontSize}px`, 
//                             color: headingComp.props.contentColor 
//                         }}
//                     >
//                         {headingComp.props.content}
//                     </p>
//                 </div>
//             )}

//             {/* 2. Grid Container (Form + Address/Map) */}
//             <div 
//                 className={` mx-auto px-6 flex `}
//                 style={{ padding: gridComp?.props.padding,gap:"20px" }}
//             >
//                 {/* Left Side: Contact Form */}
//                 {formSection && (
//                     <div 
//                         className="bg-white p-8 rounded-xl shadow-sm border border-gray-100"
//                         onClick={() => setSelectedId(formSection.id)}
//                         style={{...formSection.props.style,width:"49%"}}
//                     >
//                         <div className="space-y-6">
//                             {formSection.props.fields.map((field) => (
//                                 <div key={field.id} className="flex flex-col">

//                                     {field.type === "textarea" ? (
//                                         <textarea 
//                                             rows={4}
//                                             className="w-full border-b border-gray-300 py-2 focus:border-black outline-none transition-colors resize-none"
//                                             placeholder=  {field.label}
//                                             style={{border:"1px solid #e5e7eb",padding:"10px",fontSize:"13px"}}
//                                         />
//                                     ) : (
//                                         <input 
//                                             type={field.type}
//                                             className="w-full border-b border-gray-300 py-2 focus:border-black outline-none transition-colors"
//                                             placeholder=  {field.label}
//                                             style={{border:"1px solid #e5e7eb",padding:"10px",fontSize:"13px"}}
//                                         />
//                                     )}
//                                 </div>
//                             ))}
//                             <button 
//                                 className="w-full py-4 mt-4 font-bold tracking-widest transition-opacity hover:opacity-90"
//                                 style={{ 
//                                     backgroundColor: formSection.props.buttonColor, 
//                                     color: formSection.props.buttonTextColor ,
//                                     padding:"7px 0"
//                                 }}
//                             >
//                                 {formSection.props.buttonText}
//                             </button>
//                         </div>
//                     </div>
//                 )}

//                 {/* Right Side: Info Group (Address + Map) */}
//                 {infoSection && (
//                     <div 
//                         className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col h-full"
//                         onClick={() => setSelectedId(infoSection.id)}
//                         style={{...infoSection.props.style,width:"49%"}}
//                     >
//                         <div className="space-y-8 flex-grow">
//                             {infoSection.props.sections.map((section, idx) => (
//                                 <div key={idx} className="relative group">
//                                     <h3 
//                                         className={`font-bold mb-2 ${section.underline ? 'border-b-2 border-blue-900 pb-1 inline-block' : ''}`}
//                                         style={{ color: section.headingColor || "#111827", fontSize: '18px' }}
//                                     >
//                                         {section.heading}
//                                     </h3>
//                                     <p className="text-gray-600 leading-relaxed whitespace-pre-line">
//                                         {section.content}
//                                     </p>

//                                     {/* Delete Section Button */}
//                                     <button
//                                         onClick={(e) => { e.stopPropagation(); handleDeleteSection(infoSection.id, idx); }}
//                                         className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 bg-red-500 text-white p-1 rounded-full shadow-lg transition-all"
//                                         style={{color:"red"}}
//                                     >
//                                         <Trash2 size={14} />
//                                     </button>
//                                 </div>
//                             ))}
//                         </div>

//                         {/* Embedded Map Section */}
//                         {infoSection.props.mapSection && (
//                             <div 
//                                 className="overflow-hidden mt-8 border border-gray-100"
//                                 style={{ 
//                                     borderRadius: infoSection.props.mapSection.props.borderRadius,
//                                     margin: infoSection.props.mapSection.props.margin 
//                                 }}
//                             >
//                                 <iframe
//                                     src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3719.458284534726!2d72.8631613!3d21.213611!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04f066b5379b3%3A0xc682944b94c30932!2sElior%20Jewel!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
//                                     width={infoSection.props.mapSection.props.width}
//                                     height={infoSection.props.mapSection.props.height}
//                                     style={{ border: 0 }}
//                                     allowFullScreen=""
//                                     loading="lazy"
//                                     referrerPolicy="no-referrer-when-downgrade"
//                                 />
//                             </div>
//                         )}
//                     </div>
//                 )}
//             </div>
//         </section>
//         </div>

//     );
// };

// export default Contact3;

import React, { useState, useEffect } from 'react';
import { Settings2, Plus, Trash2, MapPin,MousePointer2,X } from 'lucide-react';
import DeviceMockup from '../../layout/DeviceMockup';
import Swal from 'sweetalert2';
import templatesData from '@/data/templates.json';

const Contact3Dynamic = ({ data: initialData }) => {
    const [data, setData] = useState(initialData || { components: [] });
    const [selectedId, setSelectedId] = useState(null);
    const [viewMode, setViewMode] = useState('desktop');
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);

    useEffect(() => {
        if (initialData) setData(initialData);
    }, [initialData]);

    // Helper to find components in the nested structure
    const getComp = (id) => {
        let found = data?.components?.find((item) => item.id === id);
        if (!found) {
            const grid = data?.components?.find(c => c.id === 'contact-content-grid');
            found = grid?.children?.find(child => child.id === id);
        }
        return found || { props: { fields: [], sections: [] } };
    };

    const handleUpdate = (id, field, value) => {
        setData((prev) => ({
            ...prev,
            components: prev.components.map((comp) => {
                if (comp.id === id) {
                    return { ...comp, props: { ...comp.props, [field]: value } };
                }
                if (comp.id === 'contact-content-grid') {
                    return {
                        ...comp,
                        children: comp.children.map(child =>
                            child.id === id ? { ...child, props: { ...child.props, [field]: value } } : child
                        )
                    };
                }
                return comp;
            }),
        }));
    };

    const handleAddSection = (id) => {
        const comp = getComp(id);
        const newSection = { heading: "New Office", content: "123 Street Name,\nCity, Country", headingColor: "#111827" };
        handleUpdate(id, "sections", [...(comp.props.sections || []), newSection]);
    };

    const handleDeleteSection = (id, index) => {
        const comp = getComp(id);
        const updated = comp.props.sections.filter((_, i) => i !== index);
        handleUpdate(id, "sections", updated);
    };

    const handleSectionTextUpdate = (id, index, field, value) => {
        const comp = getComp(id);
        const updated = comp.props.sections.map((sec, i) =>
            i === index ? { ...sec, [field]: value } : sec
        );
        handleUpdate(id, "sections", updated);
    };

    // Create a reusable "Premium" toast instance
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        background: 'rgba(255, 255, 255, 0.8)', // Glass effect
        backdrop: 'transparent',
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
    });

    const handleSave = async () => {
        try {
       
            Toast.fire({
                icon: 'info',
                title: 'Saving template...',
                showConfirmButton: false,
                timer: 0, 
            });
    
         
            let folderName = "general"; 
            
          
            templatesData.forEach(cat => {
                const found = cat.templates.find(t => t.templateId === data.templateId);
                if (found) {
     
                    folderName = cat.category; 
                }
            });
    
            const payload = {
                ...data,
                category: folderName 
            };
    
      
            const response = await fetch('/api/save-template', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
    
            if (response.ok) {
                Toast.fire({
                    icon: 'success',
                    title: 'Saved successfully',
                    timer: 2000,
                });
            } else {
                const errorText = await response.text();
                console.error("Server Error:", errorText);
                throw new Error();
            }
        } catch (error) {
            console.error("Frontend Error:", error);
            Toast.fire({
                icon: 'error',
                title: 'Save failed',
                timer: 3000,
            });
        }
    };


    const Editable = ({ id, field, index = null, className, tag: Tag = "div", style = {} }) => {
        const comp = getComp(id);
        const val = index !== null ? comp.props.sections[index][field] : comp.props[field];

        return (
            <Tag
                className={`${className} outline-none focus:ring-2 focus:ring-indigo-300 rounded px-1 transition-all`}
                style={{ ...style, whiteSpace: 'pre-line' }}
                contentEditable
                suppressContentEditableWarning={true}
                onBlur={(e) => {
                    const text = e.target.innerText;
                    index !== null
                        ? handleSectionTextUpdate(id, index, field, text)
                        : handleUpdate(id, field, text);
                }}
                onClick={(e) => { e.stopPropagation(); setSelectedId(id); }}
            >
                {val}
            </Tag>
        );
    };

    const headingComp = getComp("main-heading-contact");
    const formSection = getComp("contact-form-section");
    const infoSection = getComp("contact-info-address-map");
    const activeComp = selectedId ? getComp(selectedId) : null;



    const renderCanvasContent = (isModel)=>(
        <div className="bg-white min-h-screen py-20 px-4">
        {/* 1. Main Heading Section */}
        <div
            className="max-w-4xl mx-auto mb-16 text-center"
            onClick={(e) => { e.stopPropagation(); setSelectedId("main-heading-contact"); }}
            style={{ marginBottom: "40px", paddingTop: "20px" }}
        >
            <Editable
                id="main-heading-contact" field="heading" tag="h1"
                className="font-bold mb-4"
                disabled={isModel === 1}
                style={{
                    fontSize: `${headingComp.props.headingFontSize}px`,
                    color: headingComp.props.headingColor,
                    marginBottom: "10px"
                }}
            />
            <Editable
                id="main-heading-contact" field="content" tag="p"
                disabled={isModel === 1}
                style={{
                    fontSize: `${headingComp.props.contentFontSize}px`,
                    color: headingComp.props.contentColor
                }}
            />
        </div>

        {/* 2. Grid Container */}
        <div
            className={`max-w-7xl mx-auto flex ${viewMode === 'mobile' ? 'flex-col' : 'flex-row'} gap-8`}
            style={{ justifyContent: "space-between" }}
        >
            {/* Left Side: Contact Form */}
            <div
                className="bg-white p-8 rounded-xl shadow-sm border border-gray-100"
                onClick={(e) => { e.stopPropagation(); setSelectedId("contact-form-section"); }}
                style={{ width: viewMode === "mobile" ? "100%" : "49%" }}
            >
                <div className="space-y-6">
                    {formSection.props.fields?.map((field) => (
                        <div key={field.id} className="flex flex-col">
                            {field.type === "textarea" ? (
                                <textarea
                                    rows={4}

                                    style={{ border: "1px solid #e5e7eb", padding: "10px", fontSize: "13px" }}
                                    placeholder={field.label}
                                />
                            ) : (
                                <input


                                    placeholder={field.label}
                                    style={{ border: "1px solid #e5e7eb", padding: "10px", fontSize: "13px" }}
                                />
                            )}
                        </div>
                    ))}
                    <button
                        className="w-full py-3 mt-4 font-bold tracking-widest rounded-lg"
                        style={{
                            backgroundColor: formSection.props.buttonColor,
                            color: formSection.props.buttonTextColor
                        }}
                    >
                        {formSection.props.buttonText}
                    </button>
                </div>
            </div>

            {/* Right Side: Info + Map */}
            <div
                className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col"
                onClick={(e) => { e.stopPropagation(); setSelectedId("contact-info-address-map"); }}
                style={{ width: viewMode === "mobile" ? "100%" : "50%" }}
            >
                <div className="space-y-8 flex-grow">
                    {infoSection.props.sections?.map((section, idx) => (
                        <div key={idx} className="relative group">
                            {/* 2. Contact Info Styles */}
                            <Editable
                                id="contact-info-address-map" index={idx} field="heading" tag="h3"
                                className="font-bold mb-2"
                                style={{
                                    color: infoSection.props.infoHeadingColor || "#111827",
                                    fontSize: `${infoSection.props.infoHeadingSize || 18}px`
                                }}
                            />
                            <Editable
                                id="contact-info-address-map" index={idx} field="content" tag="p"
                                className="leading-relaxed"
                                style={{
                                    color: infoSection.props.infoContentColor || "#4b5563",
                                    fontSize: `${infoSection.props.infoContentSize || 16}px`
                                }}
                            />
                        </div>
                    ))}
                </div>

                {/* 3. Dynamic Map Implementation */}
                {infoSection.props.mapSection && (
                    <div className="overflow-hidden mt-8 border border-gray-100 rounded-lg">
                        {infoSection.props.mapUrl ? (
                            <iframe
                                title="Map"
                                src={infoSection.props.mapUrl}
                                width="100%"
                                height={infoSection.props.mapHeight || 200}
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                            ></iframe>
                        ) : (
                            <div
                                className="bg-gray-100 flex items-center justify-center"
                                style={{ height: `${infoSection.props.mapHeight || 200}px` }}
                            >
                                <div className="text-center text-gray-400">
                                    <MapPin className="mx-auto mb-2" />
                                    <p className="text-xs uppercase tracking-widest font-bold">Add URL in Sidebar</p>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    </div>
    )

    return (
        <div className="flex min-h-screen bg-gray-100 font-sans" style={{ width: "100%" }}>
              <button
        onClick={() => setIsPreviewOpen(true)}
        style={{fontSize:"13px",backgroundColor: "#615fff"}}
        className="fixed top-3 right-80 z-50  cursor-pointer    text-white px-6 py-2  shadow-2xl  rounded-lg transition-all flex items-center gap-2 font-bold"
      >
        <MousePointer2 size={13} /> Preview 
      </button>
            <div className="flex-1 " onClick={() => setSelectedId(null)}>
                <DeviceMockup activeDevice={viewMode} onChange={setViewMode}>
                    {renderCanvasContent(0)}
                </DeviceMockup>
            </div>

            {isPreviewOpen && (
                                        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex flex-col items-center justify-start overflow-y-auto p-10">
                                            {/* Close Button */}
                                            <button
                                                onClick={() => setIsPreviewOpen(false)}
                                                className="absolute top-6 right-10 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all"
                                            >
                                                <X size={32} />
                                            </button>
                        
                                            <div className="w-full  mt-10 mb-20">
                                                <div className="  p-12 font-serif text-black rounded-xl pointer-events-none">
                                                    {/* We use pointer-events-none so they can't edit while previewing */}
                                                    {renderCanvasContent(1)}
                                                </div>
                                            </div>
                                        </div>
                                    )}

            {/* --- SIDEBAR --- */}
            {/* --- SIDEBAR --- */}
            <div
                className="w-80 bg-white border-l border-gray-200 shadow-2xl fixed top-0 right-0 h-screen overflow-y-auto z-[60] flex flex-col"
                style={{ width: "16%", right: "0px" }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header Section */}
                <div className="p-3 bg-white border-b border-gray-200 sticky top-0 z-10">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold flex items-center gap-2 text-gray-800" style={{ fontSize: "18px" }} ><Settings2 size={18} /> Settings</h2>
                        <button
                            onClick={handleSave}
                            className="  text-white px-5 py-2 rounded-lg text-sm font-semibold   hover:shadow-md hover:bg-blue-500 cursor-pointer transition-all active:scale-95"
                            style={{ backgroundColor: "#615fff", padding: "8px 18px", fontSize: "14px" }}
                        >
                           Publish
                        </button>
                    </div>
                </div>

                <div className="p-6 space-y-8 flex-1">
                    {activeComp ? (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-6">
                            {/* Editing Status Tag */}
                            <div className="flex items-center space-x-2 bg-indigo-50 p-1 rounded-xl mb-6">
                                <span className="text-xs font-bold text-indigo-700 uppercase tracking-widest px-3 py-2">
                                    Editing: {selectedId}
                                </span>
                            </div>

                            {/* 1. Main Header Typography Settings */}
                            {selectedId === "main-heading-contact" && (
                                <div className="space-y-6">
                                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                                        <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest block mb-3">Header Style</label>
                                        <div className="space-y-4">
                                            <div>
                                                <div className="flex justify-between mb-2">
                                                    <span className="text-sm font-medium text-gray-700">Heading Size</span>
                                                    <span className="text-xs font-bold text-indigo-600">{activeComp.props.headingFontSize}px</span>
                                                </div>
                                                <input type="range" min="20" max="80" value={activeComp.props.headingFontSize}
                                                    onChange={(e) => handleUpdate(selectedId, "headingFontSize", parseInt(e.target.value))}
                                                    className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                                    style={{ accentColor: "#615fff" }} />
                                            </div>
                                            <div>
                                                <span className="text-sm font-medium text-gray-700 block mb-2">Heading Color</span>
                                                <div className="flex flex-col gap-1.5 w-full">
                                                    {/* Professional Small Label */}

                                                    <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg p-1 gap-2 focus-within:border-indigo-400 focus-within:ring-1 focus-within:ring-indigo-100 transition-all shadow-sm">
                                                        {/* High-End Color Swatch */}
                                                        <div className="relative w-8 h-8 shrink-0 rounded-md overflow-hidden border border-gray-200 shadow-inner">
                                                            <input
                                                                type="color"
                                                                value={activeComp.props.headingColor || "#000000"}
                                                                onChange={(e) => handleUpdate(selectedId, "headingColor", e.target.value)}
                                                                className="absolute inset-0 w-full h-full cursor-pointer scale-[2.5] bg-transparent"
                                                                style={{ border: 'none', appearance: 'none' }}
                                                            />
                                                        </div>

                                                        {/* Hex Code Text Input */}
                                                        <input
                                                            type="text"
                                                            maxLength={7}
                                                            placeholder="#000000"
                                                            value={activeComp.props.headingColor || ""}
                                                            onChange={(e) => handleUpdate(selectedId, "headingColor", e.target.value)}
                                                            className="bg-transparent border-none text-[11px] font-mono w-full outline-none uppercase text-gray-700"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                                        <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest block mb-3">Content Style</label>
                                        <div className="space-y-4">
                                            <div>
                                                <div className="flex justify-between mb-2">
                                                    <span className="text-sm font-medium text-gray-700">Content Size</span>
                                                    <span className="text-xs font-bold text-indigo-600">{activeComp.props.contentFontSize}px</span>
                                                </div>
                                                <input type="range" min="12" max="30" value={activeComp.props.contentFontSize}
                                                    onChange={(e) => handleUpdate(selectedId, "contentFontSize", parseInt(e.target.value))}
                                                    className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                                    style={{ accentColor: "#615fff" }} />
                                            </div>
                                            <div>
                                                <span className="text-sm font-medium text-gray-700 block mb-2">Content Color</span>
                                                <div className="flex flex-col gap-1.5 w-full">
                                                    {/* Professional Small Label */}


                                                    <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg p-1 gap-2 focus-within:border-indigo-400 focus-within:ring-1 focus-within:ring-indigo-100 transition-all shadow-sm">
                                                        {/* High-End Color Swatch */}
                                                        <div className="relative w-8 h-8 shrink-0 rounded-md overflow-hidden border border-gray-200 shadow-inner">
                                                            <input
                                                                type="color"
                                                                value={activeComp.props.contentColor || "#4B5563"}
                                                                onChange={(e) => handleUpdate(selectedId, "contentColor", e.target.value)}
                                                                className="absolute inset-0 w-full h-full cursor-pointer scale-[2.5] bg-transparent"
                                                                style={{ border: 'none', appearance: 'none' }}
                                                            />
                                                        </div>

                                                        {/* Hex Code Text Input */}
                                                        <input
                                                            type="text"
                                                            maxLength={7}
                                                            placeholder="#4B5563"
                                                            value={activeComp.props.contentColor || ""}
                                                            onChange={(e) => handleUpdate(selectedId, "contentColor", e.target.value)}
                                                            className="bg-transparent border-none text-[11px] font-mono w-full outline-none uppercase text-gray-700"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}



                            {/* 2 & 3. Contact Info & Map Settings */}
                            {selectedId === "contact-info-address-map" && (
                                <div className="space-y-6">
                                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                                        <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest block mb-3">Info Text Style</label>
                                        <div className="space-y-4">
                                            {/* Label Size */}
                                            <div>
                                                <div className="flex justify-between mb-2">
                                                    <span className="text-sm font-medium text-gray-700">Label Size</span>
                                                    <span className="text-xs font-bold text-indigo-600">{activeComp.props.infoHeadingSize}px</span>
                                                </div>
                                                <input type="range" min="14" max="40" value={activeComp.props.infoHeadingSize}
                                                    onChange={(e) => handleUpdate(selectedId, "infoHeadingSize", parseInt(e.target.value))}
                                                    className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                                    style={{ accentColor: "#615fff" }} />
                                            </div>

                                            {/* Label Color */}
                                            <div>
                                                <span className="text-sm font-medium text-gray-700 block mb-2">Label Color</span>
                                                <div className="flex flex-col gap-1.5 w-full">
                                                    {/* Modern Label */}


                                                    <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg p-1 gap-2 focus-within:border-indigo-400 focus-within:ring-1 focus-within:ring-indigo-100 transition-all shadow-sm">
                                                        {/* Professional Color Swatch */}
                                                        <div className="relative w-8 h-8 shrink-0 rounded-md overflow-hidden border border-gray-200 shadow-inner">
                                                            <input
                                                                type="color"
                                                                value={activeComp.props.infoHeadingColor || "#000000"}
                                                                onChange={(e) => handleUpdate(selectedId, "infoHeadingColor", e.target.value)}
                                                                className="absolute inset-0 w-full h-full cursor-pointer scale-[2.5] bg-transparent"
                                                                style={{ border: 'none', appearance: 'none' }}
                                                            />
                                                        </div>

                                                        {/* Hex Code Input */}
                                                        <input
                                                            type="text"
                                                            maxLength={7}
                                                            placeholder="#000000"
                                                            value={activeComp.props.infoHeadingColor || ""}
                                                            onChange={(e) => handleUpdate(selectedId, "infoHeadingColor", e.target.value)}
                                                            className="bg-transparent border-none text-[11px] font-mono w-full outline-none uppercase text-gray-700 placeholder:text-gray-300"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <hr className="border-gray-100" />

                                            {/* Detail Size */}
                                            <div>
                                                <div className="flex justify-between mb-2">
                                                    <span className="text-sm font-medium text-gray-700">Detail Size</span>
                                                    <span className="text-xs font-bold text-indigo-600">{activeComp.props.infoContentSize}px</span>
                                                </div>
                                                <input type="range" min="12" max="24" value={activeComp.props.infoContentSize}
                                                    onChange={(e) => handleUpdate(selectedId, "infoContentSize", parseInt(e.target.value))}
                                                    className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                                    style={{ accentColor: "#615fff" }} />
                                            </div>

                                            {/* Detail Color */}
                                            <div>
                                                <span className="text-sm font-medium text-gray-700 block mb-2">Detail Color</span>
                                                <div className="flex flex-col gap-1.5 w-full">
                                                    {/* Professional Small Label */}


                                                    <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg p-1 gap-2 focus-within:border-indigo-400 focus-within:ring-1 focus-within:ring-indigo-100 transition-all shadow-sm">
                                                        {/* Premium Color Swatch */}
                                                        <div className="relative w-8 h-8 shrink-0 rounded-md overflow-hidden border border-gray-200 shadow-inner">
                                                            <input
                                                                type="color"
                                                                value={activeComp.props.infoContentColor || "#000000"}
                                                                onChange={(e) => handleUpdate(selectedId, "infoContentColor", e.target.value)}
                                                                className="absolute inset-0 w-full h-full cursor-pointer scale-[2.5] bg-transparent"
                                                                style={{ border: 'none', appearance: 'none' }}
                                                            />
                                                        </div>

                                                        {/* Hex Code Text Input */}
                                                        <input
                                                            type="text"
                                                            maxLength={7}
                                                            placeholder="#000000"
                                                            value={activeComp.props.infoContentColor || ""}
                                                            onChange={(e) => handleUpdate(selectedId, "infoContentColor", e.target.value)}
                                                            className="bg-transparent border-none text-[11px] font-mono w-full outline-none uppercase text-gray-700 placeholder:text-gray-300"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Map Configuration Section */}
                                    <div className="bg-white p-4 rounded-xl shadow-sm   border border-gray-100 bg-indigo-50/30">
                                        <label className="text-[11px] font-black text-indigo-400 uppercase tracking-widest block mb-3">Map Configuration</label>
                                        <div className="space-y-4">
                                            <div>
                                                <span className="text-sm font-medium text-gray-700 block mb-2">Embed URL</span>
                                                <input type="text" value={activeComp.props.mapUrl}
                                                    onChange={(e) => handleUpdate(selectedId, "mapUrl", e.target.value)}
                                                    placeholder="Google Maps URL..."
                                                    className="w-full p-2 text-xs border border-gray-200 rounded-lg bg-white outline-none focus:border-indigo-500" />
                                            </div>
                                            <div>
                                                <div className="flex justify-between mb-2">
                                                    <span className="text-sm font-medium text-gray-700">Map Height</span>
                                                    <span className="text-xs font-bold text-indigo-600">{activeComp.props.mapHeight}px</span>
                                                </div>
                                                <input type="range" min="200" max="800" value={activeComp.props.mapHeight}
                                                    onChange={(e) => handleUpdate(selectedId, "mapHeight", parseInt(e.target.value))}
                                                    className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                                    style={{ accentColor: "#615fff" }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Form Button Settings */}
                            {selectedId === "contact-form-section" && activeComp && (
    <div className="space-y-6 animate-in slide-in-from-right-2 duration-300">
        
        {/* 1. FIELD MANAGEMENT SECTION */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest">
                    Form Fields
                </label>
                <button
                    onClick={() => {
                        const newField = {
                            id: `field-${Date.now()}`,
                            type: "text",
                            label: "New Label",
                            placeholder: "Enter value...",
                        };
                        const currentFields = activeComp.props.fields || [];
                        handleUpdate(selectedId, "fields", [...currentFields, newField]);
                    }}
                    className="text-[10px] bg-indigo-50 text-indigo-600 px-2 py-1 rounded font-bold hover:bg-indigo-100 transition-colors"
                >
                    + ADD FIELD
                </button>
            </div>

            <div className="space-y-3">
                {activeComp.props.fields?.map((field, index) => (
                    <div key={field.id} className="p-3 bg-gray-50 border border-gray-200 rounded-xl space-y-3 relative group">
                        {/* Delete Button */}
                        <button
                            onClick={() => {
                                const filtered = activeComp.props.fields.filter((_, i) => i !== index);
                                handleUpdate(selectedId, "fields", filtered);
                            }}
                            className="absolute -top-2 -right-2 bg-white text-red-500 shadow-sm border border-red-100 rounded-full p-1 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100 z-10"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
                        </button>

                        {/* Label Input */}
                        <div className="flex flex-col gap-1">
                            <span className="text-[9px] font-bold text-gray-500 uppercase ml-1">Label</span>
                            <input
                                type="text"
                                value={field.label}
                                onChange={(e) => {
                                    const newFields = [...activeComp.props.fields];
                                    newFields[index].label = e.target.value;
                                    handleUpdate(selectedId, "fields", newFields);
                                }}
                                className="w-full bg-white border border-gray-200 rounded-md px-2 py-1.5 text-[11px] outline-none focus:border-indigo-400"
                            />
                        </div>

                        {/* Type Selector */}
                        <div className="flex flex-col gap-1">
                            <span className="text-[9px] font-bold text-gray-500 uppercase ml-1">Type</span>
                            <select
                                value={field.type}
                                onChange={(e) => {
                                    const newFields = [...activeComp.props.fields];
                                    newFields[index].type = e.target.value;
                                    handleUpdate(selectedId, "fields", newFields);
                                }}
                                className="w-full bg-white border border-gray-200 rounded-md px-2 py-1.5 text-[11px] outline-none cursor-pointer"
                            >
                                <option value="text">Text</option>
                                <option value="email">Email</option>
                                <option value="textarea">Message Area</option>
                                <option value="tel">Phone</option>
                            </select>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* 2. BUTTON APPEARANCE SECTION (Your existing code) */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 space-y-4">
            <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest block mb-3">
                Button Appearance
            </label>
            
            {/* Button Text */}
            <div>
                <span className="text-sm font-medium text-gray-700 block mb-2">Button Text</span>
                <input 
                    type="text" 
                    value={activeComp.props.buttonText || "Submit"}
                    onChange={(e) => handleUpdate(selectedId, "buttonText", e.target.value)}
                    className="w-full p-2 border border-gray-200 rounded-lg outline-none focus:border-indigo-500 text-sm" 
                />
            </div>

            {/* Background Color */}
            <div>
                <span className="text-sm font-medium text-gray-700 block mb-2">Background Color</span>
                <div className="grid grid-cols-[40px_1fr] items-stretch bg-gray-50 border border-gray-200 rounded-lg overflow-hidden shadow-sm focus-within:ring-1 focus-within:ring-indigo-100 focus-within:border-indigo-400 transition-all">
                    <div className="relative w-full h-9 border-r border-gray-200 group overflow-hidden">
                        <input
                            type="color"
                            value={activeComp.props.buttonColor || "#4f39f6"}
                            onChange={(e) => handleUpdate(selectedId, "buttonColor", e.target.value)}
                            className="absolute inset-0 w-[200%] h-[200%] -translate-x-1/4 -translate-y-1/4 cursor-pointer"
                            style={{ background: 'none', border: 'none', appearance: 'none' }}
                        />
                    </div>
                    <input
                        type="text"
                        maxLength={7}
                        value={activeComp.props.buttonColor || "#4f39f6"}
                        onChange={(e) => handleUpdate(selectedId, "buttonColor", e.target.value)}
                        placeholder="#4f39f6"
                        className="w-full bg-transparent px-3 py-1.5 text-[11px] font-mono outline-none uppercase text-gray-700"
                    />
                </div>
            </div>
        </div>

    </div>
)}
                        </div>
                    ) : (
                        /* Empty State */
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

export default Contact3Dynamic;