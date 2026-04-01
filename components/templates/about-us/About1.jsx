// import React from 'react';

// const About1 = ({ data }) => {
//   // Helper to find component data by ID


//   console.log("TCL: data", data)
//   // const getComp = (id) => data?.find((item) => item.id === id)?.props || {};
//   const getComp = (id) =>
//     data?.components?.find((item) => item.id === id)?.props || {};



//   const imageData = getComp("image-1");
//   const mainHeading = getComp("heading-1");
//   const dnaHeading = getComp("heading-2");
//   const dnaText = getComp("text-1");
//   const valuesHeading = getComp("heading-3");
//   const valuesText = getComp("text-2");
//   const listData = getComp("list-1");



//   return (
//     <div className="min-h-screen font-serif p-8 md:p-16">
//       <div className="max-w-4xl mx-auto">

//         {/* Header Section */}
//         <header className="mb-8">
//           <h1 
//             className="text-3xl font-bold uppercase tracking-wider mb-6 text-black"
//             style={{ color: mainHeading.color || '#000', textAlign: mainHeading.textAlign }}
//           >
//             {mainHeading.content || "About Us"}
//           </h1>
//           <div className="w-full overflow-hidden shadow-xl" style={{ borderRadius: imageData.borderRadius,width: imageData.width }}>
//             <img 
//               src={imageData.src  || "https://smallseotool.in/placeholder/600x500/d5d5d5/584959"} 
//               alt={imageData.alt} 
//               className="w-full h-auto object-cover"
//               style={{ width:"100%" }}
//             />
//           </div>
//         </header>

//         {/* Our DNA Section */}
//         <section className="mb-12">
//           <h2 
//             className="text-2xl font-bold uppercase tracking-wide mb-2"
//             style={{ color: dnaHeading.color || '#000' }}
//           >
//             {dnaHeading.content}
//           </h2>
//           <p 
//             className="text-sm italic leading-relaxed opacity-90"
//             style={{ color: dnaText.color || '#000', lineHeight: dnaText.lineHeight }}
//           >
//             {dnaText.content}
//           </p>
//         </section>

//         {/* PXPL Values Section */}
//         <section className="mb-12">
//           <h2 
//             className="text-2xl font-bold uppercase tracking-wide mb-2"
//             style={{ color: valuesHeading.color || '#000' }}
//           >
//             {valuesHeading.content}
//           </h2>
//           <p 
//             className="text-sm italic mb-8 opacity-90"
//             style={{ color: valuesText.color || '#000' }}
//           >
//             {valuesText.content}
//           </p>

//           <div className="space-y-6">
//             {listData.items?.map((item, index) => (
//               <div key={index} className="border-t border-black/40 pt-4">
//                 <h3 className="text-lg font-bold mb-1 text-black">
//                     {item.title}.
//                 </h3>
//                 <p 
//                   className="text-xs italic leading-snug opacity-80 text-black"
//                   style={{ fontSize: listData.fontSize }}
//                 >
//                   {item.content}
//                 </p>
//               </div>
//             ))}
//             <div className="border-t border-black/40"></div>
//           </div>
//         </section>

//       </div>
//     </div>
//   );
// };

// export default About1;




















// import React, { useState } from 'react';

// const About1 = ({ data: initialData }) => {
//   // 1. Maintain local state for the template data
//   const [data, setData] = useState(initialData);

//   // Helper to find component data by ID from our local state
//   const getComp = (id) => data?.components?.find((item) => item.id === id)?.props || {};

//   // 2. This function updates the local state immediately
//   const handleUpdate = (id, field, value) => {
//     setData((prev) => ({
//       ...prev,
//       components: prev.components.map((comp) =>
//         comp.id === id 
//           ? { ...comp, props: { ...comp.props, [field]: value } } 
//           : comp
//       ),
//     }));
//   };

//   // Helper component for inline editing
//   const Editable = ({ id, content, className, style, field = "content", tag: Tag = "div" }) => (
//     <Tag
//       className={`${className} outline-none focus:ring-2 focus:ring-indigo-300 rounded px-1 transition-all`}
//       style={style}
//       contentEditable
//       suppressContentEditableWarning={true}
//       // Updates state as soon as user clicks away
//       onBlur={(e) => handleUpdate(id, field, e.target.innerText)}
//       onKeyDown={(e) => {
//         if (e.key === 'Enter' && Tag !== 'p') {
//           e.preventDefault();
//           e.target.blur();
//         }
//       }}
//     >
//       {content}
//     </Tag>
//   );

