# Manual de Identidade Visual
## E-commerce Multimarcas de Dermocosméticos

---

## 1. Visão Geral

Este manual estabelece as diretrizes visuais para o e-commerce de dermocosméticos, garantindo consistência na comunicação visual enquanto preserva a identidade única de cada marca.

### 1.1 Filosofia de Design

O site opera em **duas camadas visuais**:

1. **Base Neutra (Global)**: Estrutura comum do site — header, footer, navegação, checkout
2. **Identidade de Marca**: Aplicada exclusivamente nas seções/páginas de cada marca

---

## 2. Base Neutra (Global)

### 2.1 Paleta de Cores Base

```css
:root {
  /* Fundos */
  --base-white: #FFFFFF;
  --base-cream: #FAF8F5;
  --base-beige: #F5F0EB;
  --base-warm-gray: #E8E4DF;
  
  /* Textos */
  --text-primary: #1A1A1A;
  --text-secondary: #4A4A4A;
  --text-muted: #8A8A8A;
  
  /* Bordas e Divisores */
  --border-light: #E5E5E5;
  --border-medium: #D4D4D4;
  
  /* Estados */
  --success: #22C55E;
  --warning: #F59E0B;
  --error: #EF4444;
}
```

### 2.2 Tipografia Base

| Elemento | Fonte | Peso | Tamanho |
|----------|-------|------|---------|
| H1 (Hero) | Playfair Display | 600 | 48-64px |
| H2 (Seção) | Playfair Display | 500 | 32-40px |
| H3 (Subtítulo) | Inter | 600 | 24-28px |
| Body | Inter | 400 | 16px |
| Caption | Inter | 400 | 14px |
| Button | Inter | 500 | 14-16px |

### 2.3 Espaçamento Global

```
4px  - micro (ícones, badges)
8px  - pequeno (padding interno)
16px - padrão (gaps, margens)
24px - médio (seções internas)
32px - grande (entre blocos)
48px - extra (seções principais)
64px - hero (topo de páginas)
```

---

## 3. Marca 1 — Tulípia

### 3.1 Conceito

> **Dermoclínica Premium com Nanotecnologia**
> 
> Visual científico, elegante e profissional. Muito respiro visual, minimalismo com sofisticação tecnológica.

### 3.2 Paleta de Cores

```css
:root {
  /* Tulípia - Primárias */
  --tulipia-white: #FFFFFF;
  --tulipia-pearl: #FAFAFA;
  --tulipia-silver: #E8E8E8;
  
  /* Tulípia - Acentos */
  --tulipia-rose-tech: #C4A4B4;        /* Rosé tecnológico principal */
  --tulipia-rose-light: #E8D4DC;       /* Rosé suave */
  --tulipia-rose-dark: #9A7A8A;        /* Rosé profundo */
  
  /* Tulípia - Neutros */
  --tulipia-gray-100: #F5F5F5;
  --tulipia-gray-200: #E0E0E0;
  --tulipia-gray-300: #BDBDBD;
  --tulipia-gray-400: #9E9E9E;
  --tulipia-gray-500: #757575;
  --tulipia-gray-600: #616161;
  --tulipia-gray-700: #424242;
  
  /* Tulípia - Gradientes */
  --tulipia-gradient-hero: linear-gradient(135deg, #FAFAFA 0%, #F0E8EC 100%);
  --tulipia-gradient-card: linear-gradient(180deg, #FFFFFF 0%, #FAF8FA 100%);
  --tulipia-gradient-accent: linear-gradient(90deg, #C4A4B4 0%, #D4B4C4 100%);
}
```

### 3.3 Tipografia

| Elemento | Fonte | Peso | Tamanho | Tracking |
|----------|-------|------|---------|----------|
| H1 | Cormorant Garamond | 300 | 56px | 0.02em |
| H2 | Cormorant Garamond | 400 | 36px | 0.01em |
| H3 | Inter | 300 | 20px | 0.03em |
| Body | Inter | 300 | 15px | 0.01em |
| Caption | Inter | 400 | 13px | 0.02em |
| Button | Inter | 400 | 13px | 0.1em |

**Características:**
- Letras com peso leve (300-400)
- Tracking expandido para elegância
- Muito espaço entre linhas (line-height: 1.7)

### 3.4 Estilo de Cards

