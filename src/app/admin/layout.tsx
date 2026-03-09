import AdminAuthWrapper from '@/components/admin/AdminLayout';

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
    return <AdminAuthWrapper>{children}</AdminAuthWrapper>;
}
