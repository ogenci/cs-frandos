import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <Layout>
      <SEO title="Page Not Found" path={window.location.pathname} />
      <div className="min-h-[60vh] flex items-center justify-center bg-background">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="pt-6">
            <div className="flex mb-4 gap-2 text-destructive">
              <AlertCircle className="h-8 w-8 text-destructive" />
              <h1 className="text-2xl font-bold font-serif text-primary">404 Page Not Found</h1>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Did you forget to add the page to the router?
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