```
┌─────────────────────────────────────┐
│                                     │
│         [Imagem do Produto]         │
│         Fundo: #FAFAFA              │
│         Border-radius: 12px         │
│                                     │
├─────────────────────────────────────┤
│                                     │
│  TULÍPIA                            │  ← Brand tag (rosé, 10px, tracking wide)
│                                     │
│  Nome do Produto com               │  ← Cormorant, 18px, gray-700
│  Nanotecnologia                    │
│                                     │
│  Breve descrição do produto        │  ← Inter 300, 14px, gray-500
│  em uma ou duas linhas.            │
│                                     │
│  R$ 189,00                         │  ← Inter 400, 16px, gray-700
│                                     │
│  ┌─────────────────────────────┐   │
│  │      ADICIONAR AO CARRINHO  │   │  ← Botão: border rosé, bg transparent
│  └─────────────────────────────┘   │     Hover: bg rosé-light
│                                     │
└─────────────────────────────────────┘

Especificações:
- Sombra: 0 2px 8px rgba(0,0,0,0.04)
- Border: 1px solid #E8E8E8
- Padding: 24px
- Gap interno: 12px
- Hover: sombra aumenta, borda rosé sutil
```

### 3.5 Ícones

**Estilo:** Outline fino (stroke-width: 1.5px)
**Cor:** --tulipia-gray-400 (padrão) / --tulipia-rose-tech (hover/ativo)

**Ícones recomendados:**
- Nano/Tech: `Atom`, `Dna`, `Microscope`
- Skincare: `Droplets`, `Sparkles`, `Heart`
- Ações: `ShoppingBag`, `Heart`, `Share2`

### 3.6 Exemplo de Aplicação

```
┌────────────────────────────────────────────────────────────────────┐
│  HEADER GLOBAL (base neutra)                                       │
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│  ┌──────────────────────────────────────────────────────────────┐ │
│  │                                                              │ │
│  │     TULÍPIA                                                  │ │
│  │     Ciência Avançada para sua Pele                          │ │
│  │                                                              │ │
│  │     [Gradiente hero suave rosé → branco]                    │ │
│  │     [Imagem minimalista com muito espaço negativo]          │ │
│  │                                                              │ │
│  └──────────────────────────────────────────────────────────────┘ │
│                                                                    │
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐     │
│  │ Card │  │ Card │  │ Card │  │ Card │  │ Card │  │ Card │     │
│  │      │  │      │  │      │  │      │  │      │  │      │     │
│  └──────┘  └──────┘  └──────┘  └──────┘  └──────┘  └──────┘     │
│                                                                    │
│  [Seção com fundo #FAFAFA, bordas suaves, muito espaçamento]      │
│                                                                    │
├────────────────────────────────────────────────────────────────────┤
│  FOOTER GLOBAL (base neutra)                                       │
└────────────────────────────────────────────────────────────────────┘
```

---

## 4. Marca 2 — Mezzo

### 4.1 Conceito

> **Alta Performance Estética**
> 
> Visual impactante e sofisticado. Foco em resultado rápido e tecnologia avançada. Luxo acessível com toques dourados.

### 4.2 Paleta de Cores

```css
:root {
  /* Mezzo - Neutros Sofisticados */
  --mezzo-black: #1A1A1A;
  --mezzo-charcoal: #2D2D2D;
  --mezzo-slate: #4A4A4A;
  --mezzo-warm-gray: #6B6B6B;
  
  /* Mezzo - Claros */
  --mezzo-cream: #F8F6F3;
  --mezzo-ivory: #FFFDF9;
  --mezzo-pearl: #EDE8E1;
  
  /* Mezzo - Dourados */
  --mezzo-gold-light: #D4AF37;          /* Dourado principal */
  --mezzo-gold-soft: #E8D5A3;           /* Dourado suave */
  --mezzo-gold-pale: #F5EDD6;           /* Dourado pálido */
  --mezzo-gold-dark: #B8941F;           /* Dourado profundo */
  
  /* Mezzo - Gradientes */
  --mezzo-gradient-hero: linear-gradient(135deg, #2D2D2D 0%, #1A1A1A 100%);
  --mezzo-gradient-gold: linear-gradient(90deg, #D4AF37 0%, #E8D5A3 50%, #D4AF37 100%);
  --mezzo-gradient-card: linear-gradient(180deg, #FFFFFF 0%, #F8F6F3 100%);
}
```

### 4.3 Tipografia

