// export default function Sidebar({
//     categories,
//     selected,
//     onSelect
//   }) {
//     return (
//       <div className="w-64 border-r h-screen p-4">
//         {categories.map((cat,i) => (
//           <div
//             key={i}
//             className={`p-2 cursor-pointer ${
//               selected === cat.category ? "bg-gray-200" : ""
//             }`}
//             onClick={() => onSelect(cat.category)}
//           >
//             {cat.category}
//           </div>
//         ))}
//       </div>
//     )
//   }










// import { Users } from 'lucide-react';

// export default function Sidebar({ categories, selected, onSelect }) {
//     return (
//       <div className="w-64 h-screen bg-white  flex flex-col justify-between p-4" style={{boxShadow: "rgba(47, 43, 61, 0.12) 0px 0.125rem 0.5rem 0px",position: "sticky",top: 0}}>

//         {/* Top Logo */}
//         <div>
//           <div className="mb-6 flex items-center gap-2">
//             <div className="w-6 h-6 bg-indigo-500 rounded-full"></div>
//             <span className="font-semibold text-lg">Logo</span>
//           </div>

//           {/* Menu */}
//           <div className="space-y-2">
//             {categories.map((cat, i) => (
//               <div
//                 key={i}
//                 onClick={() => onSelect(cat.category)}
//                 className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition
//                   ${
//                     selected === cat.category
//                       ? "bg-indigo-50 text-indigo-600 font-medium"
//                       : "text-gray-600 hover:bg-gray-100"
//                   }`}
//               >
//                 <span className="flex items-center gap-2">
//                   {/* Icon Placeholder */}
//                   <span className="w-5 h-5   rounded">
//                   <Users size={17} color="#615fff" strokeWidth={2} />
//                   </span>
//                   {cat.category}
//                 </span>

//                 {/* Badge (static style only) */}
//                 <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">
//                   {cat.templates.length}
//                 </span>
//               </div>
//             ))}
//           </div>


//         </div>

//         {/* Bottom Profile */}
//         <div className="flex items-center gap-3 border-t pt-4">
//           <img
//             src="https://i.pravatar.cc/40"
//             alt="user"
//             className="w-8 h-8 rounded-full"
//           />
//           <span className="text-sm font-medium text-gray-700">
//             Tom Cook
//           </span>
//         </div>
//       </div>
//     );
//   }








import { FileText } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'

export default function Sidebar({ categories, selected, onSelect }) {
  const router = useRouter();
  
const HandleNavigate = (cat) => {
  onSelect(cat.category);
  console.log("amish",cat.category)
  console.log("amish selected",selected)
   
    // router.push("/")
    router.push(`/?category=${cat.category}`);
  }
  return (
    <div className="  h-screen bg-white  flex flex-col justify-between" style={{ boxShadow: "rgba(47, 43, 61, 0.12) 0px 0.125rem 0.5rem 0px", position: "sticky", top: 0, width: "20%" }}>

      {/* Top Logo */}
      <div>
        <div  className='p-4' style={{borderBottom: "1px solid #e5e7eb",}}>
        <Link href="/" className=" flex items-center gap-2" >
          <div className="w-6 h-6 bg-indigo-500 rounded-full"></div>
          <span className="font-semibold text-lg text-gray-900">Prototype</span>
        </Link>
        </div>

        {/* Menu */}
        <div className="space-y-2  p-4">
          {categories.map((cat, i) => (
            <div
              key={i}
              onClick={() => HandleNavigate(cat)}
              className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition
                  ${selected === cat.category
                  ? "bg-indigo-50 text-indigo-600 font-medium"
                  : "text-gray-600 hover:bg-gray-100"
                }`}
            >
              <span className="flex items-center gap-2">
                {/* Icon Placeholder */}
                <span className="w-5 h-5   rounded">
                  <FileText size={17} color="#615fff" strokeWidth={2} />
                </span>
                {cat.category}
              </span>

              {/* Badge (static style only) */}
              <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">
                {cat.templates.length}
              </span>
            </div>
          ))}
        </div>


      </div>

      {/* Bottom Profile */}
      <div className="flex items-center gap-3 b  p-4" style={{borderTop: "1px solid #e5e7eb",}}>
        <img
          src="https://i.pravatar.cc/40"
          alt="user"
          className="w-8 h-8 rounded-full"
        />
        <span className="text-sm font-medium text-gray-700">
          Tom Cook
        </span>
      </div>
    </div>
  );
}