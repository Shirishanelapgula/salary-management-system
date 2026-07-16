import { useAuditLogs } from "../hooks/useAuditLogs";

export default function AuditLogsPage() {
  const { data, isLoading } = useAuditLogs();

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        Loading...
      </div>
    );
  }

  const logs = data?.data ?? [];

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold">
          Audit Logs
        </h1>

        <p className="text-gray-500">
          Track all system activities
        </p>
      </div>

      <div className="overflow-hidden rounded-lg border bg-white shadow">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-3 text-left">
                Action
              </th>

              <th className="p-3 text-left">
                Entity
              </th>

              <th className="p-3 text-left">
                Description
              </th>

              <th className="p-3 text-left">
                User
              </th>

              <th className="p-3 text-left">
                Date
              </th>

            </tr>

          </thead>

          <tbody>

            {logs.length > 0 ? (
              logs.map((log: any) => (

              <tr
                key={log.id}
                className="border-t"
              >

                <td className="p-3">

                  <span
                    className={`rounded px-2 py-1 text-xs font-semibold text-white
                    ${
                      log.action === "CREATE"
                        ? "bg-green-500"
                        : log.action === "UPDATE"
                        ? "bg-blue-500"
                        : "bg-red-500"
                    }`}
                  >
                    {log.action}
                  </span>

                </td>

                <td className="p-3">
                  {log.entityType}
                </td>

                <td className="p-3">
                  {log.description}
                </td>

                <td className="p-3">
                  {log.user?.employee?.firstName ?? "System"}
                </td>

                <td className="p-3">
                  {new Date(log.createdAt).toLocaleString()}
                </td>

              </tr>

              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-8 text-center text-slate-600">
                  📝 No audit logs available.
                </td>
              </tr>
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}