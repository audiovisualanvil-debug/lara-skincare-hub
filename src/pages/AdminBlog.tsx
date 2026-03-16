import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Loader2,
  FileText,
  Save,
  X,
  Image as ImageIcon,
  Calendar,
  Tag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useAdminRole } from "@/hooks/useAdminRole";
import MainHeader from "@/components/layout/MainHeader";
import MainFooter from "@/components/layout/MainFooter";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  cover_image: string | null;
  category: string | null;
  tags: string[];
  is_published: boolean;
  published_at: string | null;
  views_count: number;
  author_id: string;
  created_at: string;
  updated_at: string;
}

const emptyPost: Partial<BlogPost> = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  cover_image: "",
  category: "",
  tags: [],
  is_published: false,
};

const CATEGORIES = [
  "Skincare",
  "Cuidados Faciais",
  "Cuidados Corporais",
  "Ingredientes",
  "Dicas Profissionais",
  "Novidades",
  "Tutoriais",
];

const AdminBlog = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, loading: adminLoading } = useAdminRole();

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "published" | "draft">("all");

  // Editor modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Partial<BlogPost> | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [tagInput, setTagInput] = useState("");

  // Delete confirmation
  const [deletePost, setDeletePost] = useState<BlogPost | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Image upload
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    if (!authLoading && !adminLoading) {
      if (!user) {
        navigate("/auth", { state: { from: "/admin/blog" } });
      } else if (!isAdmin) {
        navigate("/");
        toast.error("Acesso não autorizado");
      } else {
        fetchPosts();
      }
    }
  }, [user, authLoading, isAdmin, adminLoading, navigate]);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setPosts((data || []) as BlogPost[]);
    } catch (error) {
      console.error("Error fetching posts:", error);
      toast.error("Erro ao carregar posts");
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title: string) =>
    title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  const handleSave = async () => {
    if (!editingPost?.title || !editingPost?.content) {
      toast.error("Título e conteúdo são obrigatórios");
      return;
    }
    if (!user) return;

    setIsSaving(true);
    try {
      const slug = editingPost.slug || generateSlug(editingPost.title);
      const postData = {
        title: editingPost.title,
        slug,
        excerpt: editingPost.excerpt || null,
        content: editingPost.content,
        cover_image: editingPost.cover_image || null,
        category: editingPost.category || null,
        tags: editingPost.tags || [],
        is_published: editingPost.is_published ?? false,
        published_at: editingPost.is_published
          ? editingPost.published_at || new Date().toISOString()
          : null,
        author_id: user.id,
      };

      if (editingPost.id) {
        const { error } = await supabase
          .from("blog_posts")
          .update(postData)
          .eq("id", editingPost.id);
        if (error) throw error;
        toast.success("Post atualizado!");
      } else {
        const { error } = await supabase.from("blog_posts").insert([postData]);
        if (error) throw error;
        toast.success("Post criado!");
      }

      setIsModalOpen(false);
      setEditingPost(null);
      fetchPosts();
    } catch (error: any) {
      console.error("Error saving post:", error);
      toast.error(error.message || "Erro ao salvar post");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deletePost) return;
    setIsDeleting(true);
    try {
      const { error } = await supabase
        .from("blog_posts")
        .delete()
        .eq("id", deletePost.id);
      if (error) throw error;
      toast.success("Post excluído!");
      setDeletePost(null);
      fetchPosts();
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("Erro ao excluir post");
    } finally {
      setIsDeleting(false);
    }
  };

  const togglePublish = async (post: BlogPost) => {
    try {
      const newStatus = !post.is_published;
      const { error } = await supabase
        .from("blog_posts")
        .update({
          is_published: newStatus,
          published_at: newStatus ? new Date().toISOString() : null,
        })
        .eq("id", post.id);

      if (error) throw error;
      toast.success(newStatus ? "Post publicado!" : "Post despublicado");
      fetchPosts();
    } catch (error) {
      toast.error("Erro ao atualizar status");
    }
  };

  const handleImageUpload = async (file: File) => {
    if (!file) return;
    setUploadingImage(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `blog/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("product-images")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("product-images").getPublicUrl(fileName);

      setEditingPost((prev) => (prev ? { ...prev, cover_image: publicUrl } : prev));
      toast.success("Imagem enviada!");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Erro ao enviar imagem");
    } finally {
      setUploadingImage(false);
    }
  };

  const addTag = () => {
    const tag = tagInput.trim();
    if (tag && editingPost && !(editingPost.tags || []).includes(tag)) {
      setEditingPost({ ...editingPost, tags: [...(editingPost.tags || []), tag] });
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    if (!editingPost) return;
    setEditingPost({
      ...editingPost,
      tags: (editingPost.tags || []).filter((t) => t !== tagToRemove),
    });
  };

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "published" && post.is_published) ||
      (filterStatus === "draft" && !post.is_published);
    return matchesSearch && matchesStatus;
  });

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
    <div className="min-h-screen flex flex-col bg-background">
      <MainHeader />

      <main className="flex-1 pt-32 pb-20">
        <div className="container max-w-7xl">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate("/admin/dashboard")}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="font-display text-3xl md:text-4xl font-medium text-foreground">
                  Gerenciar Blog
                </h1>
                <p className="text-muted-foreground mt-1">
                  {posts.length} posts • {posts.filter((p) => p.is_published).length} publicados
                </p>
              </div>
            </div>
            <Button
              onClick={() => {
                setEditingPost({ ...emptyPost });
                setIsModalOpen(true);
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Novo Post
            </Button>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por título ou categoria..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              {(["all", "published", "draft"] as const).map((status) => (
                <Button
                  key={status}
                  variant={filterStatus === status ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterStatus(status)}
                >
                  {status === "all" ? "Todos" : status === "published" ? "Publicados" : "Rascunhos"}
                </Button>
              ))}
            </div>
          </div>

          {/* Posts Table */}
          <Card className="border-border/50">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">Capa</TableHead>
                    <TableHead>Título</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-center">Views</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead className="w-32">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPosts.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-12 text-muted-foreground">
                        <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>Nenhum post encontrado</p>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredPosts.map((post) => (
                      <TableRow key={post.id}>
                        <TableCell>
                          {post.cover_image ? (
                            <img
                              src={post.cover_image}
                              alt={post.title}
                              className="w-12 h-12 object-cover rounded-md"
                            />
                          ) : (
                            <div className="w-12 h-12 bg-muted rounded-md flex items-center justify-center">
                              <ImageIcon className="w-6 h-6 text-muted-foreground" />
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          <p className="font-medium line-clamp-1">{post.title}</p>
                          {post.excerpt && (
                            <p className="text-xs text-muted-foreground line-clamp-1">{post.excerpt}</p>
                          )}
                        </TableCell>
                        <TableCell>
                          {post.category && <Badge variant="outline">{post.category}</Badge>}
                        </TableCell>
                        <TableCell className="text-center">
                          {post.is_published ? (
                            <Badge className="bg-green-500/10 text-green-600 border-green-500/20">
                              <Eye className="w-3 h-3 mr-1" />
                              Publicado
                            </Badge>
                          ) : (
                            <Badge variant="secondary">
                              <EyeOff className="w-3 h-3 mr-1" />
                              Rascunho
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-center text-sm text-muted-foreground">
                          {post.views_count}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {format(new Date(post.created_at), "dd/MM/yyyy", { locale: ptBR })}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => togglePublish(post)}
                              title={post.is_published ? "Despublicar" : "Publicar"}
                            >
                              {post.is_published ? (
                                <EyeOff className="w-4 h-4" />
                              ) : (
                                <Eye className="w-4 h-4" />
                              )}
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => {
                                setEditingPost({ ...post });
                                setIsModalOpen(true);
                              }}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => setDeletePost(post)}
                            >
                              <Trash2 className="w-4 h-4 text-destructive" />
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

      {/* Editor Dialog */}
      <Dialog open={isModalOpen} onOpenChange={(open) => { if (!open) { setIsModalOpen(false); setEditingPost(null); } }}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingPost?.id ? "Editar Post" : "Novo Post"}</DialogTitle>
          </DialogHeader>

          {editingPost && (
            <div className="space-y-4">
              {/* Title */}
              <div>
                <Label>Título *</Label>
                <Input
                  value={editingPost.title || ""}
                  onChange={(e) => {
                    const title = e.target.value;
                    setEditingPost({
                      ...editingPost,
                      title,
                      slug: editingPost.id ? editingPost.slug : generateSlug(title),
                    });
                  }}
                  placeholder="Título do post"
                />
              </div>

              {/* Slug */}
              <div>
                <Label>Slug (URL)</Label>
                <Input
                  value={editingPost.slug || ""}
                  onChange={(e) => setEditingPost({ ...editingPost, slug: e.target.value })}
                  placeholder="url-do-post"
                />
              </div>

              {/* Excerpt */}
              <div>
                <Label>Resumo</Label>
                <Textarea
                  value={editingPost.excerpt || ""}
                  onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
                  placeholder="Breve descrição do post..."
                  rows={2}
                />
              </div>

              {/* Content */}
              <div>
                <Label>Conteúdo *</Label>
                <Textarea
                  value={editingPost.content || ""}
                  onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                  placeholder="Conteúdo do post (suporta Markdown)..."
                  rows={12}
                  className="font-mono text-sm"
                />
              </div>

              {/* Cover Image */}
              <div>
                <Label>Imagem de Capa</Label>
                <div className="flex gap-3 items-start mt-1">
                  {editingPost.cover_image && (
                    <img
                      src={editingPost.cover_image}
                      alt="Capa"
                      className="w-24 h-16 object-cover rounded-md"
                    />
                  )}
                  <div className="flex-1 space-y-2">
                    <Input
                      value={editingPost.cover_image || ""}
                      onChange={(e) => setEditingPost({ ...editingPost, cover_image: e.target.value })}
                      placeholder="URL da imagem ou faça upload"
                    />
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleImageUpload(file);
                        }}
                        className="text-sm"
                        id="cover-upload"
                        hidden
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        disabled={uploadingImage}
                        onClick={() => document.getElementById("cover-upload")?.click()}
                      >
                        {uploadingImage ? (
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                          <ImageIcon className="w-4 h-4 mr-2" />
                        )}
                        Upload Imagem
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Category */}
              <div>
                <Label>Categoria</Label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {CATEGORIES.map((cat) => (
                    <Button
                      key={cat}
                      type="button"
                      variant={editingPost.category === cat ? "default" : "outline"}
                      size="sm"
                      onClick={() => setEditingPost({ ...editingPost, category: cat })}
                    >
                      {cat}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div>
                <Label>Tags</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    placeholder="Adicionar tag..."
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addTag();
                      }
                    }}
                  />
                  <Button type="button" variant="outline" size="sm" onClick={addTag}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                {(editingPost.tags || []).length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {editingPost.tags!.map((tag) => (
                      <Badge key={tag} variant="secondary" className="gap-1">
                        {tag}
                        <button onClick={() => removeTag(tag)}>
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Publish toggle */}
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <Switch
                  checked={editingPost.is_published ?? false}
                  onCheckedChange={(checked) =>
                    setEditingPost({ ...editingPost, is_published: checked })
                  }
                />
                <div>
                  <p className="font-medium text-sm">
                    {editingPost.is_published ? "Publicado" : "Rascunho"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {editingPost.is_published
                      ? "O post será visível publicamente"
                      : "O post ficará salvo como rascunho"}
                  </p>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => { setIsModalOpen(false); setEditingPost(null); }}>
              Cancelar
            </Button>
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
              {editingPost?.id ? "Salvar Alterações" : "Criar Post"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deletePost} onOpenChange={(open) => !open && setDeletePost(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir post?</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir "{deletePost?.title}"? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={isDeleting} className="bg-destructive text-destructive-foreground">
              {isDeleting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Trash2 className="w-4 h-4 mr-2" />}
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <MainFooter />
    </div>
  );
};

export default AdminBlog;
