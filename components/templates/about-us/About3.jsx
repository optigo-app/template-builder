// import React from 'react';

// const About3 = ({ data }) => {
//   // Helper function to extract props by ID
//   const getComp = (id) =>
//     data?.components?.find((item) => item.id === id)?.props || {};

//   const heroHeading = getComp("heading-hero");
//   const heroText = getComp("text-hero");
//   const aboutHeading = getComp("heading-about");
//   const aboutText = getComp("text-about");
//   const iconData = getComp("image-icon");
//   const visionHeading = getComp("heading-vision");
//   const visionText = getComp("text-vision");
//   const jewelryImg = getComp("image-jewelry");
//   const founderHeading = getComp("heading-founder");
//   const founderText = getComp("text-founder");
//   const founderImg = getComp("image-founder");

//   return (
//     <div className="bg-white min-h-screen font-sans text-gray-800 pb-20">

//       {/* Header Section */}
//       <div className="py-16 text-center">
//         <h1 
//           className="font-bold mb-4"
//           style={{ fontSize: `${heroHeading.fontSize}px`, color: heroHeading.color, textAlign: heroHeading.textAlign }}
//         >
//           {heroHeading.content}
//         </h1>
//         <p 
//           className="max-w-2xl mx-auto"
//           style={{ fontSize: `${heroText.fontSize}px`, color: heroText.color, lineHeight: heroText.lineHeight }}
//         >
//           {heroText.content}
//         </p>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-y-12">

//         {/* Section 1: About Us */}
//         <section className="border-t border-b border-gray-200">
//           <div className="flex flex-col md:flex-row items-center py-16">
//             {/* Text Content */}
//             <div className="w-full md:w-1/2 px-8 flex flex-col items-center text-center order-2 md:order-1 mt-8 md:mt-0">
//               <h2 
//                 className="font-semibold tracking-widest uppercase mb-4"
//                 style={{ fontSize: `${aboutHeading.fontSize}px`, color: aboutHeading.color }}
//               >
//                 {aboutHeading.content}
//               </h2>
//               <p 
//                 className="leading-relaxed max-w-2xl"
//                 style={{ fontSize: `${aboutText.fontSize}px`, color: aboutText.color, lineHeight: aboutText.lineHeight }}
//               >
//                 {aboutText.content}
//               </p>
//             </div>
//             {/* Image/Icon */}
//             <div className="w-full md:w-1/2 flex justify-center px-8 order-1 md:order-2">
//               <img 
//                 src={iconData.src} 
//                 alt={iconData.alt} 
//                 className="object-contain"
//                 style={{ width: iconData.width, height: iconData.height, borderRadius: iconData.borderRadius }}
//               />
//             </div>
//           </div>
//         </section>

//         {/* Section 2: Vision */}
//         <section className="border-b border-gray-200">
//           <div className="flex flex-col md:flex-row items-center py-16">
//             {/* Image */}
//             <div className="w-full md:w-1/2 flex justify-center px-8 mb-8 md:mb-0">
//               <img 
//                 src={jewelryImg.src} 
//                 alt={jewelryImg.alt} 
//                 className="object-cover shadow-sm"
//                 style={{ width: jewelryImg.width, height: jewelryImg.height, borderRadius: `${jewelryImg.borderRadius}px` }}
//               />
//             </div>
//             {/* Text Content */}
//             <div className="w-full md:w-1/2 px-8 flex flex-col items-center text-center">
//               <h2 
//                 className="font-semibold tracking-widest uppercase mb-4"
//                 style={{ fontSize: `${visionHeading.fontSize}px`, color: visionHeading.color }}
//               >
//                 {visionHeading.content}
//               </h2>
//               <p 
//                 className="leading-relaxed max-w-lg"
//                 style={{ fontSize: `${visionText.fontSize}px`, color: visionText.color, lineHeight: visionText.lineHeight }}
//               >
//                 {visionText.content}
//               </p>
//             </div>
//           </div>
//         </section>

//         {/* Section 3: Founder */}
//         <section className="border-b border-gray-200">
//           <div className="flex flex-col md:flex-row items-center py-16">
//             {/* Text Content */}
//             <div className="w-full md:w-1/2 px-8 flex flex-col items-center text-center order-2 md:order-1 mt-8 md:mt-0">
//               <h2 
//                 className="font-semibold tracking-widest uppercase mb-4"
//                 style={{ fontSize: `${founderHeading.fontSize}px`, color: founderHeading.color }}
//               >
//                 {founderHeading.content}
//               </h2>
//               <div 
//                 className="leading-relaxed max-w-2xl"
//                 style={{ fontSize: `${founderText.fontSize}px`, color: founderText.color, lineHeight: founderText.lineHeight }}
//               >
//                 <p>{founderText.content}</p>
//               </div>
//             </div>
//             {/* Image */}
//             <div className="w-full md:w-1/2 flex justify-center px-8 order-1 md:order-2">
//               <img 
//                 src={founderImg.src} 
//                 alt={founderImg.alt} 
//                 className="object-cover shadow-sm"
//                 style={{ width: founderImg.width, height: founderImg.height, borderRadius: `${founderImg.borderRadius}px` }}
//               />
//             </div>
//           </div>
//         </section>

