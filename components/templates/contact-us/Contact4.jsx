// import React from 'react';
// import { Mail, Phone } from 'lucide-react';

// const Contact3 = ({ data, selectedId, setSelectedId, viewMode }) => {
//     // Extracting components from the new JSON structure
//     const leftInfo = data?.components.find(c => c.id === "section-left-info");
//     const rightForm = data?.components.find(c => c.id === "section-right-form");

//     const isMobile = viewMode === "mobile";




//     return (
//         <div 
//             className="w-full min-h-screen font-sans flex items-center justify-center py-12 px-6 md:px-12"
//             style={{ backgroundColor: data?.backgroundColor || "#4c3e72" }}
//         >
//             <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

//                 {/* 1. Left Section: Info */}
//                 {leftInfo && (
//                     <div 
//                         className={`text-left space-y-8 ${selectedId === leftInfo.id ? 'ring-2 ring-blue-400 p-4 rounded-lg' : ''}`}
//                         onClick={() => setSelectedId(leftInfo.id)}
//                     >
//                         <div>
//                             <h1 
//                                 className="font-bold mb-6 leading-tight"
//                                 style={{ 
//                                     fontSize: isMobile ? '32px' : `${leftInfo.props.headingFontSize}px`, 
//                                     color: leftInfo.props.headingColor 
//                                 }}
//                             >
//                                 {leftInfo.props.heading}
//                             </h1>
//                             <p 
//                                 className="max-w-md leading-relaxed opacity-90"
//                                 style={{ 
//                                     fontSize: `${leftInfo.props.contentFontSize}px`, 
//                                     color: leftInfo.props.contentColor 
//                                 }}
//                             >
//                                 {leftInfo.props.content}
//                             </p>
//                         </div>

//                         {/* Contact Details */}
//                         <div className="space-y-4 pt-4">
//                             <div className="flex items-center gap-3 text-white">
//                                 <Mail size={20} className="opacity-80" />
//                                 <span className="text-sm md:text-base">{leftInfo.props.email}</span>
//                             </div>
//                             <div className="flex items-center gap-3 text-white">
//                                 <Phone size={20} className="opacity-80" />
//                                 <span className="text-sm md:text-base">{leftInfo.props.phone}</span>
//                             </div>
//                         </div>
//                     </div>
//                 )}

//                 {/* 2. Right Section: Form Card */}
//                 {rightForm && (
//                     <div 
//                         className={`shadow-2xl transition-all ${selectedId === rightForm.id ? 'ring-4 ring-blue-500' : ''}`}
//                         onClick={() => setSelectedId(rightForm.id)}
//                         style={{ 
//                             backgroundColor: rightForm.props.backgroundColor, 
//                             borderRadius: `${rightForm.props.borderRadius}px`,
//                             padding: isMobile ? '24px' : rightForm.props.padding
//                         }}
//                     >
//                         <div className="mb-8">
//                             <h2 className="text-2xl font-bold text-gray-900 mb-1">
//                                 {rightForm.props.formHeading}
//                             </h2>
//                             <p className="text-gray-500">
//                                 {rightForm.props.formSubheading}
//                             </p>
//                         </div>

//                         <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                 {rightForm.props.fields.map((field) => (
//                                     <div 
//                                         key={field.id} 
//                                         className="flex flex-col"
//                                         style={{ width: isMobile ? '100%' : field.width }}
//                                     >
//                                         <label className="text-xs font-semibold text-gray-700 mb-1.5 ml-1">
//                                             {field.label}
//                                         </label>

//                                         {field.type === "textarea" ? (
//                                             <textarea 
//                                                 rows={4}
//                                                 placeholder={field.placeholder}
//                                                 className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all resize-none"
//                                             />
//                                         ) : (
//                                             <input 
//                                                 type={field.type}
//                                                 placeholder={field.placeholder}
//                                                 className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
//                                             />
//                                         )}
//                                     </div>
//                                 ))}
//                             </div>

//                             <button 
//                                 className="w-full py-3.5 rounded-lg font-bold text-sm tracking-wide transition-all active:scale-[0.98] hover:brightness-110 shadow-lg"
//                                 style={{ 
//                                     backgroundColor: rightForm.props.buttonColor, 
//                                     color: rightForm.props.buttonTextColor 
//                                 }}
//                             >
//                                 {rightForm.props.buttonText}
//                             </button>
//                         </form>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Contact3;