//   const imageData = getComp("image-1");
//   const mainHeading = getComp("heading-1");
//   const dnaHeading = getComp("heading-2");
//   const dnaText = getComp("text-1");
//   const valuesHeading = getComp("heading-3");
//   const valuesText = getComp("text-2");
//   const listData = getComp("list-1");

//   // 3. handleSave now sends the updated 'data' state
//   const handleSave = async () => {
//     try {
//       const response = await fetch('/api/save-template', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(data), 
//       });

//       if (response.ok) {
//         alert(`Saved changes to ${data.templateId}.json successfully!`);
//       } else {
//         const errorData = await response.json();
//         alert("Error: " + errorData.error);
//       }
//     } catch (error) {
//       console.error("Connection Error:", error);
//       alert("Failed to connect to the API. Make sure your Next.js server is running.");
//     }
//   };

//   return (
//     <div className="min-h-screen font-serif p-8 md:p-16 bg-white relative">
//       {/* Floating Save Button */}
//       <button 
//         onClick={handleSave}
//         className="fixed top-5 right-5 bg-indigo-600 text-white px-6 py-2 rounded-full shadow-lg hover:bg-indigo-700 transition-all font-sans font-bold z-50 hover:scale-105 active:scale-95"
//       >
//        Publish
//       </button>

//       <div className="max-w-4xl mx-auto">
//         <header className="mb-8">
//           <Editable 
//             tag="h1"
//             id="heading-1"
//             content={mainHeading.content}
//             className="text-3xl font-bold uppercase tracking-wider mb-6 text-black"
//             style={{ color: mainHeading.color, textAlign: mainHeading.textAlign }}
//           />

//           <div className="w-full overflow-hidden shadow-xl" style={{ borderRadius: imageData.borderRadius, width: imageData.width }}>
//             <img 
//               src={imageData.src || "https://smallseotool.in/placeholder/600x500/d5d5d5/584959"} 
//               alt={imageData.alt} 
//               className="w-full h-auto object-cover"
//             />
//           </div>
//         </header>

//         <section className="mb-12">
//           <Editable 
//             tag="h2"
//             id="heading-2"
//             content={dnaHeading.content}
//             className="text-2xl font-bold uppercase tracking-wide mb-2"
//             style={{ color: dnaHeading.color }}
//           />
//           <Editable 
//             tag="p"
//             id="text-1"
//             content={dnaText.content}
//             className="text-sm italic leading-relaxed opacity-90"
//             style={{ color: dnaText.color, lineHeight: dnaText.lineHeight }}
//           />
//         </section>

//         <section className="mb-12">
//           <Editable 
//             tag="h2"
//             id="heading-3"
//             content={valuesHeading.content}
//             className="text-2xl font-bold uppercase tracking-wide mb-2"
//             style={{ color: valuesHeading.color }}
//           />
//           <Editable 
//             tag="p"
//             id="text-2"
//             content={valuesText.content}
//             className="text-sm italic mb-8 opacity-90"
//             style={{ color: valuesText.color }}
//           />

//           <div className="space-y-6">
//             {listData.items?.map((item, index) => (
//               <div key={index} className="border-t border-black/40 pt-4">
//                 <h3 
//                   className="text-lg font-bold mb-1 text-black outline-none focus:ring-2 focus:ring-indigo-300"
//                   contentEditable
//                   suppressContentEditableWarning={true}
//                   onBlur={(e) => {
//                     const newItems = [...listData.items];
//                     newItems[index].title = e.target.innerText;
//                     handleUpdate("list-1", "items", newItems);
//                   }}
//                 >
//                   {item.title}
//                 </h3>
//                 <p 
//                   className="text-xs italic leading-snug opacity-80 text-black outline-none focus:ring-2 focus:ring-indigo-300"
//                   style={{ fontSize: listData.fontSize }}
//                   contentEditable
//                   suppressContentEditableWarning={true}
//                   onBlur={(e) => {
//                     const newItems = [...listData.items];
//                     newItems[index].content = e.target.innerText;
//                     handleUpdate("list-1", "items", newItems);
//                   }}
//                 >
//                   {item.content}
//                 </p>
//               </div>
//             ))}
//             <div className="border-t border-black/40"></div>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default About1;