| Elemento | Fonte | Peso | Tamanho | Características |
|----------|-------|------|---------|-----------------|
| H1 | Montserrat | 700 | 48px | Uppercase, tracking 0.15em |
| H2 | Montserrat | 600 | 32px | Uppercase, tracking 0.1em |
| H3 | Montserrat | 500 | 20px | Normal case |
| Body | Open Sans | 400 | 16px | Line-height: 1.6 |
| Caption | Open Sans | 400 | 14px | — |
| Button | Montserrat | 600 | 14px | Uppercase, tracking 0.12em |
| Price | Montserrat | 700 | 20px | — |

**Características:**
- Títulos em uppercase para impacto
- Contraste forte entre pesos
- Tracking generoso em títulos

### 4.4 Estilo de Cards

```
┌─────────────────────────────────────┐
│ ┌─────────────────────────────────┐ │
│ │                                 │ │
│ │      [Imagem do Produto]        │ │
│ │      Fundo: gradient escuro     │ │
│ │                                 │ │
│ │  ┌─────────┐                    │ │  ← Badge "PRO" dourado
│ │  │  PRO    │                    │ │
│ │  └─────────┘                    │ │
│ └─────────────────────────────────┘ │
│                                     │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │  ← Linha dourada decorativa
│                                     │
│  MEZZO                              │  ← Dourado, 11px, tracking wide
│                                     │
│  NOME DO PRODUTO                   │  ← Montserrat 600, 16px, charcoal
│  ALTA PERFORMANCE                  │
│                                     │
│  Descrição impactante do           │  ← Open Sans 400, 14px, slate
│  resultado esperado.               │
│                                     │
│  R$ 249,00                         │  ← Montserrat 700, 18px, gold-dark
│                                     │
│  ┌─────────────────────────────┐   │
│  │ ★ ADICIONAR                 │   │  ← Bg: gold gradient, text: black
│  └─────────────────────────────┘   │     Border-radius: 4px (mais reto)
│                                     │
└─────────────────────────────────────┘

Especificações:
- Sombra: 0 4px 20px rgba(0,0,0,0.08)
- Border: none (usa sombra)
- Border-radius: 8px
- Linha decorativa: 2px, gradiente dourado
- Hover: escala 1.02, sombra intensifica
```

### 4.5 Ícones

**Estilo:** Filled ou semi-filled (stroke-width: 2px)
**Cor:** --mezzo-gold-light (destaque) / --mezzo-charcoal (secundário)

**Ícones recomendados:**
- Performance: `Zap`, `TrendingUp`, `Award`
- Luxo: `Crown`, `Diamond`, `Star`
- Ações: `ShoppingCart`, `Bookmark`, `Share`

### 4.6 Exemplo de Aplicação

```
┌────────────────────────────────────────────────────────────────────┐
│  HEADER GLOBAL (base neutra)                                       │
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│  ┌──────────────────────────────────────────────────────────────┐ │
│  │  ████████████████████████████████████████████████████████   │ │
│  │  ██                                                    ██   │ │
│  │  ██           M E Z Z O                               ██   │ │
│  │  ██     ALTA PERFORMANCE ESTÉTICA                     ██   │ │
│  │  ██                                                    ██   │ │
│  │  ██   [Fundo escuro com acentos dourados]             ██   │ │
│  │  ██   [Imagem de modelo com pele perfeita]            ██   │ │
│  │  ██                                                    ██   │ │
│  │  ████████████████████████████████████████████████████████   │ │
│  └──────────────────────────────────────────────────────────────┘ │
│                                                                    │
│  ═══════════════════════════════════════════════════════════════  │ ← Linha dourada
│                                                                    │
│  RESULTADOS COMPROVADOS                                            │ ← Título impactante
│                                                                    │
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐     │
│  │ Card │  │ Card │  │ Card │  │ Card │  │ Card │  │ Card │     │
│  │ PRO  │  │      │  │ PRO  │  │      │  │ PRO  │  │      │     │
│  └──────┘  └──────┘  └──────┘  └──────┘  └──────┘  └──────┘     │
│                                                                    │
├────────────────────────────────────────────────────────────────────┤
│  FOOTER GLOBAL (base neutra)                                       │
└────────────────────────────────────────────────────────────────────┘
```

---

## 5. Marca 3 — Extratos da Terra

### 5.1 Conceito

> **Natureza + Ciência**
> 
> Sensação de cuidado, equilíbrio e bem-estar. Verdes suaves, texturas naturais, conexão com a terra.

