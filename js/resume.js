(function () {
  const FILE = 'assets/Lalit_Patil_Resume.pdf';
  document.getElementById('download-resume')?.addEventListener('click', () => { const a = document.createElement('a'); a.href = FILE; a.download = 'Lalit_Patil_Resume.pdf'; document.body.append(a); a.click(); a.remove(); });
  document.getElementById('open-resume')?.addEventListener('click', () => window.open(FILE, '_blank', 'noopener'));
})();
