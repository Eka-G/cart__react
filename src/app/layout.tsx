import { BaseLayout } from "@components";
import "antd/dist/reset.css";
import "@styles/globals.scss";

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
      <body>
        <BaseLayout>{children}</BaseLayout>
      </body>
    </html>
  );
}