### 5.2 Paleta de Cores

```css
:root {
  /* Extratos - Verdes Naturais */
  --extratos-sage: #9CAF88;              /* Verde sálvia principal */
  --extratos-sage-light: #C5D4B8;        /* Verde sálvia claro */
  --extratos-sage-pale: #E8EFE3;         /* Verde sálvia pálido */
  --extratos-forest: #5C7A4A;            /* Verde floresta */
  --extratos-olive: #6B7B5A;             /* Verde oliva */
  
  /* Extratos - Terrosos */
  --extratos-sand: #E8DFD4;              /* Areia */
  --extratos-clay: #C4B5A5;              /* Argila */
  --extratos-earth: #8B7355;             /* Terra */
  
  /* Extratos - Neutros Naturais */
  --extratos-cream: #FAF8F4;
  --extratos-linen: #F5F0EA;
  --extratos-bark: #4A3F35;
  
  /* Extratos - Gradientes */
  --extratos-gradient-hero: linear-gradient(180deg, #E8EFE3 0%, #FAF8F4 100%);
  --extratos-gradient-nature: linear-gradient(135deg, #C5D4B8 0%, #E8DFD4 100%);
  --extratos-gradient-card: linear-gradient(180deg, #FFFFFF 0%, #F5F0EA 100%);
}
```

### 5.3 Tipografia

| Elemento | Fonte | Peso | Tamanho | Características |
|----------|-------|------|---------|-----------------|
| H1 | Lora | 500 | 44px | Itálico sutil opcional |
| H2 | Lora | 400 | 30px | — |
| H3 | Nunito | 600 | 18px | — |
| Body | Nunito | 400 | 16px | Line-height: 1.7 |
| Caption | Nunito | 400 | 14px | — |
| Button | Nunito | 600 | 14px | — |
| Tagline | Lora | 400 | 14px | Itálico |

**Características:**
- Serifada (Lora) para títulos = tradição, natureza
- Sans-serif suave (Nunito) para corpo = acessibilidade
- Itálicos em taglines para elegância orgânica

### 5.4 Estilo de Cards

```
┌─────────────────────────────────────┐
│                                     │
│ ╭─────────────────────────────────╮ │
│ │                                 │ │
│ │      [Imagem do Produto]        │ │
│ │      Fundo: textura natural     │ │  ← Pode ter textura de linho
│ │                                 │ │
│ │  🌿                             │ │  ← Ícone de folha (pequeno)
│ ╰─────────────────────────────────╯ │
│                                     │
│  ╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌  │  ← Linha tracejada verde suave
│                                     │
│  Extratos da Terra                  │  ← Forest, 11px, itálico
│                                     │
│  Nome do Produto com               │  ← Lora 500, 17px, bark
│  Ingredientes Naturais             │
│                                     │
│  Descrição que transmite           │  ← Nunito 400, 14px, olive
│  cuidado e naturalidade.           │
│                                     │
│  R$ 119,00                         │  ← Nunito 600, 16px, forest
│                                     │
│  ╭─────────────────────────────╮   │
│  │  🌱 Adicionar ao Carrinho   │   │  ← Bg: sage-pale, border: sage
│  ╰─────────────────────────────╯   │     Border-radius: 24px (pill)
│                                     │
└─────────────────────────────────────┘

Especificações:
- Sombra: 0 2px 12px rgba(92, 122, 74, 0.08)
- Border: 1px solid #E8EFE3
- Border-radius: 16px (mais orgânico)
- Cantos da imagem: 12px
- Hover: borda sage, sombra verde sutil
```

### 5.5 Ícones

**Estilo:** Outline suave (stroke-width: 1.5px, line-cap: round)
**Cor:** --extratos-sage (padrão) / --extratos-forest (hover)

**Ícones recomendados:**
- Natureza: `Leaf`, `Flower2`, `TreeDeciduous`, `Droplet`
- Bem-estar: `Heart`, `Sun`, `Moon`, `Wind`
- Ações: `ShoppingBasket`, `Bookmark`, `Send`

### 5.6 Texturas (opcional)

```
Para fundos de seção:
- Textura de papel reciclado (sutil, 5% opacidade)
- Textura de linho (para cards destaque)
- Padrão botânico (lineart, 3% opacidade)
```

### 5.7 Exemplo de Aplicação

