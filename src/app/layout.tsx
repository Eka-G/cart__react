import { Lora } from "next/font/google";
import { Header, Footer } from "@components";
import "@styles/globals.scss";

const lora = Lora({
  weight: "400",
  subsets: ["latin"],
});

export const metadata = {
  title: "Purity",
  description: "Купить эстетичную одежду онлайн",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={lora.className}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
