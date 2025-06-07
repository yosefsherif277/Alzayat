This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## شرح بالعربية لتشغيل الموقع:
الموقع يعمل بتقنية MERN stack وهو يعمل بالتقنيات التالية(Mongodb, expressjs,react,nodejs) وهذا هو باختصار MERN واضف على ذلك nextjs وهذا الموقع تم من ناحية الواجهة الامامية frontend لكنه لم يكتمل بعد من ناحية ارسال الايميلات وتسجيل الدخول وغيره لان هذا يحتاج الى بعض من اهتمام المدرسة، وبما اننا في فصل دراسي فلم يسمح لنا الوقت بهذا، لكن نكمله باذن الله في اجازة الصيف، لتشغيل الموقع عليك فعل بضعة أشياء:
### أولا : تثبيت nodejs من موقعهم الرسمي
### ثانيا: قم بالذهاب الي مسار المشروع عبر ذلك الامر في تطبيق ال cmd:
cd "مسار ملفات المشروع عندك في الجهاز"
### ثالثا : قم بتنزيل node-mudules
npm install
### نزل تلك المكتبات
npm install bcryptjs cors dotenv express express-rate-limit helmet jsonwebtoken mongoose next react react-dom @svgr/webpack nodemon