"use client";
import {
  CircleDashed,
  Ellipsis,
  Globe,
  PlusIcon,
  SquareCheck,
  SquareX,
  Users,
} from "lucide-react";
import {
  DndContext,
  PointerSensor,
  closestCenter,
  pointerWithin,
  useSensor,
  useSensors,
  useDroppable,
  DragOverlay,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useMemo, useState } from "react";
import { arrayMove } from "@dnd-kit/sortable";

type CardProps = {
  title: string;
  description: string;
  date: string;
  metaIcons?: React.ReactNode[];
  id: string;
};

type ColumnData = {
  id: string;
  label: string;
  headerIcon: React.ReactNode;
  metaIcons: React.ReactNode[];
  cards: CardProps[];
};

function CardView({
  title,
  description,
  date,
  metaIcons = [],
}: CardProps & { metaIcons?: React.ReactNode[] }) {
  return (
    <div className="border border-gray-100 rounded-lg p-3 space-y-1 bg-white hover:bg-gray-100 transition-all duration-300 ">
      <div className="text-[13px] text-zinc-500 font-semibold items-center gap-2">
        {title}
      </div>
      <p className="text-[11px] text-gray-400 mb-12">{description}</p>
      <div className="flex items-center justify-between pt-0.5">
        <div className="flex items-center gap-4 text-zinc-500">
          {metaIcons.map((icon, idx) => (
            <span key={idx} className="inline-flex items-center">
              {icon}
            </span>
          ))}
          <div className="flex items-center justify-center text-zinc-500">
            <span className=" text-zinc-500 font-mono uppercase text-[13px]">
              {date}
            </span>
          </div>
        </div>

        <Ellipsis className="w-4 h-4 text-zinc-400" />
      </div>
    </div>
  );
}

function SortableCard(props: CardProps & { metaIcons?: React.ReactNode[] }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0 : 1,
    cursor: "grab",
  } as React.CSSProperties;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="mb-4"
    >
      <CardView {...props} />
    </div>
  );
}

function ColumnHeader({
  label,
  leftIcon,
}: {
  label: string;
  leftIcon: React.ReactNode;
}) {
  return (
    <div className="flex w-full items-center justify-between gap-2 border border-gray-100 rounded-lg px-2 py-2 bg-white shadow-xs">
      <div className="flex items-center gap-2">
        {leftIcon}
        <h2 className="text-xs text-zinc-500">{label}</h2>
      </div>
      <div className="flex items-center gap-4">
        <PlusIcon className="w-4 h-4 text-zinc-400" />
        <Ellipsis className="w-4 h-4 text-zinc-500" />
      </div>
    </div>
  );
}

function Column({ column }: { column: ColumnData }) {
  const itemIds = useMemo(() => column.cards.map((c) => c.id), [column.cards]);
  const { setNodeRef } = useDroppable({ id: column.id });
  return (
    <div className="flex flex-col h-full min-h-0 pb-2">
      <div className="mb-3">
        <ColumnHeader label={column.label} leftIcon={column.headerIcon} />
      </div>
      <div ref={setNodeRef} className="flex-1 overflow-y-auto min-h-6 scrollbar-hide">
        <SortableContext items={itemIds} strategy={verticalListSortingStrategy}>
          {column.cards.map((card) => (
            <SortableCard
              key={card.id}
              {...card}
              metaIcons={column.metaIcons}
            />
          ))}
        </SortableContext>
      </div>
    </div>
  );
}

