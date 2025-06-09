import { UserTable } from "@/components/admin/user-table"
import { UserFilters } from "@/components/admin/user-filters"
import { Button } from "@/components/ui/button"
import { UserPlus } from "lucide-react"
import Link from "next/link"

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground">Manage lendees, lenders, and user permissions.</p>
        </div>
        <Button asChild>
          <Link href="/users/create">
            <UserPlus className="mr-2 h-4 w-4" />
            Add User
          </Link>
        </Button>
      </div>

      <UserFilters />
      <UserTable />
    </div>
  )
}
