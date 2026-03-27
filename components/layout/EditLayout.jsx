"use client"
import { useState, useEffect } from "react"
import Sidebar from "./Sidebar"
import templatesData from "@/data/templates.json"
import About1 from "@/components/templates/About1"
import About2 from "@/components/templates/About2"
import About3 from "@/components/templates/About3"
import About4 from "@/components/templates/About4"
import Contact1 from "@/components/templates/Contact1"
import Contact2 from "@/components/templates/Contact2"
import Contact3 from "@/components/templates/Contact3"

import { useRouter } from "next/navigation";
import { ArrowLeft } from 'lucide-react';


export default function EditLayout({ tempId }) {
    const [selected, setSelected] = useState("about-us")
    const [currentData, setCurrentData] = useState(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter();

    // useEffect(() => {
    //     const loadTemplateData = async () => {
    //         setLoading(true);
    //         try {
    //             // 1. Try to fetch saved data from our new API GET method
    //             const response = await fetch(`/api/save-template?tempId=${tempId}`);
                
    //             if (response.ok) {
    //                 const savedData = await response.json();
    //                 setCurrentData(savedData);
    //             } else {
    //                 // 2. Fallback to default templates.json if no saved file found
    //                 const defaultData = templatesData.templates?.find((t) => t.templateId === tempId);
                    
            
    //                 setCurrentData(defaultData);
    //             }
    //         } catch (error) {
    //             console.error("Error loading data:", tempId);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     loadTemplateData();
    // }, [tempId]);

    useEffect(() => {
        const loadTemplateData = async () => {
            setLoading(true);
            try {
                // 1. Try to fetch saved data
                const response = await fetch(`/api/save-template?tempId=${tempId}`);
                
                if (response.ok) {
                    const savedData = await response.json();
                    setCurrentData(savedData);
                } else {
                    // 2. CORRECTED FALLBACK LOGIC
                    // Find the template inside the nested categories
                    let defaultData = null;
                    
                    // Iterate through each category (about-us, contact-us, etc.)
                    templatesData.forEach(cat => {
                        const found = cat.templates.find(t => t.templateId === tempId);
                        if (found) defaultData = found;
                    });
    
                    setCurrentData(defaultData);
                }
            } catch (error) {
                console.error("Error loading data:", error);
            } finally {
                setLoading(false);
            }
        };
    
        loadTemplateData();
    }, [tempId]);

    if (loading) return <div className="p-20 text-center">Loading Template...</div>;
    if (!currentData) return <div className="p-20 text-center">Template Not Found</div>;

    

    return (
        <div className="flex">
            <Sidebar
                categories={templatesData}
                selected={selected}
                onSelect={setSelected}
            />

 
            <div   style={{ backgroundColor: "#fbf9fa", width: "100%" }}>
                <button
                    onClick={() => router.back()}
                    style={{zIndex:"1000",marginTop:"15px",marginLeft:"12px"}}
                    className="group flex items-center gap-2 px-4 py-2 cursor-pointer  text-sm font-medium text-gray-600 transition-all duration-200 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg fixed"
                >
                    <ArrowLeft size={18} className="transition-transform duration-200 group-hover:-translate-x-1" />
                     
                </button>

                {/* Pass the dynamic currentData instead of filtering templatesData every time */}
                {tempId === "About1" && <About1 data={currentData} />}
                {tempId === "About2" && <About2 data={currentData} />}
                {tempId === "About3" && <About3 data={currentData} />}
                {tempId === "About4" && <About4 data={currentData} />}
                {tempId === "Contact1" && <Contact1 data={currentData} />}
                {tempId === "Contact2" && <Contact2 data={currentData} />}
                {tempId === "Contact3" && <Contact3 data={currentData} />}
            </div>
        </div>
    )
}