```
┌────────────────────────────────────────────────────────────────────┐
│  HEADER GLOBAL (base neutra)                                       │
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│  ┌──────────────────────────────────────────────────────────────┐ │
│  │  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │ │
│  │  ░░                                                    ░░  │ │
│  │  ░░      Extratos da Terra                            ░░  │ │
│  │  ░░      Natureza que cuida                           ░░  │ │
│  │  ░░                                                    ░░  │ │
│  │  ░░   [Gradiente verde suave com textura natural]     ░░  │ │
│  │  ░░   [Imagem com folhagens, ingredientes naturais]   ░░  │ │
│  │  ░░                                                    ░░  │ │
│  │  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │ │
│  └──────────────────────────────────────────────────────────────┘ │
│                                                                    │
│  🌿 Ingredientes que a natureza oferece                           │
│                                                                    │
│  ╭──────╮  ╭──────╮  ╭──────╮  ╭──────╮  ╭──────╮  ╭──────╮     │
│  │ Card │  │ Card │  │ Card │  │ Card │  │ Card │  │ Card │     │
│  │  🌱  │  │  🌿  │  │  🌱  │  │  🌿  │  │  🌱  │  │  🌿  │     │
│  ╰──────╯  ╰──────╯  ╰──────╯  ╰──────╯  ╰──────╯  ╰──────╯     │
│                                                                    │
│  [Fundo com textura sutil de papel, bordas orgânicas]             │
│                                                                    │
├────────────────────────────────────────────────────────────────────┤
│  FOOTER GLOBAL (base neutra)                                       │
└────────────────────────────────────────────────────────────────────┘
```

---

## 6. Marca 4 — Smart GR

### 6.1 Conceito

> **Equipamentos Profissionais**
> 
> Visual técnico e objetivo. Transmite confiabilidade, precisão e profissionalismo. Cards mais retos, linguagem direta.

### 6.2 Paleta de Cores

```css
:root {
  /* Smart GR - Azuis Técnicos */
  --smart-blue-primary: #2563EB;        /* Azul principal */
  --smart-blue-dark: #1D4ED8;           /* Azul escuro */
  --smart-blue-light: #60A5FA;          /* Azul claro */
  --smart-blue-pale: #DBEAFE;           /* Azul pálido */
  --smart-blue-bg: #EFF6FF;             /* Azul fundo */
  
  /* Smart GR - Cinzas Técnicos */
  --smart-gray-900: #111827;
  --smart-gray-800: #1F2937;
  --smart-gray-700: #374151;
  --smart-gray-600: #4B5563;
  --smart-gray-500: #6B7280;
  --smart-gray-400: #9CA3AF;
  --smart-gray-300: #D1D5DB;
  --smart-gray-200: #E5E7EB;
  --smart-gray-100: #F3F4F6;
  
  /* Smart GR - Estados */
  --smart-success: #10B981;
  --smart-warning: #F59E0B;
  --smart-info: #3B82F6;
  
  /* Smart GR - Gradientes */
  --smart-gradient-hero: linear-gradient(135deg, #1F2937 0%, #111827 100%);
  --smart-gradient-tech: linear-gradient(90deg, #2563EB 0%, #60A5FA 100%);
  --smart-gradient-card: linear-gradient(180deg, #FFFFFF 0%, #F9FAFB 100%);
}
```

### 6.3 Tipografia

| Elemento | Fonte | Peso | Tamanho | Características |
|----------|-------|------|---------|-----------------|
| H1 | Roboto | 700 | 40px | — |
| H2 | Roboto | 600 | 28px | — |
| H3 | Roboto | 500 | 18px | — |
| Body | Roboto | 400 | 15px | Line-height: 1.5 |
| Caption | Roboto | 400 | 13px | — |
| Button | Roboto | 500 | 14px | Uppercase |
| Specs | Roboto Mono | 400 | 13px | Para especificações técnicas |
| Code | Roboto Mono | 400 | 12px | — |

**Características:**
- Fonte única (Roboto) para consistência técnica
- Roboto Mono para dados e especificações
- Sem serifa, sem floreios = objetivo e profissional

### 6.4 Estilo de Cards

