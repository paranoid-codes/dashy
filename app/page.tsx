// app/page.tsx (or wherever your homepage is)
import Link from 'next/link';
import { Button } from '@/shared/components/ui/button'; // Adjust path if needed

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-background to-muted">
      <div className="space-y-6 text-center">
        <h1 className="font-bold text-4xl tracking-tight">Welcome Home</h1>
        <p className="text-lg text-muted-foreground">
          Click below to go to your dashboard.
        </p>
        <Link href="/dashboard" passHref>
          <Button className="px-8 py-4 text-lg shadow-lg" size="lg">
            Go to Dashboard 🚀
          </Button>
        </Link>
      </div>
    </div>
  );
}
