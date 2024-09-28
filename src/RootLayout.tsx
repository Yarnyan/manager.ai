import SideBar from './module/sidebar/SideBar';
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body className="bg-[var(--bgColor)]">
          <main className="flex relative">
            <div className="fixed sm:absolute">
              <SideBar />
            </div>
            <div className="w-full">
              {children}
            </div>
          </main>
        </body>
    </html>
  );
}

// px-4 sm:px-8 pt-6 main