//       </div>
//     </div>
//   );
// };

// export default About3;



// import React, { useState, useEffect } from 'react';
// import { Trash2, Image as ImageIcon, Type } from 'lucide-react';
// import DeviceMockup from '../layout/DeviceMockup';

// const About3 = ({ data: initialData }) => {
//   const [data, setData] = useState(initialData);
//   const [selectedId, setSelectedId] = useState(null);
//   const [viewMode, setViewMode] = useState('desktop');

//   useEffect(() => {
//     setData(initialData);
//   }, [initialData]);

//   const getComp = (id) => data?.components?.find((item) => item.id === id) || { props: {} };

//   const handleUpdate = (id, field, value) => {
//     setData((prev) => ({
//       ...prev,
//       components: prev.components.map((comp) =>
//         comp.id === id ? { ...comp, props: { ...comp.props, [field]: value } } : comp
//       ),
//     }));
//   };

//   const handleSave = async () => {
//     try {
//       const response = await fetch('/api/save-template', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(data),
//       });
//       if (response.ok) alert(`Saved successfully!`);
//     } catch (error) {
//       alert("Save failed.");
//     }
//   };

//   const Editable = ({ id, className, tag: Tag = "div", style = {} }) => {
//     const comp = getComp(id);
//     const isSelected = selectedId === id;

//     return (
//       <Tag
//         className={`${className} cursor-pointer rounded transition-all ${
//           isSelected ? "ring-2 ring-indigo-500 ring-offset-2" : "hover:bg-gray-50 px-1"
//         }`}
//         style={{ 
//             color: comp.props.color, 
//             fontSize: comp.props.fontSize ? `${comp.props.fontSize}px` : undefined,
//             textAlign: comp.props.textAlign,
//             lineHeight: comp.props.lineHeight,
//             ...style 
//         }}
//         contentEditable
//         suppressContentEditableWarning={true}
//         onClick={(e) => {
//           e.stopPropagation();
//           setSelectedId(id);
//         }}
//         onBlur={(e) => handleUpdate(id, "content", e.target.innerText)}
//       >
//         {comp.props.content}
//       </Tag>
//     );
//   };

//   const activeComp = selectedId ? getComp(selectedId) : null;

//   return (
//     <div className="flex min-h-screen bg-gray-100 font-sans" style={{ width: "79%" }} onClick={() => setSelectedId(null)}>

//       <DeviceMockup activeDevice={viewMode} onChange={setViewMode}>
//         <div className="bg-white min-h-screen font-sans text-gray-800 pb-20 overflow-y-auto">

//           {/* Header Section */}
//           <div className="py-16 text-center px-4">
//             <Editable id="heading-hero" tag="h1" className="font-bold mb-4" />
//             <Editable id="text-hero" tag="p" className="max-w-2xl mx-auto" />
//           </div>

//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-y-12">

//             {/* Section 1: About Us */}
//             <section className="border-t border-b border-gray-200">
//               <div className="flex flex-col md:flex-row items-center py-16">
//                 <div className="w-full md:w-1/2 px-8 flex flex-col items-center text-center order-2 md:order-1 mt-8 md:mt-0">
//                   <Editable id="heading-about" tag="h2" className="font-semibold tracking-widest uppercase mb-4" />
//                   <Editable id="text-about" tag="p" className="leading-relaxed max-w-2xl" />
//                 </div>
//                 <div className="w-full md:w-1/2 flex justify-center px-8 order-1 md:order-2">
//                   <img 
//                     src={getComp("image-icon").props.src} 
//                     className={`object-contain cursor-pointer transition-all ${selectedId === 'image-icon' ? 'ring-4 ring-indigo-500' : ''}`}
//                     style={{ 
//                         width: getComp("image-icon").props.width, 
//                         height: getComp("image-icon").props.height, 
//                         borderRadius: `${getComp("image-icon").props.borderRadius}px` 
//                     }}
//                     onClick={(e) => { e.stopPropagation(); setSelectedId("image-icon"); }}
//                   />
//                 </div>
//               </div>
//             </section>

