import { PropertyTable } from "@/components/admin/property-table"
import { PropertyFilters } from "@/components/admin/property-filters"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function PropertiesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Property Management</h1>
          <p className="text-muted-foreground">Review, approve, and manage property listings.</p>
        </div>
        <Button asChild>
          <Link href="/properties/create">
            <Plus className="mr-2 h-4 w-4" />
            Add Property
          </Link>
        </Button>
      </div>

      <PropertyFilters />
      <PropertyTable />
    </div>
  )
}
