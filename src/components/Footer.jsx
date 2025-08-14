const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-zinc-900 text-center py-4 text-sm text-gray-500">
      © {new Date().getFullYear()} Employee Manager. All rights reserved.
    </footer>
  );
};

export default Footer;