//             {/* Section 2: Vision */}
//             <section className="border-b border-gray-200">
//               <div className="flex flex-col md:flex-row items-center py-16">
//                 <div className="w-full md:w-1/2 flex justify-center px-8 mb-8 md:mb-0">
//                   <img 
//                     src={getComp("image-jewelry").props.src} 
//                     className={`object-cover shadow-sm cursor-pointer transition-all ${selectedId === 'image-jewelry' ? 'ring-4 ring-indigo-500' : ''}`}
//                     style={{ 
//                         width: getComp("image-jewelry").props.width, 
//                         height: getComp("image-jewelry").props.height, 
//                         borderRadius: `${getComp("image-jewelry").props.borderRadius}px` 
//                     }}
//                     onClick={(e) => { e.stopPropagation(); setSelectedId("image-jewelry"); }}
//                   />
//                 </div>
//                 <div className="w-full md:w-1/2 px-8 flex flex-col items-center text-center">
//                   <Editable id="heading-vision" tag="h2" className="font-semibold tracking-widest uppercase mb-4" />
//                   <Editable id="text-vision" tag="p" className="leading-relaxed max-w-lg" />
//                 </div>
//               </div>
//             </section>

//             {/* Section 3: Founder */}
//             <section className="border-b border-gray-200">
//               <div className="flex flex-col md:flex-row items-center py-16">
//                 <div className="w-full md:w-1/2 px-8 flex flex-col items-center text-center order-2 md:order-1 mt-8 md:mt-0">
//                   <Editable id="heading-founder" tag="h2" className="font-semibold tracking-widest uppercase mb-4" />
//                   <Editable id="text-founder" tag="div" className="leading-relaxed max-w-2xl" />
//                 </div>
//                 <div className="w-full md:w-1/2 flex justify-center px-8 order-1 md:order-2">
//                   <img 
//                     src={getComp("image-founder").props.src} 
//                     className={`object-cover shadow-sm cursor-pointer transition-all ${selectedId === 'image-founder' ? 'ring-4 ring-indigo-500' : ''}`}
//                     style={{ 
//                         width: getComp("image-founder").props.width, 
//                         height: getComp("image-founder").props.height, 
//                         borderRadius: `${getComp("image-founder").props.borderRadius}px` 
//                     }}
//                     onClick={(e) => { e.stopPropagation(); setSelectedId("image-founder"); }}
//                   />
//                 </div>
//               </div>
//             </section>

//           </div>
//         </div>
//       </DeviceMockup>

//       {/* RIGHT: SETTINGS SIDEBAR */}
//       <div className="w-80 bg-white border-l border-gray-200 shadow-2xl fixed top-0 right-0 h-screen overflow-y-auto z-[60] flex flex-col" style={{ width: "19%",right:"0px" }} onClick={(e) => e.stopPropagation()}>
//         <div className="p-6 bg-white border-b border-gray-200 sticky top-0 z-10">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-bold text-gray-900 tracking-tight">Settings</h2>
//             <button onClick={handleSave} className="text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-600 transition-all active:scale-95" style={{backgroundColor:"#615fff"}}>
//              Publish
//             </button>
//           </div>
//         </div>

//         <div className="p-6 space-y-6 flex-1">
//           {activeComp ? (
//             <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
//               <div className="flex items-center space-x-2 bg-indigo-50 p-3 rounded-xl">
//                 <span className="text-xs font-bold text-indigo-700 uppercase tracking-widest">Editing: {activeComp.id}</span>
//               </div>

//               {/* Text Controls */}
//               {activeComp.id.includes("heading") || activeComp.id.includes("text") ? (
//                 <div className="space-y-4">
//                   <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
//                     <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest block mb-3">Typography</label>
//                     <div className="space-y-4">
//                       <div>
//                         <div className="flex justify-between mb-2">
//                           <span className="text-sm font-medium text-gray-700">Font Size (px)</span>
//                           <span className="text-xs font-bold text-indigo-600">{activeComp.props.fontSize || 16}</span>
//                         </div>
//                         <input 
//                           type="range" min="12" max="80" 
//                           value={parseInt(activeComp.props.fontSize) || 16} 
//                           onChange={(e) => handleUpdate(selectedId, "fontSize", e.target.value)}
//                           className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
//                           style={{ accentColor: "#615fff" }}
//                         />
//                       </div>
//                       <div>
//                         <span className="text-sm font-medium text-gray-700 block mb-2">Text Color</span>
//                         <input 
//                           type="color" 
//                           value={activeComp.props.color || "#000000"} 
//                           onChange={(e) => handleUpdate(selectedId, "color", e.target.value)}
//                           className="w-full h-10 rounded-lg cursor-pointer border border-gray-200"
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ) : null}