// import React, { useState, useEffect } from 'react';

// const About1 = ({ data: initialData }) => {
//   const [data, setData] = useState(initialData);
//   const [isHovered, setIsHovered] = useState(false);

//   // Sync state if initialData changes (e.g., during parent reload)
//   useEffect(() => {
//     setData(initialData);
//   }, [initialData]);

//   const getComp = (id) => data?.components?.find((item) => item.id === id)?.props || {};

//   const handleUpdate = (id, field, value) => {
//     setData((prev) => ({
//       ...prev,
//       components: prev.components.map((comp) =>
//         comp.id === id 
//           ? { ...comp, props: { ...comp.props, [field]: value } } 
//           : comp
//       ),
//     }));
//   };

//   const Editable = ({ id, content, className, style, field = "content", tag: Tag = "div" }) => (
//     <Tag
//       className={`${className} outline-none focus:ring-2 focus:ring-indigo-300 rounded px-1 transition-all`}
//       style={style}
//       contentEditable
//       suppressContentEditableWarning={true}
//       onBlur={(e) => handleUpdate(id, field, e.target.innerText)}
//       onKeyDown={(e) => {
//         if (e.key === 'Enter' && Tag !== 'p') {
//           e.preventDefault();
//           e.target.blur();
//         }
//       }}
//     >
//       {content}
//     </Tag>
//   );

//   const imageData = getComp("image-1");
//   const mainHeading = getComp("heading-1");
//   const dnaHeading = getComp("heading-2");
//   const dnaText = getComp("text-1");
//   const valuesHeading = getComp("heading-3");
//   const valuesText = getComp("text-2");
//   const listData = getComp("list-1");

//   const handleSave = async () => {
//     try {
//       const response = await fetch('/api/save-template', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(data), 
//       });

//       if (response.ok) {
//         alert(`Saved changes to ${data.templateId}.json successfully!`);
//       } else {
//         const errorData = await response.json();
//         alert("Error: " + errorData.error);
//       }
//     } catch (error) {
//       console.error("Connection Error:", error);
//       alert("Failed to connect to the API.");
//     }
//   };

//   return (
//     <div className="min-h-screen font-serif p-8 md:p-16 bg-white relative">
//       <button 
//         onClick={handleSave}
//         className="fixed top-5 right-5 bg-indigo-600 text-white px-6 py-2 rounded-full shadow-lg hover:bg-indigo-700 transition-all font-sans font-bold z-50 hover:scale-105 active:scale-95"
//       >
//        Publish
//       </button>

//       <div className="max-w-4xl mx-auto">
//         <header className="mb-8">
//           <Editable 
//             tag="h1" id="heading-1" content={mainHeading.content}
//             className="text-3xl font-bold uppercase tracking-wider mb-6 text-black"
//             style={{ color: mainHeading.color, textAlign: mainHeading.textAlign }}
//           />

//           {/* IMAGE SECTION WITH HOVER EDIT */}
//           <div 
//             className="relative group w-full overflow-hidden shadow-xl" 
//             style={{ borderRadius: imageData.borderRadius, width: imageData.width }}
//             onMouseEnter={() => setIsHovered(true)}
//             onMouseLeave={() => setIsHovered(false)}
//           >
//             <img 
//               src={imageData.src || "https://smallseotool.in/placeholder/600x500/d5d5d5/584959"} 
//               alt={imageData.alt} 
//               className="w-full h-auto object-cover transition-filter duration-300 group-hover:brightness-50"
//             />

