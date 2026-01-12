import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Plus,
  Search,
  Edit,
  Trash2,
  Package,
  Image as ImageIcon,
  Save,
  X,
  Loader2,
  Check,
  Tag,
  DollarSign,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useAdminRole } from "@/hooks/useAdminRole";
import MainHeader from "@/components/layout/MainHeader";

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  short_description: string | null;
  price: number;
  compare_at_price: number | null;
  brand: string;
  category: string | null;
  subcategory: string | null;
  image_url: string | null;
  images: string[];
  stock: number;
  sku: string | null;
  is_active: boolean;
  is_promotion: boolean;
  is_new: boolean;
  tags: string[];
  benefits: string[];
  ingredients: string | null;
  how_to_use: string | null;
  created_at: string;
}

const BRANDS = ["Tulípia", "Mezzo", "Extratos da Terra", "Smart GR"];
const CATEGORIES = ["Facial", "Corporal", "Capilar", "Equipamentos", "Kits"];

const emptyProduct: Partial<Product> = {
  name: "",
  slug: "",
  description: "",
  short_description: "",
  price: 0,
  compare_at_price: null,
  brand: "",
  category: "",
  subcategory: "",
  image_url: "",
  images: [],
  stock: 0,
  sku: "",
  is_active: true,
  is_promotion: false,
  is_new: false,
  tags: [],
  benefits: [],
  ingredients: "",
  how_to_use: "",
};