```
┌─────────────────────────────────────┐
│ ┌─────────────────────────────────┐ │
│ │                                 │ │
│ │      [Imagem do Equipamento]    │ │
│ │      Fundo: gray-100            │ │
│ │                                 │ │
│ │  ┌──────────────────┐           │ │
│ │  │ PROFISSIONAL     │           │ │  ← Badge azul, cantos retos
│ │  └──────────────────┘           │ │
│ └─────────────────────────────────┘ │
│                                     │
│  ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬  │  ← Linha sólida azul (3px)
│                                     │
│  Smart GR                           │  ← Blue-primary, 11px, uppercase
│                                     │
│  NOME DO EQUIPAMENTO               │  ← Roboto 600, 16px, gray-900
│                                     │
│  ┌─────────────────────────────┐   │
│  │ Voltagem: 110/220V          │   │  ← Box de specs, Roboto Mono
│  │ Potência: 450W              │   │     Fundo: gray-100
│  │ Dimensões: 30x20x15cm       │   │     Border: gray-200
│  └─────────────────────────────┘   │
│                                     │
│  R$ 2.890,00                       │  ← Roboto 700, 20px, gray-900
│                                     │
│  ┌─────────────────────────────┐   │
│  │ ▶ SOLICITAR ORÇAMENTO       │   │  ← Bg: blue-primary, text: white
│  └─────────────────────────────┘   │     Border-radius: 4px (reto)
│                                     │
│  ┌─────────────────────────────┐   │
│  │   VER ESPECIFICAÇÕES        │   │  ← Outline: gray-300
│  └─────────────────────────────┘   │
│                                     │
└─────────────────────────────────────┘

Especificações:
- Sombra: 0 1px 3px rgba(0,0,0,0.1)
- Border: 1px solid #E5E7EB
- Border-radius: 4px (mínimo, técnico)
- Linha superior: 3px solid #2563EB
- Hover: borda azul, sombra aumenta
```

### 6.5 Ícones

**Estilo:** Stroke médio (stroke-width: 2px), geométrico
**Cor:** --smart-blue-primary (destaque) / --smart-gray-500 (secundário)

**Ícones recomendados:**
- Técnico: `Settings`, `Cpu`, `CircuitBoard`, `Gauge`
- Equipamento: `Monitor`, `Printer`, `Radio`, `Wifi`
- Ações: `Download`, `FileText`, `Phone`, `Mail`
- Info: `Info`, `HelpCircle`, `CheckCircle`, `AlertTriangle`

### 6.6 Elementos Especiais

```
Tabelas de Especificações:
┌────────────────────────────────────┐
│ ESPECIFICAÇÕES TÉCNICAS            │
├────────────────┬───────────────────┤
│ Voltagem       │ 110/220V          │
│ Potência       │ 450W              │
│ Frequência     │ 50/60Hz           │
│ Peso           │ 3,5 kg            │
│ Garantia       │ 12 meses          │
└────────────────┴───────────────────┘

- Fundo: alternado gray-50/white
- Border: gray-200
- Header: bg gray-800, text white
- Fonte: Roboto Mono
```

### 6.7 Exemplo de Aplicação

```
┌────────────────────────────────────────────────────────────────────┐
│  HEADER GLOBAL (base neutra)                                       │
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│  ┌──────────────────────────────────────────────────────────────┐ │
│  │  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓   │ │
│  │  ▓▓                                                    ▓▓   │ │
│  │  ▓▓           SMART GR                                ▓▓   │ │
│  │  ▓▓     EQUIPAMENTOS PROFISSIONAIS                    ▓▓   │ │
│  │  ▓▓                                                    ▓▓   │ │
│  │  ▓▓   [Fundo escuro com linhas técnicas azuis]        ▓▓   │ │
│  │  ▓▓   [Imagem de equipamento em uso]                  ▓▓   │ │
│  │  ▓▓                                                    ▓▓   │ │
│  │  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓   │ │
│  └──────────────────────────────────────────────────────────────┘ │
│                                                                    │
│  ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬  │ ← Linha azul
│                                                                    │
│  CATEGORIAS   |   RADIOFREQUÊNCIA   |   LASER   |   ULTRASSOM     │ ← Tabs técnicas
│                                                                    │
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐                          │
│  │ Card │  │ Card │  │ Card │  │ Card │   ← Grid 4 colunas        │
│  │ PRO  │  │ PRO  │  │      │  │ PRO  │                          │
│  │      │  │      │  │      │  │      │                          │
│  │ SPEC │  │ SPEC │  │ SPEC │  │ SPEC │   ← Box de specs em cada │
│  └──────┘  └──────┘  └──────┘  └──────┘                          │
│                                                                    │
├────────────────────────────────────────────────────────────────────┤
│  FOOTER GLOBAL (base neutra)                                       │
└────────────────────────────────────────────────────────────────────┘
```