//             {/* Hover UI Overlay */}
//             {isHovered && (
//               <div className="absolute inset-0 flex flex-col items-center justify-center p-4 transition-opacity duration-300 " style={{backgroundColor: "rgba(0, 0, 0, 0.5)"}}>
//                 <p className="text-white text-xs font-sans font-bold mb-2 uppercase tracking-widest">Update Image URL</p>
//                 <input 
//                   type="text"
//                   className="w-full max-w-xs px-3 py-2 text-xs rounded border-none outline-none ring-2 ring-indigo-500 shadow-2xl font-sans bg-white"
//                   placeholder="Paste image URL here..."
//                   defaultValue={imageData.src}
//                   onBlur={(e) => handleUpdate("image-1", "src", e.target.value)}
//                   onKeyDown={(e) => {
//                     if (e.key === 'Enter') e.target.blur();
//                   }}
//                 />
//               </div>
//             )}
//           </div>
//         </header>

//         {/* ... (rest of the sections remain the same) */}
//         <section className="mb-12">
//           <Editable 
//             tag="h2" id="heading-2" content={dnaHeading.content}
//             className="text-2xl font-bold uppercase tracking-wide mb-2"
//             style={{ color: dnaHeading.color }}
//           />
//           <Editable 
//             tag="p" id="text-1" content={dnaText.content}
//             className="text-sm italic leading-relaxed opacity-90"
//             style={{ color: dnaText.color, lineHeight: dnaText.lineHeight }}
//           />
//         </section>

//         <section className="mb-12">
//           <Editable 
//             tag="h2" id="heading-3" content={valuesHeading.content}
//             className="text-2xl font-bold uppercase tracking-wide mb-2"
//             style={{ color: valuesHeading.color }}
//           />
//           <Editable 
//             tag="p" id="text-2" content={valuesText.content}
//             className="text-sm italic mb-8 opacity-90"
//             style={{ color: valuesText.color }}
//           />

//           <div className="space-y-6">
//             {listData.items?.map((item, index) => (
//               <div key={index} className="border-t border-black/40 pt-4">
//                 <h3 
//                   className="text-lg font-bold mb-1 text-black outline-none focus:ring-2 focus:ring-indigo-300"
//                   contentEditable suppressContentEditableWarning={true}
//                   onBlur={(e) => {
//                     const newItems = [...listData.items];
//                     newItems[index].title = e.target.innerText;
//                     handleUpdate("list-1", "items", newItems);
//                   }}
//                 >
//                   {item.title}
//                 </h3>
//                 <p 
//                   className="text-xs italic leading-snug opacity-80 text-black outline-none focus:ring-2 focus:ring-indigo-300"
//                   style={{ fontSize: listData.fontSize }}
//                   contentEditable suppressContentEditableWarning={true}
//                   onBlur={(e) => {
//                     const newItems = [...listData.items];
//                     newItems[index].content = e.target.innerText;
//                     handleUpdate("list-1", "items", newItems);
//                   }}
//                 >
//                   {item.content}
//                 </p>
//               </div>
//             ))}
//             <div className="border-t border-black/40"></div>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default About1;




































// import React, { useState, useEffect } from 'react';

// const About1 = ({ data: initialData }) => {
//   const [data, setData] = useState(initialData);
//   const [selectedId, setSelectedId] = useState(null); // Tracks which element is being edited

//   useEffect(() => {
//     setData(initialData);
//   }, [initialData]);

//   const getComp = (id) => data?.components?.find((item) => item.id === id) || { props: {} };

//   // Update logic for any property (content or style)
//   const handleUpdate = (id, field, value) => {
//     setData((prev) => ({
//       ...prev,
//       components: prev.components.map((comp) =>
//         comp.id === id 
//           ? { ...comp, props: { ...comp.props, [field]: value } } 
//           : comp
//       ),
//     }));
//   };

//   // Helper for text elements
//   const Editable = ({ id, className, tag: Tag = "div" }) => {
//     const comp = getComp(id);
//     const isSelected = selectedId === id;

//     return (
//       <Tag
//         className={`${className} cursor-pointer rounded transition-all ${
//           isSelected ? "ring-2 ring-indigo-500 ring-offset-2" : "hover:bg-gray-50"
//         }`}
//         style={comp.props}
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

//   return (
//     <div className="flex min-h-screen bg-gray-100 font-sans" onClick={() => setSelectedId(null)}>
//       {/* LEFT: MAIN EDITOR CANVAS */}
//       <div className="flex-1 p-8 md:p-16 overflow-y-auto" >
//         <div className="   bg-white shadow-2xl p-12 min-h-full relative font-serif text-black rounded-xl " style={{width:"80%",padding:"20px",borderRadius:"0.75rem"}}>