const AdminProducts = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, loading: adminLoading } = useAdminRole();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBrand, setFilterBrand] = useState<string>("all");

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Delete confirmation
  const [deleteProduct, setDeleteProduct] = useState<Product | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!authLoading && !adminLoading) {
      if (!user) {
        navigate("/auth", { state: { from: "/admin/produtos" } });
      } else if (!isAdmin) {
        navigate("/");
        toast.error("Acesso não autorizado");
      } else {
        fetchProducts();
      }
    }
  }, [user, authLoading, isAdmin, adminLoading, navigate]);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Erro ao carregar produtos");
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleSave = async () => {
    if (!editingProduct?.name || !editingProduct?.brand || !editingProduct?.price) {
      toast.error("Preencha os campos obrigatórios");
      return;
    }

    setIsSaving(true);
    try {
      const slug = editingProduct.slug || generateSlug(editingProduct.name);
      const productData = {
        name: editingProduct.name,
        slug,
        brand: editingProduct.brand,
        price: Number(editingProduct.price),
        description: editingProduct.description || null,
        short_description: editingProduct.short_description || null,
        compare_at_price: editingProduct.compare_at_price ? Number(editingProduct.compare_at_price) : null,
        category: editingProduct.category || null,
        subcategory: editingProduct.subcategory || null,
        image_url: editingProduct.image_url || null,
        images: editingProduct.images || [],
        stock: Number(editingProduct.stock) || 0,
        sku: editingProduct.sku || null,
        is_active: editingProduct.is_active ?? true,
        is_promotion: editingProduct.is_promotion ?? false,
        is_new: editingProduct.is_new ?? false,
        tags: editingProduct.tags || [],
        benefits: editingProduct.benefits || [],
        ingredients: editingProduct.ingredients || null,
        how_to_use: editingProduct.how_to_use || null,
      };

      if (editingProduct.id) {
        // Update
        const { error } = await supabase
          .from("products")
          .update(productData)
          .eq("id", editingProduct.id);

        if (error) throw error;
        toast.success("Produto atualizado!");
      } else {
        // Insert
        const { error } = await supabase.from("products").insert([productData]);

        if (error) throw error;
        toast.success("Produto cadastrado!");
      }

      setIsModalOpen(false);
      setEditingProduct(null);
      fetchProducts();
    } catch (error: any) {
      console.error("Error saving product:", error);
      toast.error(error.message || "Erro ao salvar produto");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteProduct) return;

    setIsDeleting(true);
    try {
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", deleteProduct.id);

      if (error) throw error;
      toast.success("Produto excluído!");
      setDeleteProduct(null);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Erro ao excluir produto");
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBrand = filterBrand === "all" || product.brand === filterBrand;
    return matchesSearch && matchesBrand;
  });

  const openNewProduct = () => {
    setEditingProduct({ ...emptyProduct });
    setIsModalOpen(true);
  };

  const openEditProduct = (product: Product) => {
    setEditingProduct({ ...product });
    setIsModalOpen(true);
  };

  if (authLoading || adminLoading || loading) {
    return (
      <div className="min-h-screen bg-background">
        <MainHeader />
        <div className="pt-32 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
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
              <Button variant="ghost" size="icon" onClick={() => navigate("/admin/dashboard")}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="font-display text-3xl md:text-4xl font-medium text-foreground">
                  Gerenciar Produtos
                </h1>
                <p className="text-muted-foreground font-body mt-1">
                  {products.length} produtos cadastrados
                </p>
              </div>
            </div>

            <Button variant="primary" onClick={openNewProduct}>
              <Plus className="w-4 h-4 mr-2" />
              Novo Produto
            </Button>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome ou SKU..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterBrand} onValueChange={setFilterBrand}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filtrar por marca" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as marcas</SelectItem>
                {BRANDS.map((brand) => (
                  <SelectItem key={brand} value={brand}>
                    {brand}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Products Table */}
          <Card className="border-border/50">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">Imagem</TableHead>
                    <TableHead>Produto</TableHead>
                    <TableHead>Marca</TableHead>
                    <TableHead className="text-right">Preço</TableHead>
                    <TableHead className="text-center">Estoque</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="w-24">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-12 text-muted-foreground">
                        <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>Nenhum produto encontrado</p>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          {product.image_url ? (
                            <img
                              src={product.image_url}
                              alt={product.name}
                              className="w-12 h-12 object-cover rounded-md"
                            />
                          ) : (
                            <div className="w-12 h-12 bg-muted rounded-md flex items-center justify-center">
                              <ImageIcon className="w-6 h-6 text-muted-foreground" />
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{product.name}</p>
                            {product.sku && (
                              <p className="text-xs text-muted-foreground">SKU: {product.sku}</p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{product.brand}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div>
                            <p className="font-medium">
                              R$ {Number(product.price).toFixed(2).replace(".", ",")}
                            </p>
                            {product.compare_at_price && (
                              <p className="text-xs text-muted-foreground line-through">
                                R$ {Number(product.compare_at_price).toFixed(2).replace(".", ",")}
                              </p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge variant={product.stock > 0 ? "default" : "destructive"}>
                            {product.stock}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center gap-1">
                            {product.is_active ? (
                              <Badge className="bg-green-500/10 text-green-600 border-green-500/20">
                                Ativo
                              </Badge>
                            ) : (
                              <Badge variant="secondary">Inativo</Badge>
                            )}
                            {product.is_promotion && (
                              <Badge className="bg-orange-500/10 text-orange-600 border-orange-500/20">
                                Promo
                              </Badge>
                            )}
                            {product.is_new && (
                              <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/20">
                                Novo
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => openEditProduct(product)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => setDeleteProduct(product)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Product Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">
              {editingProduct?.id ? "Editar Produto" : "Novo Produto"}
            </DialogTitle>
            <DialogDescription>
              Preencha os dados do produto
            </DialogDescription>
          </DialogHeader>

          {editingProduct && (
            <div className="space-y-6 py-4">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="name">Nome do Produto *</Label>
                  <Input
                    id="name"
                    value={editingProduct.name || ""}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, name: e.target.value })
                    }
                    placeholder="Nome do produto"
                  />
                </div>

                <div>
                  <Label htmlFor="brand">Marca *</Label>
                  <Select
                    value={editingProduct.brand || ""}
                    onValueChange={(value) =>
                      setEditingProduct({ ...editingProduct, brand: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a marca" />
                    </SelectTrigger>
                    <SelectContent>
                      {BRANDS.map((brand) => (
                        <SelectItem key={brand} value={brand}>
                          {brand}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="category">Categoria</Label>
                  <Select
                    value={editingProduct.category || ""}
                    onValueChange={(value) =>
                      setEditingProduct({ ...editingProduct, category: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="price">Preço *</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={editingProduct.price || ""}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) })
                    }
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <Label htmlFor="compare_at_price">Preço Comparativo</Label>
                  <Input
                    id="compare_at_price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={editingProduct.compare_at_price || ""}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        compare_at_price: e.target.value ? parseFloat(e.target.value) : null,
                      })
                    }
                    placeholder="Preço original (riscado)"
                  />
                </div>

                <div>
                  <Label htmlFor="stock">Estoque</Label>
                  <Input
                    id="stock"
                    type="number"
                    min="0"
                    value={editingProduct.stock || 0}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, stock: parseInt(e.target.value) })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="sku">SKU</Label>
                  <Input
                    id="sku"
                    value={editingProduct.sku || ""}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, sku: e.target.value })
                    }
                    placeholder="Código do produto"
                  />
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="image_url">URL da Imagem</Label>
                  <Input
                    id="image_url"
                    value={editingProduct.image_url || ""}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, image_url: e.target.value })
                    }
                    placeholder="https://..."
                  />
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="short_description">Descrição Curta</Label>
                  <Input
                    id="short_description"
                    value={editingProduct.short_description || ""}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, short_description: e.target.value })
                    }
                    placeholder="Breve descrição para listagens"
                  />
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="description">Descrição Completa</Label>
                  <Textarea
                    id="description"
                    value={editingProduct.description || ""}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, description: e.target.value })
                    }
                    placeholder="Descrição detalhada do produto"
                    rows={4}
                  />
                </div>
              </div>

              {/* Flags */}
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2">
                  <Switch
                    id="is_active"
                    checked={editingProduct.is_active ?? true}
                    onCheckedChange={(checked) =>
                      setEditingProduct({ ...editingProduct, is_active: checked })
                    }
                  />
                  <Label htmlFor="is_active">Ativo</Label>
                </div>

                <div className="flex items-center gap-2">
                  <Switch
                    id="is_promotion"
                    checked={editingProduct.is_promotion ?? false}
                    onCheckedChange={(checked) =>
                      setEditingProduct({ ...editingProduct, is_promotion: checked })
                    }
                  />
                  <Label htmlFor="is_promotion">Em Promoção</Label>
                </div>

                <div className="flex items-center gap-2">
                  <Switch
                    id="is_new"
                    checked={editingProduct.is_new ?? false}
                    onCheckedChange={(checked) =>
                      setEditingProduct({ ...editingProduct, is_new: checked })
                    }
                  />
                  <Label htmlFor="is_new">Lançamento</Label>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleSave} disabled={isSaving}>
              {isSaving ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={!!deleteProduct} onOpenChange={() => setDeleteProduct(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir o produto "{deleteProduct?.name}"?
              Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteProduct(null)}>
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Trash2 className="w-4 h-4 mr-2" />
              )}
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminProducts;
