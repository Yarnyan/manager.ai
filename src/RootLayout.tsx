import SideBar from './module/sidebar/SideBar';
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex relative">
      <div className="absolute">
        <SideBar />
      </div>
      <div className="w-full">
        {children}
      </div>
    </main>
  );
}

// px-4 sm:px-8 pt-6 main