function Board() {
  const initialColumns: ColumnData[] = useMemo(
    () => [
      {
        id: "todo",
        label: "Todo",
        headerIcon: <CircleDashed className="w-3.5 h-3.5 text-zinc-500" />,
        metaIcons: [
          <CircleDashed key="c" className="w-3.5 h-3.5" />,
          <Users key="u" className="w-3 h-3" />,
          <Globe key="g" className="w-3 h-3" />,
        ],
        cards: [
          {
            title: "Lunan - Mobile App Dev",
            description: "Lunan is a full-service app development agency",
            date: "Dec 12",
            id: "1",
          },
          {
            title: "Slane - Web design",
            description:
              "Slane is a minimalist productivity app for individuals",
            date: "Nov 28",
            id: "2",
          },
          {
            title: "Slane - Web design",
            description:
              "Slane is a minimalist productivity app for individuals",
            date: "Nov 28",
            id: "3",
          },
        ],
      },
      {
        id: "in-progress",
        label: "In progress",
        headerIcon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-zinc-500"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path
              d="M12 21a9 9 0 0 0 0 -18m0 0v18"
              fill="currentColor"
              stroke="none"
            />
            <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
          </svg>
        ),
        metaIcons: [
          <svg
            key="p"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className=""
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path
              d="M12 21a9 9 0 0 0 0 -18m0 0v18"
              fill="currentColor"
              stroke="none"
            />
            <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
          </svg>,
          <Users key="u" className="w-3 h-3" />,
          <Globe key="g" className="w-3 h-3" />,
        ],
        cards: [
          {
            title: "Halite - iOS App Design",
            description: "Halite is a cloud storage solution for iOS",
            date: "Nov 28",
            id: "4",
          },
          {
            title: "Halite - iOS App Design",
            description: "Halite is a cloud storage solution for iOS",
            date: "Nov 28",
            id: "5",
          },
        ],
      },
      {
        id: "completed",
        label: "Completed",
        headerIcon: <SquareCheck className="w-3.5 h-3.5 text-zinc-500" />,
        metaIcons: [
          <SquareCheck key="s" className="w-3 h-3" />,
          <Users key="u" className="w-3 h-3" />,
          <Globe key="g" className="w-3 h-3" />,
        ],
        cards: [
          {
            title: "Ponto - UX Research",
            description: "Ponto is a social network for connecting researchers",
            date: "Nov 28",
            id: "6",
          },
          {
            title: "Ponto - UX Research",
            description: "Ponto is a social network for connecting researchers",
            date: "Nov 28",
            id: "7",
          },
        ],
      },
      {
        id: "canceled",
        label: "Canceled",
        headerIcon: <SquareX className="w-3.5 h-3.5 text-zinc-500" />,
        metaIcons: [
          <SquareX key="x" className="w-3 h-3" />,
          <Users key="u" className="w-3 h-3" />,
          <Globe key="g" className="w-3 h-3" />,
        ],
        cards: [
          {
            title: "Skara - Backend Infrastructure",
            description:
              "Skara provides tools for managing backend infrastructure",
            date: "Oct 01",
            id: "8",
          },
          {
            title: "Skara - Backend Infrastructure",
            description:
              "Skara provides tools for managing backend infrastructure",
            date: "Oct 01",
            id: "9",
          },
        ],
      },
    ],
    []
  );

  const [columns, setColumns] = useState<ColumnData[]>(initialColumns);
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 6 },
    })
  );

  function findColumnIdByCardId(id: string): string | null {
    for (const col of columns) {
      if (col.cards.some((c) => c.id === id)) return col.id;
    }
    return null;
  }

  function onDragStart(event: any) {
    setActiveCardId(String(event.active.id));
  }

  function onDragOver(event: any) {
    const activeId = String(event.active.id);
    const overId = event.over ? String(event.over.id) : null;

    if (!overId || activeId === overId) return;

    const sourceColumnId = findColumnIdByCardId(activeId);
    if (!sourceColumnId) return;

    let destinationColumnId = findColumnIdByCardId(overId);
    if (!destinationColumnId) {
      const isColumnTarget = columns.some((c) => c.id === overId);
      destinationColumnId = isColumnTarget ? overId : null;
    }
    if (!destinationColumnId) return;

    setColumns((prev) => {
      const next = prev.map((c) => ({ ...c, cards: [...c.cards] }));
      const source = next.find((c) => c.id === sourceColumnId)!;
      const dest = next.find((c) => c.id === destinationColumnId)!;

      const fromIndex = source.cards.findIndex((c) => c.id === activeId);
      if (fromIndex === -1) return prev;

      if (sourceColumnId === destinationColumnId) {
        // same column reordering - show real-time feedback
        const toIndex = dest.cards.findIndex((c) => c.id === overId);
        if (toIndex === -1 || fromIndex === toIndex) return prev;
        
        dest.cards = arrayMove(dest.cards, fromIndex, toIndex);
        return next;
      } else {
        // moving to different column
        const [moved] = source.cards.splice(fromIndex, 1);
        const overIndexOther = dest.cards.findIndex((c) => c.id === overId);
        if (overIndexOther === -1) {
          dest.cards.push(moved);
        } else {
          dest.cards.splice(overIndexOther, 0, moved);
        }
        return next;
      }
    });
  }

  function onDragEnd(event: any) {
    setActiveCardId(null);
    // all positioning is handled in onDragOver for smooth real-time feedback
  }

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={(args: any) => {
          const pointer = pointerWithin(args);
          if (pointer.length > 0) return pointer;
          return closestCenter(args);
        }}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDragEnd={onDragEnd}
      >
        <div
          className="h-full min-h-0 grid grid-cols-4 gap-6 px-4 overflow-hidden"
          style={{ fontFamily: "Instrument" }}
        >
          {columns.map((col) => (
            <Column key={col.id} column={col} />
          ))}
        </div>
        <DragOverlay>
          {activeCardId
            ? (() => {
                const sourceColumn =
                  columns.find((c) =>
                    c.cards.some((cc) => cc.id === activeCardId)
                  ) || null;
                const card = sourceColumn
                  ? sourceColumn.cards.find((c) => c.id === activeCardId) ||
                    null
                  : null;
                return card ? (
                  <div className="mb-4">
                    <CardView
                      {...card}
                      metaIcons={sourceColumn?.metaIcons || []}
                    />
                  </div>
                ) : null;
              })()
            : null}
        </DragOverlay>
      </DndContext>
    </>
  );
}

export default Board;