//               {/* Image Controls */}
//               {activeComp.id.includes("image") && (
//                 <div className="space-y-4">
//                   <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
//                     <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest block mb-3">Image Style</label>
//                     <div className="space-y-4">
//                       <div>
//                         <span className="text-sm font-medium text-gray-700 block mb-2">Source URL</span>
//                         <textarea 
//                           value={activeComp.props.src} 
//                           onChange={(e) => handleUpdate(selectedId, "src", e.target.value)}
//                           className="w-full p-2 text-xs border border-gray-200 rounded-lg bg-gray-50 font-mono"
//                           rows="4"
//                         />
//                       </div>
//                       <div>
//                         <div className="flex justify-between mb-2">
//                           <span className="text-sm font-medium text-gray-700">Corner Radius</span>
//                           <span className="text-xs font-bold text-indigo-600">{activeComp.props.borderRadius || 0}px</span>
//                         </div>
//                         <input 
//                           type="range" min="0" max="100" 
//                           value={activeComp.props.borderRadius || 0} 
//                           onChange={(e) => handleUpdate(selectedId, "borderRadius", e.target.value)}
//                           className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
//                           style={{ accentColor: "#615fff" }}
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <div className="h-full flex flex-col items-center justify-center text-center py-20">
//               <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-gray-300">
//                 <Type size={32} />
//               </div>
//               <p className="text-sm text-gray-400">Click any text or image to edit properties</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default About3;



// import React, { useState, useEffect } from 'react';
// import { Trash2, Image as ImageIcon, Type, Plus, Settings2, Layout, Sliders, Trash } from 'lucide-react';
// import DeviceMockup from '../layout/DeviceMockup';

// const About3 = ({ data: initialData }) => {
//   const [data, setData] = useState(initialData || { components: [] });
//   const [selectedId, setSelectedId] = useState(null);
//   const [viewMode, setViewMode] = useState('desktop');

//   useEffect(() => {
//     if (initialData) setData(initialData);
//   }, [initialData]);

//   const getComp = (id) => data?.components?.find((item) => item.id === id) || { props: {} };

//   const handleUpdate = (id, field, value) => {
//     setData((prev) => ({
//       ...prev,
//       components: prev.components.map((comp) =>
//         comp.id === id ? { ...comp, props: { ...comp.props, [field]: value } } : comp
//       ),
//     }));
//   };

//   const handleAddSection = () => {
//     const newId = `section-${Date.now()}`;
//     const newSection = {
//       id: newId,
//       type: "content-section",
//       props: {
//         heading: "NEW SECTION TITLE",
//         content: "Enter your content here. This section is fully customizable.",
//         src: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2070&auto=format&fit=crop",
//         rowDirection: "row", 
//         fontSize: 14,
//         headingFontSize: 18,
//         color: "#4b5563",
//         headingColor: "#111827",
//         borderRadius: 8,
//         imageWidth: "100%"
//       }
//     };
//     setData(prev => ({ ...prev, components: [...prev.components, newSection] }));
//     setSelectedId(newId);
//   };

//   const handleDeleteSection = (id) => {
//     setData(prev => ({ ...prev, components: prev.components.filter(c => c.id !== id) }));
//     setSelectedId(null);
//   };

//   const handleSave = async () => {
//     try {
//       const response = await fetch('/api/save-template', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(data),
//       });
//       if (response.ok) alert(`Saved successfully!`);
//     } catch (error) { alert("Save failed."); }
//   };

//   const activeComp = selectedId ? getComp(selectedId) : null;

//   const Editable = ({ id, field, className, tag: Tag = "div", style = {} }) => {
//     const comp = getComp(id);
//     return (
//       <Tag
//         className={`${className} outline-none focus:ring-2 focus:ring-indigo-300 rounded px-1 transition-all`}
//         style={style}
//         contentEditable
//         suppressContentEditableWarning={true}
//         onBlur={(e) => handleUpdate(id, field, e.target.innerText)}
//         onClick={(e) => {
//             e.stopPropagation();
//             setSelectedId(id);
//         }}
//       >
//         {comp.props[field]}
//       </Tag>
//     );
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-100 font-sans" style={{ width: "79%" }}>
//       <div className="flex-1  " onClick={() => setSelectedId(null)}>
//         <DeviceMockup activeDevice={viewMode} onChange={setViewMode}>
//           <div className="bg-white min-h-screen font-sans text-gray-800 pb-20 overflow-y-auto">

//             <div className="py-12 text-center px-4 mb-4">
//               <h1 className="text-3xl font-light tracking-widest uppercase">About Us</h1>
//               <div className="w-16 h-px bg-indigo-500 mx-auto mt-4 mb-4"></div>
//             </div>

