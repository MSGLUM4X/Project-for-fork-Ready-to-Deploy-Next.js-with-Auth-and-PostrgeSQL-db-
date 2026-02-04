import {Suspense} from "react";

export default function Layout({
                                   children,
                               }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div  className="h-screen w-screen">
            <Suspense>
                {children}
            </Suspense>
        </div>
    );
}
