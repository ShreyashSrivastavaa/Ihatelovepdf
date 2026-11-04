export function ThemeScript() {
  const inlineScript = `(function(){try{var s=localStorage.getItem('ihatelovepdf-theme');if(s==='dark'){document.documentElement.classList.add('dark');document.documentElement.classList.remove('light');document.documentElement.setAttribute('data-theme','dark');}else{document.documentElement.classList.add('light');document.documentElement.classList.remove('dark');document.documentElement.setAttribute('data-theme','light');}}catch(e){}})();`;

  return (
    <script
      id="theme-script"
      dangerouslySetInnerHTML={{ __html: inlineScript }}
    />
  );
}
