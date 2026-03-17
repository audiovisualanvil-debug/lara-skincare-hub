import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import {
  Users,
  UserCheck,
  UserX,
  Clock,
  TrendingUp,
  Download,
  Calendar,
  Building2,
  ShieldCheck,
  FileText,
  BarChart3,
  PieChart as PieChartIcon,
  ArrowLeft,
  RefreshCw,
  Package,
  ShoppingCart,
  DollarSign,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useAdminRole } from "@/hooks/useAdminRole";
import MainHeader from "@/components/layout/MainHeader";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from "recharts";
import { format, subDays, subWeeks, subMonths, startOfDay, startOfWeek, startOfMonth, startOfYear } from "date-fns";
import { ptBR } from "date-fns/locale";

interface DashboardStats {
  totalUsers: number;
  totalProfessionals: number;
  pendingRequests: number;
  approvedRequests: number;
  rejectedRequests: number;
  quizCompletions: number;
  avgDiscount: number;
  // New: Products & Orders
  totalProducts: number;
  activeProducts: number;
  lowStockProducts: number;
  totalOrders: number;
  pendingOrders: number;
  totalRevenue: number;
  avgOrderValue: number;
}

interface RequestByDate {
  date: string;
  count: number;
}

interface ProfessionalRequest {
  id: string;
  status: string;
  discount_percentage: number;
  created_at: string;
}