//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col">
//               {data?.components?.map((section) => (
//                 <section 
//                   key={section.id} 
//                   className={`relative group border-b border-gray-50 last:border-0 transition-all ${selectedId === section.id ? 'bg-indigo-50/30 ring-1 ring-indigo-200' : ''}`}
//                 >
//                   <div 
//                     className="flex flex-col md:flex-row items-center py-16 gap-12 px-8"
//                     style={{ 
//                       flexDirection: section.props.rowDirection === 'reverse' ? 'row-reverse' : 'row' 
//                     }}
//                   >
//                     <div className="w-full md:w-1/2 flex flex-col items-center text-center">
//                       <Editable 
//                         id={section.id} 
//                         field="heading"
//                         tag="h2"
//                         className="font-bold tracking-widest uppercase mb-6"
//                         style={{ fontSize: `${section.props.headingFontSize || 18}px`, color: section.props.headingColor || '#111' }}
//                       />
//                       <Editable 
//                         id={section.id} 
//                         field="content"
//                         tag="p"
//                         className="leading-relaxed text-justify whitespace-pre-line"
//                         style={{ fontSize: `${section.props.fontSize || 14}px`, color: section.props.color || '#4b5563' }}
//                       />
//                     </div>
//                     <div className="w-full md:w-1/2 flex justify-center">
//                       <img 
//                         src={section.props.src} 
//                         onClick={(e) => { e.stopPropagation(); setSelectedId(section.id); }}
//                         className={`shadow-md transition-all cursor-pointer ${selectedId === section.id ? 'ring-4 ring-indigo-500' : ''}`}
//                         style={{ 
//                           width: section.props.imageWidth || "100%", 
//                           borderRadius: `${section.props.borderRadius || 0}px`,
//                           objectFit: 'cover'
//                         }}
//                       />
//                     </div>
//                   </div>
//                 </section>
//               ))}

//               <button 
//                 onClick={(e) => { e.stopPropagation(); handleAddSection(); }}
//                 className="my-10 mx-auto flex items-center gap-2 px-6 py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-400 hover:border-indigo-400 hover:text-indigo-500 transition-all"
//               >
//                 <Plus size={20} /> Add New Section
//               </button>
//             </div>
//           </div>
//         </DeviceMockup>
//       </div>

//       {/* SETTINGS SIDEBAR */}
//       <div className="w-[19%] bg-white border-l border-gray-200 shadow-2xl fixed top-0 right-0 h-screen overflow-y-auto z-[60] flex flex-col" style={{ width: "19%", right: "0px" }} onClick={(e) => e.stopPropagation()}>
//         <div className="p-6 border-b border-gray-200 sticky top-0 bg-white/80 backdrop-blur-md z-20">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-bold flex items-center gap-2 text-gray-800"><Settings2 size={20} /> Settings</h2>
//             <button onClick={handleSave} className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95">Save</button>
//           </div>
//         </div>

//         <div className="p-6 space-y-8 pb-24">
//           {activeComp ? (
//             <div className="animate-in slide-in-from-right-4 duration-300 space-y-8">
//               <div className="flex justify-between items-center">
//                 <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest bg-indigo-50 px-2 py-1 rounded">Active Section</span>
//                 <button onClick={() => handleDeleteSection(activeComp.id)} className="text-red-400 hover:text-red-600 transition-colors"><Trash size={18} /></button>
//               </div>

//               {/* FIXED LAYOUT TOGGLE */}
//               <div className="space-y-3">
//                 <label className="text-xs font-bold text-gray-400 uppercase flex items-center gap-2"><Layout size={14}/> Layout Direction</label>
//                 <div className="grid grid-cols-2 gap-2">
//                   <button 
//                     onClick={() => handleUpdate(activeComp.id, "rowDirection", "row")} 
//                     className={`p-2 text-xs rounded-lg border transition-all ${activeComp.props.rowDirection !== "reverse" ? "bg-indigo-600 text-white border-indigo-600 shadow-sm" : "bg-white text-gray-600 border-gray-200 hover:border-indigo-300"}`}
//                   >
//                     Image Right
//                   </button>
//                   <button 
//                     onClick={() => handleUpdate(activeComp.id, "rowDirection", "reverse")} 
//                     className={`p-2 text-xs rounded-lg border transition-all ${activeComp.props.rowDirection === "reverse" ? "bg-indigo-600 text-white border-indigo-600 shadow-sm" : "bg-white text-gray-600 border-gray-200 hover:border-indigo-300"}`}
//                   >
//                     Image Left
//                   </button>
//                 </div>
//               </div>

