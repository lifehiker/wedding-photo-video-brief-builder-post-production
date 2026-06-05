import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";

interface ProjectCardProps {
  id: string;
  coupleNames: string;
  weddingDate?: Date | null;
  venueName?: string | null;
  venueLocation?: string | null;
  status: string;
  briefCount?: number;
  updatedAt: Date;
}

const statusColors: Record<string, string> = {
  draft: "bg-stone-100 text-stone-600",
  active: "bg-blue-50 text-blue-700",
  completed: "bg-green-50 text-green-700",
};

export function ProjectCard({
  id,
  coupleNames,
  weddingDate,
  venueName,
  venueLocation,
  status,
  briefCount = 0,
  updatedAt,
}: ProjectCardProps) {
  const formattedDate = weddingDate
    ? new Date(weddingDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : null;

  const location = venueName || venueLocation
    ? [venueName, venueLocation].filter(Boolean).join(", ")
    : null;

  return (
    <Link href={`/projects/${id}`}>
      <Card className="hover:shadow-md transition-shadow cursor-pointer border-stone-200">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-stone-900 leading-tight">{coupleNames}</h3>
            <Badge
              className={`shrink-0 text-xs ${statusColors[status] ?? statusColors.draft}`}
              variant="outline"
            >
              {status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-1">
          {formattedDate && (
            <p className="text-sm text-stone-600">
              <span className="text-stone-400">Date: </span>
              {formattedDate}
            </p>
          )}
          {location && (
            <p className="text-sm text-stone-600 truncate">
              <span className="text-stone-400">Venue: </span>
              {location}
            </p>
          )}
          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-stone-400">
              {briefCount} brief{briefCount !== 1 ? "s" : ""}
            </span>
            <span className="text-xs text-stone-400">
              Updated {formatDistanceToNow(new Date(updatedAt), { addSuffix: true })}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
