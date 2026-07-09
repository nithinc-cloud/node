import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { fetchApplications } from "@/lib/api";

export default async function Home() {
  const applications = await fetchApplications();
  const totals = applications.reduce(
    (acc, app) => {
      acc.critical += app.criticalCve;
      acc.high += app.highCve;
      return acc;
    },
    { critical: 0, high: 0 }
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Overview</h1>
        <p className="mt-2 text-gray-600">
          Welcome to SAST Dashboard. Monitor your application security posture.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Critical CVEs",
            value: String(totals.critical),
            sub: "Live total across all applications",
            color: "text-red-600",
          },
          {
            label: "High CVEs",
            value: String(totals.high),
            sub: "Live total across all applications",
            color: "text-orange-600",
          },
          {
            label: "Applications",
            value: String(applications.length),
            sub: "Live inventory count",
            color: "text-blue-600",
          },
          {
            label: "Last Import",
            value: "Live",
            sub: "Use Import Vulnerabilities per application",
            color: "text-green-600",
          },
        ].map(({ label, value, sub, color }) => (
          <Card key={label}>
            <CardHeader>
              <CardTitle className="text-sm text-muted-foreground">
                {label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className={`text-3xl font-semibold tracking-tight ${color}`}>
                {value}
              </p>
              <p className="mt-2 text-xs text-muted-foreground">{sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>🚀 Getting Started</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <p className="text-muted-foreground">
            Follow these steps to get started with SAST Dashboard:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>Create an application in the Applications section</li>
            <li>Import vulnerabilities from your GitLab SAST reports</li>
            <li>Review and triage vulnerabilities by severity</li>
            <li>Track remediation progress over time</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}