---

## 7. Guia de Implementação

### 7.1 Estrutura CSS

```css
/* Base global */
:root {
  /* Cores neutras globais */
  /* Tipografia base */
  /* Espaçamentos */
}

/* Tulípia */
[data-brand="tulipia"],
.brand-tulipia {
  --brand-primary: var(--tulipia-rose-tech);
  --brand-secondary: var(--tulipia-gray-400);
  /* ... resto das variáveis */
}

/* Mezzo */
[data-brand="mezzo"],
.brand-mezzo {
  --brand-primary: var(--mezzo-gold-light);
  --brand-secondary: var(--mezzo-charcoal);
  /* ... */
}

/* Extratos */
[data-brand="extratos"],
.brand-extratos {
  --brand-primary: var(--extratos-sage);
  --brand-secondary: var(--extratos-forest);
  /* ... */
}

/* Smart GR */
[data-brand="smart"],
.brand-smart {
  --brand-primary: var(--smart-blue-primary);
  --brand-secondary: var(--smart-gray-700);
  /* ... */
}
```

### 7.2 Componentes Reutilizáveis

```
ProductCard
├── ProductCardTulipia    (cantos suaves, rosé, minimalista)
├── ProductCardMezzo      (linhas douradas, impactante)
├── ProductCardExtratos   (orgânico, verde, pill buttons)
└── ProductCardSmart      (reto, azul, specs box)

HeroSection
├── HeroTulipia           (parallax suave, muito respiro)
├── HeroMezzo             (dramático, dourado)
├── HeroExtratos          (texturas naturais)
└── HeroSmart             (linhas técnicas)

Button
├── ButtonTulipia         (outline rosé, transparente)
├── ButtonMezzo           (filled dourado, uppercase)
├── ButtonExtratos        (pill verde, ícone folha)
└── ButtonSmart           (reto azul, uppercase)
```

### 7.3 Checklist de Consistência

**Para cada marca, verificar:**

- [ ] Paleta de cores aplicada corretamente
- [ ] Tipografia conforme especificado
- [ ] Border-radius adequado ao estilo
- [ ] Ícones no estilo correto
- [ ] Botões seguem o padrão
- [ ] Cards com estrutura correta
- [ ] Espaçamentos respeitados
- [ ] Sombras e bordas conforme spec
- [ ] Hover states implementados
- [ ] Responsividade mantida

---

## 8. Resumo Visual Comparativo

| Aspecto | Tulípia | Mezzo | Extratos | Smart GR |
|---------|---------|-------|----------|----------|
| **Cor Principal** | Rosé tech #C4A4B4 | Dourado #D4AF37 | Verde sálvia #9CAF88 | Azul #2563EB |
| **Mood** | Científico elegante | Luxo impactante | Natural acolhedor | Técnico objetivo |
| **Border-radius** | 12px (suave) | 8px (moderado) | 16px (orgânico) | 4px (reto) |
| **Tipografia** | Cormorant + Inter | Montserrat + Open Sans | Lora + Nunito | Roboto + Mono |
| **Peso Texto** | Leve (300-400) | Forte (600-700) | Médio (400-500) | Médio (400-600) |
| **Uppercase** | Não | Sim (títulos) | Não | Sim (botões) |
| **Sombra** | Sutil | Pronunciada | Verde sutil | Mínima |
| **Ícones** | Outline fino | Filled/semi | Outline suave | Stroke médio |
| **Especial** | Muito respiro | Linhas douradas | Texturas naturais | Box de specs |

---

## 9. Arquivos de Referência

### Fontes do Google Fonts:

```html
<!-- Tulípia -->
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=Inter:wght@300;400&display=swap" rel="stylesheet">

<!-- Mezzo -->
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700&family=Open+Sans:wght@400&display=swap" rel="stylesheet">

<!-- Extratos da Terra -->
<link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;1,400&family=Nunito:wght@400;600&display=swap" rel="stylesheet">

<!-- Smart GR -->
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;600;700&family=Roboto+Mono:wght@400&display=swap" rel="stylesheet">
```

---

*Manual de Identidade Visual v1.0*
*E-commerce Multimarcas de Dermocosméticos*