const COLORS = ["hsl(var(--primary))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))", "hsl(var(--chart-5))"];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, loading: adminLoading } = useAdminRole();

  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalProfessionals: 0,
    pendingRequests: 0,
    approvedRequests: 0,
    rejectedRequests: 0,
    quizCompletions: 0,
    avgDiscount: 0,
    totalProducts: 0,
    activeProducts: 0,
    lowStockProducts: 0,
    totalOrders: 0,
    pendingOrders: 0,
    totalRevenue: 0,
    avgOrderValue: 0,
  });
  const [requestsByDate, setRequestsByDate] = useState<RequestByDate[]>([]);
  const [ordersByDate, setOrdersByDate] = useState<RequestByDate[]>([]);
  const [allRequests, setAllRequests] = useState<ProfessionalRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState("month");
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (!authLoading && !adminLoading) {
      if (!user) {
        navigate("/auth", { state: { from: "/admin/dashboard" } });
      } else if (!isAdmin) {
        navigate("/");
        toast.error("Acesso não autorizado");
      } else {
        fetchDashboardData();
      }
    }
  }, [user, authLoading, isAdmin, adminLoading, navigate, period]);

  const getDateFilter = () => {
    const now = new Date();
    switch (period) {
      case "day":
        return startOfDay(now);
      case "week":
        return startOfWeek(now, { locale: ptBR });
      case "month":
        return startOfMonth(now);
      case "year":
        return startOfYear(now);
      default:
        return subMonths(now, 1);
    }
  };

  const fetchDashboardData = async () => {
    try {
      setRefreshing(true);
      const dateFilter = getDateFilter().toISOString();

      // Fetch profiles count
      const { count: usersCount } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true });

      // Fetch quiz completions
      const { count: quizCount } = await supabase
        .from("quiz_results")
        .select("*", { count: "exact", head: true });

      // Fetch products stats
      const { data: products } = await supabase
        .from("products")
        .select("id, is_active, stock");

      const totalProducts = products?.length || 0;
      const activeProducts = products?.filter((p) => p.is_active).length || 0;
      const lowStockProducts = products?.filter((p) => p.stock <= 5).length || 0;

      // Fetch orders stats
      const { data: orders } = await supabase
        .from("orders")
        .select("id, status, total, created_at");

      const totalOrders = orders?.length || 0;
      const pendingOrders = orders?.filter((o) => o.status === "pending" || o.status === "paid").length || 0;
      const totalRevenue = orders?.reduce((acc, o) => acc + Number(o.total || 0), 0) || 0;
      const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

      // Orders by date for chart
      const filteredOrders = orders?.filter(
        (o) => new Date(o.created_at) >= getDateFilter()
      ) || [];

      const ordersByDateGrouped = filteredOrders.reduce((acc: Record<string, number>, o) => {
        const date = format(new Date(o.created_at), "dd/MM", { locale: ptBR });
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      }, {});

      const ordersChartData = Object.entries(ordersByDateGrouped).map(([date, count]) => ({
        date,
        count,
      }));

      setOrdersByDate(ordersChartData);

      // Fetch all professional requests
      const { data: requests, error } = await supabase
        .from("professional_requests")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) throw error;

      setAllRequests(requests || []);

      // Calculate stats
      const pending = requests?.filter((r) => r.status === "pending").length || 0;
      const approved = requests?.filter((r) => r.status === "approved") || [];
      const rejected = requests?.filter((r) => r.status === "rejected").length || 0;

      const avgDiscount =
        approved.length > 0
          ? Math.round(approved.reduce((acc, r) => acc + (r.discount_percentage || 0), 0) / approved.length)
          : 0;

      setStats({
        totalUsers: usersCount || 0,
        totalProfessionals: approved.length,
        pendingRequests: pending,
        approvedRequests: approved.length,
        rejectedRequests: rejected,
        quizCompletions: quizCount || 0,
        avgDiscount,
        totalProducts,
        activeProducts,
        lowStockProducts,
        totalOrders,
        pendingOrders,
        totalRevenue,
        avgOrderValue,
      });

      // Group requests by date for chart
      const filteredRequests = requests?.filter(
        (r) => new Date(r.created_at) >= getDateFilter()
      ) || [];

      const groupedByDate = filteredRequests.reduce((acc: Record<string, number>, r) => {
        const date = format(new Date(r.created_at), "dd/MM", { locale: ptBR });
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      }, {});

      const chartData = Object.entries(groupedByDate).map(([date, count]) => ({
        date,
        count,
      }));

      setRequestsByDate(chartData);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast.error("Erro ao carregar dados do dashboard");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const pieData = [
    { name: "Aprovadas", value: stats.approvedRequests },
    { name: "Pendentes", value: stats.pendingRequests },
    { name: "Rejeitadas", value: stats.rejectedRequests },
  ].filter((d) => d.value > 0);

  const exportToCSV = () => {
    if (allRequests.length === 0) {
      toast.error("Nenhum dado para exportar");
      return;
    }

    const headers = ["ID", "Status", "Desconto %", "Data de Criação"];
    const rows = allRequests.map((r) => [
      r.id,
      r.status,
      r.discount_percentage,
      format(new Date(r.created_at), "dd/MM/yyyy HH:mm", { locale: ptBR }),
    ]);

    const csvContent = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `relatorio-profissionais-${format(new Date(), "yyyy-MM-dd")}.csv`;
    link.click();

    toast.success("Relatório exportado com sucesso!");
  };

  if (authLoading || adminLoading || loading) {
    return (
      <div className="min-h-screen bg-background">
        <MainHeader />
        <div className="pt-32 flex items-center justify-center">
          <RefreshCw className="w-8 h-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <MainHeader />

      <main className="pt-32 pb-20">
        <div className="container-editorial">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="font-display text-3xl md:text-4xl font-medium text-foreground">
                  Dashboard Admin
                </h1>
                <p className="text-muted-foreground font-body mt-1">
                  Visão geral do sistema
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Select value={period} onValueChange={setPeriod}>
                <SelectTrigger className="w-40">
                  <Calendar className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="day">Hoje</SelectItem>
                  <SelectItem value="week">Esta semana</SelectItem>
                  <SelectItem value="month">Este mês</SelectItem>
                  <SelectItem value="year">Este ano</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" onClick={fetchDashboardData} disabled={refreshing}>
                <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
                Atualizar
              </Button>

              <Button variant="primary" onClick={exportToCSV}>
                <Download className="w-4 h-4 mr-2" />
                Exportar CSV
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex gap-3 mb-8 flex-wrap">
            <Button variant="outline" asChild>
              <Link to="/admin/pedidos">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Gerenciar Pedidos
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/admin/produtos">
                <Package className="w-4 h-4 mr-2" />
                Gerenciar Produtos
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/admin/cupons">
                <DollarSign className="w-4 h-4 mr-2" />
                Cupons de Desconto
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/admin/solicitacoes-profissionais">
                <Building2 className="w-4 h-4 mr-2" />
                Solicitações Profissionais
              </Link>
            </Button>
          </div>

          {/* Sales Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="border-border/50 bg-primary/5">
              <CardHeader className="pb-2">
                <CardDescription className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-primary" />
                  Faturamento Total
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-display font-bold text-primary">
                  R$ {stats.totalRevenue.toFixed(2).replace(".", ",")}
                </p>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardHeader className="pb-2">
                <CardDescription className="flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4" />
                  Total Pedidos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-display font-bold">{stats.totalOrders}</p>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardHeader className="pb-2">
                <CardDescription className="flex items-center gap-2">
                  <Package className="w-4 h-4" />
                  Produtos Ativos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-display font-bold">{stats.activeProducts}</p>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardHeader className="pb-2">
                <CardDescription className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-orange-500" />
                  Estoque Baixo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-display font-bold text-orange-600">{stats.lowStockProducts}</p>
              </CardContent>
            </Card>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="border-border/50">
                <CardHeader className="pb-2">
                  <CardDescription className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Total Usuários
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-display font-bold text-foreground">
                    {stats.totalUsers}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="border-border/50">
                <CardHeader className="pb-2">
                  <CardDescription className="flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-green-500" />
                    Profissionais Aprovados
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-display font-bold text-green-600">
                    {stats.approvedRequests}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="border-border/50">
                <CardHeader className="pb-2">
                  <CardDescription className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-yellow-500" />
                    Pendentes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-display font-bold text-yellow-600">
                    {stats.pendingRequests}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="border-border/50">
                <CardHeader className="pb-2">
                  <CardDescription className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Desconto Médio
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-display font-bold text-primary">
                    {stats.avgDiscount}%
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Additional Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="border-border/50">
                <CardHeader className="pb-2">
                  <CardDescription className="flex items-center gap-2">
                    <UserX className="w-4 h-4 text-red-500" />
                    Rejeitadas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-display font-bold text-red-600">
                    {stats.rejectedRequests}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card className="border-border/50">
                <CardHeader className="pb-2">
                  <CardDescription className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Quiz Completados
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-display font-bold text-foreground">
                    {stats.quizCompletions}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Card className="border-border/50">
                <CardHeader className="pb-2">
                  <CardDescription className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4" />
                    Taxa de Aprovação
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-display font-bold text-foreground">
                    {allRequests.length > 0
                      ? Math.round((stats.approvedRequests / allRequests.length) * 100)
                      : 0}
                    %
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Charts */}
          <Tabs defaultValue="bar" className="space-y-6">
            <TabsList>
              <TabsTrigger value="bar" className="gap-2">
                <BarChart3 className="w-4 h-4" />
                Solicitações
              </TabsTrigger>
              <TabsTrigger value="pie" className="gap-2">
                <PieChartIcon className="w-4 h-4" />
                Status
              </TabsTrigger>
            </TabsList>

            <TabsContent value="bar">
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="font-display">Solicitações por Data</CardTitle>
                  <CardDescription>
                    Novas solicitações de cadastro profissional
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {requestsByDate.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={requestsByDate}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--background))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                          }}
                        />
                        <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                      Nenhuma solicitação no período selecionado
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="pie">
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="font-display">Distribuição por Status</CardTitle>
                  <CardDescription>
                    Proporção de solicitações aprovadas, pendentes e rejeitadas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {pieData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                          label={({ name, percent }) =>
                            `${name}: ${(percent * 100).toFixed(0)}%`
                          }
                        >
                          {pieData.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--background))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                          }}
                        />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                      Nenhuma solicitação encontrada
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
