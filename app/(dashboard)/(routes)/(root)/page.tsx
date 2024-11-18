import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";

import { CheckCircle, Clock } from "lucide-react";
import { InfoCard } from "./_components/info-card";

export default async function Dashboard() {
//   const { userId } = auth();

//   if (!userId) {
//     return redirect("/");
//   }

//   const {
//     comletedCourses,
//     coursesInProgress,
//   } = await getDashboardCourses(userId);
//   return (
//   <div className="p-6 space-y-4">
//     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//       <InfoCard
//       icon={Clock}
//       label="In Progress"
//       numberOfItems={coursesInProgress.length}
//       />
//       <InfoCard
//       icon={CheckCircle}
//       label="completed"
//       numberOfItems={coursesInProgress.length}
//       variant="success"
//       />
//     </div>
//     <CoursesList 
//     items={[...comletedCourses, ...coursesInProgress]}
//     />
//   </div>
//   )
}
