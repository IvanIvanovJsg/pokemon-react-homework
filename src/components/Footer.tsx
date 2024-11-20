function Footer() {
  return (
    <footer className="w-full h-auto bg-gray-800 text-white py-4">
      <div className="mx-auto text-center">
        <p className="text-sm h-full">
          © {new Date().getFullYear()} Pokemon Gallery
        </p>
        <div className="flex justify-center mt-2 space-x-4">
          {["Privacy policy", "Terms of service", "Contact us"].map((x) => (
            <div>{x}</div>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
