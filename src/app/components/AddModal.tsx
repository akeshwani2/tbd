// "use client";

// import { useEffect, useMemo, useState } from "react";
// import { createPortal } from "react-dom";
// import {
//   X,
//   Maximize2,
//   Circle,
//   User2,
//   Tag,
//   Link2,
//   Ellipsis,
//   Paperclip,
//   ChevronRightIcon,
// } from "lucide-react";

// export type IssuePayload = {
//   title: string;
//   description: string;
//   status: "todo" | "in progress" | "completed" | "canceled";
//   priority?: "none" | "low" | "medium" | "high";
//   assignee?: string;
//   labels?: string[];
// };

// type AddModalProps = {
//   open: boolean;
//   onClose: () => void;
//   onCreate: (issue: IssuePayload, options: { createMore: boolean }) => void;
//   defaultStatus?: IssuePayload["status"];
// };

// function AddModal({
//   open,
//   onClose,
//   onCreate,
//   defaultStatus = "todo",
// }: AddModalProps) {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [status, setStatus] = useState<IssuePayload["status"]>(defaultStatus);
//   const [priority, setPriority] = useState<IssuePayload["priority"]>("none");
//   const [assignee] = useState<string | undefined>(undefined);
//   const [labels] = useState<string[]>([]);
//   const [createMore, setCreateMore] = useState(false);

//   useEffect(() => {
//     if (!open) return;
//     const original = document.body.style.overflow;
//     document.body.style.overflow = "hidden";
//     return () => {
//       document.body.style.overflow = original;
//     };
//   }, [open]);

//   const canCreate = useMemo(() => title.trim().length > 0, [title]);

//   if (!open) return null;

//   function handleSubmit() {
//     if (!canCreate) return;
//     onCreate(
//       {
//         title: title.trim(),
//         description: description.trim(),
//         status,
//         priority,
//         assignee,
//         labels,
//       },
//       { createMore }
//     );
//     if (createMore) {
//       setTitle("");
//       setDescription("");
//     } else {
//       onClose();
//     }
//   }

//   const modal = (
//     <div className="fixed inset-0 z-1000">
//       <div className="absolute inset-0 bg-black/70" onClick={onClose} />

//       <div className="absolute left-1/2 top-35 -translate-x-1/2 w-[720px] rounded-lg border border-gray-100 bg-white text-zinc-200 shadow-xl">
//         {/* header */}
//         <div className="flex items-center justify-between px-4 py-3">
//           <div className="flex items-center gap-2 text-sm text-zinc-400">
//             <span className="text-black text-sm ">New Issue</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <button
//               aria-label="maximize"
//               className="p-1 rounded-md hover:bg-zinc-800"
//             >
//               <Maximize2 className="h-3.5 w-3.5 text-zinc-400" />
//             </button>
//             <button
//               aria-label="close"
//               className="p-1 rounded-md hover:bg-zinc-800"
//               onClick={onClose}
//             >
//               <X className="h-3.5 w-3.5 text-zinc-400" />
//             </button>
//           </div>
//         </div>

//         {/* body */}
//         <div className="px-4 pb-4">
//           <input
//             autoFocus
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="w-full bg-transparent text-lg text-black leading-7 placeholder:text-zinc-400 font-medium outline-none"
//             placeholder="Issue title"
//           />
//           <textarea
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             className="mt-1 w-full resize-none bg-transparent text-sm text-zinc-500 leading-6 placeholder:text-zinc-300 outline-none min-h-24"
//             placeholder="Add description..."
//           />

//           <div className="mt-3 flex items-center gap-2">
//             {/* status */}
//             <button
//               onClick={() => setStatus("todo")}
//               className="inline-flex items-center gap-2 rounded-lg bg-zinc-800 px-3 py-1.5 text-xs text-zinc-300"
//             >
//               <Circle className="h-3.5 w-3.5 text-zinc-400" />
//               {status === "todo" ? "todo" : status}
//             </button>

//             {/* priority */}
//             <button
//               onClick={() =>
//                 setPriority((p) =>
//                   p === "none"
//                     ? "medium"
//                     : p === "medium"
//                     ? "high"
//                     : p === "high"
//                     ? "low"
//                     : "none"
//                 )
//               }
//               className="inline-flex items-center gap-2 rounded-lg bg-zinc-800 px-3 py-1.5 text-xs text-zinc-300"
//             >
//               <span className="tracking-widest text-zinc-500">···</span>
//               priority
//             </button>

//             {/* assignee */}
//             <button className="inline-flex items-center gap-2 rounded-lg bg-zinc-800 px-3 py-1.5 text-xs text-zinc-300">
//               <User2 className="h-3.5 w-3.5 text-zinc-400" />
//               assignee
//             </button>

//             {/* link and more */}
//             <button className="inline-flex items-center rounded-lg bg-zinc-800 p-1.5 text-xs text-zinc-300">
//               <Link2 className="h-3.5 w-3.5 text-zinc-400" />
//             </button>
//             <button className="inline-flex items-center rounded-lg bg-zinc-800 p-1.5 text-xs text-zinc-300">
//               <Ellipsis className="h-3.5 w-3.5 text-zinc-400" />
//             </button>

//             {/* labels */}
//             <button className="ml-1 inline-flex items-center gap-2 rounded-lg border border-zinc-700 px-3 py-1.5 text-xs text-zinc-300">
//               <Tag className="h-3.5 w-3.5 text-zinc-400" />
//               add labels
//               <span className="ml-1 rounded-md border border-zinc-700 px-1 text-[10px] text-zinc-500">
//                 l
//               </span>
//             </button>
//           </div>
//         </div>

//         {/* footer */}
//         <div className="flex items-center justify-between border-t border-zinc-800 bg-zinc-900/80 px-4 py-3 rounded-b-xl">
//           <button className="inline-flex items-center gap-2 rounded-md px-2 py-1 text-xs text-zinc-400 hover:bg-zinc-800">
//             <Paperclip className="h-4 w-4" />
//           </button>

//           <div className="flex items-center gap-4">
//             <div className="flex items-center gap-2 text-sm text-zinc-300">
//               <button
//                 onClick={() => setCreateMore((v) => !v)}
//                 className={`h-5 w-9 rounded-full border border-zinc-700 transition-colors ${
//                   createMore ? "bg-zinc-500" : "bg-zinc-800"
//                 }`}
//                 aria-pressed={createMore}
//               >
//                 <span
//                   className={`block h-4 w-4 rounded-full bg-white transition-transform translate-x-0.5 ${
//                     createMore ? "translate-x-[18px]" : "translate-x-0"
//                   }`}
//                 />
//               </button>
//               <span className="text-zinc-300 text-sm">Create more</span>
//             </div>

//             <button
//               onClick={handleSubmit}
//               disabled={!canCreate}
//               className={`rounded-lg bg-black px-4 py-2 text-sm font-medium text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-800 transition-all duration-300`}
//             >
//               Create Issue
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   return createPortal(modal, document.body);
// }

// export default AddModal;
