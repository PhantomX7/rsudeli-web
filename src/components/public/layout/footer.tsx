// components/layout/footer.tsx
export function Footer() {
    return (
        <footer className="bg-[#2b2b2b] text-white py-8 mt-auto">
            <div className="container mx-auto px-4 text-center">
                <p className="text-sm">
                    &copy; {new Date().getFullYear()} RSU Deli. All rights
                    reserved.
                </p>
            </div>
        </footer>
    );
}
