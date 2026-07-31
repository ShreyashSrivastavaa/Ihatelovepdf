export function ThemeScript() {
  const inlineScript = `(function(){try{var s=localStorage.getItem('pdfhelp-theme');if(s==='dark'||(!s&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark');document.documentElement.classList.remove('light');}else{document.documentElement.classList.add('light');document.documentElement.classList.remove('dark');}}catch(e){}})();`;

  return (
    <script
      id="theme-script"
      dangerouslySetInnerHTML={{ __html: inlineScript }}
    />
  );
}
