import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import ScrollToTop from "@/components/ScrollToTop";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/lib/auth-context";
import RoleRoute from "@/components/RoleRoute";
import PanelRedirect from "@/components/PanelRedirect";
import SiteLayout from "@/components/site/SiteLayout";

// Eager — public landing is the LCP page
import Home from "./pages/Home";

// Lazy-loaded — login + ERP modules are not needed on first paint
const Login = lazy(() => import("./pages/Login"));
const AdminLayout = lazy(() => import("@/components/erp/AdminLayout"));
const StaffLayout = lazy(() => import("@/components/erp/StaffLayout"));
const Dashboard = lazy(() => import("./pages/erp/Dashboard"));
const Clients = lazy(() => import("./pages/erp/Clients"));
const Vendors = lazy(() => import("./pages/erp/Vendors"));
const Inventory = lazy(() => import("./pages/erp/Inventory"));
const Documents = lazy(() => import("./pages/erp/Documents"));
const DocumentEditor = lazy(() => import("./pages/erp/DocumentEditor"));
const DocumentPrint = lazy(() => import("./pages/erp/DocumentPrint"));
const Payments = lazy(() => import("./pages/erp/Payments"));
const StockMovements = lazy(() => import("./pages/erp/StockMovements"));
const Users = lazy(() => import("./pages/erp/Users"));
const TaxSettings = lazy(() => import("./pages/erp/TaxSettings"));
const ModulePlaceholder = lazy(() => import("./pages/erp/ModulePlaceholder"));
const PurchaseOrders = lazy(() => import("./pages/erp/PurchaseOrders"));
const PurchaseOrderEditor = lazy(() => import("./pages/erp/PurchaseOrderEditor"));
const ClientStatement = lazy(() => import("./pages/erp/ClientStatement"));
const Reports = lazy(() => import("./pages/erp/Reports"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const RouteFallback = () => (
  <div className="min-h-[60vh] grid place-items-center text-sm text-muted-foreground">
    Loading…
  </div>
);

/**
 * Operational routes shared by both admin and staff panels.
 * Mounted twice — once under /admin and once under /staff — so that
 * the active panel is encoded in the URL and enforced by RoleRoute.
 */
const sharedOperationalRoutes = (
  <>
    <Route index element={<Dashboard />} />
    <Route path="quotations" element={<Documents docType="quotation" />} />
    <Route path="invoices" element={<Documents docType="invoice" />} />
    <Route path="bills" element={<Documents docType="bill" />} />
    <Route path="challans" element={<Documents docType="challan" />} />
    <Route path="documents/:type/:id" element={<DocumentEditor />} />
    <Route path="documents/:type/:id/print" element={<DocumentPrint />} />
    <Route path="inventory" element={<Inventory />} />
    <Route path="inventory/movements" element={<StockMovements />} />
    <Route path="payments" element={<Payments />} />
    <Route path="clients" element={<Clients />} />
    <Route path="clients/statement" element={<ClientStatement />} />
    <Route path="vendors" element={<Vendors />} />
    <Route path="purchase-orders" element={<PurchaseOrders />} />
    <Route path="purchase-orders/:id" element={<PurchaseOrderEditor />} />
    <Route path="reports" element={<Reports />} />
  </>
);

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <ScrollToTop />
            <Suspense fallback={<RouteFallback />}>
              <Routes>
                {/* Public marketing site */}
                <Route element={<SiteLayout />}>
                  <Route path="/" element={<Home />} />
                </Route>
                <Route path="/login" element={<Login />} />

                {/* Legacy /erp entry — send users to their own panel */}
                <Route path="/erp/*" element={<PanelRedirect />} />

                {/* Admin panel — strictly admin-only */}
                <Route
                  path="/admin"
                  element={
                    <RoleRoute allow="admin">
                      <AdminLayout />
                    </RoleRoute>
                  }
                >
                  {sharedOperationalRoutes}
                  <Route path="users" element={<Users />} />
                  <Route path="tax" element={<TaxSettings />} />
                  <Route
                    path="settings"
                    element={<ModulePlaceholder title="Admin settings" description="Company details and preferences." />}
                  />
                </Route>

                {/* Staff panel — strictly staff-only (no admin modules) */}
                <Route
                  path="/staff"
                  element={
                    <RoleRoute allow="staff">
                      <StaffLayout />
                    </RoleRoute>
                  }
                >
                  {sharedOperationalRoutes}
                </Route>

                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