//           <header className="mb-8">
//             <Editable id="heading-1" className="text-3xl font-bold uppercase tracking-wider mb-6" tag="h1" />

//             <div 
//               className={`relative group overflow-hidden shadow-xl cursor-pointer transition-all ${selectedId === 'image-1' ? 'ring-4 ring-indigo-500' : ''}`}
//               style={{ borderRadius: getComp("image-1").props.borderRadius, width: getComp("image-1").props.width }}
//               onClick={(e) => { e.stopPropagation(); setSelectedId("image-1"); }}
//             >
//               <img 
//                 src={getComp("image-1").props.src || "https://via.placeholder.com/600x400"} 
//                 className="w-full h-auto object-cover" 
//                 alt="header"
//               />
//             </div>
//           </header>

//           <section className="mb-12">
//             <Editable id="heading-2" tag="h2" className="text-2xl font-bold uppercase tracking-wide mb-2" />
//             <Editable id="text-1" tag="p" className="text-sm italic leading-relaxed opacity-90" />
//           </section>

//           <section className="mb-12">
//             <Editable id="heading-3" tag="h2" className="text-2xl font-bold uppercase tracking-wide mb-2" />
//             <Editable id="text-2" tag="p" className="text-sm italic mb-8 opacity-90" />

//             <div className="space-y-6">
//               {getComp("list-1").props.items?.map((item, index) => (
//                 <div key={index} className="border-t border-black/40 pt-4 cursor-pointer" onClick={(e) => {e.stopPropagation(); setSelectedId("list-1")}}>
//                   <h3 className="text-lg font-bold mb-1">{item.title}</h3>
//                   <p className="text-xs italic opacity-80" style={{fontSize: getComp("list-1").props.fontSize}}>{item.content}</p>
//                 </div>
//               ))}
//             </div>
//           </section>
//         </div>
//       </div>

//       {/* RIGHT: SETTINGS SIDEBAR */}
//       <div 
//         className="w-80 bg-white border-l border-gray-200 shadow-xl p-6 fixed  top-0 h-screen overflow-y-auto z-[60] right-0"
//         style={{right:"0px"}}
//         onClick={(e) => e.stopPropagation()}
//       >
//         <div className="flex justify-between items-center mb-8">
//           <h2 className="text-lg font-bold text-gray-800">Settings</h2>
//           <button onClick={handleSave} className="bg-indigo-600 text-white px-4 py-1.5 rounded-md text-sm font-bold hover:bg-indigo-700 transition-all">
//             Save File
//           </button>
//         </div>

//         {activeComp ? (
//           <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-200">
//             <div className="pb-4 border-b border-gray-100">
//               <p className="text-xs font-bold text-indigo-500 uppercase">Editing</p>
//               <h3 className="text-sm font-medium text-gray-500">{activeComp.id}</h3>
//             </div>

//             {/* COLOR PICKER (For Text/Headings) */}
//             {activeComp.props.color !== undefined && (
//               <div>
//                 <label className="block text-xs font-bold text-gray-700 mb-2 uppercase">Text Color</label>
//                 <input 
//                   type="color" 
//                   value={activeComp.props.color} 
//                   onChange={(e) => handleUpdate(activeComp.id, "color", e.target.value)}
//                   className="w-full h-10 rounded cursor-pointer border-none"
//                 />
//               </div>
//             )}

//             {/* FONT SIZE (For List/Texts) */}
//             {(activeComp.props.fontSize !== undefined || activeComp.props.lineHeight !== undefined) && (
//               <div>
//                 <label className="block text-xs font-bold text-gray-700 mb-2 uppercase">Size & Spacing</label>
//                 <input 
//                   type="text" 
//                   placeholder="e.g. 14px or 1.5"
//                   value={activeComp.props.fontSize || activeComp.props.lineHeight || ""} 
//                   onChange={(e) => handleUpdate(activeComp.id, activeComp.props.fontSize ? "fontSize" : "lineHeight", e.target.value)}
//                   className="w-full p-2 border border-gray-300 rounded text-sm text-black"
//                 />
//               </div>
//             )}