//               {/* Heading Settings */}
//               <div className="space-y-4 pt-4 border-t border-gray-100">
//                 <label className="text-xs font-bold text-gray-400 uppercase flex items-center gap-2"><Type size={14}/> Heading</label>
//                 <input 
//                     type="text" 
//                     value={activeComp.props.heading || ""} 
//                     onChange={(e) => handleUpdate(activeComp.id, "heading", e.target.value)} 
//                     className="w-full p-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" 
//                 />
//                 <div className="flex items-center justify-between gap-4">
//                   <input type="color" value={activeComp.props.headingColor || "#111111"} onChange={(e) => handleUpdate(activeComp.id, "headingColor", e.target.value)} className="w-10 h-10 rounded cursor-pointer border-0 p-0 overflow-hidden shadow-sm" />
//                   <div className="flex-1">
//                     <div className="flex justify-between text-[10px] font-bold text-gray-500 mb-1">SIZE <span>{activeComp.props.headingFontSize}px</span></div>
//                     <input type="range" min="12" max="80" value={activeComp.props.headingFontSize || 18} onChange={(e) => handleUpdate(activeComp.id, "headingFontSize", e.target.value)} className="w-full accent-indigo-600" />
//                   </div>
//                 </div>
//               </div>

//               {/* Text Settings */}
//               <div className="space-y-4 pt-4 border-t border-gray-100">
//                 <label className="text-xs font-bold text-gray-400 uppercase flex items-center gap-2"><Sliders size={14}/> Body Content</label>
//                 <textarea 
//                     rows="4" 
//                     value={activeComp.props.content || ""} 
//                     onChange={(e) => handleUpdate(activeComp.id, "content", e.target.value)} 
//                     className="w-full p-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" 
//                 />
//                 <div className="flex items-center justify-between gap-4">
//                   <input type="color" value={activeComp.props.color || "#4b5563"} onChange={(e) => handleUpdate(activeComp.id, "color", e.target.value)} className="w-10 h-10 rounded cursor-pointer border-0 p-0 overflow-hidden shadow-sm" />
//                   <div className="flex-1">
//                     <div className="flex justify-between text-[10px] font-bold text-gray-500 mb-1">SIZE <span>{activeComp.props.fontSize}px</span></div>
//                     <input type="range" min="10" max="30" value={activeComp.props.fontSize || 14} onChange={(e) => handleUpdate(activeComp.id, "fontSize", e.target.value)} className="w-full accent-indigo-600" />
//                   </div>
//                 </div>
//               </div>

//               {/* Image Styles */}
//               <div className="space-y-4 pt-4 border-t border-gray-100">
//                 <label className="text-xs font-bold text-gray-400 uppercase flex items-center gap-2"><ImageIcon size={14}/> Image</label>
//                 <div className="space-y-3">
//                   <input type="text" placeholder="Image URL" value={activeComp.props.src || ""} onChange={(e) => handleUpdate(activeComp.id, "src", e.target.value)} className="w-full p-2 text-[10px] border border-gray-200 rounded bg-gray-50 font-mono" />
//                   <div className="flex-1">
//                     <div className="flex justify-between text-[10px] font-bold text-gray-500 mb-1 uppercase">Radius <span>{activeComp.props.borderRadius}px</span></div>
//                     <input type="range" min="0" max="200" value={activeComp.props.borderRadius || 0} onChange={(e) => handleUpdate(activeComp.id, "borderRadius", e.target.value)} className="w-full accent-indigo-600" />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <div className="py-20 text-center flex flex-col items-center justify-center space-y-4">
//               <div className="p-4 bg-gray-50 rounded-full text-gray-300"><Layout size={40} /></div>
//               <p className="text-gray-400 text-sm italic px-4">Click any text or image in the preview to edit.</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default About3;




import React, { useState, useEffect } from 'react';
import { Trash2, Image as ImageIcon, Type, Plus, Settings2, Layout, Sliders, Trash, Maximize } from 'lucide-react';
import DeviceMockup from '../../layout/DeviceMockup';
import { MousePointer2 } from "lucide-react";
import { X } from "lucide-react";
import Swal from 'sweetalert2';
import templatesData from '@/data/templates.json';


