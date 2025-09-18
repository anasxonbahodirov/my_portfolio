# Anasxon Portfolio

Zamonaviy Vue 3 portfolio veb-sayti, loyihalar, fikrlar va tajribalarni ko'rsatish uchun yaratilgan.

## ✨ Xususiyatlar

- **Vue 3 + TypeScript** - Zamonaviy frontend texnologiyalari
- **Tailwind CSS** - Responsive va chiroyli dizayn
- **Vue Router** - SPA navigatsiya
- **Pinia** - State management
- **Reaksiya tizimi** - Emoji bilan baholash (Supabase yoki localStorage)
- **Scroll animatsiyalar** - IntersectionObserver asosida
- **Dark/Light tema** - Avtomatik tema almashish
- **SEO optimizatsiya** - Meta teglar va OpenGraph
- **Mobil moslik** - Barcha qurilmalarda yaxshi ko'rinish

## 🚀 Tez boshlash

### Talablar

- Node.js 18+
- npm yoki yarn

### O'rnatish

1. **Loyihani klonlash**

```bash
git clone <repository-url>
cd anasxon-portfolio
```

2. **Bog'liqliklarni o'rnatish**

```bash
npm install
```

3. **Development serverini ishga tushirish**

```bash
npm run dev
```

4. **Brauzerda ochish**

```
http://localhost:5173
```

## 🏗️ Build va Production

### Production build

```bash
npm run build
```

### Build natijasini ko'rish

```bash
npm run preview
```

## 🔧 Konfiguratsiya

### Supabase (ixtiyoriy)

Agar reaksiyalar uchun Supabase ishlatmoqchi bo'lsangiz:

1. `.env.example` faylini `.env` ga nusxalang
2. Supabase URL va API kalitini to'ldiring
3. `supabase.sql` faylini Supabase da ishga tushiring

```bash
cp .env.example .env
# .env faylini tahrirlang
```

### Environment variables

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 📁 Loyiha tuzilishi

```
src/
├── components/          # Vue komponentlari
│   ├── Navbar.vue      # Navigatsiya paneli
│   ├── FooterBar.vue   # Footer
│   ├── ProjectCard.vue # Loyiha kartochkasi
│   ├── RatingStars.vue # Yulduzli reyting
│   ├── ReactionBar.vue # Emoji reaksiyalar
│   └── Tag.vue         # Teg komponenti
├── pages/              # Sahifalar
│   ├── Home.vue        # Bosh sahifa
│   ├── Projects.vue    # Loyihalar ro'yxati
│   ├── ProjectDetail.vue # Loyiha batafsil
│   ├── Thoughts.vue    # Fikrlar ro'yxati
│   ├── ThoughtDetail.vue # Fikr batafsil
│   └── NotFound.vue    # 404 sahifa
├── data/               # Ma'lumotlar
│   ├── projects.ts     # Loyihalar ma'lumoti
│   └── thoughts.ts     # Fikrlar ma'lumoti
├── lib/                # Kutubxonalar
│   └── supabase.ts     # Supabase konfiguratsiya
├── utils/              # Utility funksiyalar
│   └── reveal.ts       # Scroll animatsiya direktivasi
├── types.ts            # TypeScript tiplari
├── router.ts           # Vue Router konfiguratsiya
├── styles.css          # Asosiy CSS
└── main.ts             # Entry point
```

## 🎨 Dizayn

- **Tailwind CSS** - Utility-first CSS framework
- **Responsive design** - Mobile-first yondashuv
- **Dark mode** - Avtomatik tema almashish
- **Glassmorphism** - Zamonaviy dizayn effektlari
- **Smooth animations** - CSS transitions va scroll animatsiyalar

## 📱 Sahifalar

### Bosh sahifa (`/`)

- Hero section
- Qisqacha ma'lumot
- Tanlangan loyihalar
- So'nggi fikrlar

### Loyihalar (`/projects`)

- Barcha loyihalar ro'yxati
- Qidiruv va filtrlash
- Tag bo'yicha filtrlash
- Statistika

### Loyiha batafsil (`/projects/:slug`)

- To'liq loyiha ma'lumoti
- Texnologiyalar va xususiyatlar
- Reaksiyalar
- Demo va GitHub linklari

### Fikrlar (`/fikrlar`)

- Barcha blog postlar
- Qidiruv
- Reaksiyalar

### Fikr batafsil (`/fikrlar/:id`)

- To'liq post mazmuni
- Markdown support
- Reaksiyalar
- Ulashish imkoniyati

## 🔥 Reaksiya tizimi

### Emoji reaksiyalar

- 👍 🔥 💡 😂 ❤️
- Har bir emoji uchun son
- Foydalanuvchi sessiyasi uchun 1 marta

### Backend

- **Supabase** (asosiy) - PostgreSQL bilan
- **localStorage** (fallback) - Supabase yo'q bo'lsa

## 🚀 Deployment

### Vercel

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm run build
# dist/ papkasini Netlify ga yuklang
```

### GitHub Pages

```bash
npm run build
# dist/ papkasini GitHub Pages ga yuklang
```

## 🛠️ Development

### Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm run preview  # Build natijasini ko'rish
```

### Code style

- Vue 3 Composition API
- TypeScript strict mode
- Tailwind CSS utility classes
- ESLint va Prettier (recommended)

## 📚 Texnologiyalar

- **Frontend**: Vue 3, TypeScript, Tailwind CSS
- **Routing**: Vue Router 4
- **State**: Pinia
- **Icons**: Lucide Vue Next
- **Backend**: Supabase (ixtiyoriy)
- **Build**: Vite
- **Deployment**: Vercel, Netlify, GitHub Pages

## 🤝 Hissa qo'shish

1. Fork qiling
2. Feature branch yarating (`git checkout -b feature/amazing-feature`)
3. O'zgarishlarni commit qiling (`git commit -m 'Add amazing feature'`)
4. Branch ni push qiling (`git push origin feature/amazing-feature`)
5. Pull Request yarating

## 📄 Litsenziya

Bu loyiha MIT litsenziyasi ostida tarqatiladi.

## 📞 Aloqa

- **Email**: anasxon@example.com
- **Telegram**: @anasxon_dev
- **GitHub**: [@anasxon](https://github.com/anasxon)

---

⭐ Ushbu loyihani yaxshi ko'rsangiz, star bering!
