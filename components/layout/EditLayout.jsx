"use client"
import { useState, useEffect } from "react"
import Sidebar from "./Sidebar"
import templatesData from "@/data/templates.json"

import About1 from "@/components/templates/about-us/About1"
import About2 from "@/components/templates/about-us/About2"
import About3 from "@/components/templates/about-us/About3"
import About4 from "@/components/templates/about-us/About4"
import About5 from "@/components/templates/about-us/About5"
 
import Contact1 from "@/components/templates/contact-us/Contact1"
import Contact2 from "@/components/templates/contact-us/Contact2"
import Contact3 from "@/components/templates/contact-us/Contact3"
import Contact4 from "@/components/templates/contact-us/Contact4"
import Contact5 from "@/components/templates/contact-us/Contact5"


import Terms1 from "@/components/templates/terms-condition/Terms1"
import Terms2 from "@/components/templates/terms-condition/Terms2"
import Terms3 from "@/components/templates/terms-condition/Terms3"

import SocialMedia1 from "@/components/templates/social-media/SocialMedia1"
import SocialMedia2 from "@/components/templates/social-media/SocialMedia2"
import SocialMedia3 from "@/components/templates/social-media/SocialMedia3"

import Footer1 from "@/components/templates/footer/Footer1"
import Footer2 from "@/components/templates/footer/Footer2"
import Footer3 from "@/components/templates/footer/Footer3"
import Footer4 from "@/components/templates/footer/Footer4"


import Policy1 from "@/components/templates/privacy-policy/Policy1"
import Policy2 from "@/components/templates/privacy-policy/Policy2"



import { useRouter } from "next/navigation";
import { ArrowLeft } from 'lucide-react';


export default function EditLayout({ tempId }) {

   let categories = "about-us";
   if(tempId.startsWith("Cont"))
      categories = "contact-us";
    else if(tempId.startsWith("Terms"))
      categories = "terms-condition";
    else if(tempId.startsWith("SocialMedia"))
      categories = "social-media";
    else if(tempId.startsWith("Footer"))
      categories = "footer";
    else if(tempId.startsWith("Policy"))
      categories = "privacy-policy";


    const [selected, setSelected] = useState(categories)
    const [currentData, setCurrentData] = useState(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter();

    
    // useEffect(() => {
    //     const loadTemplateData = async () => {
    //         setLoading(true);
    //         try {
    //             // 1. Try to fetch saved data
    //             const response = await fetch(`/api/save-template?tempId=${tempId}`);
                
    //             if (response.ok) {
    //                 const savedData = await response.json();
    //                 setCurrentData(savedData);
    //             } else {
    //                 // 2. CORRECTED FALLBACK LOGIC
    //                 // Find the template inside the nested categories
    //                 let defaultData = null;
                    
    //                 // Iterate through each category (about-us, contact-us, etc.)
    //                 templatesData.forEach(cat => {
    //                     const found = cat.templates.find(t => t.templateId === tempId);
    //                     if (found) defaultData = found;
    //                 });
    
    //                 setCurrentData(defaultData);
    //             }
    //         } catch (error) {
    //             console.error("Error loading data:", error);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };
    
    //     loadTemplateData();
    // }, [tempId]);

    // if (loading) return <div className="p-20 text-center">Loading Template...</div>;
    // if (!currentData) return <div className="p-20 text-center">Template Not Found</div>;

    useEffect(() => {
        const loadTemplateData = async () => {
            if (!tempId) return; // Guard clause
            
            setLoading(true);
            try {
                let categoryName = "";
                let defaultData = null;
    
              
                templatesData.forEach(cat => {
                    const found = cat.templates.find(t => t.templateId === tempId);
                    if (found) {
                        defaultData = found;
                        categoryName = cat.category; 
                    }
                });
    
                if (!categoryName) {
                    setCurrentData(defaultData);
                    return;
                }
    
                const response = await fetch(`/api/save-template?tempId=${tempId}&category=${categoryName}`);
                
                if (response.ok) {
                    const savedData = await response.json();
                    setCurrentData(savedData);
                } else {
                    setCurrentData(defaultData);
                    
                  
                }
            } catch (error) {
                console.error("Error loading data:", error);
            } finally {
                setLoading(false);
            }
        };
    
        loadTemplateData();
    }, [tempId, templatesData]);
 
    return (
        <div className="flex no-scrollbar">
            <Sidebar
                categories={templatesData}
                selected={selected}
                onSelect={setSelected}
                tempId={tempId}
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
                {tempId === "About5" && <About5 data={currentData} />}

                {tempId === "Contact1" && <Contact1 data={currentData} />}
                {tempId === "Contact2" && <Contact2 data={currentData} />}
                {tempId === "Contact3" && <Contact3 data={currentData} />}
                {tempId === "Contact4" && <Contact4 data={currentData} />}
                {tempId === "Contact5" && <Contact5 data={currentData} />}

                {tempId === "Terms1" && <Terms1 data={currentData} />}
                {tempId === "Terms2" && <Terms2 data={currentData} />}
                {tempId === "Terms3" && <Terms3 data={currentData} />}

                {tempId === "SocialMedia1" && <SocialMedia1 data={currentData} />}
                {tempId === "SocialMedia2" && <SocialMedia2 data={currentData} />}
                {tempId === "SocialMedia3" && <SocialMedia3 data={currentData} />}

                {tempId === "Footer1" && <Footer1 data={currentData} />}
                {tempId === "Footer2" && <Footer2 data={currentData} />}
                {tempId === "Footer3" && <Footer3 data={currentData} />}
                {tempId === "Footer4" && <Footer4 data={currentData} />}

                {tempId === "Policy1" && <Policy1 data={currentData} />}
                {tempId === "Policy2" && <Policy2 data={currentData} />}
            </div>
        </div>
    )
}