const About3 = ({ data: initialData }) => {
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

  const handleAddSection = () => {
    const newId = `section-${Date.now()}`;
    const newSection = {
      id: newId,
      type: "content-section",
      props: {
        heading: "NEW SECTION TITLE",
        content: "Enter your content here.",
        src: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2070&auto=format&fit=crop",
        rowDirection: "row",
        fontSize: 14,
        headingFontSize: 24, // Default for section headings
        color: "#4b5563",
        headingColor: "#111827",
        borderRadius: 8,
        imageWidth: "100%"
      }
    };
    setData(prev => ({ ...prev, components: [...prev.components, newSection] }));
    setSelectedId(newId);
  };

  const handleDeleteSection = (id) => {
    setData(prev => ({ ...prev, components: prev.components.filter(c => c.id !== id) }));
    setSelectedId(null);
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


  const activeComp = selectedId ? getComp(selectedId) : null;

  const Editable = ({ id, field, className, tag: Tag = "div", style = {} }) => {
    const comp = getComp(id);
    return (
      <Tag
        className={`${className} outline-none focus:ring-2 focus:ring-indigo-300 rounded px-1 transition-all`}
        style={style}
        contentEditable
        suppressContentEditableWarning={true}
        onBlur={(e) => handleUpdate(id, field, e.target.innerText)}
        onClick={(e) => {
          e.stopPropagation();
          setSelectedId(id);
        }}
      >
        {comp.props[field]}
      </Tag>
    );
  };

  const renderCanvasContent = (isModel)=>(
    <div className="bg-white min-h-screen font-sans text-gray-800 pb-20 overflow-y-auto">

            {/* DYNAMIC TOP HEADING */}
            {data?.components?.filter(c => c.type === 'heading').map(header => (
              <div key={header.id} className="py-12 text-center px-4 mb-4 group relative cursor-pointer" onClick={(e) => { e.stopPropagation(); setSelectedId(header.id); }}>
                <Editable
                  id={header.id}
                  field="heading"
                  tag="h1"
                  className="tracking-widest uppercase inline-block font-light"
                  style={{
                    color: header.props.headingColor || '#111',
                    fontSize: `${header.props.headingFontSize || 30}px`
                  }}
                />
                <div className="w-16 h-px bg-indigo-500 mx-auto mt-4 mb-4"></div>
              </div>
            ))}
{/* max-w-7xl */}
            <div className="  mx-auto px-4 sm:px-6 lg:px-8 flex flex-col">
              {data?.components?.filter(c => c.type !== 'heading').map((section) => (
                <section
                  key={section.id}
                  className={`relative group border-b border-gray-50 last:border-0 transition-all ${selectedId === section.id ? 'bg-indigo-50/30 ring-1 ring-indigo-200' : ''}`}
                >
                  <div
                    className="flex flex-col md:flex-row items-center py-16 gap-12 px-8 "
                    style={{
                      flexDirection: section.props.rowDirection === 'reverse'
                        ? (viewMode === 'tablet' || viewMode === 'mobile' ? 'column-reverse' : 'row-reverse')
                        : (viewMode === 'tablet' || viewMode === 'mobile' ? 'column-reverse' : 'row')
                    }}
                  >
                    <div className="w-full  md:w-1/2  flex flex-col items-center text-center"
                      style={{ width: viewMode === 'desktop' ? '50%' : '100%', wordBreak: 'break-all' }}

                    >
                      <Editable
                        id={section.id}
                        field="heading"
                        tag="h2"
                        className="font-bold tracking-widest uppercase mb-6"
                        style={{ fontSize: `${section.props.headingFontSize || 18}px`, color: section.props.headingColor || '#111' }}
                      />
                      <Editable
                        id={section.id}
                        field="content"
                        tag="p"
                        className="leading-relaxed text-justify whitespace-pre-line"
                        style={{ fontSize: `${section.props.fontSize || 14}px`, color: section.props.color || '#4b5563' }}
                      />
                    </div>
                    <div className="w-full md:w-1/2  flex justify-center"
                      style={{ width: viewMode === 'desktop' ? '50%' : '100%' }}
                    >
                      <img
                        src={section.props.src}
                        onClick={(e) => { e.stopPropagation(); setSelectedId(section.id); }}
                        className={`shadow-md transition-all cursor-pointer ${selectedId === section.id ? 'ring-4 ring-indigo-500' : ''}`}
                        style={{
                          width: section.props.imageWidth || "100%",
                          borderRadius: `${section.props.borderRadius || 0}px`,
                          objectFit: 'cover'
                        }}
                      />
                    </div>
                  </div>
                </section>
              ))}

              {!isModel && (
                  <button
                  onClick={(e) => { e.stopPropagation(); handleAddSection(); }}
                  className="my-10 cursor-pointer mx-auto flex items-center gap-2 px-6 py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-400 hover:border-indigo-400 hover:text-indigo-500 transition-all"
                >
                  <Plus size={20} /> Add New Section
                </button>
              )}
              
            </div>
          </div>
    );


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
      {/* SETTINGS SIDEBAR */}
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
              {/* Active Badge & Delete */}
              <div className="flex justify-between items-center bg-indigo-50 p-1 rounded-xl">

                <div className="flex items-center space-x-2 bg-indigo-50  rounded-xl" >
                  <span className="text-xs font-bold text-indigo-700 uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-2 ">
                    Editing: {activeComp.type}
                  </span>
                </div>


                {activeComp.id !== 'section-about-us' && (
                  <button
                    onClick={() => handleDeleteSection(activeComp.id)}
                    className="p-1.5 bg-white text-red-500 rounded-lg shadow-sm hover:text-red-700 transition-colors"
                    style={{ color: "#ff4d4f", cursor: "pointer", marginRight: "10px" }}
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>

              {/* Typography & Heading Group */}
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest block mb-4">Typography</label>
                <div className="space-y-6">
                  {/* Heading Font Size */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Heading Size</span>
                      <span className="text-xs font-bold text-indigo-600">
                        {activeComp.props.headingFontSize || (activeComp.type === 'heading' ? 30 : 18)}px
                      </span>
                    </div>
                    <input
                      type="range" min="14" max="80"
                      value={activeComp.props.headingFontSize || (activeComp.type === 'heading' ? 30 : 18)}
                      onChange={(e) => handleUpdate(activeComp.id, "headingFontSize", parseInt(e.target.value))}
                      className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      style={{ accentColor: "#615fff" }}
                    />
                  </div>

                  {/* Heading Color */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Heading Color</span>
                    </div>
                    <div className="flex flex-col gap-1.5 w-full">
                      <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-lg border border-gray-100">
                        <input
                          type="color"
                          value={activeComp.props.headingColor || "#000000"}
                          onChange={(e) => handleUpdate(selectedId, "headingColor", e.target.value)}
                          className="w-8 h-8 rounded-md cursor-pointer border-none"
                        />
                        <input
                          type="text"
                          value={activeComp.props.headingColor || ""}
                          onChange={(e) => handleUpdate(selectedId, "headingColor", e.target.value)}
                          className="bg-transparent border-none text-xs font-mono w-full outline-none uppercase"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Body Font Size (Only for content sections) */}
                  {activeComp.type !== 'heading' && (
                    <div className="pt-4 border-t border-gray-50">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Body Font Size</span>
                        <span className="text-xs font-bold text-indigo-600">{activeComp.props.fontSize || 14}px</span>
                      </div>
                      <input
                        type="range" min="10" max="24"
                        value={activeComp.props.fontSize || 14}
                        onChange={(e) => handleUpdate(activeComp.id, "fontSize", parseInt(e.target.value))}
                        className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        style={{ accentColor: "#615fff" }}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Layout & Media Group (Only for content sections) */}
              {activeComp.type !== 'heading' && (
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                  <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest block mb-4">Layout & Media</label>
                  <div className="space-y-6">
                    {/* Image Direction */}
                    <div>
                      <span className="text-sm font-medium text-gray-700 block mb-2">Image Position</span>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => handleUpdate(activeComp.id, "rowDirection", "row")}
                          className={`p-2 text-xs font-semibold rounded-lg border transition-all ${activeComp.props.rowDirection !== "reverse" ? "bg-indigo-600 text-white shadow-md shadow-indigo-100 border-indigo-600" : "bg-white text-gray-500 border-gray-100 hover:bg-gray-50"}`}
                        >
                          Right
                        </button>
                        <button
                          onClick={() => handleUpdate(activeComp.id, "rowDirection", "reverse")}
                          className={`p-2 text-xs font-semibold rounded-lg border transition-all ${activeComp.props.rowDirection === "reverse" ? "bg-indigo-600 text-white shadow-md shadow-indigo-100 border-indigo-600" : "bg-white text-gray-500 border-gray-100 hover:bg-gray-50"}`}
                        >
                          Left
                        </button>
                      </div>
                    </div>

                    {/* Image URL */}
                    <div>
                      <span className="text-sm font-medium text-gray-700 block mb-2">Image URL</span>
                      <input
                        type="text"
                        value={activeComp.props.src || ""}
                        onChange={(e) => handleUpdate(activeComp.id, "src", e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs font-mono outline-none focus:border-indigo-500"
                        placeholder="https://..."
                      />
                    </div>

                    {/* Corner Radius */}
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Corner Radius</span>
                        <span className="text-xs font-bold text-indigo-600">{activeComp.props.borderRadius || 0}px</span>
                      </div>
                      <input
                        type="range" min="0" max="100"
                        value={activeComp.props.borderRadius || 0}
                        onChange={(e) => handleUpdate(activeComp.id, "borderRadius", parseInt(e.target.value))}
                        className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        style={{ accentColor: "#615fff" }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center px-4">
              <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">No Block Selected</h3>
              <p className="text-sm text-gray-400 max-w-[180px]">Click any text or image to start customizing.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default About3;