//             {/* IMAGE URL (Specific to Image) */}
//             {activeComp.id === "image-1" && (
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-xs font-bold text-gray-700 mb-2 uppercase">Image Source</label>
//                   <textarea 
//                     rows="3"
//                     className="w-full p-2 border border-gray-300 rounded text-xs text-black"
//                     value={activeComp.props.src}
//                     onChange={(e) => handleUpdate(activeComp.id, "src", e.target.value)}
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-xs font-bold text-gray-700 mb-2 uppercase">Border Radius</label>
//                   <input 
//                     type="range" min="0" max="50"
//                     value={parseInt(activeComp.props.borderRadius) || 0}
//                     onChange={(e) => handleUpdate(activeComp.id, "borderRadius", `${e.target.value}px`)}
//                     className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
//                   />
//                 </div>
//               </div>
//             )}

//             <p className="text-[10px] text-gray-400 italic mt-10">Changes are reflected in real-time. Don't forget to save!</p>
//           </div>
//         ) : (
//           <div className="h-64 flex flex-col items-center justify-center text-center">
//             <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
//               <span className="text-gray-400">🖱️</span>
//             </div>
//             <p className="text-gray-400 text-sm">Click an element on the canvas to edit its styles.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default About1;











import React, { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import { MousePointer2 } from "lucide-react";
import { X } from "lucide-react";
import DeviceMockup from '../../layout/DeviceMockup'; 
import Swal from 'sweetalert2';
import { Image as ImageIcon, Type, Plus, Settings2, Layout, Sliders, Trash, Maximize } from 'lucide-react';
import templatesData from '@/data/templates.json';


const About1 = ({ data: initialData }) => {
  const [data, setData] = useState(initialData);
  const [selectedId, setSelectedId] = useState(null);
  const [viewMode, setViewMode] = useState('desktop');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  const getComp = (id) => data?.components?.find((item) => item.id === id) || { props: {} };

  const handleUpdate = (id, field, value) => {
    setData((prev) => ({
      ...prev,
      components: prev.components.map((comp) =>
        comp.id === id
          ? { ...comp, props: { ...comp.props, [field]: value } }
          : comp
      ),
    }));
  };

  const Editable = ({ id, className, tag: Tag = "div" }) => {
    const comp = getComp(id);
    const isSelected = selectedId === id;

    return (
      <Tag
        className={`${className} outline-none focus:ring-2 focus:ring-indigo-300 rounded px-1 transition-all`}
        style={comp.props} // Applies color, textAlign, etc.
        contentEditable
        suppressContentEditableWarning={true}
        suppressHydrationWarning={true}
        onClick={(e) => {
          e.stopPropagation();
          setSelectedId(id);
        }}
        onBlur={(e) => handleUpdate(id, "content", e.target.innerText)}
      >
        {comp.props.content}
      </Tag>
    );
  };

  const activeComp = selectedId ? getComp(selectedId) : null;



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

  // const handleSave = async () => {
  //   try {

  //     Toast.fire({
  //       icon: 'info',
  //       title: 'Saving template...',
  //       timer: 0,
  //     });

  //     const response = await fetch('/api/save-template', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(data),
  //     });

  //     if (response.ok) {

  //       Toast.fire({
  //         icon: 'success',
  //         title: 'Saved successfully',
  //         background: '#ffffff',
  //         iconColor: '#10b981',
  //       });
  //     } else {
  //       throw new Error();
  //     }
  //   } catch (error) {

  //     Toast.fire({
  //       icon: 'error',
  //       title: 'Save failed',
  //       background: '#fff1f2',
  //       iconColor: '#f43f5e',
  //     });
  //   }
  // };


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
  const renderCanvasContent = () => (
    <div className="">
      <div className="bg-white shadow-2xl p-12   font-serif text-black rounded-xl" style={{ minHeight: "100%", padding: "20px" }}>

        <header className="mb-8" style={{ wordBreak: "break-all" }}>
          <Editable id="heading-1" className="text-3xl font-bold uppercase tracking-wider mb-6" tag="h1" />
          <div
            className={`relative group overflow-hidden shadow-xl cursor-pointer transition-all ${selectedId === 'image-1' ? 'ring-4 ring-indigo-500' : ''}`}
            style={{ borderRadius: getComp("image-1").props.borderRadius, }}
            onClick={(e) => { e.stopPropagation(); setSelectedId("image-1"); }}
          >
            <img src={getComp("image-1").props.src || "https://via.placeholder.com/600x400"} className="w-full h-auto object-cover" alt="header" />
          </div>
        </header>

        <section className="mb-12">
          <Editable id="heading-2" tag="h2" className="text-2xl font-bold uppercase tracking-wide mb-2" />
          <Editable id="text-1" tag="p" className="text-sm italic leading-relaxed opacity-90" />
        </section>

        <section className="mb-12">
          <Editable id="heading-3" tag="h2" className="text-2xl font-bold uppercase tracking-wide mb-2" />
          <Editable id="text-2" tag="p" className="text-sm italic mb-8 opacity-90" />

          {/* LIST SECTION - STYLES NOW APPLY CORRECTLY */}
          <div className="space-y-6">
            {getComp("list-1").props.items?.map((item, index) => (
              <div
                key={index}
                className={`border-t border-black/40 pt-4 cursor-pointer transition-all ${selectedId === 'list-1' ? 'focus:ring-2  ring-indigo-300 ring-1   rounded-sm' : ''}`}
                onClick={(e) => { e.stopPropagation(); setSelectedId("list-1"); }}

                style={{ color: getComp("list-1").props.color }}
              >
                <h3
                  className="text-lg font-bold mb-1 outline-none"
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => {
                    const newItems = [...getComp("list-1").props.items];
                    newItems[index].title = e.target.innerText;
                    handleUpdate("list-1", "items", newItems);
                  }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-xs italic opacity-80 outline-none"

                  style={{
                    fontSize: getComp("list-1").props.fontSize,
                    color: getComp("list-1").props.color
                  }}
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => {
                    const newItems = [...getComp("list-1").props.items];
                    newItems[index].content = e.target.innerText;
                    handleUpdate("list-1", "items", newItems);
                  }}
                >
                  {item.content}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>

  );

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans" style={{ width: "81.5%" }} onClick={() => setSelectedId(null)}>
      <button
        onClick={() => setIsPreviewOpen(true)}
        style={{fontSize:"13px",backgroundColor: "#615fff"}}
        className="fixed top-3 right-80 z-50  cursor-pointer    text-white px-6 py-2  shadow-2xl  rounded-lg transition-all flex items-center gap-2 font-bold"
      >
        <MousePointer2 size={13} /> Preview 
      </button>

      {/* LEFT: MAIN EDITOR CANVAS */}
      <DeviceMockup activeDevice={viewMode} onChange={setViewMode} style={{ padding: "12px" }} >
        {renderCanvasContent()}
      </DeviceMockup>



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
            <div className="bg-white shadow-2xl p-12 font-serif text-black rounded-xl pointer-events-none">
              {/* We use pointer-events-none so they can't edit while previewing */}
              {renderCanvasContent()}
            </div>
          </div>
        </div>
      )}

      {/* RIGHT: SETTINGS SIDEBAR */}
      <div
        className="w-80  bg-white border-l border-gray-200 shadow-2xl fixed top-0 right-0 h-screen overflow-y-auto z-[60] flex flex-col"
        style={{ width: "16%", right: "0px" }} // Slightly wider for better legibility
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
            <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-8">

              {/* Breadcrumb style Badge */}
              <div className="flex items-center space-x-2 bg-indigo-50   border-indigo-100 p-1 rounded-xl" style={{ marginBottom: "10px" }}>

                <span className="text-xs font-bold text-indigo-700 uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-2 "  >
                  Editing: {activeComp.id}
                </span>
              </div>

              {/* Content Section */}
              <div className="space-y-6">

                {/* COLORS GROUP */}
                {activeComp.props.color !== undefined && (
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest block mb-3">Appearance</label>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">Text Color</span>
                          <span className="text-xs font-mono text-gray-400 uppercase">{activeComp.props.color}</span>
                        </div>
                        <div className="flex flex-col gap-1.5 w-full">
                          {/* Professional Small Label */}


                          <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg p-1 gap-2 focus-within:border-[#615fff] focus-within:ring-1 focus-within:ring-[#615fff]/20 transition-all shadow-sm">
                            {/* Premium Color Swatch */}
                            <div className="relative w-8 h-8 shrink-0 rounded-md overflow-hidden border border-gray-200 shadow-inner">
                              <input
                                type="color"
                                value={activeComp.props.color || "#000000"}
                                onChange={(e) => handleUpdate(activeComp.id, "color", e.target.value)}
                                className="absolute inset-0 w-full h-full cursor-pointer scale-[2.5] bg-transparent"
                                style={{ border: 'none', appearance: 'none' }}
                              />
                            </div>

                            {/* Hex Code Text Input */}
                            <input
                              type="text"
                              maxLength={7}
                              placeholder="#000000"
                              value={activeComp.props.color || ""}
                              onChange={(e) => handleUpdate(activeComp.id, "color", e.target.value)}
                              className="bg-transparent border-none text-[11px] font-mono w-full outline-none uppercase text-gray-700 placeholder:text-gray-300"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* TYPOGRAPHY GROUP */}
                {(activeComp.id === "list-1" || activeComp.props.fontSize) && (
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest block mb-3">Typography</label>
                    <div>
                      <div className="flex justify-between mb-3">
                        <span className="text-sm font-medium text-gray-700">Font Size</span>
                        <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded text-xs font-bold">{activeComp.props.fontSize || '12px'}</span>
                      </div>
                      <input
                        type="range" min="8" max="60"
                        value={parseInt(activeComp.props.fontSize) || 12}
                        onChange={(e) => handleUpdate(activeComp.id, "fontSize", `${e.target.value}px`)}
                        className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer  "
                        style={{ accentColor: "#615fff" }}
                      />
                    </div>
                  </div>
                )}
                {activeComp.id === "list-1" && (
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mt-6">
                    <div className="flex justify-between items-center mb-4">
                      <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest block">
                        List Items
                      </label>
                      <button
                        onClick={() => {
                          const newItems = [
                            ...activeComp.props.items,
                            { title: "New Feature", content: "Description of your new feature goes here." }
                          ];
                          handleUpdate("list-1", "items", newItems);
                        }}

                        style={{ backgroundColor: "#57915a", padding: "2px 6px", fontSize: "12px", cursor: "pointer" }}
                        className="text-[10px] bg-green-200  text-white px-2 py-1 rounded hover:bg-blue-600 transition-colors flex items-center gap-1"
                      >
                        <span className=' '>+ </span> Add Item
                      </button>
                    </div>

                    <div className="space-y-3">
                      {activeComp.props.items?.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg border border-gray-100">
                          <span className="text-xs font-medium text-gray-600 truncate max-w-[120px]">
                            {item.title || `Item ${idx + 1}`}
                          </span>
                          <button
                            onClick={() => {
                              const newItems = activeComp.props.items.filter((_, i) => i !== idx);
                              handleUpdate("list-1", "items", newItems);
                            }}
                            className="text-red-400 hover:text-red-600 text-xs p-1"
                            title="Delete Item"
                            style={{ cursor: "pointer" }}
                          >
                            <Trash2 size={16} color='#bd2222' strokeWidth={2} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* MEDIA GROUP */}
                {activeComp.id === "image-1" && (
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 space-y-5">
                    <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest block mb-1">Image Settings</label>

                    <div>
                      <span className="text-sm font-medium text-gray-700 block mb-2">Source URL</span>
                      <textarea
                        className="w-full p-3 border border-gray-200 rounded-lg text-xs leading-relaxed   focus:ring-indigo-500 outline-none transition-all bg-gray-50 font-mono"
                        rows="4"
                        onFocus={(e) => {
                          e.target.style.borderColor = "#615fff";
                          e.target.style.ringColor = "#615fff";

                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "#e5e7eb";

                        }}
                        style={{ padding: "7px" }}
                        value={activeComp.props.src}
                        onChange={(e) => handleUpdate("image-1", "src", e.target.value)}
                        placeholder="https://..."
                      />
                    </div>

                    <div>
                     
                    </div>
                  </div>
                )}
              </div>


            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center px-4 animate-in fade-in duration-500">
              <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">No Block Selected</h3>
              <p className="text-sm text-gray-400 max-w-[180px]">
                Click any element on the left to adjust its properties.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default About1;







 