import React, { useState, useEffect } from 'react';
import { Settings2, Mail, Phone, MousePointer2, X, Trash2, Plus } from 'lucide-react';
import DeviceMockup from '../../layout/DeviceMockup';
import Swal from 'sweetalert2';
import templatesData from '@/data/templates.json';

const Contact4 = ({ data: initialData }) => {
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
            // 1. Loading Toast
            Toast.fire({
                icon: 'info',
                title: 'Saving template...',
                showConfirmButton: false,
                timer: 0,
            });

            // 2. Logic to find folder name
            let folderName = "general";

            // This loop now uses the 'templatesData' we imported in Step 1
            templatesData.forEach(cat => {
                const found = cat.templates.find(t => t.templateId === data.templateId);
                if (found) {
                    // Use 'category' because that is the key in your JSON
                    folderName = cat.category;
                }
            });

            const payload = {
                ...data,
                category: folderName
            };

            // 3. Send to API
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

    const leftInfo = getComp("section-left-info");
    const rightForm = getComp("section-right-form");

    const renderCanvasContent = (isPreview) => {
        const isMobile = viewMode === "mobile";
        return (
            <div
                className="w-full min-h-screen flex items-center justify-center py-12 px-6 md:px-12 transition-colors duration-500"
                style={{ backgroundColor: data.backgroundColor || "#4c3e72" }}
                onClick={() => setSelectedId(null)}
            >
                <div className={`max-w-7xl w-full ${viewMode=="mobile"?"grid-cols-1" : "grid-cols-2"} grid  gap-12 items-center ${isPreview ? 'bg-white/5' : ''}`}>

                    {/* Left Info */}
                    <div
                        className={`text-left space-y-8 p-4 rounded-xl transition-all cursor-pointer ${selectedId === 'section-left-info' ? 'ring-2 ring-blue-400 bg-white/5' : ''}`}
                        onClick={(e) => { e.stopPropagation(); setSelectedId('section-left-info'); }}
                    >
                        <Editable
                            id="section-left-info" field="heading" tag="h1"
                            className="font-bold leading-tight"
                            style={{
                                fontSize: isMobile ? '32px' : `${leftInfo.props.headingFontSize}px`,
                                color: leftInfo.props.headingColor
                            }}
                        />
                        <Editable
                            id="section-left-info" field="content" tag="p"
                            className="max-w-md leading-relaxed opacity-90"
                            style={{
                                fontSize: `${leftInfo.props.contentFontSize}px`,
                                color: leftInfo.props.contentColor
                            }}
                        />

                        <div className="space-y-4 pt-4">
                            <div className="flex items-center gap-3" style={{ color: leftInfo.props.contentColor }}>
                                <Mail size={20} className="opacity-70" />
                                <Editable id="section-left-info" field="email" tag="span" className="text-sm md:text-base" />
                            </div>
                            <div className="flex items-center gap-3" style={{ color: leftInfo.props.contentColor }}>
                                <Phone size={20} className="opacity-70" />
                                <Editable id="section-left-info" field="phone" tag="span" className="text-sm md:text-base" />
                            </div>
                        </div>
                    </div>

                    {/* Right Form Card */}
                    <div
                        className={`shadow-2xl transition-all cursor-pointer ${selectedId === 'section-right-form' ? 'ring-4 ring-blue-500' : ''}`}
                        onClick={(e) => { e.stopPropagation(); setSelectedId('section-right-form'); }}
                        style={{
                            backgroundColor: rightForm.props.backgroundColor,
                            borderRadius: `${rightForm.props.borderRadius}px`,
                            padding: isMobile ? '24px' : rightForm.props.padding
                        }}
                    >
                        <div className="mb-8">
                            <Editable id="section-right-form" field="formHeading" tag="h2" className="text-2xl font-bold text-gray-900 mb-1" />
                            <Editable id="section-right-form" field="formSubheading" tag="p" className="text-gray-500" />
                        </div>

                        <div className="space-y-5">
                            <div className="flex flex-wrap gap-4">
                                {rightForm.props.fields?.map((field) => (
                                    <div key={field.id} className="flex flex-col" style={{ width: isMobile ? '100%' : `calc(${field.width} - 8px)` }}>
                                        <label className="text-xs font-semibold text-gray-700 mb-1.5 ml-1">
                                            {field.label}
                                        </label>

                                        {field.type === 'textarea' ? (
                                            <textarea
                                                rows={4}
                                              
                                                placeholder={field.placeholder}
                                                className="w-full border border-gray-200 rounded-lg p-3 text-sm bg-gray-50 text-gray-500 placeholder:text-gray-400 outline-none resize-none"
                                            />
                                        ) : (
                                            <input
                                                type={field.type || "text"}
                                              
                                                placeholder={field.placeholder}
                                                className="w-full border border-gray-200 rounded-lg p-3 text-sm bg-gray-50 text-gray-500 placeholder:text-gray-400 outline-none"
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                            <button
                                className="w-full py-3.5 rounded-lg font-bold text-sm tracking-wide shadow-lg"
                                style={{ backgroundColor: rightForm.props.buttonColor, color: rightForm.props.buttonTextColor }}
                            >
                                {rightForm.props.buttonText}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="flex min-h-screen bg-gray-100 font-sans w-full">
            <button
                onClick={() => setIsPreviewOpen(true)}
                className="fixed cursor-pointer top-3 right-80 z-50 bg-indigo-600 text-white px-6 py-2 rounded-lg transition-all flex items-center gap-2 font-bold text-sm"
            >
                <MousePointer2 size={14} /> Preview
            </button>

            <div className="flex-1 overflow-y-auto">
                <DeviceMockup activeDevice={viewMode} onChange={setViewMode}>
                    {renderCanvasContent(false)}
                </DeviceMockup>
            </div>

            {/* Sidebar */}
            <div className="w-80 bg-white border-l border-gray-200 shadow-2xl z-[60] flex flex-col fixed right-0 h-full">
                <div className="p-4 border-b flex justify-between items-center">
                    <h2 className="font-bold flex items-center gap-2"><Settings2 size={18} /> Settings</h2>
                    <button onClick={handleSave} className="bg-indigo-600 text-white px-4 py-1.5 rounded text-sm font-bold cursor-pointer">Publish</button>
                </div>

                <div className="p-6 overflow-y-auto space-y-8">
                    {/* Page Background */}
                    <div className="space-y-3">
                        <label className="text-xs font-black text-gray-400 uppercase">Global Theme</label>
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border">
                            <input
                                type="color"
                                value={data.backgroundColor}
                                onChange={(e) => handleGlobalUpdate('backgroundColor', e.target.value)}
                                className="w-8 h-8 cursor-pointer rounded"
                            />
                            <span className="text-sm font-mono">{data.backgroundColor}</span>
                        </div>
                    </div>

                    {selectedId === 'section-left-info' && (
                        <div className="animate-in slide-in-from-right-4 space-y-6">


                            <div className="space-y-4">
                                {/* Heading Font Size */}
                                <div>
                                    <div className="flex justify-between mb-2">
                                        <span className="text-sm font-medium text-gray-700">Heading Size</span>
                                        <span className="text-xs font-bold text-indigo-600">{leftInfo.props.headingFontSize}px</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="24"
                                        max="100"
                                        value={leftInfo.props.headingFontSize}
                                        onChange={(e) => handleUpdate(selectedId, 'headingFontSize', parseInt(e.target.value))}
                                        className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                        style={{ accentColor: "#615fff" }}
                                    />
                                </div>

                                {/* Heading Color */}
                                <div>
                                    <span className="text-sm font-medium text-gray-700 block mb-2">Heading Color</span>
                                    <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg p-1 gap-2 focus-within:border-indigo-400 focus-within:ring-1 focus-within:ring-indigo-100 transition-all shadow-sm">
                                        <div className="relative w-8 h-8 shrink-0 rounded-md overflow-hidden border border-gray-200 shadow-inner">
                                            <input
                                                type="color"
                                                value={leftInfo.props.headingColor || "#000000"}
                                                onChange={(e) => handleUpdate(selectedId, "headingColor", e.target.value)}
                                                className="absolute inset-0 w-full h-full cursor-pointer scale-[2.5] bg-transparent"
                                                style={{ border: 'none', appearance: 'none' }}
                                            />
                                        </div>
                                        <input
                                            type="text"
                                            maxLength={7}
                                            placeholder="#000000"
                                            value={leftInfo.props.headingColor || ""}
                                            onChange={(e) => handleUpdate(selectedId, "headingColor", e.target.value)}
                                            className="bg-transparent border-none text-[11px] font-mono w-full outline-none uppercase text-gray-700"
                                        />
                                    </div>
                                </div>

                                <hr className="border-gray-100" />

                                {/* Body Text Size */}
                                <div>
                                    <div className="flex justify-between mb-2">
                                        <span className="text-sm font-medium text-gray-700">Body Text Size</span>
                                        <span className="text-xs font-bold text-indigo-600">{leftInfo.props.contentFontSize || 16}px</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="12"
                                        max="40"
                                        value={leftInfo.props.contentFontSize || 16}
                                        onChange={(e) => handleUpdate(selectedId, 'contentFontSize', parseInt(e.target.value))}
                                        className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                        style={{ accentColor: "#615fff" }}
                                    />
                                </div>

                                {/* Body Text Color */}
                                <div>
                                    <span className="text-sm font-medium text-gray-700 block mb-2">Body Text Color</span>
                                    <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg p-1 gap-2 focus-within:border-indigo-400 focus-within:ring-1 focus-within:ring-indigo-100 transition-all shadow-sm">
                                        <div className="relative w-8 h-8 shrink-0 rounded-md overflow-hidden border border-gray-200 shadow-inner">
                                            <input
                                                type="color"
                                                value={leftInfo.props.contentColor || "#4B5563"}
                                                onChange={(e) => handleUpdate(selectedId, "contentColor", e.target.value)}
                                                className="absolute inset-0 w-full h-full cursor-pointer scale-[2.5] bg-transparent"
                                                style={{ border: 'none', appearance: 'none' }}
                                            />
                                        </div>
                                        <input
                                            type="text"
                                            maxLength={7}
                                            placeholder="#4B5563"
                                            value={leftInfo.props.contentColor || ""}
                                            onChange={(e) => handleUpdate(selectedId, "contentColor", e.target.value)}
                                            className="bg-transparent border-none text-[11px] font-mono w-full outline-none uppercase text-gray-700"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {selectedId === 'section-right-form' && (
                        <div className="animate-in slide-in-from-right-4 space-y-6">
                            {/* SECTION: CARD STYLE */}
                            <div className="space-y-4">
                                <label className="text-[10px] font-black text-indigo-600 uppercase tracking-widest block mb-4">
                                    Form Card Style
                                </label>

                                {/* Card Background Color */}
                                <div>
                                    <span className="text-sm font-medium text-gray-700 block mb-2">Card Background</span>
                                    <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg p-1 gap-2 focus-within:border-indigo-400 focus-within:ring-1 focus-within:ring-indigo-100 transition-all shadow-sm">
                                        <div className="relative w-8 h-8 shrink-0 rounded-md overflow-hidden border border-gray-200 shadow-inner">
                                            <input
                                                type="color"
                                                value={rightForm.props.backgroundColor}
                                                onChange={(e) => handleUpdate(selectedId, 'backgroundColor', e.target.value)}
                                                className="absolute inset-0 w-full h-full cursor-pointer scale-[2.5] bg-transparent"
                                                style={{ border: 'none', appearance: 'none' }}
                                            />
                                        </div>
                                        <input
                                            type="text"
                                            maxLength={7}
                                            value={rightForm.props.backgroundColor}
                                            onChange={(e) => handleUpdate(selectedId, 'backgroundColor', e.target.value)}
                                            className="bg-transparent border-none text-[11px] font-mono w-full outline-none uppercase text-gray-700"
                                        />
                                    </div>
                                </div>

                                {/* Corner Radius */}
                                <div>
                                    <div className="flex justify-between mb-2">
                                        <span className="text-sm font-medium text-gray-700">Corner Radius</span>
                                        <span className="text-xs font-bold text-indigo-600">{rightForm.props.borderRadius}px</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0"
                                        max="40"
                                        value={rightForm.props.borderRadius}
                                        onChange={(e) => handleUpdate(selectedId, 'borderRadius', parseInt(e.target.value))}
                                        className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                        style={{ accentColor: "#615fff" }}
                                    />
                                </div>
                            </div>

                            <hr className="border-gray-100" />

                            {/* SECTION: BUTTON STYLE */}
                            <div className="space-y-4">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">
                                    Submit Button Style
                                </label>

                                <div className="grid grid-cols-2 gap-3">
                                    {/* Button Background */}
                                    <div>
                                        <span className="text-[10px] font-bold text-gray-500 uppercase mb-1 block">BG Color</span>
                                        <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg p-1 gap-2">
                                            <input
                                                type="color"
                                                className="w-6 h-6 rounded cursor-pointer border-none"
                                                value={rightForm.props.buttonColor}
                                                onChange={(e) => handleUpdate(selectedId, 'buttonColor', e.target.value)}
                                            />
                                            <input
                                                type="text"
                                                className="text-[9px] font-mono w-full bg-transparent outline-none uppercase"
                                                value={rightForm.props.buttonColor}
                                                onChange={(e) => handleUpdate(selectedId, 'buttonColor', e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    {/* Button Text Color */}
                                    <div>
                                        <span className="text-[10px] font-bold text-gray-500 uppercase mb-1 block">Text Color</span>
                                        <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg p-1 gap-2">
                                            <input
                                                type="color"
                                                className="w-6 h-6 rounded cursor-pointer border-none"
                                                value={rightForm.props.buttonTextColor || "#ffffff"}
                                                onChange={(e) => handleUpdate(selectedId, 'buttonTextColor', e.target.value)}
                                            />
                                            <input
                                                type="text"
                                                className="text-[9px] font-mono w-full bg-transparent outline-none uppercase"
                                                value={rightForm.props.buttonTextColor || "#ffffff"}
                                                onChange={(e) => handleUpdate(selectedId, 'buttonTextColor', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <hr className="border-gray-100" />

                            {/* SECTION: FORM FIELDS */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                        Form Fields
                                    </span>
                                    <button
                                        onClick={() => {
                                            const newField = {
                                                id: `field-${Date.now()}`,
                                                type: "text",
                                                label: "New Label",
                                                placeholder: "Enter value...",
                                                width:"100%"
                                            };
                                            handleUpdate(selectedId, "fields", [...(rightForm.props.fields || []), newField]);
                                        }}
                                        className="text-[10px] cursor-pointer bg-indigo-50 text-indigo-600 px-2 py-1 rounded font-bold hover:bg-indigo-100 transition-colors"
                                    >
                                        + ADD FIELD
                                    </button>
                                </div>

                                <div className="space-y-4 mt-2">
                                    {rightForm.props.fields?.map((field, index) => (
                                        <div key={field.id} className="p-3 bg-gray-50 border border-gray-200 rounded-xl space-y-3 relative group">
                                            <button
                                                onClick={() => {
                                                    const filtered = rightForm.props.fields.filter((_, i) => i !== index);
                                                    handleUpdate(selectedId, "fields", filtered);
                                                }}
                                                className="absolute -top-2 -right-2 cursor-pointer bg-white text-red-500 shadow-sm border border-red-100 rounded-full p-1 hover:bg-red-50 transition-all"
                                            >
                                                <Trash2 size={12} />
                                            </button>

                                            <div className="flex flex-col gap-1">
                                                <span className="text-[9px] font-bold text-gray-500 uppercase ml-1">Input Type</span>
                                                <select
                                                    value={field.type}
                                                    onChange={(e) => {
                                                        const newFields = [...rightForm.props.fields];
                                                        newFields[index].type = e.target.value;
                                                        handleUpdate(selectedId, "fields", newFields);
                                                    }}
                                                    className="w-full bg-white border border-gray-200 rounded-md px-2 py-1.5 text-[11px] outline-none focus:border-indigo-400"
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
                                                <span className="text-[9px] font-bold text-gray-500 uppercase ml-1">Field Label</span>
                                                <input
                                                    type="text"
                                                    value={field.label}
                                                    onChange={(e) => {
                                                        const newFields = [...rightForm.props.fields];
                                                        newFields[index].label = e.target.value;
                                                        handleUpdate(selectedId, "fields", newFields);
                                                    }}
                                                    className="w-full bg-white border border-gray-200 rounded-md px-2 py-1.5 text-[11px] outline-none"
                                                />
                                            </div>

                                            <div className="flex flex-col gap-1">
                                                <span className="text-[9px] font-bold text-gray-500 uppercase ml-1">Placeholder</span>
                                                <input
                                                    type="text"
                                                    value={field.placeholder}
                                                    onChange={(e) => {
                                                        const newFields = [...rightForm.props.fields];
                                                        newFields[index].placeholder = e.target.value;
                                                        handleUpdate(selectedId, "fields", newFields);
                                                    }}
                                                    className="w-full bg-white border border-gray-200 rounded-md px-2 py-1.5 text-[11px] outline-none"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {isPreviewOpen && (
                <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex flex-col items-center overflow-y-auto">
                    <button onClick={() => setIsPreviewOpen(false)} className="absolute top-6 right-10 text-white hover:rotate-90 transition-all">
                        <X size={40} />
                    </button>
                    <div className="w-full pointer-events-none mt-20">
                        {renderCanvasContent(true)}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Contact4;