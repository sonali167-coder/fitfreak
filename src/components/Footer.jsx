const Footer = () => {
  return (
    <footer className="bg-black/80 backdrop-blur-md text-orange-400 py-4 text-center mt-auto border-t border-orange-500 animate-fadeIn shadow-[0_-2px_10px_#ff6a00]/20">
      <p className="text-sm tracking-wider hover:scale-105 transition-transform duration-300">
        &copy; {new Date().getFullYear()}{" "}
        <span className="font-bold text-orange-300">FitFreak</span>. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
