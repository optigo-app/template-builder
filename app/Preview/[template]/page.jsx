 "use client"
 
import About1 from '@/components/templates/About1'
import About2 from '@/components/templates/About2'
import About3 from '@/components/templates/About3'
import About4 from '@/components/templates/About4'

// 1. Create a Mapping Object
const COMPONENTS_MAP = {
  About1: About1,
  About2: About2,
  About3: About3,
  About4: About4,
};

export default async function Preview({ params }) {
  const { template } = await params;

  // 2. Select the component from the map
  const SelectedComponent = COMPONENTS_MAP[template];

  return (
    <div className="w-full min-h-screen">
      {SelectedComponent ? (
        // 3. Render the component if it exists
        <SelectedComponent />
      ) : (
        // Fallback for invalid names
        <div className="flex items-center justify-center h-screen">
          <p className="text-red-500 font-bold text-lg">
            Template "{template}" not found.
          </p>
        </div>
      )}
    </div>
  );
}